
document.addEventListener("DOMContentLoaded", () => {
  const promptInput = document.getElementById("ai-prompt");
  const sendButton = document.getElementById("send-button");
  const responseDiv = document.getElementById("ai-response");

  // Це URL вашого Node.js-сервера!
  const nodeJsServerUrl = "https://coach-ai-4oc0.onrender.com/api/ai-query";

  sendButton.addEventListener("click", async () => {
    const userPrompt = promptInput.value.trim();

    if (userPrompt === "") {
      responseDiv.textContent = "Будь ласка, введіть запит.";
      return;
    }

    // Відображення статусу завантаження
    responseDiv.textContent = "Обробка... ";
    sendButton.disabled = true;

    try {
      // Використання Fetch API для надсилання запиту до Node.js-сервера
      const response = await fetch(nodeJsServerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Успіх: Відображаємо відповідь від ШІ
        responseDiv.textContent = data.response;
      } else {
        // Помилка: Відображаємо повідомлення про помилку
        responseDiv.textContent = `Помилка: ${
          data.error || "Не вдалося отримати відповідь."
        }`;
      }
    } catch (error) {
      // Помилка мережі (Node.js сервер не запущений або недоступний)
      responseDiv.textContent =
        "Помилка підключення до сервера. Переконайтеся, що Node.js-сервер запущено на https://coach-ai-4oc0.onrender.com.";
      console.error("Помилка при з’єднанні з бек-ендом:", error);
    } finally {
      sendButton.disabled = false;
    }
  });
});
// Функція, яка викликається після отримання відповіді від бекенда
function displayBotResponse(htmlResponse) {
    const chatOutput = document.getElementById('chat-messages-area');
    
    // Створюємо новий елемент для повідомлення бота
    const newBubble = document.createElement('div');
    newBubble.className = 'message-bot';

    // *** СУТЬ РІШЕННЯ ***
    // Використовуємо innerHTML, щоб браузер обробив теги <h2>, <p> і т.д.
    newBubble.innerHTML = htmlResponse; 

    chatOutput.appendChild(newBubble);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Прокручуємо вниз
}

// Приклад виклику: 
// displayBotResponse("<h2>Ласкаво просимо!</h2><p>Це відповідь у HTML.</p>");