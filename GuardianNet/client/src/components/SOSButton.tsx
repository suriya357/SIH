import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SOSButtonProps {
  onSOSActivate?: (coordinates: { lat: number; lng: number }) => void;
  className?: string;
}

export default function SOSButton({ onSOSActivate, className }: SOSButtonProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleSOSPress = () => {
    if (isActive) return;
    
    setIsActivating(true);
    setCountdown(3);
    
    // Countdown before activation
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          activateSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const activateSOS = () => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setIsActive(true);
          setIsActivating(false);
          
          // Store offline if needed
          const sosData = {
            timestamp: new Date().toISOString(),
            coordinates,
            type: 'emergency'
          };
          
          // Save to localStorage for offline functionality
          const existingAlerts = JSON.parse(localStorage.getItem('offlineSOSAlerts') || '[]');
          existingAlerts.push(sosData);
          localStorage.setItem('offlineSOSAlerts', JSON.stringify(existingAlerts));
          
          onSOSActivate?.(coordinates);
          console.log('SOS activated with coordinates:', coordinates);
        },
        (error) => {
          console.error('Location error:', error);
          // Still activate SOS without location
          setIsActive(true);
          setIsActivating(false);
          onSOSActivate?.({ lat: 0, lng: 0 });
        }
      );
    }
  };

  const cancelSOS = () => {
    setIsActivating(false);
    setCountdown(0);
  };

  const deactivateSOS = () => {
    setIsActive(false);
    console.log('SOS deactivated');
  };

  if (isActive) {
    return (
      <Card className="border-destructive bg-destructive/10 max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-bold text-destructive mb-2">SOS ACTIVE</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Emergency alert sent. Help is on the way.
            </p>
            <Button
              onClick={deactivateSOS}
              variant="outline"
              size="sm"
              data-testid="button-deactivate-sos"
            >
              Cancel Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isActivating) {
    return (
      <Card className="border-destructive bg-destructive/10 max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl font-bold text-destructive mb-4">{countdown}</div>
          <p className="text-sm text-muted-foreground mb-4">
            Activating emergency alert...
          </p>
          <Button
            onClick={cancelSOS}
            variant="outline"
            size="sm"
            data-testid="button-cancel-sos"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <Button
        onClick={handleSOSPress}
        className="h-32 w-32 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg font-bold shadow-lg transform transition-transform hover:scale-105"
        data-testid="button-sos"
      >
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-8 w-8" />
          <span>SOS</span>
        </div>
      </Button>
      <p className="text-sm text-muted-foreground mt-4 max-w-sm mx-auto">
        Press and hold for emergency assistance. Your location will be shared with emergency services.
      </p>
    </div>
  );
}