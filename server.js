import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dein Discord Webhook (sicher auf dem Server)
const webhookURL = "https://discord.com/api/webhooks/1436064711505477642/su1hhbIJMz_G9zTCvzaQLPrfNE8s9vX5riU5L0oMZeKbwoHcUu-JhkPF74hYCGbvkqbs";

app.post("/send-discord", async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).send("No content provided");

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `🚨 New Submission:\n\`\`\`${content}\`\`\`` })
    });
    res.status(200).send("Sent to Discord");
  } catch (err) {
    res.status(500).send("Failed to send");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
