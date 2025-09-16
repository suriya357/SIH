import { useState, useEffect } from "react";
import SOSButton from "@/components/SOSButton";
import SafetyZoneDisplay from "@/components/SafetyZoneDisplay";
import LoRaSimulator from "@/components/LoRaSimulator";
import RouteRecommendation from "@/components/RouteRecommendation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, MapPin, Clock, Wifi, WifiOff } from "lucide-react";

export default function Dashboard() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [kycData, setKycData] = useState<any>(null);

  useEffect(() => {
    // Load KYC data from localStorage
    const stored = localStorage.getItem('kycData');
    if (stored) {
      setKycData(JSON.parse(stored));
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Location error:', error);
          // Use default location (NYC)
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSOSActivate = (coordinates: { lat: number; lng: number }) => {
    console.log('SOS activated from dashboard:', coordinates);
    // In real app, this would send to backend
  };

  const handleLoRaData = (data: any) => {
    setUserLocation(data.coordinates);
    console.log('LoRa data received in dashboard:', data);
  };

  return (
    <div className="space-y-6 p-6" data-testid="page-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Safety Dashboard</h1>
          <p className="text-muted-foreground">Monitor your safety status and manage emergency features</p>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-600" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-600" />
          )}
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </div>

      {/* User Profile Card */}
      {kycData && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Tourist Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{kycData.firstName} {kycData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Digital ID</p>
                <p className="font-mono text-sm">{kycData.digitalId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Verified
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Zone and SOS */}
        <div className="space-y-6">
          <SafetyZoneDisplay />
          <div className="text-center">
            <SOSButton onSOSActivate={handleSOSActivate} />
          </div>
        </div>

        {/* LoRa and Route Recommendations */}
        <div className="space-y-6">
          <LoRaSimulator onDataReceived={handleLoRaData} />
          <RouteRecommendation 
            currentLocation={userLocation || undefined}
            destination="Tourist Information Center"
          />
        </div>
      </div>

      {/* Offline Notice */}
      {!isOnline && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <WifiOff className="h-4 w-4" />
              <p className="text-sm">
                <strong>Offline Mode:</strong> Your data is being stored locally and will sync when connection is restored.
                Emergency features remain functional.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}