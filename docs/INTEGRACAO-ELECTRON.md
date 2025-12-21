# Integração Electron - Resumo das Mudanças

Este documento descreve as mudanças realizadas para integrar Electron.js ao projeto Vite existente.

## 📁 Arquivos Criados

### Electron
- `electron/main.ts` - Processo principal do Electron com lógica de janela frameless e detecção de mouse
- `electron/preload.ts` - Script de preload para comunicação IPC segura
- `electron/tsconfig.json` - Configuração TypeScript para o Electron

### Scripts
- `scripts/build-electron.js` - Script para compilar os arquivos TypeScript do Electron

### Configuração
- `electron-builder.json` - Configuração do electron-builder para criar executáveis
- `dock.json` - Arquivo de exemplo com estrutura de dados do dock

### Documentação
- `README-ELECTRON.md` - Documentação completa do projeto Electron
- `src/types/electron.d.ts` - Tipos TypeScript para APIs do Electron

## 🔄 Arquivos Modificados

### `package.json`
- Adicionadas dependências: `electron`, `electron-builder`, `concurrently`, `wait-on`, `esbuild`
- Adicionados scripts:
  - `electron:dev` - Executa Electron em modo desenvolvimento
  - `electron:compile` - Compila arquivos Electron
  - `electron:build` - Cria executáveis
  - `electron:preview` - Preview com build de produção
- Adicionado campo `main` apontando para o arquivo principal do Electron

### `src/data/dockItems.ts`
- Modificado para carregar dados via IPC do Electron
- Adicionada função `loadDockItems()` que detecta se está rodando no Electron
- Mantém compatibilidade com modo web (desenvolvimento)

### `src/components/dock/Dock.tsx`
- Atualizado para usar IPC para executar comandos
- Detecta automaticamente se está rodando no Electron
- Remove lógica de mostrar/esconder quando no Electron (controlado pelo main process)

### `src/pages/Index.tsx`
- Atualizado para funcionar tanto no Electron quanto no navegador
- Remove conteúdo de demonstração quando no Electron

### `.gitignore`
- Adicionadas entradas para arquivos do Electron:
  - `dist-electron`
  - `release`
  - Arquivos de build (`.app`, `.dmg`, `.exe`, etc.)

## 🎯 Funcionalidades Implementadas

### Janela Electron
- ✅ Frameless e transparente
- ✅ Always on top
- ✅ Skip taskbar
- ✅ Largura igual à tela
- ✅ Altura fixa (80px)

### Detecção de Mouse
- ✅ Janela invisível de trigger na parte inferior (2px)
- ✅ Dock aparece quando mouse entra na zona de trigger
- ✅ Dock desaparece quando mouse sai da área

### Comunicação IPC
- ✅ Carregar itens do dock (`dock:load-items`)
- ✅ Salvar itens do dock (`dock:save-items`)
- ✅ Executar comandos (`dock:execute-command`)
- ✅ Obter tamanho da tela (`dock:get-screen-size`)

### Execução de Comandos
- ✅ Suporte multiplataforma (Windows, macOS, Linux)
- ✅ Execução segura via processo main
- ✅ Tratamento de erros

## 🚀 Como Usar

### Desenvolvimento
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run electron:dev
```

### Build
```bash
# Compilar para produção
npm run electron:build
```

## 📝 Notas Importantes

1. **Arquivo dock.json**: É criado automaticamente no diretório de dados do usuário na primeira execução
2. **Modo Web**: O projeto ainda funciona no navegador para desenvolvimento da UI
3. **Detecção Automática**: O código detecta automaticamente se está rodando no Electron
4. **Comandos**: Ajuste os comandos no `dock.json` conforme seu sistema operacional

## 🔧 Estrutura de Dados

O arquivo `dock.json` segue esta estrutura:

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
    "children": [...]
  }
]
```

## ⚠️ Troubleshooting

- Se o dock não aparecer, verifique se está executando em modo Electron (não apenas no navegador)
- Comandos podem precisar de ajustes conforme o sistema operacional
- No Windows, use `start chrome` ao invés de apenas `chrome`
- No macOS, use `open -a "Nome do App"` para aplicativos

