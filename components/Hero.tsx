import React from 'react';
import { MapPin, User, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative px-12 md:px-16 py-20 bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/bg_estudio_drako.webp"
          alt="Estúdio Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className="mb-6 inline-block border-l-4 border-brand-accent pl-4">
          <span className="text-brand-accent font-bold text-sm uppercase tracking-wider">Projeto de Lançamento</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
          Ipiranga <br />
          <span className="text-slate-300">Clube VIP 2026</span>
        </h1>

        <p className="text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
          Proposta técnica e comercial para locação de estúdio,
          painéis de LED de alta resolução e sistemas de mídia server Disguise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-700 pt-8">
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <User size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Para</span>
            </div>
            <p className="font-medium text-white">Aline Oliveira</p>
            <p className="text-sm text-slate-400">Produtora Executiva</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <MapPin size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Local</span>
            </div>
            <p className="font-medium text-white">Estúdio ON + AV Design</p>
            <p className="text-sm text-slate-400">São Paulo, SP</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Calendar size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Execução</span>
            </div>
            <p className="font-medium text-white">30 Mar - 01 Abr</p>
            <p className="text-sm text-slate-400">2026</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;