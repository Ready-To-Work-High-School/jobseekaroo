
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";
import Stripe from "https://esm.sh/stripe@13.6.0";

serve(async (req) => {
  try {
    // Get the stripe signature from the request headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "No signature provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the request body as text
    const body = await req.text();
    
    // Create a supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      // Use service role key for admin operations
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16"
    });

    // Create the Stripe webhook event
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET") ?? ""
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the event in the database for auditing purposes
    await supabaseAdmin.from("stripe_events").insert({
      id: event.id,
      event_type: event.type,
      data: event.data
    });

    // Handle specific event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      // Get the metadata from the session
      const { jobId, planType, userId, planId } = session.metadata;
      
      // Handle different subscription plans
      if (planId === "standard_monthly") {
        // For the $59/month Standard plan
        await supabaseAdmin
          .from("employer_subscriptions")
          .insert({
            user_id: userId,
            plan_type: "standard",
            posts_remaining: 5,
            is_active: true,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days later
          });
      } 
      else if (planId === "enterprise_analytics") {
        // For the $149/month Pro plan
        await supabaseAdmin
          .from("employer_subscriptions")
          .insert({
            user_id: userId,
            plan_type: "pro",
            is_active: true,
            is_featured_employer: true,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days later
          });
      }
      else if (planId && planId.startsWith("school_")) {
        // For school plans
        const isEnterprise = planId === "school_enterprise";
        const isPremium = planId === "school_premium";
        
        await supabaseAdmin
          .from("school_subscriptions")
          .insert({
            school_id: userId, // In this case userId would be schoolId
            plan_type: isEnterprise ? "enterprise" : (isPremium ? "premium" : "basic"),
            is_active: true,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year later
          });
      }
      else if (jobId && planType) {
        // For individual premium job posts
        await supabaseAdmin
          .from("jobs")
          .update({ 
            is_premium: true,
            is_featured: true,
            updated_at: new Date().toISOString()
          })
          .eq("id", jobId);
          
        // Insert a row in premium_postings table
        await supabaseAdmin
          .from("premium_postings")
          .insert({
            user_id: userId,
            job_id: jobId,
            is_featured: true,
            is_trial: false,
            updated_at: new Date().toISOString()
          });
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Error processing webhook" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
