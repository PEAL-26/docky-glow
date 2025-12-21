import { useEffect, useRef } from "react";
import type { DockItem } from "@/data/dockItems";

interface DockSubmenuProps {
  items: DockItem[];
  onItemClick: (item: DockItem) => void;
  onClose: () => void;
}

export const DockSubmenu = ({ items, onItemClick, onClose }: DockSubmenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={ref} className="dock-submenu">
      {items.map((item) => (
        <div
          key={item.id}
          className="dock-submenu-item"
          onClick={() => onItemClick(item)}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
