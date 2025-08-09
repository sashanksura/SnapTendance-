const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn('OPENAI_API_KEY not set. Server will still run but requests will fail.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const messages = req.body.messages || [{ role: 'user', content: 'Hello' }];
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-5',
      messages: messages
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    // Simplify the response for the mobile app
    const reply = response.data.choices && response.data.choices[0].message ? response.data.choices[0].message.content : JSON.stringify(response.data);
    res.json({ reply });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'proxy error', detail: err?.response?.data || err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on ${port}`));
