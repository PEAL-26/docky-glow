import { app, BrowserWindow, ipcMain, screen } from "electron";
import * as path from "path";
import * as fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

let mainWindow: BrowserWindow | null = null;

// Caminho para o arquivo dock.json
const getDockJsonPath = () => {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "dock.json");
};

// Criar dock.json padrão se não existir
const ensureDockJson = () => {
  const dockJsonPath = getDockJsonPath();
  if (!fs.existsSync(dockJsonPath)) {
    const defaultDock = [
      {
        id: "vscode",
        label: "VS Code",
        icon: "💻",
        type: "app",
        command:
          process.platform === "win32"
            ? "code"
            : process.platform === "darwin"
            ? 'open -a "Visual Studio Code"'
            : "code",
      },
      {
        id: "terminal",
        label: "Terminal",
        icon: "⬛",
        type: "app",
        command:
          process.platform === "win32"
            ? "cmd"
            : process.platform === "darwin"
            ? "open -a Terminal"
            : "gnome-terminal",
      },
      {
        id: "browser",
        label: "Browser",
        icon: "🌐",
        type: "app",
        command:
          process.platform === "win32"
            ? "start chrome"
            : process.platform === "darwin"
            ? 'open -a "Google Chrome"'
            : "google-chrome",
      },
    ];
    fs.writeFileSync(dockJsonPath, JSON.stringify(defaultDock, null, 2));
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Inicialmente oculto
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setIgnoreMouseEvents(true, { forward: true }); // Ignora eventos do mouse por padrão
  // mainWindow.hide();

  // Carregar a aplicação
  if (process.env.NODE_ENV === "production") {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:8080");
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  ensureDockJson();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("set-ignore-mouse-events", (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  win.setIgnoreMouseEvents(ignore, options);
});

ipcMain.handle("dock:load-items", async () => {
  try {
    const dockJsonPath = getDockJsonPath();
    const data = fs.readFileSync(dockJsonPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao carregar dock.json:", error);
    return [];
  }
});

ipcMain.handle("dock:save-items", async (_event, items: unknown[]) => {
  try {
    const dockJsonPath = getDockJsonPath();
    fs.writeFileSync(dockJsonPath, JSON.stringify(items, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar dock.json:", error);
    return { success: false, error: String(error) };
  }
});

ipcMain.handle("dock:execute-command", async (_event, command: string) => {
  try {
    if (!command.trim()) {
      return { success: false, error: "Comando vazio" };
    }

    await execAsync(command, { shell: true });

    return { success: true };
  } catch (error: Error) {
    console.error("Erro ao executar comando:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("dock:get-screen-size", () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  return {
    width: primaryDisplay.workAreaSize.width,
    height: primaryDisplay.workAreaSize.height,
  };
});
