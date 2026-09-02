export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          email: string;
          message: string | null;
          name: string;
        };
        Insert: {
          email: string;
          message?: string | null;
          name: string;
        };
        Update: {
          email?: string;
          message?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      job_applications: {
        Row: {
          email: string;
          full_name: string;
          github_url: string | null;
          job_id: string;
          job_title: string;
          linkedin_url: string | null;
        };
        Insert: {
          email: string;
          full_name: string;
          github_url?: string | null;
          job_id: string;
          job_title: string;
          linkedin_url?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string;
          github_url?: string | null;
          job_id?: string;
          job_title?: string;
          linkedin_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
