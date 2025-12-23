# VPS WhatsApp API Update Instructions

## Step 1: SSH into VPS

```bash
ssh root@72.60.142.28
```

## Step 2: Install CORS Package

```bash
cd ~/whatsapp-api
npm install cors
```

## Step 3: Update app.js

Edit the file:
```bash
nano ~/whatsapp-api/app.js
```

### Add CORS at the top (after other requires):
```javascript
const cors = require("cors");
```

### Add CORS middleware (after `const app = express();`):
```javascript
// Enable CORS for your domain
app.use(cors({
    origin: ['https://gb.onav.com.br', 'http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST'],
    credentials: true
}));
```

### Add the /send-pdf endpoint (after the /send endpoint):
```javascript
// SEND PDF
app.post("/send-pdf", async (req, res) => {
    if (!clientReady)
        return res.status(503).json({ error: "Client not ready" });

    const { to, message, pdf, filename } = req.body;
    if (!to || !pdf)
        return res.status(400).json({ error: "to + pdf required" });

    try {
        const number = to.replace(/\D/g, "");
        const chatId = `${number}@c.us`;

        // Create MessageMedia from base64 PDF
        const media = new MessageMedia(
            'application/pdf',
            pdf,
            filename || 'document.pdf'
        );

        // Send message with caption if provided
        const caption = message || 'Documento PDF anexo';
        const result = await client.sendMessage(chatId, media, { caption });

        logger.info(`📄 PDF sent to ${number}: ${filename}`);
        res.json({ success: true, id: result.id._serialized, filename });
    } catch (err) {
        logger.error("Send PDF failed:", err);
        res.status(500).json({ error: "Failed to send PDF", details: err.message });
    }
});
```

Save the file (Ctrl+X, then Y, then Enter)

## Step 4: Restart the WhatsApp API

```bash
# If using PM2
pm2 restart whatsapp-api

# Or if running directly
# Stop the current process and restart:
node app.js
```

## Step 5: Verify

```bash
curl http://localhost:3000/status
```

You should see `"ready": true`

## Step 6: Test the endpoint

```bash
curl -X POST http://localhost:3000/send-pdf \
  -H "Content-Type: application/json" \
  -d '{"to": "5519981454647", "message": "Test", "pdf": "test", "filename": "test.pdf"}'
```

You should get an error about invalid PDF (which is fine - it means the endpoint exists)

---

## Alternative: Use Complete Updated File

Instead of manual edits, you can replace the entire file:

1. From your Windows machine, upload the updated file:
```bash
scp "D:\Propostas\Arrabal_GalvaoBueno\whatsapp-api-app-updated.js" root@72.60.142.28:~/whatsapp-api/app.js
```

2. SSH back in and restart:
```bash
ssh root@72.60.142.28
cd ~/whatsapp-api
pm2 restart whatsapp-api
```

---

## Troubleshooting

### Check if CORS is working:
```bash
curl -H "Origin: https://gb.onav.com.br" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://72.60.142.28:3000/send-pdf -v
```

Look for `Access-Control-Allow-Origin` in the response headers.

### Check logs:
```bash
tail -f ~/whatsapp-api/combined.log
```

### Check if WhatsApp is connected:
Visit: http://72.60.142.28:3000/qr

If you see a QR code, scan it with your WhatsApp.
