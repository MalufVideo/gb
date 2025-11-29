import React from 'react';

const Pricing: React.FC = () => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">4</span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Investimento</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Option A */}
        <div className="border border-slate-200 rounded-sm overflow-hidden flex flex-col bg-white">
          <div className="bg-slate-50 p-5 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 text-lg">Opção A: Estúdio 2D</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Alta Performance Broadcast</p>
          </div>
          <div className="p-6 flex-1 bg-white">
            <ul className="text-sm space-y-3 text-slate-600 mb-6 list-disc pl-4 marker:text-slate-300">
              <li>Painel de LED 16x5m (2.6mm HDR)</li>
              <li>Painel de LED 4k 2.6mm HDR 8x4m</li>
              <li>1x Servidor Disguise VX</li>
              <li>3x Câmeras Sony FX6 + Tripés</li>
              <li>Switcher Blackmagic ATEM 2M/E</li>
              <li>Equipe Completa (Direção, Operação)</li>
              <li>Pacote de Áudio (7 Mics + Console)</li>
              <li>Internet Fibra conexao com redundancia ativa</li>
            </ul>
          </div>
          <div className="bg-white p-5 border-t border-slate-100">
            <div className="flex justify-between items-center mb-1 text-sm text-slate-500">
              <span>Vídeo + Estúdio</span>
              <span>{formatCurrency(112000.00)}</span>
            </div>
            <div className="flex justify-between items-center mb-3 text-sm text-slate-500">
              <span>Pacote Áudio</span>
              <span>{formatCurrency(8000.00)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-2">
              <span className="font-bold text-slate-900">TOTAL</span>
              <span className="font-bold text-2xl text-slate-900">{formatCurrency(120000.00)}</span>
            </div>
          </div>
        </div>

        {/* Option B */}
        <div className="border-2 border-slate-900 rounded-sm overflow-hidden flex flex-col relative bg-white shadow-sm">
          <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">Recomendado</div>
          <div className="bg-white p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Opção B: 3D + AR</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Experiência Imersiva xR</p>
          </div>
          <div className="p-6 flex-1 bg-slate-50/50">
            <ul className="text-sm space-y-3 text-slate-700 mb-6 list-disc pl-4 marker:text-slate-900">
              <li><strong>Todo o escopo da Opção A</strong></li>
              <li>2x Render Nodes Disguise RXII (Upgrade)</li>
              <li>Sistema de Camera Tracking (Stype)</li>
              <li>Renderização Unreal Engine Tempo Real</li>
              <li>Elementos de Realidade Aumentada (AR)</li>
            </ul>
          </div>
          <div className="bg-white p-5 border-t border-slate-100">
            <div className="flex justify-between items-center mb-1 text-sm text-slate-500">
              <span>Vídeo + Estúdio (xR)</span>
              <span>{formatCurrency(141235.00)}</span>
            </div>
            <div className="flex justify-between items-center mb-3 text-sm text-slate-500">
              <span>Pacote Áudio</span>
              <span>{formatCurrency(8000.00)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-2">
              <span className="font-bold text-slate-900">TOTAL</span>
              <span className="font-bold text-2xl text-slate-900">{formatCurrency(149235.00)}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;