import { useState, useCallback, useEffect } from "react";
import { loadDockItems, type DockItem } from "@/data/dockItems";
import { DockItemComponent } from "./DockItemComponent";
import { toast } from "sonner";

export const Dock = () => {
  const [dockItems, setDockItems] = useState<DockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar itens do dock ao montar o componente
  useEffect(() => {
    const fetchDockItems = async () => {
      try {
        const items = await loadDockItems();
        setDockItems(items);
      } catch (error) {
        console.error("Erro ao carregar itens do dock:", error);
        toast.error("Erro ao carregar itens do dock");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDockItems();
  }, []);

  useEffect(() => {
    const dockBar = document.getElementById("dock-bar");
    
    if (isLoading) return;
    if (!dockBar) return;

    dockBar.addEventListener("mouseenter", () => {
      console.log("Enter");
      window.electronAPI?.setClickThrough?.(false);
    });
    dockBar.addEventListener("mouseleave", () => {
      window.electronAPI?.setClickThrough?.(true, { forward: true });
      console.log("LostFocus");
    });
  }, [isLoading]);

  const handleItemClick = useCallback(async (item: DockItem) => {
    if (item.type === "app" && item.command) {
      if (typeof window !== "undefined" && window.electronAPI) {
        try {
          const result = await window.electronAPI.executeCommand(item.command);
          if (result.success) {
            toast.success(`${item.label} iniciado`, {
              duration: 2000,
            });
          } else {
            toast.error(`Erro ao executar ${item.label}`, {
              description: result.error,
              duration: 3000,
            });
          }
        } catch (error) {
          console.error("Erro ao executar comando:", error);
          toast.error(`Erro ao executar ${item.label}`);
        }
      } else {
        toast.success(`Launching ${item.label}`, {
          description: `Command: ${item.command}`,
          duration: 2000,
        });
      }
    }
  }, []);

  const apps = dockItems.filter(
    (item) => item.type === "app" || item.type === "group"
  );

  if (isLoading) {
    return null; // Ou um loading spinner
  }

  return (
    <div className="dock-container visible-dock">
      <div id="dock-bar" className="dock-bar">
        {apps.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <DockItemComponent item={item} onItemClick={handleItemClick} />
            {item.type === "app" && apps[index + 1]?.type === "group" && (
              <div className="dock-separator" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
