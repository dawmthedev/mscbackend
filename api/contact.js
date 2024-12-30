import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "metaswapcapital@gmail.com",
    pass: "yoca kizb nftx pqjh",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Serverless function handler
export default async function contactHandler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { firstName, lastName, email, message, source } = req.body;
    await transporter.sendMail({
      from: "metaswapcapital@gmail.com",
      to: ["fvaldovinos2000@gmail.com", "dominiqmartinez13@gmail.com"],
      subject: `New BTM Lead from ${firstName} ${lastName} - via Metaswapcapital.com`,
      html: `
       <h2>New Lead Details</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Source:</strong> ${source}</p>
      `,
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
