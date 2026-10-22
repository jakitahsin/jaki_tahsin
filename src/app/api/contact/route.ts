import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if an external email delivery API is configured (e.g., RESEND_API_KEY)
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      // If Resend key is provided in production, send real email:
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Inquiry <onboarding@resend.dev>",
            to: ["jakitahsin@gmail.com"],
            reply_to: data.email,
            subject: `[Portfolio Inquiry] ${data.service} — ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nService: ${data.service}\nBudget: ${data.budget || "N/A"}\nTimeline: ${data.timeline || "N/A"}\n\nMessage:\n${data.message}`,
          }),
        });
        return NextResponse.json({
          success: true,
          mode: "delivered",
          message: "Your inquiry has been successfully sent to jakitahsin@gmail.com.",
        });
      } catch (err: unknown) {
        console.error("Resend delivery failed:", err);
      }
    }

    // Default transparent response when no external mail delivery key is provisioned:
    return NextResponse.json({
      success: true,
      mode: "validated",
      message:
        "Inquiry validated. You can also send this directly via your email app to ensure instant delivery.",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload." },
      { status: 500 }
    );
  }
}
