const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');

// Use express package for serving
const app = express();
const server = createServer(app);

// configure server
app.use(express.json());
app.use(cors()); // Use cors we can accept requests from chat.openai.com

// Serve static files from public directory
app.use('/plugin',express.static(path.join(__dirname, '../public/plugin')));
app.use('/.well-known', express.static(path.join(__dirname, '../public/.well-known')));

// Create GET /api/time endpoint
app.get('/api/time', (req, res) => {
    res.json({
        currentTime: new Date().toLocaleTimeString(),
        currentDate: new Date().toLocaleDateString(),
        currentTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
});

// Start server at port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});