import React from 'react';
import { Copy } from 'lucide-react';

interface EquipmentItem {
  qty: number;
  description: string;
  total: number;
}

const Pricing: React.FC = () => {
  const pixCode = "00020101021226850014br.gov.bcb.pix2563qrcodepix.bb.com.br/pix/v2/214760fc-8948-4907-a0d8-b17be0dff261520400005303986540828200.005802BR5909AV DESIGN6008CAMPINAS62070503***6304CF2A";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    alert('Código PIX copiado!');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const standardEquipment: EquipmentItem[] = [
    { qty: 2, description: 'PROJETOR PANASONIC PT-RZ990', total: 5500.00 },
    { qty: 2, description: 'LENTE ET-DLE020 ULTRA-SHORT-THROW ZOOM', total: 1600.00 },
    { qty: 1, description: 'LICENÇA RESOLUME 6', total: 200.00 },
    { qty: 1, description: 'NOTEBOOK DELL GAMER G5 I7 2.9 GHZ', total: 500.00 },
    { qty: 1, description: 'TÉCNICO', total: 1000.00 },
    { qty: 1, description: 'TRANSPORTE DOS EQUIPAMENTOS', total: 600.00 },
  ];

  const day1Extras: EquipmentItem[] = [
    { qty: 1, description: 'VISITA TÉCNICA', total: 600.00 },
    { qty: 1, description: 'NELSON MALUF', total: 2000.00 },
  ];

  const calculateTotal = (items: EquipmentItem[]) => items.reduce((sum, item) => sum + item.total, 0);

  const day1Total = calculateTotal([...standardEquipment, ...day1Extras]);
  const day2Total = calculateTotal(standardEquipment);
  const day3Total = calculateTotal(standardEquipment);
  
  const subTotal = day1Total + day2Total + day3Total;
  const deduction = 2600.00;
  const finalTotal = subTotal - deduction;

  const renderTable = (title: string, items: EquipmentItem[], total: number) => (
    <div className="mb-8 bg-slate-50 border border-slate-200 rounded-sm overflow-hidden break-inside-avoid">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">{title}</h3>
        <span className="font-mono font-bold text-slate-900">{formatCurrency(total)}</span>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-slate-500 uppercase font-medium text-xs">
          <tr>
            <th className="px-4 py-2 w-16 text-center">QTD</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2 w-32 text-right">Valor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-center font-mono text-slate-600">{item.qty}</td>
              <td className="px-4 py-2 text-slate-900">{item.description}</td>
              <td className="px-4 py-2 text-right font-mono text-slate-900">{formatCurrency(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section>
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">1</span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Proposta Comercial</h2>
      </div>

      {renderTable('Diária 1 - 04/12/2025', [...standardEquipment, ...day1Extras], day1Total)}
      {renderTable('Diária 2 - 09/12/2025', standardEquipment, day2Total)}
      {renderTable('Diária 3 - 18/12/2025', standardEquipment, day3Total)}

      <div className="bg-slate-900 text-white rounded-sm p-6 break-inside-avoid">
        <div className="flex justify-between items-center mb-2 text-slate-300 text-sm">
          <span>Subtotal</span>
          <span className="font-mono">{formatCurrency(subTotal)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-emerald-400 text-sm font-bold">
          <span>Dedução (Visita Técnica + Nelson Maluf - Pagos)</span>
          <span className="font-mono">- {formatCurrency(deduction)}</span>
        </div>
        <div className="border-t border-slate-700 pt-4 flex justify-between items-end">
          <span className="font-bold uppercase tracking-wide">Total Geral</span>
          <span className="font-bold text-3xl">{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 break-inside-avoid">
        {/* Bank Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6">
          <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-4 border-b border-slate-200 pb-2">Dados Bancários</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p><span className="font-bold text-slate-900 w-24 inline-block">Banco:</span> Banco do Brasil S.A.</p>
            <p><span className="font-bold text-slate-900 w-24 inline-block">Agência:</span> 52-3</p>
            <p><span className="font-bold text-slate-900 w-24 inline-block">Conta:</span> 51592-2</p>
            <p><span className="font-bold text-slate-900 w-24 inline-block">Favorecido:</span> Av Design.Tv Producoes Ltda</p>
            <p><span className="font-bold text-slate-900 w-24 inline-block">CNPJ:</span> 07.622.875/0001-74</p>
          </div>
        </div>

        {/* Pix Payment */}
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 flex flex-col items-center text-center">
          <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-4 w-full border-b border-slate-200 pb-2 text-left">Pagamento via PIX</h3>
          
          <div className="bg-white p-2 rounded shadow-sm mb-4">
             <img 
               src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixCode)}`}
               alt="QR Code PIX" 
               className="w-32 h-32"
             />
          </div>

          <p className="text-xs text-slate-500 mb-2">Escaneie o QR Code ou copie o código abaixo:</p>
          
          <div className="w-full relative">
            <input 
              type="text" 
              readOnly 
              value={pixCode}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-[10px] text-slate-500 font-mono truncate pr-8 focus:outline-none focus:border-brand-accent"
            />
            <button 
              onClick={handleCopyPix}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-brand-accent transition-colors"
              title="Copiar código PIX"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;