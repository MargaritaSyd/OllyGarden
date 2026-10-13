import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const handler = async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const { name, email, company_name } = await req.json();
    // Validate inputs
    if (!name || !email) {
      return new Response(JSON.stringify({
        error: "Name and email are required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    // Send email notification to admin
    const emailResponse = await resend.emails.send({
      from: "OllyGarden Website <contact@olly.garden>",
      to: [
        "contact@olly.garden"
      ],
      subject: "New WaitlistSubmission",
      html: `
        <h2>New waitlist Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company_name}</p>
        
      `
    });
    console.log("Email sent successfully:", emailResponse);
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error("Error sending waitlist email:", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};
serve(handler);
