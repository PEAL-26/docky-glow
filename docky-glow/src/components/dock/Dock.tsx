import { useState, useCallback } from "react";
import { dockItems, type DockItem } from "@/data/dockItems";
import { DockItemComponent } from "./DockItemComponent";
import { toast } from "sonner";

export const Dock = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnterTrigger = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeaveDock = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleItemClick = useCallback((item: DockItem) => {
    // In a real Electron app, this would send an IPC message to main process
    toast.success(`Launching ${item.label}`, {
      description: `Command: ${item.command}`,
      duration: 2000,
    });
  }, []);

  // Separate apps from groups for visual organization
  const apps = dockItems.filter(item => item.type === "app" || item.type === "group");

  return (
    <>
      {/* Trigger zone - always visible at bottom */}
      <div 
        className="trigger-zone"
        onMouseEnter={handleMouseEnterTrigger}
      />

      {/* Dock container */}
      <div
        className={`dock-container ${isVisible ? 'visible-dock' : 'hidden-dock'}`}
        onMouseLeave={handleMouseLeaveDock}
      >
        <div className="dock-bar">
          {apps.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <DockItemComponent
                item={item}
                onItemClick={handleItemClick}
              />
              {/* Add separator before groups */}
              {item.type === "app" && apps[index + 1]?.type === "group" && (
                <div className="dock-separator" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
