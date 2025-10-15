const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3001; // Ваш порт для бек-енду

// --- Middlewares ---
app.use(express.json());

// 1. Налаштування CORS: Дозволити фронтенду звертатися до цього сервера
// У продакшені замініть '*' на домен вашого сайту (наприклад, 'https://mysite.com')
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

  try {
    const aiResponse = await axios.post(
      process.env.AI_API_URL,
      {
        // Тіло запиту API ШІ (залежить від API)
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      },
      {
        // Захищений заголовок з ключем
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
      }
    );

    // Обробка відповіді (залежить від API)
    const aiText = aiResponse.data.choices[0].message.content;

    res.json({ success: true, response: aiText });
  } catch (error) {
    console.error(
      "error API aI:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ success: false, error: "Error processing request to AI" });
  }
});

// --- Запуск Сервера ---
app.listen(port, () => {
  console.log(`ai server started on http://localhost:${port}`);
});
