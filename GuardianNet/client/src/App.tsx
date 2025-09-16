import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Registration from "@/pages/Registration";
import Admin from "@/pages/Admin";
import { Shield, User, Settings, Home } from "lucide-react";

function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/register", label: "Register", icon: User },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2">
            <div className="p-1 bg-primary/10 rounded">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">SafeTravel</span>
            <Badge variant="outline" className="text-xs">Platform</Badge>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            <div className="ml-4 pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={Registration} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="safetravel-ui-theme">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
