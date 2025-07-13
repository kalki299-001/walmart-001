export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          quantity: number
          stream_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          quantity?: number
          stream_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          quantity?: number
          stream_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          avatar_url: string | null
          avg_engagement_rate: number | null
          created_at: string | null
          followers_count: number | null
          id: string
          is_verified: boolean | null
          name: string
          top_categories: string[] | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          avg_engagement_rate?: number | null
          created_at?: string | null
          followers_count?: number | null
          id?: string
          is_verified?: boolean | null
          name: string
          top_categories?: string[] | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          avg_engagement_rate?: number | null
          created_at?: string | null
          followers_count?: number | null
          id?: string
          is_verified?: boolean | null
          name?: string
          top_categories?: string[] | null
          username?: string | null
        }
        Relationships: []
      }
      following: {
        Row: {
          created_at: string | null
          creator_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "following_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          attributes: Json | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          name: string
          original_price: number | null
          price: number
          sku: string | null
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          attributes?: Json | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          name: string
          original_price?: number | null
          price: number
          sku?: string | null
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          attributes?: Json | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          name?: string
          original_price?: number | null
          price?: number
          sku?: string | null
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      streams: {
        Row: {
          attributes: Json | null
          avg_watch_time: number | null
          category: string
          click_through_rate: number | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          end_time: string | null
          id: string
          is_live: boolean | null
          likes_count: number | null
          original_price: number | null
          peak_viewers: number | null
          price: number
          product_id: string | null
          product_name: string
          sku: string | null
          start_time: string | null
          status: string | null
          stock: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          trending_score: number | null
          video_url: string | null
          viewers_count: number | null
        }
        Insert: {
          attributes?: Json | null
          avg_watch_time?: number | null
          category: string
          click_through_rate?: number | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          is_live?: boolean | null
          likes_count?: number | null
          original_price?: number | null
          peak_viewers?: number | null
          price: number
          product_id?: string | null
          product_name: string
          sku?: string | null
          start_time?: string | null
          status?: string | null
          stock?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          trending_score?: number | null
          video_url?: string | null
          viewers_count?: number | null
        }
        Update: {
          attributes?: Json | null
          avg_watch_time?: number | null
          category?: string
          click_through_rate?: number | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          is_live?: boolean | null
          likes_count?: number | null
          original_price?: number | null
          peak_viewers?: number | null
          price?: number
          product_id?: string | null
          product_name?: string
          sku?: string | null
          start_time?: string | null
          status?: string | null
          stock?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          trending_score?: number | null
          video_url?: string | null
          viewers_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "streams_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "streams_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          action: string
          created_at: string
          device_type: string | null
          id: string
          session_data: Json | null
          stream_id: string | null
          timestamp: string | null
          user_id: string
          watch_duration: number | null
        }
        Insert: {
          action: string
          created_at?: string
          device_type?: string | null
          id?: string
          session_data?: Json | null
          stream_id?: string | null
          timestamp?: string | null
          user_id: string
          watch_duration?: number | null
        }
        Update: {
          action?: string
          created_at?: string
          device_type?: string | null
          id?: string
          session_data?: Json | null
          stream_id?: string | null
          timestamp?: string | null
          user_id?: string
          watch_duration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          created_at: string | null
          id: string
          stream_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stream_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stream_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
