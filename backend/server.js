import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // Free model 
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";
    res.json({ text: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "LLM request failed." });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));