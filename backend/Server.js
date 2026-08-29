import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    console.log("Question received:", question);

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: question,
    });

    res.json({
      answer: response.text,
    });

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: "Failed to get response from Gemini",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});