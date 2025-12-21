import { Dock } from "@/components/dock/Dock";
import { useEffect, useState } from "react";

const Index = () => {
  const isElectron = typeof window !== "undefined" && window.electronAPI;

  const [isVisible, setIsVisible] = useState(false);

  const handleShow = () => {
    setIsVisible(true);
    if (!isElectron) return;
    window.electronAPI.showDock();
    window.electronAPI?.setClickThrough?.(false);
  };

  const handleHide = () => {
    setIsVisible(false);
    if (!isElectron) return;
    window.electronAPI.hideDock();
    window.electronAPI?.setClickThrough?.(true, { forward: true });
  };

  useEffect(() => {
    if (isElectron) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // // Exemplo: Recarregar a aplicação com Ctrl+R ou Cmd+R
        // if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        //   e.preventDefault();
        //   window.location.reload();
        // }
        // // Exemplo: Abrir DevTools com F12
        // if (e.key === "F12") {
        //   e.preventDefault();
        //   // Este é um exemplo, a abertura do DevTools é geralmente
        //   // tratada no processo principal, mas pode ser solicitada via IPC.
        // }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isElectron]);

  console.log({ isVisible });

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {isElectron ? (
        <>
          {/* Zona para esconder o dock (ocupa a maior parte da tela) */}
          <div
            className="absolute top-0 left-0 right-0 bottom-[5px] z-0"
            onMouseEnter={handleHide}
          />
          {/* Zona para mostrar o dock (faixa fina na parte inferior) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[5px] z-1"
            onMouseEnter={handleShow}
          />
        </>
      ) : (
        <>
          {/* Desktop wallpaper simulation - apenas no modo web */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 20%, hsl(210 100% 20% / 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, hsl(280 100% 15% / 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, hsl(220 30% 8%) 0%, hsl(220 30% 4%) 100%)
              `,
            }}
          />
          {/* Desktop content area - apenas no modo web */}
          <div className="relative z-10 p-8">
            <div className="max-w-2xl mx-auto mt-20 text-center">
              <h1 className="text-4xl font-semibold text-foreground mb-4">
                Dock Demo
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Mova o mouse para a parte inferior da tela para revelar o dock.
              </p>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left">
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Comportamentos:
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      O dock aparece ao encostar o mouse no limite inferior
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>O dock desaparece ao mover o mouse para fora</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Hover nos ícones mostra tooltip e efeito de escala
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Clique em um app executa o comando correspondente
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Clique em um grupo abre um submenu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <Dock />
    </div>
  );
};

export default Index;
