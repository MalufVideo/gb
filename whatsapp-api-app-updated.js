/**
 * WhatsApp API - Stable Edition with PDF Support
 * Works with google-chrome-stable (installed from .deb)
 * Updated with PDF sending capability
 */

const express = require("express");
const bodyParser = require("body-parser");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const winston = require("winston");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cors = require("cors"); // Add CORS support

// --------------------------- LOGGER --------------------------- //

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

// --------------------------- EXPRESS --------------------------- //

const app = express();

// Enable CORS for all origins (you can restrict this to specific domains if needed)
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Ensure media directory
const mediaDir = path.join(__dirname, "media");
if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir);

// --------------------------- WHATSAPP CLIENT --------------------------- //

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one",
        dataPath: path.join(__dirname, ".wwebjs_auth")
    }),
    puppeteer: {
        headless: true,
        executablePath: "/usr/bin/google-chrome",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-infobars",
            "--window-position=0,0",
            "--ignore-certificate-errors",
            "--ignore-ssl-errors"
        ]
    }
});

let qrCodeData = null;
let clientReady = false;
let clientInfo = null;

// --------------------------- EVENTS --------------------------- //

client.on("qr", async (qr) => {
    qrCodeData = qr;
    qrcodeTerminal.generate(qr, { small: true });

    const qrImage = await qrcode.toDataURL(qr);
    fs.writeFileSync("qr-code.png", qrImage.split(",")[1], "base64");

    logger.info("QR CODE GENERATED");
});

client.on("ready", () => {
    clientReady = true;
    qrCodeData = null;
    clientInfo = client.info;
    logger.info("✅ WhatsApp client is ready!");
});

client.on("authenticated", () => {
    logger.info("🔐 Authenticated with WhatsApp");
});

client.on("auth_failure", (msg) => {
    logger.error("❌ Authentication failure:", msg);
});

client.on("disconnected", (reason) => {
    logger.warn("⚠️ Client disconnected:", reason);
    clientReady = false;
});

// Incoming messages
client.on("message", async (message) => {
    logger.info(`📩 Message from ${message.from}: ${message.body}`);

    // Auto-save media
    if (message.hasMedia) {
        const media = await message.downloadMedia();
        const extension = media.mimetype.split("/")[1];
        const filename = `${Date.now()}.${extension}`;
        fs.writeFileSync(`${mediaDir}/${filename}`, media.data, "base64");
        logger.info(`📎 Media saved: ${filename}`);
    }
});

// --------------------------- REST API --------------------------- //

// Status
app.get("/status", (req, res) => {
    res.json({
        ready: clientReady,
        info: clientInfo,
        hasQr: !!qrCodeData,
        uptime: process.uptime()
    });
});

// QR CODE PAGE
app.get("/qr", async (req, res) => {
    if (!qrCodeData) return res.send("No QR available.");

    const qrImage = await qrcode.toDataURL(qrCodeData);

    res.send(`
        <html><body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#f5f5f5;">
            <div style="background:white;padding:20px;border-radius:10px;box-shadow:0 0 10px #ccc;">
                <h1 style="text-align:center;color:#25D366;">Scan QR</h1>
                <img src="${qrImage}" />
            </div>
        </body></html>
    `);
});

// SEND MESSAGE
app.post("/send", async (req, res) => {
    if (!clientReady)
        return res.status(503).json({ error: "Client not ready" });

    const { to, message } = req.body;
    if (!to || !message)
        return res.status(400).json({ error: "to + message required" });

    try {
        const number = to.replace(/\D/g, "");
        const chatId = `${number}@c.us`;

        const result = await client.sendMessage(chatId, message);

        res.json({ success: true, id: result.id._serialized });
    } catch (err) {
        logger.error("Send message failed:", err);
        res.status(500).json({ error: "Failed to send" });
    }
});

// SEND PDF - with raw body parser for no-cors requests
app.post("/send-pdf", express.raw({ type: '*/*', limit: '50mb' }), async (req, res) => {
    if (!clientReady)
        return res.status(503).json({ error: "Client not ready" });

    // Parse body - handle both JSON and raw data
    let data;
    try {
        if (req.body && Buffer.isBuffer(req.body)) {
            // Raw buffer from no-cors request
            data = JSON.parse(req.body.toString());
        } else if (req.body && typeof req.body === 'object') {
            // Already parsed JSON
            data = req.body;
        } else {
            return res.status(400).json({ error: "Invalid request body" });
        }
    } catch (err) {
        logger.error("Failed to parse body:", err);
        return res.status(400).json({ error: "Invalid JSON" });
    }

    const { to, message, pdf, filename } = data;
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

// --------------------------- START --------------------------- //

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`🚀 API running on port ${PORT}`);
});

// Initialize WA
setTimeout(() => {
    logger.info("📲 Initializing WhatsApp client...");
    client.initialize();
}, 3000);
