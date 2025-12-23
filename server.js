import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// WhatsApp API server URL
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'http://72.60.142.28:3000';

// Proxy API requests to WhatsApp server
app.use('/api', createProxyMiddleware({
  target: WHATSAPP_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Log proxy requests for debugging
    console.log(`[Proxy] ${req.method} ${req.url} -> ${WHATSAPP_API_URL}${req.url.replace('/api', '')}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`[Proxy] Response: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('[Proxy] Error:', err.message);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WhatsApp API proxy target: ${WHATSAPP_API_URL}`);
});
