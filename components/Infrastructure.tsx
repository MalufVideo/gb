import React from 'react';
import { Mic2, Wifi, Coffee, ShieldCheck } from 'lucide-react';

const Infrastructure: React.FC = () => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">2</span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Infraestrutura & Áudio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Para garantir a qualidade broadcast e o conforto dos talentos, nossa proposta inclui infraestrutura completa de estúdio e sistemas de áudio de alta fidelidade.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 text-brand-accent"><Mic2 size={16} /></div>
              <div>
                <strong className="text-slate-900 text-sm block">Áudio Premium</strong>
                <span className="text-slate-500 text-sm">7x Microfones Shure SLXD, Console Digital 16ch e Técnico dedicado.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-slate-400"><Coffee size={16} /></div>
              <div>
                <strong className="text-slate-900 text-sm block">Conforto VIP</strong>
                <span className="text-slate-500 text-sm">Camarins exclusivos e Sala de Produção mobiliada.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-slate-400"><ShieldCheck size={16} /></div>
              <div>
                <strong className="text-slate-900 text-sm block">Segurança</strong>
                <span className="text-slate-500 text-sm">Estúdio com AVCB vigente e gerador em stand-by.</span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <figure className="w-full">
            <div className="rounded border border-slate-200 overflow-hidden bg-slate-100">
              <img
                src="/img/camarim.webp"
                alt="Camarim VIP"
                className="w-full h-48 object-cover"
              />
            </div>
            <figcaption className="text-xs text-slate-500 mt-2 italic">
              Figura 2: Camarim e área de convivência disponível para a equipe.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;