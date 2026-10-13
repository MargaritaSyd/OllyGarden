import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0?pin=v135';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface QuizLeadRequest {
  name: string;
  email: string;
  company?: string;
  score: number;
  totalQuestions: number;
  topicScores?: Record<string, { correct: number; total: number }>;
}

serve(async (req: Request) => {
  console.log('send-quiz-lead-email function called');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      company,
      score,
      totalQuestions,
      topicScores,
    }: QuizLeadRequest = await req.json();

    if (!name || !email || score === undefined) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and score are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const topicBreakdown = topicScores
      ? Object.entries(topicScores)
          .map(
            ([topic, s]) =>
              `<li><strong>${topic}:</strong> ${s.correct}/${s.total}</li>`
          )
          .join('')
      : '';

    const emailResponse = await resend.emails.send({
      from: 'OllyGarden Quiz <quiz@olly.garden>',
      to: ['contact@olly.garden'],
      subject: `New Quiz Lead: ${score}/${totalQuestions} - ${name}`,
      html: `
        <h2>New OTel Quiz Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Score:</strong> ${score}/${totalQuestions}</p>
        ${topicBreakdown ? `<p><strong>Topic Breakdown:</strong></p><ul>${topicBreakdown}</ul>` : ''}
        <hr />
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log('Email sent successfully:', emailResponse.data?.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
