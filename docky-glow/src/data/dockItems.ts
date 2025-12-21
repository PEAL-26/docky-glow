export interface DockItem {
  id: string;
  label: string;
  icon: string;
  type: "app" | "group";
  command?: string;
  isRunning?: boolean;
  children?: DockItem[];
}

// Função para carregar itens do dock via IPC (Electron) ou usar dados padrão (web)
export const loadDockItems = async (): Promise<DockItem[]> => {
  // Verificar se estamos no Electron
  if (typeof window !== 'undefined' && window.electronApi) {
    try {
      const items = await window.electronApi.loadDockItems();
      return items;
    } catch (error) {
      console.error('Erro ao carregar itens do dock:', error);
      return getDefaultDockItems();
    }
  }
  
  // Fallback para desenvolvimento web
  return getDefaultDockItems();
};

// Itens padrão para desenvolvimento web
const getDefaultDockItems = (): DockItem[] => [
  {
    id: "vscode",
    label: "VS Code",
    icon: "💻",
    type: "app",
    command: "code",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "⬛",
    type: "app",
    command: "cmd",
  },
  {
    id: "browser",
    label: "Browser",
    icon: "🌐",
    type: "app",
    command: "start chrome",
  },
  {
    id: "dev-tools",
    label: "Dev Tools",
    icon: "🛠️",
    type: "group",
    children: [
      {
        id: "docker",
        label: "Docker",
        icon: "🐳",
        type: "app",
        command: "docker",
      },
      {
        id: "postman",
        label: "Postman",
        icon: "📮",
        type: "app",
        command: "postman",
      },
    ],
  },
];

// Exportar itens padrão para compatibilidade
export const dockItems: DockItem[] = getDefaultDockItems();
