import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, MapPin, Phone, User, Calendar, Shield } from "lucide-react";

interface RegistrationData {
  idType: 'aadhaar' | 'passport';
  idNumber: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  travelDestination: string;
  stayDuration: string;
}

interface HomePageProps {
  registrationData: RegistrationData;
  onLogout?: () => void;
}

/**
 * Home page component displaying user travel details and SOS functionality
 * Features a prominent panic button and user information display
 */
export default function HomePage({ registrationData, onLogout }: HomePageProps) {
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);

  const handleSOSPress = () => {
    setSosActivated(true);
    setShowSOSDialog(true);
    
    // Simulate SOS alert sending
    console.log('SOS Alert Triggered!', {
      location: 'Current GPS coordinates would be here',
      userData: registrationData,
      timestamp: new Date().toISOString(),
    });
  };

  const formatIdNumber = (idNumber: string, idType: string) => {
    if (idType === 'aadhaar') {
      return `${idNumber.slice(0, 4)} ${idNumber.slice(4, 8)} ${idNumber.slice(8)}`;
    }
    return idNumber;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            SafeTravel Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Stay safe during your travels
          </p>
        </div>

        {/* SOS Button - Most prominent element */}
        <Card className="mb-6 border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Emergency Assistance
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Press for immediate help in case of emergency
              </p>
              <Button
                onClick={handleSOSPress}
                variant="destructive"
                size="lg"
                className="h-20 w-full text-xl font-bold"
                data-testid="button-sos"
              >
                <AlertTriangle className="h-8 w-8 mr-3" />
                SOS PANIC
              </Button>
              <p className="text-xs text-muted-foreground">
                This will alert emergency contacts and local authorities
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Travel Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Travel Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* ID Information */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {registrationData.idType === 'aadhaar' ? 'Aadhaar ID' : 'Passport ID'}:
              </span>
              <Badge variant="secondary" data-testid="text-id-number">
                {formatIdNumber(registrationData.idNumber, registrationData.idType)}
              </Badge>
            </div>

            {/* Mobile Number */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mobile:</span>
              <Badge variant="outline" data-testid="text-mobile">
                +91-{registrationData.mobileNumber}
              </Badge>
            </div>

            {/* Destination */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Destination:
              </span>
              <Badge variant="default" data-testid="text-destination">
                {registrationData.travelDestination}
              </Badge>
            </div>

            {/* Stay Duration */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Duration:
              </span>
              <Badge variant="outline" data-testid="text-duration">
                {registrationData.stayDuration}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="text-sm font-medium" data-testid="text-emergency-name">
                {registrationData.emergencyContactName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Number:</span>
              <Badge variant="outline" data-testid="text-emergency-number">
                +91-{registrationData.emergencyContactNumber}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Safety Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Safety Monitoring Active
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your location is being monitored for safety
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Optional Logout Button */}
        {onLogout && (
          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm" onClick={onLogout} data-testid="button-logout">
              Update Registration
            </Button>
          </div>
        )}
      </div>

      {/* SOS Alert Dialog */}
      <AlertDialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
        <AlertDialogContent data-testid="dialog-sos-alert">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              SOS Alert Sent!
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Your emergency alert has been successfully sent to:</p>
              <ul className="text-sm space-y-1 pl-4">
                <li>• Emergency contact: {registrationData.emergencyContactName}</li>
                <li>• Local emergency services in {registrationData.travelDestination}</li>
                <li>• Your current GPS location has been shared</li>
              </ul>
              <p className="font-medium text-foreground mt-3">
                Help is on the way. Stay calm and stay where you are if it's safe.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction data-testid="button-sos-ok">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}