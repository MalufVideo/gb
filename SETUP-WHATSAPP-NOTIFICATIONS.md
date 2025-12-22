# WhatsApp Invoice Notification Setup Guide

This guide will help you set up automatic WhatsApp notifications with PDF attachments when users generate invoices (Faturas de Locação).

## What's Been Done

1. **Frontend Updated** ✅
   - Installed `html2pdf.js` library for client-side PDF generation
   - Modified `components/FaturaLocacao.tsx` to generate PDFs from invoice HTML
   - Added automatic PDF sending when user submits the invoice form
   - PDF is sent to your WhatsApp number: **+55 19 98145-4647**

2. **Backend Ready** ✅
   - Created updated WhatsApp API code with `/send-pdf` endpoint
   - Added CORS support for better frontend integration
   - File ready: `whatsapp-api-app-updated.js`

## VPS Setup Instructions

### Step 1: Install CORS Package

SSH into your VPS and install the required package:

```bash
ssh root@72.60.142.28
cd ~/whatsapp-api
npm install cors
```

### Step 2: Update app.js

**Option A: Manual Update (Recommended)**

1. Edit your existing app.js:
```bash
nano ~/whatsapp-api/app.js
```

2. Add CORS support at the top (after other requires):
```javascript
const cors = require("cors");
```

3. Add CORS middleware (after `const app = express();`):
```javascript
app.use(cors());
```

4. Add the new `/send-pdf` endpoint (after the existing `/send` endpoint):
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

**Option B: Replace Entire File**

1. Backup your current app.js:
```bash
cp ~/whatsapp-api/app.js ~/whatsapp-api/app.js.backup
```

2. Upload the new file from `whatsapp-api-app-updated.js` to your VPS:
```bash
# From your local machine
scp D:\Propostas\Arrabal_GalvaoBueno\whatsapp-api-app-updated.js root@72.60.142.28:~/whatsapp-api/app.js
```

### Step 3: Restart WhatsApp API

```bash
# If using PM2 (recommended)
pm2 restart whatsapp-api

# OR if running directly with node
# Stop the current process (Ctrl+C if running in terminal)
# Then restart:
cd ~/whatsapp-api
node app.js
```

### Step 4: Verify It's Working

Check the status:
```bash
curl http://localhost:3000/status
```

You should see:
```json
{
  "ready": true,
  "info": {...},
  "hasQr": false,
  "uptime": ...
}
```

## How It Works

1. **User Fills Invoice Form**: When a user fills out the client information and clicks "Gerar Fatura"

2. **Automatic Notification**: The system automatically:
   - Generates a professional PDF of the invoice
   - Sends it to your WhatsApp: **+55 19 98145-4647**
   - Includes the invoice details in the message caption

3. **You Receive**:
   - WhatsApp message with "Nova Fatura Gerada!"
   - PDF attachment with the full invoice
   - All client and equipment details

## Testing

1. Open your proposal site
2. Click "Gerar Fatura de Locação"
3. Fill in test client data:
   - Razão Social: Test Client
   - Endereço: Test Address 123
   - Bairro: Test Neighborhood
   - CEP: 12345-678
   - Cidade: São Paulo
   - UF: SP
4. Click "Gerar Fatura"
5. Check your WhatsApp for the PDF!

## Troubleshooting

### PDF Not Received

1. Check VPS WhatsApp API status:
```bash
curl http://72.60.142.28:3000/status
```

2. Check logs on VPS:
```bash
cd ~/whatsapp-api
tail -f combined.log
```

3. Check browser console (F12) for errors

### CORS Errors

Make sure you:
- Installed `cors` package: `npm install cors`
- Added `app.use(cors());` in app.js
- Restarted the service

### WhatsApp Not Authenticated

Visit: http://72.60.142.28:3000/qr

Scan the QR code with your WhatsApp.

## Security Notes

- The PDF is generated client-side (in the browser)
- It's sent as base64 encoded data to your WhatsApp API
- Only your configured WhatsApp number receives notifications
- Consider adding authentication to your WhatsApp API endpoints for production use

## Next Steps (Optional Improvements)

1. **Add Authentication**: Protect the `/send-pdf` endpoint with API keys
2. **Database Logging**: Store invoice generation records in a database
3. **Multiple Recipients**: Allow sending to multiple WhatsApp numbers
4. **Email Notifications**: Add email notifications as backup
5. **Server-side PDF**: Move PDF generation to server for better performance

---

## Questions?

If you encounter any issues, check:
1. VPS logs: `tail -f ~/whatsapp-api/combined.log`
2. Browser console (F12)
3. Network tab in browser DevTools

The system is now ready to notify you every time someone generates an invoice!
