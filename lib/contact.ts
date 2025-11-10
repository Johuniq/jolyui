"use server";

import getResend from "@/lib/get-resend";
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  message: z.string().min(1, "Message is required").max(1000),
});

interface ContactFormResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  prevState: ContactFormResult,
  formData: FormData
): Promise<ContactFormResult> {
  try {
    const rawData = {
      email: formData.get("email")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    console.log(rawData);
    // Validate the extracted data
    const validated = contactSchema.parse(rawData);

    const resend = getResend();

    // Send email using Resend
    await resend.emails.send({
      from: "Contact Form <contact@jolyui.com>",
      to: ["hi@jolyui.com"],
      subject: "New Contact Form Submission",
      text: `
Email: ${validated.email}
Message:
${validated.message}
      `.trim(),
    });

    return { success: true, error: "" };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return {
      success: false,
      error: "Failed to submit contact form. Please try again later.",
    };
  }
}
