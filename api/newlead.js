import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

export default async function newLeadHandler(req, res) {
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

  const { firstName, lastName, email, message } = req.body;

  const mailOptions = {
    from: "metaswapcapital@gmail.com",
    to: ["fvaldovinos2000@gmail.com", "dominiqmartinez13@gmail.com"],
    subject: "New Lead Alert!",
    html: `
      <h2>New Lead Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Lead notification sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send lead notification" });
  }
}
