import express from "express";
import handler from "./contact.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.post("/api/contact", handler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
