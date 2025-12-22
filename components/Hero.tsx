import React from 'react';
import { MapPin, User, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative px-12 md:px-16 py-20 bg-slate-900 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      <div className="relative z-10 max-w-3xl">
        <div className="mb-6 inline-block border-l-4 border-brand-accent pl-4">
          <span className="text-brand-accent font-bold text-sm uppercase tracking-wider">Projeto de Projeção</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
          Galvão Bueno <br />
          <span className="text-slate-300">Entrevistas</span>
        </h1>

        <p className="text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
          Proposta técnica e comercial para locação de equipamento de projeção
          e suporte técnico para gravação de entrevistas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-700 pt-8">
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <User size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Cliente</span>
            </div>
            <p className="font-medium text-white">Alexandre Arrabal</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <MapPin size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Local</span>
            </div>
            <p className="font-medium text-white text-sm">Av. Dr. Chucri Zaidan, 940</p>
            <p className="text-sm text-slate-400">Torre 2, 6º andar - Vila Cordeiro, SP</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Calendar size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Execução</span>
            </div>
            <p className="font-medium text-white">04, 09, 18 Dez</p>
            <p className="text-sm text-slate-400">2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;