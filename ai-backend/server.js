import express from "express";
import cors from "cors";

// Зчитування змінних середовища Render
const apiKey = process.env.AI_API_KEY;
const apiUrl = process.env.AI_API_URL;
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors()); // Дозволяємо CORS для всіх доменів

// 1. Маршрут перевірки стану
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Proxy Server працює!",
    endpoint: "/api/ai-query",
    method: "POST",
  });
});

// 2. Основний маршрут для запитів до AI
app.post("/api/ai-query", async (req, res) => {
  // 2.1. Перевірка конфігурації
  if (!apiKey || !apiUrl) {
    console.error("ERROR: AI API Key or URL is missing.");
    return res
      .status(500)
      .json({
        error: "Конфігурація сервера не повна. Перевірте змінні середовища.",
      });
  }

  const { prompt } = req.body;

  // Перевірка наявності запиту
  if (!prompt) {
    return res
      .status(400)
      .json({ error: "Будь ласка, надайте запит (prompt)." });
  }

  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const fetchUrl = `${apiUrl}?key=${apiKey}`;

    // 2.2. Запит до Gemini API
    const aiResponse = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 2.3. Посилена обробка помилок Google API
    if (!aiResponse.ok) {
      // Спроба прочитати тіло помилки, яке повертає Google
      let errorText = await aiResponse.text();

      // Якщо Google повернув помилку (наприклад, 400, 403), ми її логуємо і повертаємо клієнту
      let errorMessage = `Google API повернув статус ${aiResponse.status}. Деталі: ${errorText}`;
      console.error("Google API Failure:", errorMessage);

      // Повертаємо деталі помилки клієнту в JSON форматі
      return res.status(502).json({
        error: `Помилка обробки запиту до AI (Статус: ${aiResponse.status}). Ймовірна проблема з API-ключем або URL.`,
        details: errorMessage.substring(0, 200), // Обмежуємо для безпеки
      });
    }

    // 2.4. Обробка успішної відповіді
    const result = await aiResponse.json();
    const responseText =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI не надав відповіді.";

    // 2.5. Успішна відповідь клієнту
    return res.json({ response: responseText });
  } catch (e) {
    // 2.6. КРИТИЧНИЙ ЗБІЙ: Обробка будь-яких інших мережевих помилок або збоїв сервера
    console.error("Критична помилка обробки API-запиту:", e);

    // **Це гарантує, що ми завжди повертаємо JSON, уникаючи помилки 'Unexpected end of JSON input'**
    return res.status(500).json({
      error: `Внутрішня помилка сервера. Невдале з'єднання з Google API.`,
      details: e.message,
    });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`AI proxy server started on port ${port}`);
});
