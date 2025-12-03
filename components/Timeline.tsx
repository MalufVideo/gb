import React from 'react';

const Timeline: React.FC = () => {
  return (
    <section>
       <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">2</span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Cronograma</h2>
      </div>
      
      <div className="bg-slate-50 border border-slate-200 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-3 w-32">Data</th>
              <th className="px-6 py-3">Atividade</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 font-mono text-slate-600">03/12/2025</td>
              <td className="px-6 py-4">
                <strong className="block text-slate-900">Prelight / Visita Técnica</strong>
                <span className="text-slate-500 text-xs">Reconhecimento do local e preparação do setup.</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="inline-block px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs font-bold">PREVISTO</span>
              </td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-6 py-4 font-mono text-brand-accent font-bold">04/12/2025</td>
              <td className="px-6 py-4">
                <strong className="block text-brand-accent">Filmagem</strong>
                <span className="text-slate-500 text-xs">Gravação das entrevistas com projeção.</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="inline-block px-2 py-1 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded text-xs font-bold">EVENTO</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Timeline;