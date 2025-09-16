import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, MapPin, Phone, AlertTriangle } from "lucide-react";

interface InstructionsPageProps {
  onAgree: () => void;
}

/**
 * Instructions page component that displays app usage guidelines
 * and safety information for tourists
 */
export default function InstructionsPage({ onAgree }: InstructionsPageProps) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to SafeTravel
          </h1>
          <p className="text-muted-foreground">
            Your personal safety companion while traveling
          </p>
        </div>

        {/* Instructions Cards */}
        <div className="space-y-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                SOS Emergency System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                The SOS button is your direct line to emergency services. When pressed:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                <li>• Your location is immediately shared with emergency contacts</li>
                <li>• Local emergency services are notified based on your destination</li>
                <li>• Your travel details are automatically included in the alert</li>
                <li>• A confirmation will appear to let you know help is on the way</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                Safe Zones & Location Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Stay informed about your surroundings and safety:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                <li>• Real-time location monitoring during your stay</li>
                <li>• Identification of safe zones like hospitals, police stations</li>
                <li>• Automatic alerts if you enter high-risk areas</li>
                <li>• 24/7 monitoring throughout your travel period</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                Emergency Contact System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Your emergency contacts will be notified immediately:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                <li>• Instant SMS and call alerts to designated contacts</li>
                <li>• Automatic sharing of your current location</li>
                <li>• Travel itinerary details included in notifications</li>
                <li>• Regular check-in reminders for peace of mind</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Agreement Section */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                By proceeding, you agree to share your location and travel information 
                for safety purposes. Your data is encrypted and only used for emergency services.
              </p>
              <Button 
                onClick={onAgree}
                size="lg"
                className="w-full sm:w-auto px-12"
                data-testid="button-agree"
              >
                I Agree & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}