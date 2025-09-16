import { useLocation } from "wouter";
import KYCForm from "@/components/KYCForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";

export default function Registration() {
  const [, setLocation] = useLocation();

  const handleKYCSubmit = (data: any) => {
    console.log('KYC registration completed:', data);
    // Redirect to dashboard after successful registration
    setTimeout(() => {
      setLocation('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6" data-testid="page-registration">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">SafeTravel Registration</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete your KYC verification to access our comprehensive safety platform 
            with blockchain-based digital identity and emergency services.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Blockchain Security</h3>
              <p className="text-sm text-muted-foreground">
                Your digital identity is secured on blockchain technology
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-1">Emergency SOS</h3>
              <p className="text-sm text-muted-foreground">
                One-tap emergency alerts with real-time location sharing
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-1">Safe Routes</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered route recommendations for maximum safety
              </p>
            </CardContent>
          </Card>
        </div>

        {/* KYC Form */}
        <KYCForm onSubmit={handleKYCSubmit} />
      </div>
    </div>
  );
}