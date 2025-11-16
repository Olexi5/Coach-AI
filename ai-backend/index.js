// import { GoogleGenAI } from "@google/genai";

// // Initialize Vertex with your Cloud project and location
// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_CLOUD_API_KEY,
// });
// const model = "gemini-2.5-flash-preview-09-2025";

// const siText1 = {
//   text: `### Роль
// Ти репетитор з української мови, який готує учнів до НМТ (Національного мультипредметного тесту).

// ### Завдання
// Твоя задача — генерувати тестові питання з української мови у форматі HTML. Кожне питання повинно мати 4 варіанти відповіді, лише один з яких є правильним, а також містити пояснення до відповіді.

// Важливо: Твоя задача — генерувати лише статичний HTML-код для одного питання. Ти не створюєш повноцінний інтерактивний додаток. Функціональність кнопок (наприклад, перевірка відповіді, перехід до наступного питання) має бути реалізована окремо за допомогою JavaScript, що не входить у твою задачу.

// ### Специфікація формату HTML

// Кожне питання повинно бути оформлене як HTML-фрагмент усередині контейнера \`<div class="question-container">\`. Правильна відповідь має бути вказана в атрибуті \`data-correct-answer\`.

// Структура:
// \`\`\`html
// <div class="question-container" data-correct-answer="[літера правильної відповіді]">
//   <p class="question-text">[Текст питання]</p>
//   <div class="options">
//     <label><input type="radio" name="question1" value="А"> А) [Варіант А]</label>
//     <label><input type="radio" name="question1" value="Б"> Б) [Варіант Б]</label>
//     <label><input type="radio" name="question1" value="В"> В) [Варіант В]</label>
//     <label><input type="radio" name="question1" value="Г"> Г) [Варіант Г]</label>
//   </div>
//   <button class="explanation-button">Пояснення</button>
//   <div class="explanation-text" style="display: none;">
//     [Текст пояснення]
//   </div>
// </div>
// \`\`\`

// ### Інструкції
//  1.  Згенеруй одне питання з української мови, що відповідає рівню НМТ.
// 2.  Створи чотири варіанти відповіді (А, Б, В, Г), де тільки один є правильним.
// 3.  Напиши коротке, але змістовне пояснення, чому обрана відповідь є правильною, а інші — ні.
// 4.  Оформи все у вигляді єдиного HTML-блоку, суворо дотримуючись наведеної вище структури. 

// ### Приклад

// **Питання:**

// У якому рядку всі слова є прислівниками?

// **Очікуваний HTML:**

// \`\`\`html
// <div class="question-container" data-correct-answer="В">
//   <p class="question-text">У якому рядку всі слова є прислівниками?</p>
//   <div class="options">
//     <label><input type="radio" name="question1" value="А"> А) Добре, сміливий, якісно</label>
//     <label><input type="radio" name="question1" value="Б"> Б) Вчора, тут, веселий</label>
//     <label><input type="radio" name="question1" value="В"> В) Напам'ять, взимку, спросоння</label>
//     <label><input type="radio" name="question1" value="Г"> Г) Радісно, зелений, вгорі</label>
//   </div>
//   <button class="explanation-button">Пояснення</button>
//   <div class="explanation-text" style="display: none;">
//     Правильна відповідь – В. У цьому рядку всі слова відповідають на питання «як?», «де?», «коли?» і є незмінними, що є ознакою прислівників. В інших рядках присутні прикметники (сміливий, веселий, зелений).
//   </div>
// </div>
// \`\`\``,
// };
// const tools = [];

// // Set up generation config
// const generationConfig = {
//   maxOutputTokens: 65535,
//   temperature: 1,
//   topP: 0.95,
//   safetySettings: [
//     {
//       category: "HARM_CATEGORY_HATE_SPEECH",
//       threshold: "OFF",
//     },
//     {
//       category: "HARM_CATEGORY_DANGEROUS_CONTENT",
//       threshold: "OFF",
//     },
//     {
//       category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
//       threshold: "OFF",
//     },
//     {
//       category: "HARM_CATEGORY_HARASSMENT",
//       threshold: "OFF",
//     },
//   ],
//   tools: tools,
//   systemInstruction: {
//     parts: [siText1],
//   },
// };

