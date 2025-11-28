import React from 'react';
import { PlusCircle } from 'lucide-react';

const Extras: React.FC = () => {
  return (
    <section className="bg-slate-50 p-6 rounded border border-slate-200 border-dashed">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
        <PlusCircle size={14} />
        Opcionais de Upgrade (Sob Consulta)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="font-bold text-slate-900">Movimentação de Câmera</h4>
          <p className="text-slate-500 mt-1">Grua Telescópica, Cammate ou Steadicam.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900">Óptica Cinema</h4>
          <p className="text-slate-500 mt-1">Set de Lentes Prime para look cinematográfico.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900">Câmeras Extras</h4>
          <p className="text-slate-500 mt-1">Câmeras adicionais para cobertura ampla e opções de diferentes câmeras.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900">Conteúdo</h4>
          <p className="text-slate-500 mt-1">Criação de conteúdo 2D e 3D para LED e Realidade Aumentada.</p>
        </div>
      </div>
    </section>
  );
};

export default Extras;