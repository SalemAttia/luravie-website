import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, productId, productName } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!productName) {
      return NextResponse.json(
        { error: "Product information is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Luravie Waitlist" <${process.env.SMTP_USER}>`,
      to: "support@luravie.com",
      subject: `[Waitlist] ${productName}`,
      text: [
        `New waitlist signup for: ${productName}`,
        `Product ID: ${productId || "N/A"}`,
        ``,
        `Customer Details:`,
        `Name: ${name || "Not provided"}`,
        `Phone / WhatsApp: ${phone}`,
        `Email: ${email || "Not provided"}`,
      ].join("\n"),
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Product ID:</strong> ${productId || "N/A"}</p>
        <hr />
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${name || "<em>Not provided</em>"}</p>
        <p><strong>Phone / WhatsApp:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "<em>Not provided</em>"}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Sent from the Luravie out-of-stock notification system.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: "api/notify-me" },
    });
    console.error("Notify-me form error:", error);
    return NextResponse.json(
      { error: "Failed to submit notification request" },
      { status: 500 }
    );
  }
}
