import express from "express";
import cors from "cors";

// Зчитування змінних середовища Render
const apiKey = process.env.AI_API_KEY; // Ваш ключ API для Gemini
const apiUrl = process.env.AI_API_URL; // URL API
const port = process.env.PORT;
const model = "gemini-2.5-flash-preview-09-2025"; // Модель, яку ви вказали

const app = express();
app.use(express.json());
app.use(cors()); // Дозволяємо CORS для всіх доменів

// *** СИСТЕМНА ІНСТРУКЦІЯ ТА КОНФІГУРАЦІЯ З VERTEX AI ***

const systemInstructionText = `### Роль
Ти репетитор з української мови, який готує учнів до НМТ (Національного мультипредметного тесту).

### Завдання
Твоя задача — генерувати тестові питання з української мови у форматі HTML. Кожне питання повинно мати 4 варіанти відповіді, лише один з яких є правильним, а також містити пояснення до відповіді.

Важливо: Твоя задача — генерувати лише статичний HTML-код для одного питання. Ти не створюєш повноцінний інтерактивний додаток. Функціональність кнопок (наприклад, перевірка відповіді, перехід до наступного питання) має бути реалізована окремо за допомогою JavaScript, що не входить у твою задачу.

### Специфікація формату HTML

Кожне питання повинно бути оформлене як HTML-фрагмент усередині контейнера \`<div class="question-container">\`. Правильна відповідь має бути вказана в атрибуті \`data-correct-answer\`.

Структура:
<div class="question-container" data-correct-answer="[літера правильної відповіді]">
  <p class="question-text">[Текст питання]</p>
  <div class="options">
    <label><input type="radio" name="question1" value="А"> А) [Варіант А]</label>
    <label><input type="radio" name="question1" value="Б"> Б) [Варіант Б]</label>
    <label><input type="radio" name="question1" value="В"> В) [Варіант В]</label>
    <label><input type="radio" name="question1" value="Г"> Г) [Варіант Г]</label>
  </div>
  <button class="explanation-button">Пояснення</button>
  <div class="explanation-text" style="display: none;">
    [Текст пояснення]
  </div>
</div>

### Інструкції
1. 	Згенеруй одне питання з української мови, що відповідає рівню НМТ.
2. 	Створи чотири варіанти відповіді (А, Б, В, Г), де тільки один є правильним.
3. 	Напиши коротке, але змістовне пояснення, чому обрана відповідь є правильною, а інші — ні.
4. 	Оформи все у вигляді єдиного HTML-блоку, суворо дотримуючись наведеної вище структури. 
`;

const generationConfig = {
  maxOutputTokens: 65535,
  temperature: 1,
  topP: 0.95,
  // Налаштування безпеки
  safetySettings: [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
  ],
  // Інструменти (залишаємо пустим, якщо не використовуєте Google Search)
  tools: [],
};

// 1. Маршрут перевірки стану
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Proxy Server працює!",
    endpoint: "/query",
    method: "POST",
  });
});

// 2. Основний маршрут для запитів до AI
app.post("/query", async (req, res) => {
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

  if (!prompt) {
    return res
      .status(400)
      .json({ error: "Будь ласка, надайте запит (prompt)." });
  }

  try {
    // Формуємо повний payload для API
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      config: generationConfig,
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
    };

    // Формуємо URL для API, включаючи модель
    const fetchUrl = `${apiUrl}/${model}:generateContent?key=${apiKey}`;

    // *** ДІАГНОСТИКА: ЛОГУВАННЯ ВИКОРИСТОВУВАНОГО URL ***
    console.log(`[DIAG] Sending request to: ${fetchUrl.substring(0, 80)}...`);
    console.log(`[DIAG] API Key presence: ${apiKey ? "Наявний" : "Відсутній"}`);
    // *** КІНЕЦЬ ДІАГНОСТИКИ ***

    // 2.2. Запит до Gemini API
    const aiResponse = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 2.3. Обробка помилок
    if (!aiResponse.ok) {
      // Читаємо тіло відповіді як текст ОДИН РАЗ
      const errorBodyRaw = await aiResponse.text();
      let errorText = errorBodyRaw;

      try {
        // Спробуємо розібрати його як JSON для детальної інформації
        const errorJson = JSON.parse(errorBodyRaw);
        errorText = JSON.stringify(errorJson, null, 2);
      } catch (parseError) {
        // Якщо не JSON, використовуємо сирий текст, який вже є у errorText
      }

      let errorMessage = `Google API повернув статус ${aiResponse.status}. Деталі: ${errorText}`;
      console.error("GOOGLE API CRITICAL FAILURE:", errorMessage);

      return res.status(502).json({
        error: `Помилка обробки запиту до AI. Перевірте логі Render (Статус: ${aiResponse.status}).`,
        details:
          "Ймовірна проблема з API-ключем або URL. Дивіться логі для детальної помилки Google.",
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
