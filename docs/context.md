**PROMPT**

Cria um aplicativo desktop multiplataforma (Windows, macOS e Linux) usando **Electron.js + React.js + Vite + TailwindCSS**.

O aplicativo é um **dock simples de aplicativos**, inspirado no dock do macOS, mas **sem animações complexas**. O foco é funcionalidade básica e estabilidade.

### Requisitos funcionais

* O dock fica **fixo na parte inferior da tela (bottom)**.
* O dock inicia **oculto**.
* O dock **aparece automaticamente quando o mouse encosta no limite inferior da tela**.
* O dock **desaparece quando o mouse sai da área do dock**.
* O dock mostra uma **lista horizontal de ícones**.
* Cada ícone pode ser:

  * um **aplicativo** (abre um executável ou comando do sistema)
  * um **grupo** (sub-dock) que contém outros itens
* Ao clicar em um grupo, os sub-itens são exibidos **acima do dock**, em uma lista simples.
* Clique em um item de aplicativo executa o comando correspondente via Electron.

### Requisitos técnicos

* Janela Electron:

  * `frameless`
  * `transparent`
  * `alwaysOnTop`
  * `skipTaskbar`
  * largura igual à tela
  * altura fixa (ex: 70–90px)
* O comportamento de ocultar/mostrar deve ser implementado **no processo main do Electron**.
* A detecção do mouse deve ser feita usando uma **área mínima visível (1–2px) no bottom da tela**, sem dependências externas de mouse global.
* Comunicação entre renderer (React) e main via **IPC**.

### Interface (UI)

* Estilo simples, escuro, discreto.
* Ícones centralizados.
* Hover com efeito leve (ex: `scale(1.05)`).
* Transições curtas (150–200ms).
* Sem efeitos avançados de magnificação ou física.

### Estrutura de dados

* Os itens do dock devem ser carregados a partir de um arquivo local `dock.json`.
* Estrutura básica:

  * id
  * label
  * iconPath
  * type (`app` ou `group`)
  * command (para apps)
  * children (para grupos)
* Não usar banco de dados nem ORM.

### Entregáveis esperados

* Estrutura de pastas do projeto.
* Configuração completa do Electron com Vite.
* Código do processo `main` do Electron.
* Código do frontend em React com Tailwind.
* Exemplo de `dock.json`.
* Instruções claras de como rodar o projeto em modo desenvolvimento.

Gerar apenas código funcional e explicações objetivas.
Evitar conceitos teóricos desnecessários e evitar animações complexas.
