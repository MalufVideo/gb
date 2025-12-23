import React, { useRef, useState } from 'react';
import { X, Printer, ArrowRight, Send } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ClientData {
  razaoSocial: string;
  cnpjCpf: string;
  endereco: string;
  bairro: string;
  cep: string;
  uf: string;
  cidade: string;
  inscricaoEstadual: string;
  telefone: string;
}

interface Equipment {
  quantity: number;
  description: string;
  days: number;
}

interface FaturaLocacaoProps {
  isOpen: boolean;
  onClose: () => void;
  faturaNumber: string;
  emissionDate: string;
  rentalPeriod: string;
  equipamentos: Equipment[];
  valorTotal: number;
  vencimento: string;
}

const CNPJ_PIX = '07.622.875/0001-74';
const WHATSAPP_API_URL = 'http://72.60.142.28:3000/send';
const WHATSAPP_API_PDF_URL = 'http://72.60.142.28:3000/send-pdf';
const WHATSAPP_TO = '5519981454647';

const FaturaLocacao: React.FC<FaturaLocacaoProps> = ({
  isOpen,
  onClose,
  faturaNumber,
  emissionDate,
  rentalPeriod,
  equipamentos,
  valorTotal,
  vencimento,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [sending, setSending] = useState(false);
  const [client, setClient] = useState<ClientData>({
    razaoSocial: '',
    cnpjCpf: '',
    endereco: '',
    bairro: '',
    cep: '',
    uf: 'SP',
    cidade: 'São Paulo',
    inscricaoEstadual: '',
    telefone: '',
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  };

  // Generate text content for WhatsApp
  const generateFaturaText = (clientData: ClientData) => {
    const equipList = equipamentos.map(e =>
      `- ${e.quantity}x ${e.description} (${e.days} dias)`
    ).join('\n');

    return `FATURA DE LOCACAO No: ${faturaNumber}
Emissao: ${emissionDate}
Periodo: ${rentalPeriod}

AV DESIGN.TV PRODUCOES LTDA
RUA AL JAU, 555, AP 42, JARDIM PAULISTA, SAO PAULO
SP - CEP 01420-001
CNPJ 07.622.875/0001-74 | IM 6.149.469-0

DESTINATARIO
${clientData.razaoSocial.toUpperCase()}
CNPJ/CPF: ${clientData.cnpjCpf || '-'}
Endereco: ${clientData.endereco}
Bairro: ${clientData.bairro} | CEP: ${clientData.cep}
Cidade: ${clientData.cidade} - ${clientData.uf}
Telefone: ${clientData.telefone || '-'}

CONTRATO: Locacao de Equipamentos
PAGAMENTO: R$ ${formatCurrency(valorTotal)}
VENCIMENTO: ${vencimento}

CONDICOES DE PAGAMENTO:
BANCO DO BRASIL AG 052-3 C/C 51.592-2
PIX (CNPJ): ${CNPJ_PIX}

DADOS DA LOCACAO (${rentalPeriod})
${equipList}

VALOR TOTAL DA FATURA: R$ ${formatCurrency(valorTotal)}`;
  };

  // Generate PDF from invoice HTML
  const generatePDF = async (clientData: ClientData): Promise<string | null> => {
    try {
      // Create a temporary div with the invoice content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: Arial, sans-serif;
                font-size: 11px;
                color: #000;
                padding: 20px;
              }
              table { width: 100%; border-collapse: collapse; }
              td, th { border: 1px solid #000; padding: 4px 6px; }
              .font-bold { font-weight: bold; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .text-lg { font-size: 16px; }
              .text-xl { font-size: 18px; }
              .text-2xl { font-size: 22px; }
              .text-sm { font-size: 12px; }
              .text-xs { font-size: 10px; }
              .text-9 { font-size: 9px; }
              .text-10 { font-size: 10px; }
              .text-red-600 { color: #dc2626; }
              .text-blue-600 { color: #2563eb; }
              .text-gray-600 { color: #4b5563; }
              .bg-gray-100 { background-color: #f3f4f6; }
              .bg-gray-50 { background-color: #f9fafb; }
              .mt-1 { margin-top: 4px; }
              .mt--1 { margin-top: -1px; }
              .p-1 { padding: 4px; }
              .p-2 { padding: 8px; }
              .w-40 { width: 160px; }
              .w-1-4 { width: 25%; }
              .w-1-2 { width: 50%; }
            </style>
          </head>
          <body>
            <div class="fatura" style="border: 1px solid #000;">
              <!-- Header -->
              <table>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; width: 50%;" rowspan="2">
                      <div style="font-weight: bold; font-size: 12px;">AV DESIGN.TV PRODUÇÕES LTDA</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 8px; text-align: center;">
                      <div style="font-weight: bold;">AV DESIGN</div>
                      <div style="font-size: 9px; margin-top: 4px;">
                        RUA AL JAU, 555, AP 42, JARDIM PAULISTA, SAO PAULO<br />
                        SP - CEP 01420-001<br />
                        CNPJ 07.622.875/0001-74 | IM 6.149.469-0
                      </div>
                    </td>
                    <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">
                      <div style="font-size: 16px;">FATURA DE LOCAÇÃO</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; text-align: center;" colspan="2">
                      <div style="font-size: 22px; font-weight: bold;">Nº: ${faturaNumber}</div>
                      <div style="font-size: 12px; margin-top: 4px;">Emissão: ${emissionDate}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Destinatário -->
              <table style="margin-top: -1px;">
                <tbody>
                  <tr>
                    <td colspan="5" style="border: 1px solid #000; padding: 4px; background-color: #f3f4f6; font-weight: bold; font-size: 10px;">DESTINATÁRIO</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="3">
                      <div style="font-size: 9px; color: #4b5563;">Razão Social / Nome Cliente</div>
                      <div style="font-weight: bold;">${clientData.razaoSocial.toUpperCase()}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="2">
                      <div style="font-size: 9px; color: #4b5563;">CNPJ / CPF</div>
                      <div>${clientData.cnpjCpf || '-'}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="2">
                      <div style="font-size: 9px; color: #4b5563;">Endereço</div>
                      <div>${clientData.endereco}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;">
                      <div style="font-size: 9px; color: #4b5563;">Bairro</div>
                      <div>${clientData.bairro}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;">
                      <div style="font-size: 9px; color: #4b5563;">CEP</div>
                      <div>${clientData.cep}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px; text-align: center;">
                      <div style="font-size: 9px; color: #4b5563;">UF</div>
                      <div>${clientData.uf}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="2">
                      <div style="font-size: 9px; color: #4b5563;">Cidade</div>
                      <div>${clientData.cidade}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="2">
                      <div style="font-size: 9px; color: #4b5563;">Inscrição Estadual</div>
                      <div>${clientData.inscricaoEstadual || '-'}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;">
                      <div style="font-size: 9px; color: #4b5563;">Telefone</div>
                      <div>${clientData.telefone || '-'}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Contrato / Pagamento -->
              <table style="margin-top: -1px;">
                <tbody>
                  <tr>
                    <td style="border: 1px solid #000; padding: 4px; background-color: #f3f4f6; font-weight: bold; font-size: 10px; width: 25%;">CONTRATO</td>
                    <td style="border: 1px solid #000; padding: 4px; background-color: #f3f4f6; font-weight: bold; font-size: 10px; width: 25%;">PAGAMENTO</td>
                    <td style="border: 1px solid #000; padding: 4px; background-color: #f3f4f6; font-weight: bold; font-size: 10px;" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;">
                      <div style="font-size: 9px; color: #4b5563;">Número</div>
                      <div style="color: #2563eb;">Locação de Equipamentos</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;">
                      <div style="font-size: 9px; color: #4b5563;">Forma de Pagamento</div>
                      <div style="color: #dc2626; font-weight: bold;">R$ ${formatCurrency(valorTotal)}</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="2">
                      <div style="font-size: 9px; color: #4b5563;">Vencimento</div>
                      <div>${vencimento}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Observação -->
              <table style="margin-top: -1px;">
                <tbody>
                  <tr>
                    <td style="border: 1px solid #000; padding: 4px; background-color: #f3f4f6; font-weight: bold; font-size: 10px;">OBSERVAÇÃO</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-size: 10px;">
                      <div style="font-size: 9px; color: #4b5563;">Condições de Pagamento:</div>
                      <div style="font-weight: bold; margin-top: 4px;">BANCO DO BRASIL AG 052-3 C/C 51.592-2</div>
                      <div style="font-weight: bold; margin-top: 4px;">PIX (CNPJ): ${CNPJ_PIX}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Dados da Locação -->
              <table style="margin-top: -1px;">
                <tbody>
                  <tr>
                    <td colspan="4" style="border: 1px solid #000; padding: 4px; background-color: #f3f4f6; font-weight: bold; font-size: 10px;">DADOS DA LOCAÇÃO - Período: ${rentalPeriod}</td>
                  </tr>
                  <tr style="background-color: #f9fafb;">
                    <th style="border: 1px solid #000; padding: 4px; font-size: 10px; text-align: center; width: 60px;">QTD</th>
                    <th style="border: 1px solid #000; padding: 4px; font-size: 10px; text-align: left;">Descrição / Configuração</th>
                    <th style="border: 1px solid #000; padding: 4px; font-size: 10px; text-align: center; width: 80px;">Dias</th>
                  </tr>
                  ${equipamentos.map(equip => `
                    <tr>
                      <td style="border: 1px solid #000; padding: 4px; font-size: 10px; text-align: center;">${equip.quantity}</td>
                      <td style="border: 1px solid #000; padding: 4px; font-size: 10px;">Locação de: ${equip.description}</td>
                      <td style="border: 1px solid #000; padding: 4px; font-size: 10px; text-align: center;">${equip.days}</td>
                    </tr>
                  `).join('')}
                  ${Array.from({ length: Math.max(0, 6 - equipamentos.length) }).map(() => `
                    <tr>
                      <td style="border: 1px solid #000; padding: 4px; font-size: 10px;" colspan="3">&nbsp;</td>
                    </tr>
                  `).join('')}
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; text-align: right; font-weight: bold; font-size: 12px;" colspan="2">Valor Total da Fatura:</td>
                    <td style="border: 1px solid #000; padding: 8px; text-align: right; font-weight: bold; font-size: 16px;">${formatCurrency(valorTotal)}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Footer -->
              <table style="margin-top: -1px;">
                <tbody>
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-size: 9px;" colspan="2">
                      RECEBI(EMOS) DE <span style="color: #2563eb; font-weight: bold;">AV DESIGN</span>. AS LOCAÇÕES CONSTANTES NESSA FATURA INDICADA AO LADO
                    </td>
                    <td style="border: 1px solid #000; padding: 8px; text-align: right; font-weight: bold;" rowspan="2">
                      <div>FATURA DE LOCAÇÃO</div>
                      <div style="font-size: 18px; margin-top: 4px;">Nº: ${faturaNumber}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-size: 9px; width: 25%;">
                      <div style="background-color: #f3f4f6; padding: 4px; font-weight: bold;">DATA DO RECEBIMENTO</div>
                    </td>
                    <td style="border: 1px solid #000; padding: 8px; font-size: 9px;">
                      <div style="background-color: #f3f4f6; padding: 4px; font-weight: bold;">IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `;

      document.body.appendChild(tempDiv);

      const options = {
        margin: 10,
        filename: `Fatura_${faturaNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Generate PDF and get as blob
      const pdfBlob = await html2pdf().set(options).from(tempDiv).output('blob');

      // Remove temp div
      document.body.removeChild(tempDiv);

      // Convert blob to base64
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(pdfBlob);
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return null;
    }
  };

  // Send fatura via WhatsApp API with PDF attachment
  const sendFaturaWhatsApp = async (clientData: ClientData) => {
    setSending(true);
    const message = generateFaturaText(clientData);
    console.log('🔄 Iniciando envio para WhatsApp...');

    try {
      // Generate PDF
      console.log('📄 Gerando PDF...');
      const pdfBase64 = await generatePDF(clientData);

      if (!pdfBase64) {
        console.error('❌ Falha ao gerar PDF');
        setSending(false);
        return;
      }

      console.log('✅ PDF gerado com sucesso. Tamanho:', pdfBase64.length, 'bytes');

      // Send PDF via WhatsApp API
      console.log('📤 Enviando PDF para:', WHATSAPP_API_PDF_URL);

      const payload = {
        to: WHATSAPP_TO,
        message: `Nova Fatura Gerada!\n\n${message}`,
        pdf: pdfBase64,
        filename: `Fatura_${faturaNumber}.pdf`
      };

      console.log('📦 Payload preparado. Tamanho do PDF:', pdfBase64.length);

      const response = await fetch(WHATSAPP_API_PDF_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for HTTPS → HTTP (mixed content)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('✅ Requisição enviada para WhatsApp API');
      console.log('📱 Verifique seu WhatsApp em alguns segundos...');

    } catch (error) {
      console.error('❌ Erro ao enviar fatura:', error);
      alert('Erro ao enviar fatura via WhatsApp. Verifique o console para mais detalhes.');
    } finally {
      setSending(false);
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fatura de Locação - ${faturaNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              font-size: 11px; 
              color: #000; 
              padding: 20px;
            }
            table { width: 100%; border-collapse: collapse; }
            td, th { border: 1px solid #000; padding: 4px 6px; }
            .font-bold { font-weight: bold; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-lg { font-size: 16px; }
            .text-xl { font-size: 18px; }
            .text-2xl { font-size: 22px; }
            .text-sm { font-size: 12px; }
            .text-\\[9px\\] { font-size: 9px; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-red-600 { color: #dc2626; }
            .text-blue-600 { color: #2563eb; }
            .text-gray-600 { color: #4b5563; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .bg-gray-50 { background-color: #f9fafb; }
            .mt-1 { margin-top: 4px; }
            .mt-\\[-1px\\] { margin-top: -1px; }
            .p-1 { padding: 4px; }
            .p-2 { padding: 8px; }
            .w-40 { width: 160px; }
            .w-1\\/4 { width: 25%; }
            .w-1\\/2 { width: 50%; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleClose = () => {
    setStep('form');
    setClient({
      razaoSocial: '',
      cnpjCpf: '',
      endereco: '',
      bairro: '',
      cep: '',
      uf: 'SP',
      cidade: 'São Paulo',
      inscricaoEstadual: '',
      telefone: '',
    });
    onClose();
  };

  // Format CNPJ: 00.000.000/0000-00 or CPF: 000.000.000-00
  const formatCnpjCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      // CPF format
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ format
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  };

  // Format phone: (11) 99999-9999
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
  };

  // Format CEP: 00000-000
  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d)/, '$1-$2');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cnpjCpf') {
      formattedValue = formatCnpjCpf(value);
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value);
    } else if (name === 'cep') {
      formattedValue = formatCep(value);
    } else if (name === 'uf') {
      formattedValue = value.toUpperCase().slice(0, 2);
    }

    setClient(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save invoice number to localStorage for auto-increment
    localStorage.setItem('lastInvoiceNumber', faturaNumber);

    // Send fatura copy via WhatsApp for tax purposes immediately with current client data
    sendFaturaWhatsApp(client);
    setStep('preview');
  };

  if (!isOpen) return null;

  // Step 1: Form to collect client data
  if (step === 'form') {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between p-4 border-b bg-slate-50 sticky top-0">
            <h2 className="text-lg font-bold text-slate-900">Dados do Cliente para Fatura</h2>
            <button onClick={handleClose} className="text-slate-500 hover:text-slate-700 p-2">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Razão Social / Nome Cliente *</label>
                <input
                  type="text"
                  name="razaoSocial"
                  value={client.razaoSocial}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="Nome completo ou razão social"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ / CPF</label>
                <input
                  type="text"
                  name="cnpjCpf"
                  value={client.cnpjCpf}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={client.telefone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Endereço *</label>
                <input
                  type="text"
                  name="endereco"
                  value={client.endereco}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bairro *</label>
                <input
                  type="text"
                  name="bairro"
                  value={client.bairro}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="Bairro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CEP *</label>
                <input
                  type="text"
                  name="cep"
                  value={client.cep}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="00000-000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cidade *</label>
                <input
                  type="text"
                  name="cidade"
                  value={client.cidade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">UF *</label>
                <input
                  type="text"
                  name="uf"
                  value={client.uf}
                  onChange={handleInputChange}
                  required
                  maxLength={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="SP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Inscrição Estadual</label>
                <input
                  type="text"
                  name="inscricaoEstadual"
                  value={client.inscricaoEstadual}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-brand-accent text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 font-bold"
              >
                Gerar Fatura
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 2: Fatura Preview
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-50 sticky top-0">
          <h2 className="text-lg font-bold text-slate-900">Fatura de Locação</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep('form')}
              className="text-slate-600 px-4 py-2 rounded hover:bg-slate-100 transition-colors text-sm"
            >
              Voltar
            </button>
            <button
              onClick={handlePrint}
              className="bg-slate-900 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-slate-800 transition-colors text-sm"
            >
              <Printer size={16} />
              Imprimir
            </button>
            <button onClick={handleClose} className="text-slate-500 hover:text-slate-700 p-2">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Fatura Content */}
        <div ref={printRef} className="p-6">
          <div className="fatura border border-black">
            {/* Header */}
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-black p-2 w-1/2" rowSpan={2}>
                    <div className="font-bold text-sm">AV DESIGN.TV PRODUÇÕES LTDA</div>
                  </td>
                  <td className="border border-black p-2 text-center">
                    <div className="font-bold">AV DESIGN</div>
                    <div className="text-[9px] mt-1">
                      RUA AL JAU, 555, AP 42, JARDIM PAULISTA, SAO PAULO<br />
                      SP - CEP 01420-001<br />
                      CNPJ 07.622.875/0001-74 | IM 6.149.469-0
                    </div>
                  </td>
                  <td className="border border-black p-2 text-center font-bold">
                    <div className="text-lg">FATURA DE LOCAÇÃO</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-center" colSpan={2}>
                    <div className="text-2xl font-bold">Nº: {faturaNumber}</div>
                    <div className="text-sm mt-1">Emissão: {emissionDate}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Destinatário */}
            <table className="w-full border-collapse mt-[-1px]">
              <tbody>
                <tr>
                  <td colSpan={5} className="border border-black p-1 bg-gray-100 font-bold text-xs">DESTINATÁRIO</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-[10px]" colSpan={3}>
                    <div className="text-[9px] text-gray-600">Razão Social / Nome Cliente</div>
                    <div className="font-bold">{client.razaoSocial.toUpperCase()}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]" colSpan={2}>
                    <div className="text-[9px] text-gray-600">CNPJ / CPF</div>
                    <div>{client.cnpjCpf || '-'}</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-[10px]" colSpan={2}>
                    <div className="text-[9px] text-gray-600">Endereço</div>
                    <div>{client.endereco}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]">
                    <div className="text-[9px] text-gray-600">Bairro</div>
                    <div>{client.bairro}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]">
                    <div className="text-[9px] text-gray-600">CEP</div>
                    <div>{client.cep}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px] text-center">
                    <div className="text-[9px] text-gray-600">UF</div>
                    <div>{client.uf}</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-[10px]" colSpan={2}>
                    <div className="text-[9px] text-gray-600">Cidade</div>
                    <div>{client.cidade}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]" colSpan={2}>
                    <div className="text-[9px] text-gray-600">Inscrição Estadual</div>
                    <div>{client.inscricaoEstadual || '-'}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]">
                    <div className="text-[9px] text-gray-600">Telefone</div>
                    <div>{client.telefone || '-'}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Contrato / Pagamento */}
            <table className="w-full border-collapse mt-[-1px]">
              <tbody>
                <tr>
                  <td className="border border-black p-1 bg-gray-100 font-bold text-xs w-1/4">CONTRATO</td>
                  <td className="border border-black p-1 bg-gray-100 font-bold text-xs w-1/4">PAGAMENTO</td>
                  <td className="border border-black p-1 bg-gray-100 font-bold text-xs" colSpan={2}></td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-[10px]">
                    <div className="text-[9px] text-gray-600">Número</div>
                    <div className="text-blue-600">Locação de Equipamentos</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]">
                    <div className="text-[9px] text-gray-600">Forma de Pagamento</div>
                    <div className="text-red-600 font-bold">R$ {formatCurrency(valorTotal)}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]" colSpan={2}>
                    <div className="text-[9px] text-gray-600">Vencimento</div>
                    <div>{vencimento}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Observação */}
            <table className="w-full border-collapse mt-[-1px]">
              <tbody>
                <tr>
                  <td className="border border-black p-1 bg-gray-100 font-bold text-xs">OBSERVAÇÃO</td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-[10px]">
                    <div className="text-[9px] text-gray-600">Condições de Pagamento:</div>
                    <div className="font-bold mt-1">BANCO DO BRASIL AG 052-3 C/C 51.592-2</div>
                    <div className="font-bold mt-1">PIX (CNPJ): {CNPJ_PIX}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Dados da Locação */}
            <table className="w-full border-collapse mt-[-1px]">
              <tbody>
                <tr>
                  <td colSpan={3} className="border border-black p-1 bg-gray-100 font-bold text-xs">DADOS DA LOCAÇÃO - Período: {rentalPeriod}</td>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-black p-1 text-[10px] text-center w-16">QTD</th>
                  <th className="border border-black p-1 text-[10px] text-left">Descrição / Configuração</th>
                  <th className="border border-black p-1 text-[10px] text-center w-20">Dias</th>
                </tr>
                {equipamentos.map((equip, index) => (
                  <tr key={index}>
                    <td className="border border-black p-1 text-[10px] text-center">{equip.quantity}</td>
                    <td className="border border-black p-1 text-[10px]">Locação de: {equip.description}</td>
                    <td className="border border-black p-1 text-[10px] text-center">{equip.days}</td>
                  </tr>
                ))}
                {/* Empty rows for spacing */}
                {Array.from({ length: Math.max(0, 6 - equipamentos.length) }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td className="border border-black p-1 text-[10px]" colSpan={3}>&nbsp;</td>
                  </tr>
                ))}
                {/* Total */}
                <tr>
                  <td className="border border-black p-2 text-right font-bold text-sm" colSpan={2}>Valor Total da Fatura:</td>
                  <td className="border border-black p-2 text-right font-bold text-lg">{formatCurrency(valorTotal)}</td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <table className="w-full border-collapse mt-[-1px]">
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-[9px]" colSpan={2}>
                    RECEBI(EMOS) DE <span className="text-blue-600 font-bold">AV DESIGN</span>. AS LOCAÇÕES CONSTANTES NESSA FATURA INDICADA AO LADO
                  </td>
                  <td className="border border-black p-2 text-right font-bold" rowSpan={2}>
                    <div>FATURA DE LOCAÇÃO</div>
                    <div className="text-xl mt-1">Nº: {faturaNumber}</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-[9px] w-1/4">
                    <div className="bg-gray-100 p-1 font-bold">DATA DO RECEBIMENTO</div>
                  </td>
                  <td className="border border-black p-2 text-[9px]">
                    <div className="bg-gray-100 p-1 font-bold">IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaturaLocacao;
