import express from "express";
import axios from "axios";
import dotenv from "dotenv";

// 💡 КРОК 1: ЗАВАНТАЖЕННЯ ЗМІННИХ З .env
dotenv.config();

// 💡 КРОК 2: ЗЧИТУВАННЯ ЗМІННИХ ПІСЛЯ ЗАВАНТАЖЕННЯ
const apiKey = process.env.AI_API_KEY;
const apiUrl = process.env.AI_API_URL;

const app = express();
// 💡 ВИПРАВЛЕННЯ ДЛЯ RENDER: Використовуйте змінну середовища PORT, якщо вона є
// Render автоматично встановлює змінну process.env.PORT, яку ми маємо використовувати.
const port = process.env.PORT || 3001;

// --- Middlewares ---
app.use(express.json());

// 1. Налаштування CORS: Дозволити фронтенду звертатися до цього сервера
app.get("/", (req, res) => {
    res.json({ 
        status: "OK", 
        message: "AI Proxy Server працює!",
        endpoint: "/api/ai-query",
        method: "POST"
    });
});
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Proxy Server працює!",
    endpoint: "/api/ai-query",
    method: "POST",
  });
});

// --- Маршрут для запитів до ШІ ---
app.post("/api/ai-query", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Поле "prompt" є обов\'язковим.' });
  }

  // Додаткова перевірка
  if (!apiKey || !apiUrl) {
    console.error(
      "AI_API_KEY або AI_API_URL не завантажено. Перевірте файл .env."
    );
    return res
      .status(500)
      .json({
        success: false,
        error: "Конфігурація сервера не повна. Перевірте змінні середовища.",
      });
  }

  try {
    const geminiBody = {
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const finalUrl = `${apiUrl}?key=${apiKey}`;

    const aiResponse = await axios.post(finalUrl, geminiBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Обробка відповіді Gemini
    const aiText = aiResponse.data.candidates[0].content.parts[0].text;

    res.json({ success: true, response: aiText });
  } catch (error) {
    console.error(
      "error API aI:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      success: false,
      error: "Error processing request to AI",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// --- Запуск Сервера ---
app.listen(port, () => {
  // Тепер log покаже порт, який використовує Render (наприклад, 10000)
  console.log(`ai server started on http://localhost:${port}`);
});
