import { contextBridge, ipcRenderer } from 'electron';

// Expor APIs seguras para o renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Carregar itens do dock
  loadDockItems: () => ipcRenderer.invoke('dock:load-items'),
  
  // Salvar itens do dock
  saveDockItems: (items: never[]) => ipcRenderer.invoke('dock:save-items', items),
  
  // Executar comando
  executeCommand: (command: string) => ipcRenderer.invoke('dock:execute-command', command),
  
  // Obter tamanho da tela
  getScreenSize: () => ipcRenderer.invoke('dock:get-screen-size'),
  setClickThrough: (ignore: boolean, options?: Record<string, never>) =>{
    ipcRenderer.send("set-ignore-mouse-events", ignore, options);
  },
  // Controlar visibilidade do dock
  showDock: () => ipcRenderer.send('show-dock'),
  hideDock: () => ipcRenderer.send('hide-dock'),
});



