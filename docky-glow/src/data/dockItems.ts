export interface DockItem {
  id: string;
  label: string;
  icon: string;
  type: "app" | "group";
  command?: string;
  isRunning?: boolean;
  children?: DockItem[];
}

export const dockItems: DockItem[] = [
  {
    id: "finder",
    label: "Finder",
    icon: "🗂️",
    type: "app",
    command: "open /System/Applications/Finder.app",
    isRunning: true,
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "⬛",
    type: "app",
    command: "open -a Terminal",
    isRunning: true,
  },
  {
    id: "vscode",
    label: "VS Code",
    icon: "💻",
    type: "app",
    command: "code",
    isRunning: true,
  },
  {
    id: "browser",
    label: "Browser",
    icon: "🌐",
    type: "app",
    command: "open -a 'Google Chrome'",
  },
  {
    id: "spotify",
    label: "Spotify",
    icon: "🎵",
    type: "app",
    command: "open -a Spotify",
  },
  {
    id: "slack",
    label: "Slack",
    icon: "💬",
    type: "app",
    command: "open -a Slack",
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
        command: "open -a Docker",
      },
      {
        id: "postman",
        label: "Postman",
        icon: "📮",
        type: "app",
        command: "open -a Postman",
      },
      {
        id: "figma",
        label: "Figma",
        icon: "🎨",
        type: "app",
        command: "open -a Figma",
      },
      {
        id: "notion",
        label: "Notion",
        icon: "📝",
        type: "app",
        command: "open -a Notion",
      },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: "⚙️",
    type: "group",
    children: [
      {
        id: "settings",
        label: "Settings",
        icon: "⚙️",
        type: "app",
        command: "open /System/Applications/System Preferences.app",
      },
      {
        id: "activity",
        label: "Activity Monitor",
        icon: "📊",
        type: "app",
        command: "open -a 'Activity Monitor'",
      },
      {
        id: "disk",
        label: "Disk Utility",
        icon: "💾",
        type: "app",
        command: "open -a 'Disk Utility'",
      },
    ],
  },
];
