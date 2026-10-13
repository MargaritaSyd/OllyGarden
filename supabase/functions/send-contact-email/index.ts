import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { contactEmail } from "../_shared/email.ts";
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
    // The message is optional on /contact, so only name and email are required here.
    const email = contactEmail(await req.json());
    if (!email) {
      return json({
        error: "Name and email are required"
      }, 400);
    }
    // Send email notification to admin. Resend reports rejections in `error`, not by throwing.
    const { error } = await resend.emails.send({
      from: "OllyGarden Website <contact@olly.garden>",
      to: [
        "contact@olly.garden"
      ],
      ...email
    });
    if (error) {
      console.error("Contact form email rejected:", error);
      return json({
        error: "Notification email was not sent"
      }, 502);
    }
    return json({
      success: true
    }, 200);
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return json({
      error: "Notification email was not sent"
    }, 500);
  }
};
serve(handler);