// const msg2Text1 = {
//   text: `**Beginning the Log Search**

// I'm starting by gathering the foundational knowledge: definitions, basic properties, and the common varieties of log equations. I'm focusing on the core concepts students need for the NMT. After this I'll be looking into the details of the most common solution methods.


// **Compiling Foundational Data**

// I've just refined the search parameters, focusing on elementary definitions, properties, and the standard equation types relevant to the NMT. My approach now includes seeking out solved examples to ensure clarity in my final presentation. Ultimately, I'm aiming for a clear HTML output suitable for this student audience.


// **Analyzing Logarithms Deeply**

// I've just reviewed the initial search results, clarifying the fundamental concepts. My focus now is on internalizing the definition, inverse relationship, and constraints. I'm moving toward a grasp of the different log types and the critical formulas; I'm keen to consolidate the basics before progressing further.


// **Planning the Equation Example**

// I'm synthesizing the foundational information, now concentrating on creating a practical example. The core definitions and properties are well-understood. I am moving towards finding a common logarithmic equation, focusing on the steps for solving it for the NMT. Refining the methodology is key.`,
// };
// const msg2Text2 = {
//   text: `Чудове питання! Логарифми для НМТ — це не страшно, це просто ще один математичний інструмент. Я поясню тобі все максимально просто, як для свого друга.

// Логарифм – це, по суті, **показник степеня**.

// Уяви:
// $$2^3 = 8$$
// Яке число ми піднесли до степеня, щоб отримати 8? Ми піднесли 2 до **третього** степеня.

// А ось логарифм просто записує цю ж думку інакше:
// $$\\log_2 8 = 3$$
// Читаємо: **Логарифм числа 8 за основою 2 дорівнює 3**.

// ### 1. Золоте правило логарифма (Означення)

// Запам'ятай цю схему, вона — ключ до всього:
// $$\\log_a b = x \\quad \\Longleftrightarrow \\quad a^x = b$$

// Де:
// *   **$a$** — **основа** (має бути $a > 0$ і $a \\neq 1$)
// *   **$b$** — **аргумент** (має бути $b > 0$)
// *   **$x$** — **логарифм** (саме число, показник степеня)

// **Область Допустимих Значень (ОДЗ):**
// Це найважливіше при розв'язуванні рівнянь! Завжди перевіряй, що:
// 1.  **Основа** $a > 0$ і $a \\neq 1$.
// 2.  **Аргумент** $b > 0$.

// ---

// ### 2. Властивості та Формули (Твій робочий інструмент)

// Щоб "розв'язати" логарифм, його часто треба спростити або перетворити. Для цього є кілька мегаважливих формул, які ти повинен знати як "Отче наш":

// | № | Назва | Формула | Приклад |
// | :---: | :---: | :--- | :--- |
// | **1** | **Основна логарифмічна тотожність** | $$a^{\\log_a b} = b$$ | $$5^{\\log_5 12} = 12$$ |
// | **2** | **Логарифм добутку** | $$\\log_a (b \\cdot c) = \\log_a b + \\log_a c$$ | $$\\log_2 (4 \\cdot 8) = \\log_2 4 + \\log_2 8 = 2 + 3 = 5$$ |
// | **3** | **Логарифм частки** | $$\\log_a \\left(\\frac{b}{c}\\right) = \\log_a b - \\log_a c$$ | $$\\log_3 \\left(\\frac{27}{9}\\right) = \\log_3 27 - \\log_3 9 = 3 - 2 = 1$$ |
// | **4** | **Логарифм степеня** | $$\\log_a b^p = p \\cdot \\log_a b$$ | $$\\log_2 8^5 = 5 \\cdot \\log_2 8 = 5 \\cdot 3 = 15$$ |
// | **5** | **Формула переходу до нової основи** | $$\\log_a b = \\frac{\\log_c b}{\\log_c a}$$ | $$\\log_8 4 = \\frac{\\log_2 4}{\\log_2 8} = \\frac{2}{3}$$ |
// | **6** | **Особливі випадки** | $$\\log_a a = 1$$ <br> $$\\log_a 1 = 0$$ | $$\\log_5 5 = 1$$ <br> $$\\log_{10} 1 = 0$$ |

