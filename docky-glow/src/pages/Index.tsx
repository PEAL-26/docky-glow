import { Dock } from "@/components/dock/Dock";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Desktop wallpaper simulation */}
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

      {/* Desktop content area */}
      <div className="relative z-10 p-8">
        <div className="max-w-2xl mx-auto mt-20 text-center">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Dock Demo
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Mova o mouse para a parte inferior da tela para revelar o dock.
          </p>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left">
            <h2 className="text-lg font-medium text-foreground mb-4">Comportamentos:</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>O dock aparece ao encostar o mouse no limite inferior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>O dock desaparece ao mover o mouse para fora</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Hover nos ícones mostra tooltip e efeito de escala</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Clique em um app mostra o comando que seria executado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Clique em um grupo (🛠️ ou ⚙️) abre um submenu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Indicador de "running" (bolinha azul) abaixo dos apps ativos</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-6 text-left">
            <h2 className="text-lg font-medium text-foreground mb-4">Estrutura do dock.json:</h2>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
{`{
  "id": "vscode",
  "label": "VS Code",
  "icon": "💻",
  "type": "app",
  "command": "code",
  "isRunning": true
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* The Dock component */}
      <Dock />
    </div>
  );
};

export default Index;
