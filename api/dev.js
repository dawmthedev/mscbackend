import express from "express";
import contactHandler from "./contact.js"; // Changed: Remove named import
import newLeadHandler from "./newlead.js"; // Changed: Remove named import
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.post("/api/contact", contactHandler);
app.post("/api/newlead", newLeadHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