// ---

// ### 3. Алгоритм розв'язання логарифмічних рівнянь

// Найчастіше на НМТ трапляються логарифмічні рівняння. Їх розв'язання завжди йде за чітким планом.

// #### Крок 1: Знайди ОДЗ
// Перевір аргумент логарифма: $b > 0$. Якщо аргумент містить $x$, випиши нерівність і розв'яжи її.
// *Наприклад: У $\\log_3(x-1) = 2$, ОДЗ: $x-1 > 0 \\implies x > 1$.*

// #### Крок 2: Перетвори рівняння
// Твоя мета — звести рівняння до найпростішого вигляду, використовуючи властивості:
// $$\\log_a f(x) = b \\quad \\text{або} \\quad \\log_a f(x) = \\log_a g(x)$$

// #### Крок 3: Розв'яжи за означенням (або методом потенціювання)
// *   **Якщо $\\log_a f(x) = b$:** застосуй означення логарифма:
//     $$f(x) = a^b$$
// *   **Якщо $\\log_a f(x) = \\log_a g(x)$:** прирівняй аргументи (оскільки основи однакові):
//     $$f(x) = g(x)$$

// #### Крок 4: Перевір корінь
// Обов'язково перевір, чи задовольняє знайдений $x$ умову ОДЗ з Кроку 1.

// ---

// ### 4. Приклад для НМТ (Розв'язуємо разом)

// Розв'язати рівняння: $$\\log_2 (x+3) + \\log_2 (x-1) = 5$$

// **Крок 1: ОДЗ**
// 1.  Аргумент першого логарифма: $x+3 > 0 \\implies x > -3$
// 2.  Аргумент другого логарифма: $x-1 > 0 \\implies x > 1$
// Спільна ОДЗ (має виконуватися обидві умови): $x > 1$.

// **Крок 2: Перетвори рівняння**
// Використовуємо властивість логарифма добутку ($\\log_a b + \\log_a c = \\log_a (b \\cdot c)$):
// $$\\log_2 ((x+3)(x-1)) = 5$$

// **Крок 3: Розв'яжи за означенням**
// Переходимо від логарифма до степеня ($a^x = b$):
// $$(x+3)(x-1) = 2^5$$
// $$x^2 - x + 3x - 3 = 32$$
// $$x^2 + 2x - 35 = 0$$

// Розв'язуємо квадратне рівняння (наприклад, за теоремою Вієта):
// $$x_1 = 5, \\quad x_2 = -7$$

// **Крок 4: Перевір корінь**
// ОДЗ: $x > 1$.
// *   $x_1 = 5$: $5 > 1$ — **підходить**.
// *   $x_2 = -7$: $-7 > 1$ — **не підходить** (сторонній корінь).

// **Відповідь:** $x = 5$.

// <p style="text-align:center; padding: 10px; border: 1px solid #0056b3; background-color: #e6f0ff; border-radius: 5px;">
//     <strong>Твоя суперсила:</strong> Пам'ятай про ОДЗ і правильно застосовуй властивості. Успіхів на НМТ!
// </p>`,
// };
// const msg4Text1 = {
//   text: `**Defining the Approach**

// I've started by zeroing in on the user's explicit request – "How to solve a quadratic equation." My focus has then shifted towards understanding the context; I've identified the student's need for guidance as the primary factor. Now, I am evaluating how to best structure the solution for optimal clarity.


// **Structuring the Response**

// I'm now mapping out the structure of the HTML response. I'm focusing on the "how-to" aspect, ensuring a clear, step-by-step guide. The Discriminant method takes priority, followed by Vieta's Theorem, and special cases. I'm aiming for an encouraging tone, keeping in mind the NMT preparation.


// **Detailing the Steps**

