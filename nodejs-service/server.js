const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Update URLs if needed for local cross-container testing later,
// but for local host machine testing, we'll use your local IP or 'host.docker.internal'
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://host.docker.internal:5002/api/python';
const DOTNET_SERVICE_URL = process.env.DOTNET_SERVICE_URL || 'http://host.docker.internal:5001/weatherforecast';

app.get('/api/dashboard', async (req, res) => {
    try {
        // Call both microservices concurrently
        const [pythonResponse, dotnetResponse] = await Promise.all([
            axios.get(PYTHON_SERVICE_URL).catch(err => ({ data: { error: `Python service unreachable: ${err.message}` } })),
            axios.get(DOTNET_SERVICE_URL).catch(err => ({ data: { error: `.NET service unreachable: ${err.message}` } }))
        ]);

        // Combine the payloads to serve to the client
        res.json({
            gateway: "Hello from Node.js Express Gateway!",
            pythonServiceData: pythonResponse.data,
            dotnetServiceData: dotnetResponse.data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: "Gateway failed to aggregate service responses", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Node.js Gateway running on http://0.0.0.0:${PORT}`);
});