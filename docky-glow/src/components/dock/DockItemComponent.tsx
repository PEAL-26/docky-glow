import { useState } from "react";
import type { DockItem } from "@/data/dockItems";
import { DockSubmenu } from "./DockSubmenu";

interface DockItemComponentProps {
  item: DockItem;
  onItemClick: (item: DockItem) => void;
}

export const DockItemComponent = ({ item, onItemClick }: DockItemComponentProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleClick = () => {
    if (item.type === "group") {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else {
      onItemClick(item);
    }
  };

  const handleSubmenuItemClick = (subItem: DockItem) => {
    onItemClick(subItem);
    setIsSubmenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="dock-item hover:cursor-pointer" onClick={handleClick}>
        <div className="dock-icon hover:cursor-pointer">
          {item.icon}
        </div>
        <span className="dock-tooltip">{item.label}</span>
        {item.isRunning && <div className="running-indicator" />}
      </div>

      {item.type === "group" && isSubmenuOpen && (
        <DockSubmenu
          items={item.children || []}
          onItemClick={handleSubmenuItemClick}
          onClose={() => setIsSubmenuOpen(false)}
        />
      )}
    </div>
  );
};
