require('dotenv').config();

const makeQuery = async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Invalid response from OpenAI:', data);
            return res.status(500).json({ error: 'Invalid response from OpenAI', data });
        }

        res.json({ reply: data.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'OpenAI request failed' });
    }
};


const getModels = async (req, res) => {
    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const data = await response.json();
        console.error('Models:', data);

        res.json({ reply: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'OpenAI request models failed' });
    }
}

module.exports = { makeQuery, getModels };