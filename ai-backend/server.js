import express from "express";
import axios from "axios";
import dotenv from "dotenv"; // Імпортуємо модуль dotenv

// 💡 КРОК 1: ЗАВАНТАЖЕННЯ ЗМІННИХ З .env
// Викликаємо конфігурацію, щоб завантажити змінні
dotenv.config();

// 💡 КРОК 2: ЗЧИТУВАННЯ ЗМІННИХ ПІСЛЯ ЗАВАНТАЖЕННЯ
// Змінні process.env доступні після виклику dotenv.config()
const apiKey = process.env.AI_API_KEY;
const apiUrl = process.env.AI_API_URL;

const app = express();
const port = 3001; // Ваш порт для бек-енду

// --- Middlewares ---
app.use(express.json());

// 1. Налаштування CORS: Дозволити фронтенду звертатися до цього сервера
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
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
    return res.status(500).json({
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
  console.log(`ai server started on http://localhost:${port}`);
});
