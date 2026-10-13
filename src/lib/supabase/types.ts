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
          cool_project: string | null;
          motivation: string | null;
          email: string;
          full_name: string;
          github_url: string | null;
          job_id: string;
          job_title: string;
          linkedin_url: string | null;
        };
        Insert: {
          cool_project?: string | null;
          motivation?: string | null;
          email: string;
          full_name: string;
          github_url?: string | null;
          job_id: string;
          job_title: string;
          linkedin_url?: string | null;
        };
        Update: {
          cool_project?: string | null;
          motivation?: string | null;
          email?: string;
          full_name?: string;
          github_url?: string | null;
          job_id?: string;
          job_title?: string;
          linkedin_url?: string | null;
        };
        Relationships: [];
      };
      rose_leads: {
        Row: {
          email: string;
          kind: string;
          name: string;
          notes: string | null;
        };
        Insert: {
          email: string;
          kind: string;
          name: string;
          notes?: string | null;
        };
        Update: {
          email?: string;
          kind?: string;
          name?: string;
          notes?: string | null;
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
