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

    // Використовуємо fetchUrl без ключа в URL. Ключ API для безпеки краще передавати в заголовках, але для простоти Render ми залишаємо його в URL
    const fetchUrl = `${apiUrl}?key=${apiKey}`;

    // 2.2. Запит до Gemini API
    const aiResponse = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 2.3. Посилена обробка помилок Google API
    if (!aiResponse.ok) {
      // !!! КРИТИЧНА ЗМІНА: ПЕРЕВІРКА ТА ЛОГУВАННЯ
      let errorText;
      try {
        // Спробуємо прочитати JSON помилку (стандартний формат для Google API)
        errorText = await aiResponse.json();
        errorText = JSON.stringify(errorText, null, 2);
      } catch (jsonError) {
        // Якщо не JSON, читаємо як простий текст
        errorText = await aiResponse.text();
      }

      // Логуємо повний статус і текст помилки в Render Logs
      let errorMessage = `Google API повернув статус ${aiResponse.status}. Деталі: ${errorText}`;
      console.error("GOOGLE API CRITICAL FAILURE:", errorMessage);

      // Повертаємо загальну помилку клієнту
      return res.status(502).json({
        error: `Помилка обробки запиту до AI. Перевірте логі Render (Статус: ${aiResponse.status}).`,
        details:
          "Ймовірна проблема з API-ключем або URL. Дивіться логи для детальної помилки Google.",
      });
    }

    // 2.4. Обробка успішної відповіді
    const result = await aiResponse.json();

    // 2.5. Перевірка, чи Gemini надав відповідь
    const responseText =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI не надав відповіді.";

    // 2.6. Успішна відповідь клієнту
    return res.json({ response: responseText });
  } catch (e) {
    // 2.7. КРИТИЧНИЙ ЗБІЙ: Обробка будь-яких інших мережевих помилок або збоїв сервера
    console.error("Критична мережева помилка або збій сервера:", e);

    // Це гарантує, що ми завжди повертаємо JSON
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
