const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// ⚠️ 把下面引号里的内容，换成你刚刚在 DeepSeek 官网生成的【全新】API Key
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.deepseek.com/chat/completions', {
            model: 'deepseek-chat',
            messages: req.body.messages,
            stream: false
        }, {
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("API报错:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: '请求失败，请检查 API Key' });
    }
});

export default app;