// I'm deep in the process of translating the core content into HTML and LaTeX. Focusing now on the Discriminant section, making sure the formulas are correctly formatted and rendered. My objective is to create a response that is visually clear and easy to follow. Each step is detailed, using understandable language. Then I will focus on Vieta's Theorem.


// **Formulating the HTML**

// I'm now carefully transcribing the content into HTML, giving priority to creating the structure. I'm focusing on the overall flow, starting with the Discriminant, followed by Vieta's Theorem, and then covering incomplete equations, all in a friendly, helpful tone. I am now incorporating the LaTeX for correct formula rendering.`,
// };
// const msg4Text2 = {
//   text: `Це взагалі не проблема! Квадратні рівняння — це "класика жанру" на НМТ, і якщо ти знаєш три основні методи, ти їх "зробиш" швидко і легко.

// Ось твій покроковий гайд, як розв'язати будь-яке квадратне рівняння.

// ### 1. Стандартний вигляд

// Спочатку переконайся, що рівняння має стандартний вигляд:
// $$\\mathbf{ax^2 + bx + c = 0}$$
// Де:
// *   $\\mathbf{a}$ — коефіцієнт при $x^2$ (має бути $\\neq 0$).
// *   $\\mathbf{b}$ — коефіцієнт при $x$.
// *   $\\mathbf{c}$ — вільний член.

// <hr>

// ### 2. Метод 1: Дискримінант (Універсальний солдатик)

// Це **золоте правило**, яке працює завжди і для будь-якого рівняння.

// #### Крок 1: Обчисли Дискримінант ($\\mathbf{D}$)
// $$D = b^2 - 4ac$$

// #### Крок 2: Визнач кількість коренів (Це найважливіше!)

// | Умова | Результат | Що робити |
// | :---: | :--- | :--- |
// | $\\mathbf{D > 0}$ | Два різні корені | Переходимо до Кроку 3 |
// | $\\mathbf{D = 0}$ | Один корінь (або два однакові) | Переходимо до Кроку 3 (спрощеної формули) |
// | $\\mathbf{D < 0}$ | Жодного дійсного кореня | Відповідь: Розв'язків немає |

// #### Крок 3: Знайди корені

// Якщо $D \\ge 0$, використовуй формулу коренів:
// $$x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$$

// **Приклад:** Розв'язати $x^2 - 5x + 6 = 0$.
// *   $a = 1, b = -5, c = 6$.
// *   $D = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1$. ($D>0$, два корені).
// *   $x_{1,2} = \\frac{-(-5) \\pm \\sqrt{1}}{2 \\cdot 1} = \\frac{5 \\pm 1}{2}$.
//     *   $x_1 = \\frac{5+1}{2} = 3$.
//     *   $x_2 = \\frac{5-1}{2} = 2$.
//     *   **Відповідь: 2; 3.**

// <hr>

// ### 3. Метод 2: Теорема Вієта (Твій прискорювач для НМТ)

// Цей метод ідеально підходить для **зведених** квадратних рівнянь (коли $a=1$). Він дозволяє знайти корені без дискримінанта, просто підбором.

// Для рівняння вигляду $x^2 + px + q = 0$ (де $p = b/a$ і $q = c/a$):
// $$\\begin{cases} x_1 + x_2 = -p \\\\ x_1 \\cdot x_2 = q \\end{cases}$$

// **Приклад (той самий):** Розв'язати $x^2 - 5x + 6 = 0$.
// *   $p = -5$, $q = 6$.
// *   Сума коренів: $x_1 + x_2 = -(-5) = 5$.
// *   Добуток коренів: $x_1 \\cdot x_2 = 6$.
// *   Шукаємо два числа, які в добутку дають 6, а в сумі 5. Це 2 і 3.
//     *   $2 \\cdot 3 = 6$.
//     *   $2 + 3 = 5$.
// *   **Відповідь: 2; 3.**

// <p style="padding: 8px; border: 1px solid #ffcc00; background-color: #fff8e1;">
//     <strong>ФІШКА НМТ:</strong> Якщо $a \\neq 1$, поділи все рівняння на $a$, і ти отримаєш зведене рівняння, до якого можна застосувати Вієта!
// </p>

