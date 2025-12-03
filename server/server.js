import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Directory to save faturas
const FATURAS_DIR = path.join(__dirname, 'faturas');

// Ensure faturas directory exists
await fs.mkdir(FATURAS_DIR, { recursive: true });

// Helper function to format currency
const formatCurrency = (val) => {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
};

// Generate Markdown content
const generateMarkdown = (data) => {
  const equipList = data.equipamentos.map(e => `- Locação de: ${e}`).join('\n');

  return `# FATURA DE LOCAÇÃO Nº: ${data.faturaNumber}

**Emissão:** ${data.emissionDate}

---

## REMETENTE

**AV DESIGN.TV PRODUÇÕES LTDA**
RUA AL JAU, 555, AP 42, JARDIM PAULISTA, SÃO PAULO
SP - CEP 01420-001
CNPJ: 07.622.875/0001-74 | IM: 6.149.469-0

---

## DESTINATÁRIO

**Razão Social/Nome:** ${data.client.razaoSocial.toUpperCase()}
**CNPJ/CPF:** ${data.client.cnpjCpf || '-'}
**Endereço:** ${data.client.endereco}
**Bairro:** ${data.client.bairro} | **CEP:** ${data.client.cep}
**Cidade:** ${data.client.cidade} - ${data.client.uf}
**Telefone:** ${data.client.telefone || '-'}
**Inscrição Estadual:** ${data.client.inscricaoEstadual || '-'}

---

## CONTRATO

**Tipo:** Locação de Equipamentos
**Forma de Pagamento:** R$ ${formatCurrency(data.valorTotal)}
**Vencimento:** ${data.vencimento}

---

## CONDIÇÕES DE PAGAMENTO

**BANCO DO BRASIL**
AG 052-3 | C/C 51.592-2
**PIX (CNPJ):** 07.622.875/0001-74

---

## DADOS DA LOCAÇÃO

${equipList}

---

## VALOR TOTAL DA FATURA

**R$ ${formatCurrency(data.valorTotal)}**

---

*Gerado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}*
`;
};

// API endpoint to save fatura
app.post('/api/save-fatura', async (req, res) => {
  try {
    const faturaData = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const faturaNumber = faturaData.faturaNumber || 'unknown';
    const clientName = faturaData.client?.razaoSocial?.replace(/[^a-zA-Z0-9]/g, '_') || 'unknown';
    const baseFilename = `fatura_${faturaNumber}_${clientName}_${timestamp}`;

    // Save as JSON
    const jsonFilePath = path.join(FATURAS_DIR, `${baseFilename}.json`);
    await fs.writeFile(jsonFilePath, JSON.stringify(faturaData, null, 2), 'utf-8');

    // Save as Markdown
    const mdContent = generateMarkdown(faturaData);
    const mdFilePath = path.join(FATURAS_DIR, `${baseFilename}.md`);
    await fs.writeFile(mdFilePath, mdContent, 'utf-8');

    res.json({
      success: true,
      message: 'Fatura salva com sucesso',
      files: {
        json: baseFilename + '.json',
        markdown: baseFilename + '.md'
      }
    });

    console.log(`✅ Fatura salva: ${baseFilename}`);
  } catch (error) {
    console.error('Erro ao salvar fatura:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao salvar fatura',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// List saved faturas
app.get('/api/faturas', async (req, res) => {
  try {
    const files = await fs.readdir(FATURAS_DIR);
    const faturas = files.filter(f => f.endsWith('.json') || f.endsWith('.md'));
    res.json({ success: true, faturas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Faturas will be saved to: ${FATURAS_DIR}`);
});
