export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          github_url: string | null;
          role: string;
          plan: string | null;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          github_url?: string | null;
          role?: string;
          plan?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          github_url?: string | null;
          role?: string;
          plan?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          content_type: string;
          title: string;
          description: string;
          skill_md: string;
          preview_md: string | null;
          source_url: string | null;
          docs_url: string | null;
          tags: string[];
          category: string;
          difficulty: string;
          creator_id: string | null;
          listing_status: string;
          rejection_reason: string | null;
          upvotes: number;
          is_premium: boolean;
          price_cents: number | null;
          featured: boolean;
          copies_count: number;
          downloads_count: number;
          views_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content_type?: string;
          title: string;
          description: string;
          skill_md: string;
          preview_md?: string | null;
          source_url?: string | null;
          docs_url?: string | null;
          tags?: string[];
          category: string;
          difficulty: string;
          creator_id?: string | null;
          listing_status?: string;
          rejection_reason?: string | null;
          upvotes?: number;
          is_premium?: boolean;
          price_cents?: number | null;
          featured?: boolean;
          copies_count?: number;
          downloads_count?: number;
          views_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content_type?: string;
          title?: string;
          description?: string;
          skill_md?: string;
          preview_md?: string | null;
          source_url?: string | null;
          docs_url?: string | null;
          tags?: string[];
          category?: string;
          difficulty?: string;
          creator_id?: string | null;
          listing_status?: string;
          rejection_reason?: string | null;
          upvotes?: number;
          is_premium?: boolean;
          price_cents?: number | null;
          featured?: boolean;
          copies_count?: number;
          downloads_count?: number;
          views_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skills_creator_id_fkey";
            columns: ["creator_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_votes: {
        Row: {
          id: string;
          skill_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          skill_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          skill_id?: string;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skill_votes_skill_id_fkey";
            columns: ["skill_id"];
            referencedRelation: "skills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "skill_votes_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_reports: {
        Row: {
          id: string;
          skill_id: string;
          reported_by: string;
          reason: string;
          notes: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          skill_id: string;
          reported_by: string;
          reason: string;
          notes?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          skill_id?: string;
          reported_by?: string;
          reason?: string;
          notes?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skill_reports_skill_id_fkey";
            columns: ["skill_id"];
            referencedRelation: "skills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "skill_reports_reported_by_fkey";
            columns: ["reported_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          actor_user_id: string | null;
          entity_type: string;
          entity_id: string | null;
          action: string;
          metadata_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_user_id?: string | null;
          entity_type: string;
          entity_id?: string | null;
          action: string;
          metadata_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_user_id?: string | null;
          entity_type?: string;
          entity_id?: string | null;
          action?: string;
          metadata_json?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_user_id_fkey";
            columns: ["actor_user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      community_threads: {
        Row: {
          id: string;
          title: string;
          slug: string;
          author: string;
          role: string;
          summary: string;
          body: string;
          tags: string[];
          replies_count: number;
          likes_count: number;
          type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          author: string;
          role: string;
          summary: string;
          body: string;
          tags?: string[];
          replies_count?: number;
          likes_count?: number;
          type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          author?: string;
          role?: string;
          summary?: string;
          body?: string;
          tags?: string[];
          replies_count?: number;
          likes_count?: number;
          type?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      community_replies: {
        Row: {
          id: string;
          thread_id: string;
          author: string;
          role: string;
          body: string;
          likes_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          thread_id: string;
          author: string;
          role: string;
          body: string;
          likes_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          thread_id?: string;
          author?: string;
          role?: string;
          body?: string;
          likes_count?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_replies_thread_id_fkey";
            columns: ["thread_id"];
            referencedRelation: "community_threads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
