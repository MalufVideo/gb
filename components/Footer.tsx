import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-12 md:px-16 py-8 border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-500">
        <div>
          <p className="font-bold text-slate-700 uppercase mb-2">Condições Gerais</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Validade da proposta: 15 dias.</li>
            <li>Forma de pagamento: A combinar.</li>
            <li>Cancelamento: Sujeito a multa contratual.</li>
          </ul>
        </div>
        <div className="text-right flex flex-col justify-end">
          <a href="https://onav.com.br" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-accent transition-colors font-medium">
            onav.com.br
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;