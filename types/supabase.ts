/* eslint-disable max-lines */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          created_at: string | null;
          formats_available: Database["public"]["Enums"]["book_format"][] | null;
          genres: string[] | null;
          id: string;
          isbn_10: number | null;
          isbn_13: number | null;
          publication: string | null;
          series_name: string | null;
          series_number: number | null;
          subtitle: string | null;
          title: string | null;
        };
        Insert: {
          created_at?: string | null;
          formats_available?: Database["public"]["Enums"]["book_format"][] | null;
          genres?: string[] | null;
          id?: string;
          isbn_10?: number | null;
          isbn_13?: number | null;
          publication?: string | null;
          series_name?: string | null;
          series_number?: number | null;
          subtitle?: string | null;
          title?: string | null;
        };
        Update: {
          created_at?: string | null;
          formats_available?: Database["public"]["Enums"]["book_format"][] | null;
          genres?: string[] | null;
          id?: string;
          isbn_10?: number | null;
          isbn_13?: number | null;
          publication?: string | null;
          series_name?: string | null;
          series_number?: number | null;
          subtitle?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      booksOwned: {
        Row: {
          acquisition_date: string | null;
          acquisition_store: string | null;
          acquisition_type: Database["public"]["Enums"]["book_acquisition_type"] | null;
          book_id: string | null;
          created_at: string;
          format: Database["public"]["Enums"]["book_format"] | null;
          id: string;
          notes: string | null;
          profile_id: string | null;
          rating: number | null;
          read_status: string | null;
          review: string | null;
        };
        Insert: {
          acquisition_date?: string | null;
          acquisition_store?: string | null;
          acquisition_type?: Database["public"]["Enums"]["book_acquisition_type"] | null;
          book_id?: string | null;
          created_at?: string;
          format?: Database["public"]["Enums"]["book_format"] | null;
          id?: string;
          notes?: string | null;
          profile_id?: string | null;
          rating?: number | null;
          read_status?: string | null;
          review?: string | null;
        };
        Update: {
          acquisition_date?: string | null;
          acquisition_store?: string | null;
          acquisition_type?: Database["public"]["Enums"]["book_acquisition_type"] | null;
          book_id?: string | null;
          created_at?: string;
          format?: Database["public"]["Enums"]["book_format"] | null;
          id?: string;
          notes?: string | null;
          profile_id?: string | null;
          rating?: number | null;
          read_status?: string | null;
          review?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "booksOwned_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booksOwned_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          approved: boolean;
          avatar_url: string | null;
          campaign: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          screen_name: string;
          updated_at: string | null;
        };
        Insert: {
          approved?: boolean;
          avatar_url?: string | null;
          campaign?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id: string;
          screen_name: string;
          updated_at?: string | null;
        };
        Update: {
          approved?: boolean;
          avatar_url?: string | null;
          campaign?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          screen_name?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      book_acquisition_type: "Purchased" | "Gifted";
      book_format: "Paperback" | "Hardcover" | "PDF" | "EPUB" | "Kindle" | "Audiobook";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
