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
      jobs: {
        Row: {
          company_name: string
          created_at: string
          description: string
          experience_level: string
          id: string
          is_featured: boolean | null
          is_flexible: boolean | null
          is_remote: boolean | null
          job_type: string
          location_city: string
          location_state: string
          location_zip: string
          logo_url: string | null
          pay_rate_max: number
          pay_rate_min: number
          pay_rate_period: string
          posted_date: string
          requirements: string[]
          title: string
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description: string
          experience_level: string
          id?: string
          is_featured?: boolean | null
          is_flexible?: boolean | null
          is_remote?: boolean | null
          job_type: string
          location_city: string
          location_state: string
          location_zip: string
          logo_url?: string | null
          pay_rate_max: number
          pay_rate_min: number
          pay_rate_period: string
          posted_date?: string
          requirements: string[]
          title: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string
          experience_level?: string
          id?: string
          is_featured?: boolean | null
          is_flexible?: boolean | null
          is_remote?: boolean | null
          job_type?: string
          location_city?: string
          location_state?: string
          location_zip?: string
          logo_url?: string | null
          pay_rate_max?: number
          pay_rate_min?: number
          pay_rate_period?: string
          posted_date?: string
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
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          preferences: Json | null
          redeemed_at: string | null
          redeemed_code: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: string | null
          preferences?: Json | null
          redeemed_at?: string | null
          redeemed_code?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          preferences?: Json | null
          redeemed_at?: string | null
          redeemed_code?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_type?: string | null
        }
        Relationships: []
      }
      redemption_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
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
          type?: string
          used?: boolean
          used_at?: string | null
          used_by?: string | null
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
      messages_for_moderation_view: {
        Row: {
          content: string | null
          conversation_id: string | null
          created_at: string | null
          id: string | null
          is_approved: boolean | null
          needs_moderation: boolean | null
          receiver_avatar: string | null
          receiver_id: string | null
          receiver_name: string | null
          sender_avatar: string | null
          sender_id: string | null
          sender_name: string | null
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
        Args: {
          code_id: string
        }
        Returns: boolean
      }
      delete_redemption_codes: {
        Args: {
          code_ids: string[]
        }
        Returns: number
      }
      generate_job_recommendations: {
        Args: {
          user_id_param: string
        }
        Returns: undefined
      }
      update_all_user_recommendations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
