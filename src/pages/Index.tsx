import { AdminDashboard } from "@/components/AdminDashboard";
import { LoginForm } from "@/components/LoginForm";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  

  return (
    <div className="min-h-screen bg-background">
      {/* Header with user info and logout */}
      <header className="border-b bg-card p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      {/* Main admin dashboard */}
      <AdminDashboard />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
};

const AuthContent = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <AuthenticatedApp /> : <LoginForm />;
};

export default Index;
