export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _encrypted_data: {
        Row: {
          created_at: string | null
          encrypted_value: string
          id: string
          original_value: string
        }
        Insert: {
          created_at?: string | null
          encrypted_value: string
          id?: string
          original_value: string
        }
        Update: {
          created_at?: string | null
          encrypted_value?: string
          id?: string
          original_value?: string
        }
        Relationships: []
      }
      application_metrics: {
        Row: {
          average_skill_match: number | null
          cost_per_hire: number | null
          created_at: string | null
          diversity_change_percent: number | null
          employer_id: string
          id: string
          industry_benchmark_diff: number | null
          total_applications: number | null
          total_hires: number | null
          total_interviews: number | null
          updated_at: string | null
        }
        Insert: {
          average_skill_match?: number | null
          cost_per_hire?: number | null
          created_at?: string | null
          diversity_change_percent?: number | null
          employer_id: string
          id?: string
          industry_benchmark_diff?: number | null
          total_applications?: number | null
          total_hires?: number | null
          total_interviews?: number | null
          updated_at?: string | null
        }
        Update: {
          average_skill_match?: number | null
          cost_per_hire?: number | null
          created_at?: string | null
          diversity_change_percent?: number | null
          employer_id?: string
          id?: string
          industry_benchmark_diff?: number | null
          total_applications?: number | null
          total_hires?: number | null
          total_interviews?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      apprenticeship_programs: {
        Row: {
          compensation: string | null
          created_at: string
          description: string | null
          duration: string | null
          employer_id: string
          id: string
          is_active: boolean | null
          requirements: string[] | null
          skills_taught: string[] | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          compensation?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          employer_id: string
          id?: string
          is_active?: boolean | null
          requirements?: string[] | null
          skills_taught?: string[] | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          compensation?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          employer_id?: string
          id?: string
          is_active?: boolean | null
          requirements?: string[] | null
          skills_taught?: string[] | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      badge_definitions: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      candidate_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          job_id: string | null
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          job_id?: string | null
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          job_id?: string | null
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_messages_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      career_events: {
        Row: {
          created_at: string
          description: string | null
          employer_id: string
          event_date: string
          id: string
          is_virtual: boolean | null
          location: string | null
          max_participants: number | null
          meeting_link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          employer_id: string
          event_date: string
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_participants?: number | null
          meeting_link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          employer_id?: string
          event_date?: string
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_participants?: number | null
          meeting_link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          benefits: string[] | null
          company_name: string
          company_size: string | null
          created_at: string
          culture_description: string | null
          description: string | null
          id: string
          industry: string | null
          logo_url: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          benefits?: string[] | null
          company_name: string
          company_size?: string | null
          created_at?: string
          culture_description?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          benefits?: string[] | null
          company_name?: string
          company_size?: string | null
          created_at?: string
          culture_description?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations_with_participants_view"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message: string | null
          last_message_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      employer_endorsements: {
        Row: {
          badge_ids: string[]
          created_at: string
          employer_id: string
          endorsement_text: string
          id: string
          student_id: string
        }
        Insert: {
          badge_ids: string[]
          created_at?: string
          employer_id: string
          endorsement_text: string
          id?: string
          student_id: string
        }
        Update: {
          badge_ids?: string[]
          created_at?: string
          employer_id?: string
          endorsement_text?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_endorsements_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_endorsements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_verifications: {
        Row: {
          address: string
          auto_verification_status: Json | null
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          ein: string
          hours_per_week: number
          id: string
          job_description: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          safety_pledge_accepted: boolean
          status: string
          updated_at: string
          wage_range_max: number
          wage_range_min: number
          website: string | null
          workers_comp_expiry_date: string
          workers_comp_policy_number: string
          workers_comp_provider: string
        }
        Insert: {
          address: string
          auto_verification_status?: Json | null
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          ein: string
          hours_per_week: number
          id?: string
          job_description: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          safety_pledge_accepted?: boolean
          status?: string
          updated_at?: string
          wage_range_max: number
          wage_range_min: number
          website?: string | null
          workers_comp_expiry_date: string
          workers_comp_policy_number: string
          workers_comp_provider: string
        }
        Update: {
          address?: string
          auto_verification_status?: Json | null
          company_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          ein?: string
          hours_per_week?: number
          id?: string
          job_description?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          safety_pledge_accepted?: boolean
          status?: string
          updated_at?: string
          wage_range_max?: number
          wage_range_min?: number
          website?: string | null
          workers_comp_expiry_date?: string
          workers_comp_policy_number?: string
          workers_comp_provider?: string
        }
        Relationships: []
      }
      interviews: {
        Row: {
          candidate_id: string
          created_at: string
          duration: number | null
          employer_id: string
          id: string
          job_id: string
          meeting_link: string | null
          notes: string | null
          scheduled_time: string
          status: string | null
          updated_at: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          duration?: number | null
          employer_id: string
          id?: string
          job_id: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_time: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          duration?: number | null
          employer_id?: string
          id?: string
          job_id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_time?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_date: string
          company: string
          contact_email: string | null
          contact_name: string | null
          created_at: string
          id: string
          job_id: string
          job_title: string
          next_step: string | null
          next_step_date: string | null
          notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_date: string
          company: string
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string
          id?: string
          job_id: string
          job_title: string
          next_step?: string | null
          next_step_date?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_date?: string
          company?: string
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string
          id?: string
          job_id?: string
          job_title?: string
          next_step?: string | null
          next_step_date?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_recommendations: {
        Row: {
          created_at: string
          id: string
          job_id: string
          reason: string | null
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          reason?: string | null
          score: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          reason?: string | null
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      job_simulations: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty: string
          duration: string
          id: string
          requirements: string[] | null
          skills_gained: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty: string
          duration: string
          id?: string
          requirements?: string[] | null
          skills_gained?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty?: string
          duration?: string
          id?: string
          requirements?: string[] | null
          skills_gained?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company_name: string
          created_at: string
          description: string
          experience_level: string
          hours_per_week: number | null
          id: string
          is_featured: boolean | null
          is_flexible: boolean | null
          is_premium: boolean | null
          is_remote: boolean | null
          is_teen_appropriate: boolean | null
          job_type: string
          location_city: string
          location_state: string
          location_zip: string
          logo_url: string | null
          pay_rate_max: number
          pay_rate_min: number
          pay_rate_period: string
          posted_date: string
          prohibited_types:
            | Database["public"]["Enums"]["prohibited_job_type"][]
            | null
          requirements: string[]
          title: string
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description: string
          experience_level: string
          hours_per_week?: number | null
          id?: string
          is_featured?: boolean | null
          is_flexible?: boolean | null
          is_premium?: boolean | null
          is_remote?: boolean | null
          is_teen_appropriate?: boolean | null
          job_type: string
          location_city: string
          location_state: string
          location_zip: string
          logo_url?: string | null
          pay_rate_max: number
          pay_rate_min: number
          pay_rate_period: string
          posted_date?: string
          prohibited_types?:
            | Database["public"]["Enums"]["prohibited_job_type"][]
            | null
          requirements: string[]
          title: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string
          experience_level?: string
          hours_per_week?: number | null
          id?: string
          is_featured?: boolean | null
          is_flexible?: boolean | null
          is_premium?: boolean | null
          is_remote?: boolean | null
          is_teen_appropriate?: boolean | null
          job_type?: string
          location_city?: string
          location_state?: string
          location_zip?: string
          logo_url?: string | null
          pay_rate_max?: number
          pay_rate_min?: number
          pay_rate_period?: string
          posted_date?: string
          prohibited_types?:
            | Database["public"]["Enums"]["prohibited_job_type"][]
            | null
          requirements?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_approved: boolean | null
          is_read: boolean
          needs_moderation: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          is_read?: boolean
          needs_moderation?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          is_read?: boolean
          needs_moderation?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations_with_participants_view"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          account_notifications: boolean
          achievement_notifications: boolean
          application_notifications: boolean
          created_at: string
          email_notifications: boolean
          id: string
          job_notifications: boolean
          message_notifications: boolean
          push_notifications: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          account_notifications?: boolean
          achievement_notifications?: boolean
          application_notifications?: boolean
          created_at?: string
          email_notifications?: boolean
          id?: string
          job_notifications?: boolean
          message_notifications?: boolean
          push_notifications?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          account_notifications?: boolean
          achievement_notifications?: boolean
          application_notifications?: boolean
          created_at?: string
          email_notifications?: boolean
          id?: string
          job_notifications?: boolean
          message_notifications?: boolean
          push_notifications?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          metadata: Json | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          metadata?: Json | null
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          metadata?: Json | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_id: string | null
          id: string
          payment_id: string | null
          payment_method: string | null
          payment_status: string
          redemption_code_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          customer_id?: string | null
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string
          redemption_code_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id?: string | null
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string
          redemption_code_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_redemption_code_id_fkey"
            columns: ["redemption_code_id"]
            isOneToOne: false
            referencedRelation: "redemption_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_postings: {
        Row: {
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_trial: boolean | null
          job_id: string
          trial_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_trial?: boolean | null
          job_id: string
          trial_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_trial?: boolean | null
          job_id?: string
          trial_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      premium_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan_type: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          badges: Json | null
          bio: string | null
          company_name: string | null
          company_website: string | null
          contact_details_encrypted: string | null
          created_at: string
          email: string | null
          employer_verification_status: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          location: string | null
          preferences: Json | null
          redeemed_at: string | null
          redeemed_code: string | null
          resume_data_encrypted: string | null
          resume_url: string | null
          skills: string[] | null
          student_badges: Json
          updated_at: string
          user_type: string | null
          verification_notes: string | null
        }
        Insert: {
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          company_name?: string | null
          company_website?: string | null
          contact_details_encrypted?: string | null
          created_at?: string
          email?: string | null
          employer_verification_status?: string | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          preferences?: Json | null
          redeemed_at?: string | null
          redeemed_code?: string | null
          resume_data_encrypted?: string | null
          resume_url?: string | null
          skills?: string[] | null
          student_badges?: Json
          updated_at?: string
          user_type?: string | null
          verification_notes?: string | null
        }
        Update: {
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          company_name?: string | null
          company_website?: string | null
          contact_details_encrypted?: string | null
          created_at?: string
          email?: string | null
          employer_verification_status?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          preferences?: Json | null
          redeemed_at?: string | null
          redeemed_code?: string | null
          resume_data_encrypted?: string | null
          resume_url?: string | null
          skills?: string[] | null
          student_badges?: Json
          updated_at?: string
          user_type?: string | null
          verification_notes?: string | null
        }
        Relationships: []
      }
      redemption_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
          is_reusable: boolean | null
          school_id: string | null
          type: string
          used: boolean
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_reusable?: boolean | null
          school_id?: string | null
          type: string
          used?: boolean
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_reusable?: boolean | null
          school_id?: string | null
          type?: string
          used?: boolean
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redemption_codes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_reports: {
        Row: {
          created_at: string
          description: string
          employer_id: string | null
          id: string
          job_id: string | null
          report_type: string
          reporter_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          employer_id?: string | null
          id?: string
          job_id?: string | null
          report_type: string
          reporter_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          employer_id?: string | null
          id?: string
          job_id?: string | null
          report_type?: string
          reporter_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_jobs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          user_id?: string
        }
        Relationships: []
      }
      scheduled_emails: {
        Row: {
          amount: number
          code_type: string
          created_at: string
          expires_in_days: number
          id: string
          message: string
          recipients: string[]
          schedule_date: string
          status: string
          subject: string
        }
        Insert: {
          amount: number
          code_type: string
          created_at?: string
          expires_in_days: number
          id?: string
          message: string
          recipients: string[]
          schedule_date: string
          status?: string
          subject: string
        }
        Update: {
          amount?: number
          code_type?: string
          created_at?: string
          expires_in_days?: number
          id?: string
          message?: string
          recipients?: string[]
          schedule_date?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          featured_jobs: string[] | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          featured_jobs?: string[] | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          featured_jobs?: string[] | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      scraped_jobs: {
        Row: {
          company_name: string
          created_at: string
          description: string | null
          id: string
          is_verified: boolean
          job_type: string
          location_city: string
          location_state: string
          source_url: string | null
          title: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean
          job_type?: string
          location_city?: string
          location_state?: string
          source_url?: string | null
          title: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean
          job_type?: string
          location_city?: string
          location_state?: string
          source_url?: string | null
          title?: string
        }
        Relationships: []
      }
      simulation_credentials: {
        Row: {
          certificate_id: string
          id: string
          issue_date: string
          simulation_id: string
          user_id: string
        }
        Insert: {
          certificate_id: string
          id?: string
          issue_date?: string
          simulation_id: string
          user_id: string
        }
        Update: {
          certificate_id?: string
          id?: string
          issue_date?: string
          simulation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_credentials_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "job_simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_tasks: {
        Row: {
          content: Json
          created_at: string
          description: string
          id: string
          order_number: number
          simulation_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          description: string
          id?: string
          order_number: number
          simulation_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          description?: string
          id?: string
          order_number?: number
          simulation_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_tasks_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "job_simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_resources: {
        Row: {
          created_at: string
          description: string | null
          id: string
          resource_title: string
          resource_type: string
          resource_url: string
          skill_name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          resource_title: string
          resource_type: string
          resource_url: string
          skill_name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          resource_title?: string
          resource_type?: string
          resource_url?: string
          skill_name?: string
        }
        Relationships: []
      }
      stripe_events: {
        Row: {
          created_at: string
          data: Json
          event_type: string
          id: string
        }
        Insert: {
          created_at?: string
          data: Json
          event_type: string
          id: string
        }
        Update: {
          created_at?: string
          data?: Json
          event_type?: string
          id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_simulation_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          current_task_id: string | null
          id: string
          progress_percentage: number
          simulation_id: string
          started_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          current_task_id?: string | null
          id?: string
          progress_percentage?: number
          simulation_id: string
          started_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          current_task_id?: string | null
          id?: string
          progress_percentage?: number
          simulation_id?: string
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_simulation_progress_current_task_id_fkey"
            columns: ["current_task_id"]
            isOneToOne: false
            referencedRelation: "simulation_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_simulation_progress_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "job_simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          created_at: string
          id: string
          is_learning: boolean
          proficiency_level: number
          skill_name: string
          target_level: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_learning?: boolean
          proficiency_level?: number
          skill_name: string
          target_level?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_learning?: boolean
          proficiency_level?: number
          skill_name?: string
          target_level?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      conversations_with_participants_view: {
        Row: {
          created_at: string | null
          has_pending_moderation: boolean | null
          id: string | null
          last_message: string | null
          last_message_at: string | null
          last_read_at: string | null
          participant_avatar: string | null
          participant_id: string | null
          participant_name: string | null
          unread_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
      employer_job_counts: {
        Row: {
          avg_min_wage: number | null
          company_name: string | null
          job_count: number | null
          last_updated: string | null
        }
        Relationships: []
      }
      messages_for_moderation_view: {
        Row: {
          content: string | null
          conversation_id: string | null
          created_at: string | null
          id: string | null
          is_approved: boolean | null
          is_read: boolean | null
          needs_moderation: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string | null
          is_approved?: boolean | null
          is_read?: boolean | null
          needs_moderation?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string | null
          is_approved?: boolean | null
          is_read?: boolean | null
          needs_moderation?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations_with_participants_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      delete_redemption_code: {
        Args: { code_id: string }
        Returns: boolean
      }
      delete_redemption_codes: {
        Args: { code_ids: string[] }
        Returns: number
      }
      generate_job_recommendations: {
        Args: { user_id_param: string }
        Returns: undefined
      }
      has_role: {
        Args: { role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      update_all_user_recommendations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_employer_metrics: {
        Args: { employer_id_param: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      prohibited_job_type:
        | "commission_only"
        | "door_to_door_sales"
        | "hazardous_materials"
        | "heavy_machinery"
        | "construction"
        | "driving"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      prohibited_job_type: [
        "commission_only",
        "door_to_door_sales",
        "hazardous_materials",
        "heavy_machinery",
        "construction",
        "driving",
      ],
    },
  },
} as const
