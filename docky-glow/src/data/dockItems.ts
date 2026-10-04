export interface DockItem {
  id: string;
  label: string;
  icon: string;
  type: "app" | "group";
  command?: string;
  isRunning?: boolean;
  children?: DockItem[];
}

const getPlatformCommand = (commands: {
  windows: string;
  mac: string;
  linux: string;
}) => {
  if (typeof navigator === "undefined") {
    return commands.linux;
  }

  const platform = navigator.platform.toLowerCase();

  if (platform.includes("win")) {
    return commands.windows;
  }

  if (platform.includes("mac")) {
    return commands.mac;
  }

  return commands.linux;
};

// Função para carregar itens do dock via IPC (Electron) ou usar dados padrão (web)
export const loadDockItems = async (): Promise<DockItem[]> => {
  // Verificar se estamos no Electron
  if (typeof window !== "undefined" && window.electronAPI) {
    try {
      const items = await window.electronAPI.loadDockItems();
      return items;
    } catch (error) {
      console.error("Erro ao carregar itens do dock:", error);
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
    command: getPlatformCommand({
      windows: "code",
      mac: 'open -a "Visual Studio Code"',
      linux: "code",
    }),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "⬛",
    type: "app",
    command: getPlatformCommand({
      windows: "cmd",
      mac: "open -a Terminal",
      linux: "gnome-terminal",
    }),
  },
  {
    id: "browser",
    label: "Browser",
    icon: "🌐",
    type: "app",
    command: getPlatformCommand({
      windows: "start chrome",
      mac: 'open -a "Google Chrome"',
      linux: "google-chrome",
    }),
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
