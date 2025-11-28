/**
 * Sidebar Context
 * Context API-based sidebar state management replacing Zustand
 */

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SidebarContextType {
  // Desktop sidebar state (expanded/mini)
  isExpanded: boolean;
  // Mobile sidebar state (open/closed)
  isMobileOpen: boolean;
  // Active submenu IDs
  activeSubmenus: string[];
  
  // Actions
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleSubmenu: (id: string) => void;
  setActiveSubmenus: (ids: string[]) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SIDEBAR_STORAGE_KEY = 'south-center-sidebar';

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Initialize from localStorage
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.isExpanded !== undefined ? parsed.isExpanded : true;
      } catch {
        return true;
      }
    }
    return true;
  });

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const [activeSubmenus, setActiveSubmenusState] = useState<string[]>(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.activeSubmenus || [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Persist desktop state to localStorage
  useEffect(() => {
    localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      JSON.stringify({ isExpanded, activeSubmenus })
    );
  }, [isExpanded, activeSubmenus]);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const setSidebarExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const setMobileSidebarOpen = (open: boolean) => {
    setIsMobileOpen(open);
  };

  const toggleSubmenu = (id: string) => {
    setActiveSubmenusState((prev) =>
      prev.includes(id)
        ? prev.filter((menuId) => menuId !== id)
        : [...prev, id]
    );
  };

  const setActiveSubmenus = (ids: string[]) => {
    setActiveSubmenusState(ids);
  };

  const value: SidebarContextType = {
    isExpanded,
    isMobileOpen,
    activeSubmenus,
    toggleSidebar,
    setSidebarExpanded,
    toggleMobileSidebar,
    setMobileSidebarOpen,
    toggleSubmenu,
    setActiveSubmenus,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
