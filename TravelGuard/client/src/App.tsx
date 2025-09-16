import { Switch, Route, useLocation } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import InstructionsPage from "@/components/InstructionsPage";
import RegistrationPage from "@/components/RegistrationPage";
import HomePage from "@/components/HomePage";
import NotFound from "@/pages/not-found";

interface RegistrationData {
  idType: 'aadhaar' | 'passport';
  idNumber: string;
  mobileNumber: string;
  otp: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  travelDestination: string;
  stayDuration: string;
}

function Router() {
  const [, setLocation] = useLocation();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(
    // Try to load from localStorage on app start
    () => {
      try {
        const saved = localStorage.getItem('safetravel-registration');
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
  );

  // Navigation handlers
  const handleAgreeToTerms = () => {
    setLocation('/register');
  };

  const handleBackToInstructions = () => {
    setLocation('/');
  };

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegistrationData(data);
    // Save to localStorage for demo purposes
    localStorage.setItem('safetravel-registration', JSON.stringify(data));
    setLocation('/home');
  };

  const handleLogout = () => {
    setRegistrationData(null);
    localStorage.removeItem('safetravel-registration');
    setLocation('/');
  };

  return (
    <Switch>
      <Route path="/">
        <InstructionsPage onAgree={handleAgreeToTerms} />
      </Route>
      <Route path="/register">
        <RegistrationPage 
          onComplete={handleRegistrationComplete}
          onBack={handleBackToInstructions}
        />
      </Route>
      <Route path="/home">
        {registrationData ? (
          <HomePage 
            registrationData={registrationData}
            onLogout={handleLogout}
          />
        ) : (
          <InstructionsPage onAgree={handleAgreeToTerms} />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Tourist Safety App - SafeTravel
 * A complete safety application for tourists with:
 * - Instructions and terms acceptance
 * - Registration with ID verification and OTP
 * - Home dashboard with SOS functionality
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
