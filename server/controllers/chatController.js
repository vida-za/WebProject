require('dotenv').config();

const makeQuery = async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    try {
        const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.YANDEX_IAM_KEY}`,
                'Content-Type': 'application/json',
                'x-folder-id': `${process.env.FOLDER_ID}`
            },
            body: JSON.stringify({
                modelUri: 'yandexgpt-lite/latest',
                temperature: 0.5,
                messages: [{ role: 'system', text: 'Ты помощник, помоги' }, { role: 'user', text: message }]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'OpenAI request failed' });
    }
};

module.exports = { makeQuery };