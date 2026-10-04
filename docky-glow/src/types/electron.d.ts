export interface ElectronAPI {
  loadDockItems: () => Promise<DockItem[]>;
  saveDockItems: (
    items: DockItem[]
  ) => Promise<{ success: boolean; error?: string }>;
  executeCommand: (
    command: string
  ) => Promise<{ success: boolean; error?: string }>;
  getScreenSize: () => Promise<{ width: number; height: number }>;
  setClickThrough: (ignore: boolean, options?: Record<string, unknown>) => void;
}

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  type: "app" | "group";
  command?: string;
  isRunning?: boolean;
  children?: DockItem[];
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
