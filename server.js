require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Fann AI backend" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "OPENAI_API_KEY belum diatur di file .env backend."
      });
    }

    const messages = req.body && req.body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Pesan chat tidak valid." });
    }

    const safeMessages = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-30)
      .map(m => ({ role: m.role, content: m.content.slice(0, 12000) }));

    if (!safeMessages.length) {
      return res.status(400).json({ error: "Tidak ada pesan yang bisa diproses." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [
          { role: "system", content: "Kamu adalah Fann AI, asisten yang ramah, membantu, jujur, dan menjawab dalam bahasa yang digunakan pengguna. Jika tidak tahu, katakan dengan jelas." },
          ...safeMessages
        ]
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.error?.message || `Penyedia AI mengembalikan status ${response.status}.`;
      return res.status(response.status === 429 ? 429 : 502).json({ error: message });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return res.status(502).json({ error: "Model AI tidak mengembalikan jawaban teks." });
    }
    res.json({ reply: reply.trim() });
  } catch (error) {
    console.error("Fann AI error:", error);
    res.status(500).json({ error: "Backend gagal memproses pesan. Periksa koneksi server." });
  }
});

app.listen(PORT, () => {
  console.log(`Fann AI berjalan di http://localhost:${PORT}`);
});
