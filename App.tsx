import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import FaturaLocacao from './components/FaturaLocacao';
import { Printer, FileText } from 'lucide-react';

const App: React.FC = () => {
  const [showFatura, setShowFatura] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  // Dados da fatura - apenas equipamentos (sem serviços com valores unitários)
  const faturaData = {
    faturaNumber: '000052',
    emissionDate: '02/12/2025',
    equipamentos: [
      'Projetor Panasonic PT-RZ21KU',
      'Lente Panasonic 21K ET-D75LE90 fixa (0.36:1)',
      'Licença Resolume 6',
      'Notebook Dell Gamer G5 i7 2.9 GHz',
    ],
    valorTotal: 13600.00,
    vencimento: 'A vista - R$ 13.600,00',
  };

  return (
    <div className="min-h-screen py-8 px-4 flex justify-center items-start print:p-0 print:block">
      
      {/* Print Button - Hidden in Print Mode */}
      <button 
        onClick={handlePrint}
        className="no-print fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-full shadow-xl hover:bg-slate-800 transition-colors flex items-center gap-2 font-medium text-sm"
      >
        <Printer size={18} />
        Salvar PDF
      </button>

      {/* Document Container */}
      <div className="w-full max-w-[900px] bg-white print-shadow rounded-sm overflow-hidden flex flex-col print:shadow-none print:w-full print:max-w-none">
        <Header />
        <main className="flex-1">
          <Hero />
          <div className="px-12 md:px-16 py-8 space-y-12 print:px-12 print:py-6 print:space-y-8">
            <Pricing />
            <Timeline />

            {/* Gerar Fatura Button */}
            <div className="no-print flex justify-center pt-4">
              <button
                onClick={() => setShowFatura(true)}
                className="bg-brand-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-amber-600 transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-wide"
              >
                <FileText size={18} />
                Gerar Fatura de Locação
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Fatura Modal */}
      <FaturaLocacao
        isOpen={showFatura}
        onClose={() => setShowFatura(false)}
        {...faturaData}
      />
    </div>
  );
};

export default App;