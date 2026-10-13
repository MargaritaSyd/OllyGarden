import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0?pin=v135';

// Initialize Resend client outside the handler like working examples
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface RoseLeadRequest {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

serve(async (req: Request) => {
  console.log('🚀 send-rose-lead-email function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: RoseLeadRequest = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: 'Name, email, and message are required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const emailResponse = await resend.emails.send({
      from: 'OllyGarden Rose <rose@olly.garden>',
      to: ['contact@olly.garden'],
      subject: 'New Rose Research Preview Lead',
      html: `
        <h2>New Rose Research Preview Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Instrumentation Details:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log('✅ Email sent successfully:', emailResponse.data?.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
