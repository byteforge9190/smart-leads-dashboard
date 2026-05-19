import React, { useState } from "react";
import { Moon, Sun, Menu, Zap } from "lucide-react";
import { useUser } from "../../store/user.store";
import Sidebar from "./Sidebar";
import { useGetUserDetails } from "../../components/User-details.hook";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const darkMode = useUser((state) => state.darkMode);
  const toggleDarkMode = useUser((state) => state.toggleDarkMode);

  useGetUserDetails();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-secondary dark:bg-surface-dark">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white dark:bg-surface-dark-secondary border-r border-slate-100 dark:border-slate-800 flex-shrink-0">
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full bg-white dark:bg-surface-dark-secondary border-r border-slate-100 dark:border-slate-800 animate-slide-in-right">
            <Sidebar
              setSidebarOpen={setSidebarOpen}
              sidebarOpen={sidebarOpen}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-surface-dark-secondary border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-display font-bold text-slate-800 dark:text-slate-100">
              SmartLeads
            </span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {darkMode ? (
              <Sun size={18} className="text-slate-500" />
            ) : (
              <Moon size={18} className="text-slate-500" />
            )}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
