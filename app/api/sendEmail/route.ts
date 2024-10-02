// app/api/sendEmail/route.js (for /app directory routing)
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, phone, comment } = await req.json();

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use your email provider or SMTP settings here
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or app-specific password
    },
    secure: true,
  });

  // Email options
  const mailOptions = {
    from: email, // Sender's email address
    to: "fatomoyeemmanuel1@gmail.com", // Recipient's email address
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nComment: ${comment}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    } else {
      console.error("Unknown error", error);
      alert("An unknown error occurred.");
    }
  }
}
