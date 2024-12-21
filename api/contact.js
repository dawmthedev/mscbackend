const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Construction@voltaicnow.com",
    pass: "@Voltaic2024!!",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const mailOptions = {
    from: "Construction@voltaicnow.com",
    to: ["info@mintair.co", "info@voltaicnow.com"],
    subject: `New HVAC Lead from ${firstName} ${lastName} - via Mintair.co`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = app;
