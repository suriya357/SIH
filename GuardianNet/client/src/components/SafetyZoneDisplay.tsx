import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, AlertTriangle, Wifi, WifiOff } from "lucide-react";

interface SafetyZoneDisplayProps {
  className?: string;
}

type SafetyStatus = 'safe' | 'warning' | 'danger';

export default function SafetyZoneDisplay({ className }: SafetyZoneDisplayProps) {
  const [safetyStatus, setSafetyStatus] = useState<SafetyStatus>('safe');
  const [currentLocation, setCurrentLocation] = useState<string>('Downtown Tourist District');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate zone status updates
    const statusOptions: SafetyStatus[] = ['safe', 'warning', 'danger'];
    const locations = [
      'Downtown Tourist District',
      'Historical Quarter',
      'Waterfront Promenade',
      'Market Square',
      'Cultural Center'
    ];

    const updateStatus = () => {
      setSafetyStatus(statusOptions[Math.floor(Math.random() * statusOptions.length)]);
      setCurrentLocation(locations[Math.floor(Math.random() * locations.length)]);
      setLastUpdate(new Date());
    };

    const interval = setInterval(updateStatus, 15000);

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusColor = (status: SafetyStatus) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'danger': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getStatusIcon = (status: SafetyStatus) => {
    switch (status) {
      case 'safe': return <Shield className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'danger': return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: SafetyStatus) => {
    switch (status) {
      case 'safe': return 'Safe Zone';
      case 'warning': return 'Caution Zone';
      case 'danger': return 'High Risk Zone';
    }
  };

  return (
    <Card className={className} data-testid="card-safety-zone">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Current Zone Status</CardTitle>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <Badge variant="outline" className="text-xs">
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(safetyStatus)}`}>
              {getStatusIcon(safetyStatus)}
            </div>
            <div>
              <div className="font-semibold">{getStatusText(safetyStatus)}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {currentLocation}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          
          {safetyStatus === 'danger' && (
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-md border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200">
                ⚠️ You are in a high-risk area. Consider moving to a safer location and stay alert.
              </p>
            </div>
          )}
          
          {safetyStatus === 'warning' && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                🔔 Exercise caution in this area. Stay aware of your surroundings.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}