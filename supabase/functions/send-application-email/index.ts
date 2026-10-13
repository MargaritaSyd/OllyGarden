import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { applicationEmails } from "../_shared/email.ts";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const json = (body, status)=>new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders
    }
  });
const handler = async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const emails = applicationEmails(await req.json());
    if (!emails) {
      return json({
        error: "Missing required application data"
      }, 400);
    }
    // Send email notification to hiring team. Resend reports rejections in `error`, not by throwing.
    const { error: hiringError } = await resend.emails.send({
      from: "OllyGarden Careers <careers@olly.garden>",
      to: [
        "careers@olly.garden"
      ],
      ...emails.hiring
    });
    if (hiringError) {
      console.error("Garden application email rejected:", hiringError);
      return json({
        error: "Notification email was not sent"
      }, 502);
    }
    // Send confirmation email to applicant. The team already has the application, so a failure
    // here is logged without failing the request.
    const { error: confirmationError } = await resend.emails.send({
      from: "OllyGarden Careers <careers@olly.garden>",
      to: [
        emails.applicantEmail
      ],
      ...emails.confirmation
    });
    if (confirmationError) {
      console.error("Applicant confirmation email rejected:", confirmationError);
    }
    return json({
      success: true,
      confirmation: confirmationError ? "failed" : "sent"
    }, 200);
  } catch (error) {
    console.error("Error sending garden application email:", error);
    return json({
      error: "Notification email was not sent"
    }, 500);
  }
};
serve(handler);
