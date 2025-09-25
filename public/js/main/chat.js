const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');

sendBtn.addEventListener('click', async () => {
  const message = userInput.value;
  if (!message) return;

  appendMessage('Ты', message);

  const response = await fetch('/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  let reply = "Ошибка: нет ответа от ИИ"
  if (data.result && data.result.alternatives) {
    reply = data.result.alternatives[0].message.text;
  }

  appendMessage('ИИ', reply);
  userInput.value = '';
});

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.textContent = `${sender}: ${text}`;
  messages.appendChild(div);
}
