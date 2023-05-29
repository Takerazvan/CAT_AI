import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

const app = express();
const port = process.env.PORT | 3001;

app.use(cors());
app.use(express.json());

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.userMessage;
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ aiMessage: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ aiMessage: "Failed to get response from AI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
