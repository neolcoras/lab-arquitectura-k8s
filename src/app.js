const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Kubernetes with Node.js!',
    hostname: os.hostname(),
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.get('/info', (req, res) => {
  res.json({
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Version: ${APP_VERSION}`);
});