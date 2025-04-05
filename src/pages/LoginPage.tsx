
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Trophy } from "lucide-react";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md mx-auto mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">EdVenture Tracker</h1>
        <p className="text-muted-foreground">Gamify your learning experience</p>
      </div>
      
      <div className="w-full max-w-md animate-scale-in">
        <LoginForm />
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "300ms" }}>
        <p>Demo credentials:</p>
        <p>Any email and password (min 6 chars) will work</p>
        <p>Select your role to see different dashboards</p>
      </div>
    </div>
  );
};

export default LoginPage;
