import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-12 md:px-16 py-8 border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="flex justify-end text-xs text-slate-500">
        <a href="https://onav.com.br" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-accent transition-colors font-medium">
          onav.com.br
        </a>
      </div>
    </footer>
  );
};

export default Footer;