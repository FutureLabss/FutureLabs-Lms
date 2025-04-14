"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { logout } from "@/services/logout";

import {
  BookOpen,
  Calendar,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Classes", href: "/classes", icon: Calendar },
  { name: "Courses", href: "/courses", icon: Video },
  // { name: "Students", href: "/students", icon: Users },
  // { name: "Assignments", href: "/assignments", icon: FileText },
  // { name: "Materials", href: "/materials", icon: BookOpen },
  // { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login");
    }
  }, [user, isLoading, router, pathname]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  // If not authenticated and not on login page, don't render the layout
  if (!user && pathname !== "/login") {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <nav className="grid gap-2 text-lg font-medium">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent",
                    pathname === item.href && "bg-accent"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Tutor Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      <SidebarProvider>
        <div className="flex flex-1">
          <Sidebar className="hidden md:flex">
            <SidebarHeader className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <LayoutDashboard className="h-6 w-6" />
                <span>Tutor Dashboard</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            {user && (
              <SidebarFooter className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {user.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5 text-sm">
                    <div className="font-medium">{user.fullname || "User"}</div>
                    <div className="text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
              </SidebarFooter>
            )}
          </Sidebar>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
