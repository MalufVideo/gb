import React from 'react';

interface EquipmentItem {
  qty: number;
  description: string;
  days: number;
  total: number;
}

const Pricing: React.FC = () => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const equipment: EquipmentItem[] = [
    { qty: 1, description: 'PROJETOR PANASONIC PT-RZ21KU', days: 1, total: 5500.00 },
    { qty: 1, description: 'LENTE PANASONIC 21K ET-D75LE90 FIXA (0.36:1)', days: 1, total: 1600.00 },
    { qty: 1, description: 'LICENÇA RESOLUME 6', days: 1, total: 200.00 },
    { qty: 1, description: 'NOTEBOOK DELL GAMER G5 I7 2.9 GHZ', days: 1, total: 500.00 },
    { qty: 1, description: 'TÉCNICO', days: 2, total: 2000.00 },
    { qty: 1, description: 'TRANSPORTE DOS EQUIPAMENTOS', days: 2, total: 1200.00 },
    { qty: 1, description: 'VISITA TÉCNICA', days: 1, total: 600.00 },
    { qty: 1, description: 'NELSON MALUF', days: 1, total: 2000.00 },
  ];

  const grandTotal = equipment.reduce((sum, item) => sum + item.total, 0);

  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">1</span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Proposta Comercial (Atualizada)</h2>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase font-medium text-xs">
            <tr>
              <th className="px-4 py-3 w-16 text-center">QTD</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3 w-24 text-center">Diárias</th>
              <th className="px-4 py-3 w-32 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {equipment.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="px-4 py-3 text-center font-mono text-slate-600">{item.qty}</td>
                <td className="px-4 py-3 text-slate-900">{item.description}</td>
                <td className="px-4 py-3 text-center font-mono text-slate-600">{item.days.toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-900">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-900 text-white">
            <tr>
              <td colSpan={3} className="px-4 py-4 font-bold text-right uppercase tracking-wide">TOTAL</td>
              <td className="px-4 py-4 text-right font-bold text-xl">{formatCurrency(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default Pricing;