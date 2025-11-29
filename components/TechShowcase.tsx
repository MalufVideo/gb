import React from 'react';
import { Layers, Monitor } from 'lucide-react';

const TechShowcase: React.FC = () => {
  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
        <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold">1</span>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">O Diferencial Tecnológico</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Ecossistema Disguise</h3>
          <p className="text-slate-600 leading-relaxed text-justify mb-4 text-sm">
            Para um evento que busca encantamento e engajamento de 52k usuários, a escolha do servidor de mídia é crucial.
            Nossa proposta baseia-se na plataforma <strong>Disguise</strong>, o padrão mundial para grandes shows e broadcasts televisivos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-800">
                <Monitor className="text-slate-400" size={18} />
                <h4 className="font-bold text-sm">Opção A: Cenário 2D</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                O servidor <strong>Disguise VX</strong> garante gestão pixel-perfect, mudanças instantâneas e PIPs dinâmicos.
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-800">
                <Layers className="text-slate-400" size={18} />
                <h4 className="font-bold text-sm">Opção B: 3D & xR</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Servidores <strong>RXII + VX</strong> renderizam Unreal Engine em tempo real para extensão de cenário e Realidade Aumentada.
              </p>
            </div>
          </div>
        </div>

        {/* LED Wall Focus */}
        <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Canvas Digital Curvo</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Uma imersão visual sem precedentes com nosso painel de LED de altíssima taxa de atualização, garantindo imagens perfeitas para as câmeras sem moiré ou flickering.
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Dimensões Totais</div>
                  <div className="text-xl font-display font-bold text-slate-900">16m x 5m</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pixel Pitch</div>
                  <div className="text-xl font-display font-bold text-slate-900">2.6mm <span className="text-sm text-slate-500 font-sans font-normal">HDR</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Taxa de Atualização</div>
                  <div className="text-xl font-display font-bold text-slate-900">7680 Hz</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Resolução</div>
                  <div className="text-xl font-display font-bold text-slate-900">6K Ready</div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <figure className="w-full">
                <div className="aspect-video bg-slate-800 rounded overflow-hidden border border-slate-300 relative shadow-inner">
                  <img
                    src="/img/estudio_volume_led.webp"
                    alt="Painel de LED 16x5m"
                    className="w-full h-full object-cover opacity-90"
                  />
                  {/* Overlay for technical look */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
                </div>
                <figcaption className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-widest">
                  Fig. 1: Configuração Curva 16x5m
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Second LED Wall Focus */}
        <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
          <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Painel de LED Reto</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Complementando o cenário principal, oferecemos um painel reto de alta resolução, ideal para apresentações, logos e conteúdos auxiliares com a mesma qualidade de imagem.
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Dimensões Totais</div>
                  <div className="text-xl font-display font-bold text-slate-900">8m x 4m</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pixel Pitch</div>
                  <div className="text-xl font-display font-bold text-slate-900">2.6mm <span className="text-sm text-slate-500 font-sans font-normal">HDR</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Taxa de Atualização</div>
                  <div className="text-xl font-display font-bold text-slate-900">7680 Hz</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Resolução</div>
                  <div className="text-xl font-display font-bold text-slate-900">4K Ready</div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <figure className="w-full">
                <div className="aspect-video bg-slate-800 rounded overflow-hidden border border-slate-300 relative shadow-inner">
                  <img
                    src="/img/estudio2.webp"
                    alt="Painel de LED Reto 8x4m"
                    className="w-full h-full object-cover opacity-90"
                  />
                  {/* Overlay for technical look */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
                </div>
                <figcaption className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-widest">
                  Fig. 2: Configuração Reta 8x4m
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;