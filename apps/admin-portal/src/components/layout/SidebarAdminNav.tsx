import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  BarChart2, 
  Settings, 
  DollarSign
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import { usePathname } from "next/navigation";

interface SidebarAdminNavProps {
  isOpen: boolean;
}

const SidebarAdminNav: React.FC<SidebarAdminNavProps> = ({ isOpen }) => {
  const pathname = usePathname();
  
  const adminNavItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "User Management",
      path: "/users",
      icon: <Users size={20} />,
    },
    {
      name: "Programs",
      path: "/programs",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Classrooms",
      path: "/classrooms",
      icon: <FileText size={20} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart2 size={20} />,
    },
    {
      name: "Payment Management",
      path: "/payments",
      icon: <DollarSign size={20} />,
    },
    {
      name: "System Settings",
      path: "/system-settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="px-3 mb-2">
      <h2 className={`text-xs font-semibold text-muted-foreground mb-2 ${!isOpen ? 'hidden' : ''}`}>
        Admin Navigation
      </h2>
      <ul className="space-y-1">
        {adminNavItems.map((item) => (
          <SidebarNavItem
            key={item.name}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isOpen={isOpen}
            isActive={pathname === item.path}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdminNav;