// <hr>

// ### 4. Метод 3: Неповні квадратні рівняння (Найшвидший)

// Якщо один із коефіцієнтів $b$ або $c$ дорівнює нулю (але $a$ не дорівнює нулю), це називається **неповним** квадратним рівнянням. Воно розв'язується ще простіше, без формул!

// #### Випадок 1: Коли $c=0$ ($ax^2 + bx = 0$)
// Просто виносиш $x$ за дужки:
// $$\\mathbf{x(ax + b) = 0}$$
// Корені:
// 1.  **$x_1 = 0$**
// 2.  $ax + b = 0 \\implies \\mathbf{x_2 = -b/a}$

// *Приклад: $2x^2 - 8x = 0 \\implies 2x(x - 4) = 0$. Корені: $x=0$ та $x=4$.*

// #### Випадок 2: Коли $b=0$ ($ax^2 + c = 0$)
// Переносиш $c$ на інший бік і ділиш:
// $$\\mathbf{ax^2 = -c \\implies x^2 = -c/a}$$
// Корені:
// $$\\mathbf{x = \\pm \\sqrt{-c/a}}$$
// *(Важливо: цей випадок має розв'язки, тільки якщо $-c/a > 0$)*

// *Приклад: $3x^2 - 27 = 0 \\implies 3x^2 = 27 \\implies x^2 = 9$. Корені: $x = \\pm 3$.*

// <p style="text-align:center; padding: 10px; border: 1px solid #0056b3; background-color: #e6f0ff; border-radius: 5px;">
//     <strong>Резюме:</strong> Завжди починай із перевірки на Вієта (якщо $a=1$). Якщо не виходить, бери Дискримінант. Якщо це неповне рівняння, використовуй винесення за дужки або ізоляцію $x^2$. Ти впораєшся!
// </p>`,
// };
// const msg6Text1 = {
//   text: `Мене звати **Асистент Google**.

// Я твій віртуальний помічник та репетитор з підготовки до НМТ. Моя мета — пояснювати тобі складні теми (як-от логарифми чи квадратні рівняння) максимально простою та зрозумілою мовою.

// Звертайся до мене з будь-якими запитаннями щодо математики та підготовки!`,
// };
// const msg8Text1 = {
//   text: `Я – велика мовна модель, навчена компанією Google.

// У контексті нашого спілкування я виконую роль твого **репетитора** з підготовки до Національного мультипредметного тесту (НМТ).

// Мої функції:
// 1.  **Пояснення матеріалу:** Роз'яснюю математичні теми, формули та правила (наприклад, логарифми, квадратні рівняння).
// 2.  **Надання прикладів:** Демонструю, як застосовувати знання на практиці.
// 3.  **Структурування інформації:** Подаю відповіді у зручному форматі HTML, щоб тобі було легше запам'ятовувати ключові моменти.

// Я тут, щоб допомогти тобі ефективно підготуватися та успішно скласти НМТ!`,
// };

// const chat = ai.chats.create({
//   model: model,
//   config: generationConfig,
// });

// async function sendMessage(message) {
//   const response = await chat.sendMessageStream({
//     message: message,
//   });
//   process.stdout.write("stream result: ");
//   for await (const chunk of response) {
//     if (chunk.text) {
//       process.stdout.write(chunk.text);
//     } else {
//       process.stdout.write(JSON.stringify(chunk) + "\n");
//     }
//   }
// }

// async function generateContent() {
//   await sendMessage([{ text: `як розвєязати логарифми` }]);
//   await sendMessage([msg2Text1, msg2Text2]);
//   await sendMessage([{ text: `як розв'язати квадратне рівняння` }]);
//   await sendMessage([msg4Text1, msg4Text2]);
//   await sendMessage([{ text: `як тебе звати` }]);
//   await sendMessage([msg6Text1]);
//   await sendMessage([{ text: `хто ти` }]);
//   await sendMessage([msg8Text1]);
//   await sendMessage([
//     {
//       text: `Optimize for addressing more use cases, and generating better output.`,
//     },
//   ]);
// }

// generateContent();
