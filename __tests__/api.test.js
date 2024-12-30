import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import contactHandler from "../api/contact.js";
import newLeadHandler from "../api/newlead.js";

// Mock nodemailer with local credentials
jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((mailOptions) => {
      // Validate email data
      if (!mailOptions.to || !mailOptions.text || !mailOptions.subject) {
        return Promise.reject(new Error("Invalid email data"));
      }
      return Promise.resolve({
        messageId: "test-id",
        response: "250 Message accepted",
      });
    }),
  }),
}));

const app = express();
app.use(express.json());
app.post("/api/contact", contactHandler);
app.post("/api/newlead", newLeadHandler);

describe("API Endpoints Tests", () => {
  const validData = {
    name: "Test User",
    email: "test@example.com",
    message: "Test message",
  };

  describe("Contact Endpoint", () => {
    test("should successfully send contact email", async () => {
      const response = await request(app).post("/api/contact").send(validData);
      expect(response.status).toBe(200);
    });

    // test("should fail with invalid data", async () => {
    //   const response = await request(app).post("/api/contact").send({});
    //   expect(response.status).toBe(500);
    // });
  });

  describe("New Lead Endpoint", () => {
    test("should successfully create new lead", async () => {
      const response = await request(app).post("/api/newlead").send(validData);
      expect(response.status).toBe(200);
    });

    // test("should fail with invalid data", async () => {
    //   const response = await request(app).post("/api/newlead").send({});
    //   expect(response.status).toBe(500);
    // });
  });
});
