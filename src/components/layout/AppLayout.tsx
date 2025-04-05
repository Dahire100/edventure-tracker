
import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Award, Book, GraduationCap, Home, LayoutDashboard, LogOut, Settings, Trophy, User, Users } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <>{children}</>;
  }

  const isTeacher = user.role === UserRole.TEACHER;
  
  // Define navigation items based on user role
  const navigationItems = isTeacher 
    ? [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: Users, label: "Students", path: "/students" },
        { icon: Book, label: "Classes", path: "/classes" },
        { icon: Award, label: "Rewards", path: "/rewards" },
        { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
      ]
    : [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
        { icon: Award, label: "Rewards", path: "/rewards" },
        { icon: GraduationCap, label: "Progress", path: "/progress" },
      ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-lg font-bold">EdVenture</h1>
                <p className="text-xs text-muted-foreground">Gamified Learning</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path} className="my-1">
                  <SidebarMenuButton 
                    asChild
                    className="w-full justify-start font-medium"
                    onClick={() => navigate(item.path)}
                  >
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="px-4 py-4 mt-auto">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="relative">
                  <img
                    src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full bg-muted"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate capitalize">{user.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger className="lg:hidden">
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </Button>
              </SidebarTrigger>
              
              <div className="ml-auto flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <main className="animate-fade-in">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
