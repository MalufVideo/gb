import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="px-12 md:px-16 py-10 border-b-2 border-slate-100 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Logo Area */}
        <div>
          <img src="/img/on+av_logo_v3.png" alt="ON + AV Design" className="h-12 w-auto object-contain" />
        </div>

        {/* Document Meta */}
        <div className="text-right">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Proposta Comercial</h2>
          <p className="text-slate-500 font-mono text-xs mt-1">REF: #2025-GB-ENTREVISTAS</p>
          <p className="text-slate-500 font-mono text-xs">DATA: 04/12/2025</p>
        </div>
      </div>
    </header>
  );
};

export default Header;