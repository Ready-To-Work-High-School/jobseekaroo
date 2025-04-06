
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";
import Stripe from "https://esm.sh/stripe@13.6.0";

// Set up CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle preflight OPTIONS requests
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
}

serve(async (req) => {
  // Handle CORS options request
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Get the authorization header from the request
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        global: { 
          headers: { Authorization: authHeader }
        }
      }
    );

    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const { jobId, planType, returnUrl } = await req.json();

    if (!jobId || !planType) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: jobId, planType' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Get job information from database
    const { data: job, error: jobError } = await supabaseClient
      .from('jobs')
      .select('title, company_name')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get or create the user's Stripe customer
    let customerId: string;
    
    // Check if user already has a Stripe customer ID in our database
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('preferences')
      .eq('id', user.id)
      .single();

    if (profile?.preferences?.stripeCustomerId) {
      customerId = profile.preferences.stripeCustomerId;
    } else {
      // Get user profile information
      const { data: userProfile } = await supabaseClient
        .from('profiles')
        .select('email, first_name, last_name')
        .eq('id', user.id)
        .single();

      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: userProfile?.email || user.email,
        name: userProfile?.first_name && userProfile?.last_name 
          ? `${userProfile.first_name} ${userProfile.last_name}` 
          : undefined,
        metadata: {
          supabaseUserId: user.id
        }
      });
      
      customerId = customer.id;
      
      // Save the Stripe customer ID to the user profile
      await supabaseClient
        .from('profiles')
        .update({ 
          preferences: { 
            ...profile?.preferences,
            stripeCustomerId: customerId 
          } 
        })
        .eq('id', user.id);
    }

    // Set up product info based on plan type
    const productInfo = {
      premium_post: {
        name: 'Premium Job Post',
        description: `Premium visibility for: ${job.title} at ${job.company_name}`,
        price: 2500, // $25.00
      },
      premium_analytics_post: {
        name: 'Premium Post + Analytics',
        description: `Premium visibility and analytics for: ${job.title} at ${job.company_name}`,
        price: 5000, // $50.00
      }
    }[planType];

    if (!productInfo) {
      return new Response(
        JSON.stringify({ error: 'Invalid plan type' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productInfo.name,
              description: productInfo.description,
            },
            unit_amount: productInfo.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}&job_id=${jobId}&plan=${planType}`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        jobId,
        planType,
        userId: user.id,
      },
    });

    // Return the URL to the Stripe checkout page
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
