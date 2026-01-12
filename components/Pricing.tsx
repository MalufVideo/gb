import React, { useState } from "react";
import { Copy } from "lucide-react";

interface EquipmentItem {
  qty: number;
  description: string;
  total: number;
}

const Pricing: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const pixCode =
    "00020101021226850014br.gov.bcb.pix2563qrcodepix.bb.com.br/pix/v2/b4243b3c-cf4b-434a-bc8f-2a60ef0705a7520400005303986540831400.005802BR5909AV DESIGN6008CAMPINAS62070503***63041890";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  const standardEquipment: EquipmentItem[] = [
    { qty: 2, description: "PROJETOR PANASONIC PT-RZ990", total: 5500.0 },
    {
      qty: 2,
      description: "LENTE PANASONIC ET-DLE20 (0.28–0.30:1)",
      total: 2800.0,
    },
    { qty: 1, description: "LICENÇA RESOLUME", total: 500.0 },
    { qty: 1, description: "NOTEBOOK DELL GAMER G5 I7 2.9 GHZ", total: 800.0 },
    { qty: 1, description: "TÉCNICO", total: 1000.0 },
    { qty: 1, description: "TRANSPORTE DOS EQUIPAMENTOS", total: 600.0 },
  ];

  const day1Extras: EquipmentItem[] = [];
  
  const andreExtras: EquipmentItem[] = [
    { qty: 1, description: "TV DE 70\" 4K", total: 2100.0 },
    { qty: 1, description: "PEDESTAL", total: 450.0 },
    { qty: 1, description: "TÉCNICO", total: 2250.0 },
    { qty: 1, description: "TRANSPORTE", total: 300.0 },
  ];

  const calculateTotal = (items: EquipmentItem[]) =>
    items.reduce((sum, item) => sum + item.total, 0);

  const day1Equipment = standardEquipment.map(item => 
    item.description === "TÉCNICO" 
      ? { ...item, description: "TÉCNICO (Pré-Light / Filmagem)", total: 2000.0 } 
      : item
  );
  const day1Total = calculateTotal([...day1Equipment, ...day1Extras]);
  const day2Total = calculateTotal(standardEquipment);
  
  const day3Equipment = standardEquipment.filter(item => 
    !['PROJETOR PANASONIC PT-RZ990', 'LENTE PANASONIC ET-DLE20 (0.28–0.30:1)'].includes(item.description)
  );
  const day3Total = calculateTotal(day3Equipment);
  
  const andreExtrasTotal = calculateTotal(andreExtras);

  const subTotal = day1Total + day2Total + day3Total + andreExtrasTotal;
  const deduction = 0;
  const finalTotal = subTotal - deduction;

  const renderTable = (
    title: string,
    items: EquipmentItem[],
    total: number
  ) => (
    <div className="mb-8 bg-slate-50 border border-slate-200 rounded-sm overflow-hidden break-inside-avoid">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
          {title}
        </h3>
        <span className="font-mono font-bold text-slate-900">
          {formatCurrency(total)}
        </span>
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
              <td className="px-4 py-2 text-center font-mono text-slate-600">
                {item.qty}
              </td>
              <td className="px-4 py-2 text-slate-900">{item.description}</td>
              <td className="px-4 py-2 text-right font-mono text-slate-900">
                {formatCurrency(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section>
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">
          1
        </span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
          Proposta Comercial
        </h2>
      </div>

      {renderTable(
        "Diária 1 - 04/12/2025",
        [...day1Equipment, ...day1Extras],
        day1Total
      )}
      {renderTable("Diária 2 - 09/12/2025", standardEquipment, day2Total)}
      {renderTable("Diária 3 - 18/12/2025", day3Equipment, day3Total)}
      {renderTable("Extras para todas as diárias (requisitado pelo André)", andreExtras, andreExtrasTotal)}

      <div className="bg-slate-900 text-white rounded-sm p-6 break-inside-avoid">
        <div className="flex justify-between items-center mb-2 text-slate-300 text-sm">
          <span>Subtotal</span>
          <span className="font-mono">{formatCurrency(subTotal)}</span>
        </div>
        {deduction > 0 && (
          <div className="flex justify-between items-center mb-4 text-emerald-400 text-sm font-bold">
            <span>Dedução (Visita Técnica + Nelson Maluf - Pagos)</span>
            <span className="font-mono">- {formatCurrency(deduction)}</span>
          </div>
        )}
        <div className="border-t border-slate-700 pt-4 flex justify-between items-end">
          <span className="font-bold uppercase tracking-wide">Total Geral</span>
          <span className="font-bold text-3xl">
            {formatCurrency(finalTotal)}
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 break-inside-avoid">
        {/* Bank Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6">
          <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-4 border-b border-slate-200 pb-2">
            Dados Bancários
          </h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-bold text-slate-900 w-24 inline-block">
                Banco:
              </span>{" "}
              Banco do Brasil S.A.
            </p>
            <p>
              <span className="font-bold text-slate-900 w-24 inline-block">
                Agência:
              </span>{" "}
              52-3
            </p>
            <p>
              <span className="font-bold text-slate-900 w-24 inline-block">
                Conta:
              </span>{" "}
              51592-2
            </p>
            <p>
              <span className="font-bold text-slate-900 w-24 inline-block">
                Favorecido:
              </span>{" "}
              Av Design.Tv Producoes Ltda
            </p>
            <p>
              <span className="font-bold text-slate-900 w-24 inline-block">
                CNPJ:
              </span>{" "}
              07.622.875/0001-74
            </p>
          </div>
        </div>

        {/* Pix Payment */}
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 flex flex-col items-center text-center">
          <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-4 w-full border-b border-slate-200 pb-2 text-left">
            Pagamento via PIX
          </h3>

          <button 
            onClick={() => setIsLightboxOpen(true)}
            className="bg-white p-2 rounded shadow-sm mb-4 cursor-zoom-in hover:shadow-md transition-shadow"
            title="Clique para ampliar"
          >
            <img
              src="/img/qr31400.jpg"
              alt="QR Code PIX"
              className="w-32 h-32"
            />
          </button>

          {/* Lightbox Modal */}
          {isLightboxOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity"
              onClick={() => setIsLightboxOpen(false)}
            >
              <div className="relative bg-white p-4 rounded-lg shadow-2xl max-w-sm w-full animate-in zoom-in duration-200">
                <button 
                  className="absolute -top-10 right-0 text-white hover:text-slate-300 transition-colors uppercase text-xs font-bold tracking-widest flex items-center gap-2"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  Fechar [X]
                </button>
                <img
                  src="/img/qr31400.jpg"
                  alt="QR Code PIX Ampliado"
                  className="w-full h-auto rounded-sm"
                />
                <div className="mt-4 text-center">
                  <p className="text-slate-900 font-bold text-sm mb-1 uppercase tracking-wide">Pagamento via PIX</p>
                  <p className="text-slate-500 text-xs">Escaneie o código acima para pagar</p>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-500 mb-2">
            Escaneie o QR Code ou copie o código abaixo:
          </p>

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
