import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarMainNav from "./SidebarMainNav";
import SidebarClassroomNav from "./SidebarClassroomNav";
import SidebarUtilityNav from "./SidebarUtilityNav";
import SidebarUserProfile from "./SidebarUserProfile";
import SidebarAdminNav from "./SidebarAdminNav";
import { useUser } from "@/contexts/UserContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const { userRole } = useUser();
  
  // Close sidebar on mobile when navigating to a new route
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        toggleSidebar();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    // Apply dark mode class to document when darkMode state changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if the current route is a classroom-related route
  const isClassroomRoute = 
    pathname?.startsWith('/classroom/') || 
    pathname?.startsWith('/classroom-feed/') || 
    pathname?.startsWith('/classroom-management/');
  
  // Extract classroom ID from URL
  const getClassroomId = () => {
    if (isClassroomRoute && pathname) {
      const pathSegments = pathname.split('/');
      return pathSegments[2] || '';
    }
    return '';
  };

  const classroomId = getClassroomId();
  
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden" 
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-30 h-screen overflow-hidden flex-shrink-0",
          isOpen ? "w-64" : "w-0 md:w-20"
        )}
        initial={false}
        animate={{ 
          width: isOpen ? 280 : (window.innerWidth >= 768 ? 80 : 0),
          x: isOpen || window.innerWidth >= 768 ? 0 : -280
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="glass-panel h-full w-64 md:w-auto flex flex-col dark:bg-slate-900/95">
          {/* Sidebar Header */}
          <div className="p-4 flex items-center justify-between border-b border-border/50 dark:border-slate-700/80">
            {isOpen ? (
              <h1 className="text-xl font-semibold tracking-tight">
                FutureLabs LMS
              </h1>
            ) : (
              <h1 className="text-xl font-semibold tracking-tight">
                FL
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-secondary/80 hidden md:block"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen ? "rotate-0" : "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              <SidebarMainNav isOpen={isOpen} />
              {userRole === "admin" && <SidebarAdminNav isOpen={isOpen} />}
              {isClassroomRoute && (
                <SidebarClassroomNav
                  isOpen={isOpen}
                  classroomId={classroomId}
                />
              )}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/50 dark:border-slate-700/80">
            <SidebarUtilityNav
              isOpen={isOpen}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            <SidebarUserProfile isOpen={isOpen} />
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
