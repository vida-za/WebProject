const { getIAMToken } = require("../yandexService.js");
require('dotenv').config();

const makeQuery = async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    try {
        const token = await getIAMToken();

        const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt-lite/latest`,
                completionOptions: {
                    stream: false,
                    temperature: 0.5,
                    maxTokens: 2000
                },
                messages: [
                    { role: 'system', text: 'Ты помощник, помоги' }, 
                    { role: 'user', text: message }
                ]
            })
        });

        const data = await response.json();
        console.error(data);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'OpenAI request failed' });
    }
};

module.exports = { makeQuery };