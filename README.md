<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Invoice Generator - Galvão Bueno Digital Proposal

A responsive web application for generating rental invoices (Faturas de Locação) with automatic server-side storage in JSON and Markdown formats.

## Features

✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
✅ **Client Data Form** - Collects complete client information with auto-formatting for Brazilian documents (CNPJ/CPF, CEP, Phone)
✅ **Invoice Preview** - Professional invoice layout following Brazilian standards
✅ **Print to PDF** - Native browser print functionality
✅ **WhatsApp Integration** - Sends invoice copy via WhatsApp API
✅ **Server Storage** - Automatically saves every generated invoice as JSON and MD files
✅ **Invoice History** - All invoices are stored on the server for record-keeping

## Run Locally

**Prerequisites:** Node.js (v14 or higher)

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run both frontend and backend together:**
   ```bash
   npm run dev:all
   ```

   This will start:
   - Frontend (Vite): http://localhost:5173
   - Backend (Express): http://localhost:3001

3. **Or run them separately:**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run server
   ```

## File Storage

Every time an invoice is generated, the system automatically creates two files:
- `server/faturas/fatura_{number}_{client}_{timestamp}.json` - Complete invoice data
- `server/faturas/fatura_{number}_{client}_{timestamp}.md` - Formatted markdown version

These files are ignored by git to protect client privacy (see `.gitignore`).

## API Endpoints

### Save Invoice
```
POST http://localhost:3001/api/save-fatura
```

### Health Check
```
GET http://localhost:3001/api/health
```

### List Invoices
```
GET http://localhost:3001/api/faturas
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Icons:** Lucide React

## Project Structure

```
├── components/          # React components
│   └── FaturaLocacao.tsx  # Main invoice component
├── server/             # Backend API
│   ├── server.js       # Express server
│   └── faturas/        # Saved invoices (gitignored)
├── App.tsx             # Main app
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

---

View your app in AI Studio: https://ai.studio/apps/drive/16cJVBMfZ7oL3_u__CXLzex2XM9MNCuUj
