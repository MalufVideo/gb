# Invoice Server

Backend API for saving rental invoices (faturas de locação).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run server
```

Or run both frontend and backend together:
```bash
npm run dev:all
```

The server will run on `http://localhost:3001`

## API Endpoints

### Save Invoice
- **POST** `/api/save-fatura`
- Saves invoice data as both JSON and Markdown files
- Files are saved to `server/faturas/` directory

**Request Body:**
```json
{
  "faturaNumber": "000052",
  "emissionDate": "02/12/2025",
  "equipamentos": ["Equipment 1", "Equipment 2"],
  "valorTotal": 13600.00,
  "vencimento": "A vista - R$ 13.600,00",
  "client": {
    "razaoSocial": "Company Name",
    "cnpjCpf": "00.000.000/0000-00",
    "endereco": "Street Address",
    "bairro": "Neighborhood",
    "cep": "00000-000",
    "uf": "SP",
    "cidade": "São Paulo",
    "inscricaoEstadual": "",
    "telefone": "(11) 99999-9999"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Fatura salva com sucesso",
  "files": {
    "json": "fatura_000052_CompanyName_2025-12-02T14-30-00-000Z.json",
    "markdown": "fatura_000052_CompanyName_2025-12-02T14-30-00-000Z.md"
  }
}
```

### Health Check
- **GET** `/api/health`
- Returns server status

### List Invoices
- **GET** `/api/faturas`
- Returns list of saved invoice files

## File Storage

Invoices are automatically saved to `server/faturas/` with the following naming pattern:
```
fatura_{number}_{clientName}_{timestamp}.json
fatura_{number}_{clientName}_{timestamp}.md
```

These files are ignored by git (see `.gitignore`) to protect client privacy.
