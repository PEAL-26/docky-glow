# Docky Glow - Aplicativo Desktop Electron

Aplicativo desktop multiplataforma (Windows, macOS e Linux) usando Electron.js + React.js + Vite + TailwindCSS.

## 📋 Requisitos

- Node.js 18+ 
- npm ou yarn

## 🚀 Instalação

1. Instale as dependências:
```bash
npm install
```

## 🛠️ Desenvolvimento

### Modo Web (desenvolvimento)
Para testar apenas a interface web:
```bash
npm run dev
```
Acesse `http://localhost:8080` no navegador.

### Modo Electron (desplevimento)
Para executar o aplicativo Electron em modo desenvolvimento:
```bash
npm run electron:dev
```

Este comando irá:
1. Iniciar o servidor Vite na porta 8080
2. Compilar os arquivos do Electron
3. Iniciar o aplicativo Electron

## 📦 Build para Produção

### Compilar apenas o frontend:
```bash
npm run build
```

### Compilar e criar executável:
```bash
npm run electron:build
```

Os executáveis serão gerados na pasta `release/`.

## ⚙️ Configuração

### Arquivo dock.json

O aplicativo carrega os itens do dock a partir de um arquivo `dock.json` que é criado automaticamente no diretório de dados do usuário:

- **Windows**: `%APPDATA%/docky-glow/dock.json`
- **macOS**: `~/Library/Application Support/docky-glow/dock.json`
- **Linux**: `~/.config/docky-glow/dock.json`

### Estrutura do dock.json

```json
[
  {
    "id": "vscode",
    "label": "VS Code",
    "icon": "💻",
    "type": "app",
    "command": "code"
  },
  {
    "id": "dev-tools",
    "label": "Dev Tools",
    "icon": "🛠️",
    "type": "group",
    "children": [
      {
        "id": "docker",
        "label": "Docker",
        "icon": "🐳",
        "type": "app",
        "command": "docker"
      }
    ]
  }
]
```

### Campos:

- **id**: Identificador único do item
- **label**: Nome exibido no tooltip
- **icon**: Emoji ou ícone (atualmente suporta emojis)
- **type**: `"app"` ou `"group"`
- **command**: Comando a ser executado (apenas para `type: "app"`)
- **children**: Array de itens filhos (apenas para `type: "group"`)

## 🎯 Funcionalidades

- ✅ Dock fixo na parte inferior da tela
- ✅ Aparece automaticamente quando o mouse encosta no limite inferior
- ✅ Desaparece quando o mouse sai da área do dock
- ✅ Suporte a aplicativos e grupos (sub-menus)
- ✅ Execução de comandos do sistema
- ✅ Interface escura e discreta
- ✅ Transições suaves

## 🐛 Troubleshooting

### O dock não aparece
- Verifique se o aplicativo está rodando em modo Electron (não apenas no navegador)
- No Windows, certifique-se de que a janela não está bloqueada pelo antivírus

### Comandos não executam
- Verifique se o comando está correto no `dock.json`
- No Windows, use comandos como `start chrome` ou `code`
- No macOS, use `open -a "Nome do App"`
- No Linux, use o nome do executável diretamente

### Erro ao compilar Electron
- Certifique-se de ter todas as dependências instaladas: `npm install`
- Verifique se o Node.js está na versão 18+

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor Vite (modo web)
- `npm run build` - Compila o frontend
- `npm run electron:dev` - Executa Electron em modo desenvolvimento
- `npm run electron:compile` - Compila apenas os arquivos Electron
- `npm run electron:preview` - Executa Electron com build de produção
- `npm run electron:build` - Compila tudo e cria executáveis

## 🔧 Estrutura do Projeto

```
docky-glow/
├── electron/           # Código do processo main do Electron
│   ├── main.ts        # Processo principal
│   └── preload.ts     # Script de preload para IPC
├── src/               # Código React
│   ├── components/    # Componentes React
│   ├── data/          # Dados e utilitários
│   └── types/         # Tipos TypeScript
├── scripts/           # Scripts de build
├── dock.json          # Exemplo de configuração
└── package.json       # Dependências e scripts
```

## 📄 Licença

Este projeto é de código aberto.

