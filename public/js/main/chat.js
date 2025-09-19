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
  appendMessage('ИИ', data.text);
  userInput.value = '';
});

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.textContent = `${sender}: ${text}`;
  messages.appendChild(div);
}
