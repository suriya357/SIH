import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, MapPin, Wifi, WifiOff, Signal } from "lucide-react";

interface LoRaData {
  timestamp: string;
  coordinates: { lat: number; lng: number };
  batteryLevel: number;
  signalStrength: number;
  deviceId: string;
}

interface LoRaSimulatorProps {
  onDataReceived?: (data: LoRaData) => void;
  className?: string;
}

export default function LoRaSimulator({ onDataReceived, className }: LoRaSimulatorProps) {
  const [isActive, setIsActive] = useState(false);
  const [lastData, setLastData] = useState<LoRaData | null>(null);
  const [dataHistory, setDataHistory] = useState<LoRaData[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      // Simulate LoRa device sending data every 30 seconds
      interval = setInterval(() => {
        const newData: LoRaData = {
          timestamp: new Date().toISOString(),
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.01, // Simulate slight movement
            lng: -74.0060 + (Math.random() - 0.5) * 0.01
          },
          batteryLevel: Math.max(20, Math.random() * 100), // Random battery level
          signalStrength: Math.floor(Math.random() * 100), // Random signal strength
          deviceId: 'LORA_DEVICE_001'
        };

        setLastData(newData);
        setDataHistory(prev => [newData, ...prev.slice(0, 9)]); // Keep last 10 entries

        // Store offline data
        const offlineData = JSON.parse(localStorage.getItem('offlineLoRaData') || '[]');
        offlineData.push(newData);
        localStorage.setItem('offlineLoRaData', JSON.stringify(offlineData.slice(-50))); // Keep last 50

        onDataReceived?.(newData);
        console.log('LoRa data transmitted:', newData);
      }, 30000);
    }

    // Monitor online status
    const handleOnline = () => {
      setIsOnline(true);
      // Sync offline data when coming back online
      syncOfflineData();
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isActive, onDataReceived]);

  const syncOfflineData = () => {
    const offlineData = JSON.parse(localStorage.getItem('offlineLoRaData') || '[]');
    if (offlineData.length > 0) {
      console.log(`Syncing ${offlineData.length} offline LoRa data points`);
      // In real implementation, this would send data to backend
      // For demo, we'll just clear the offline storage
      localStorage.setItem('offlineLoRaData', '[]');
    }
  };

  const toggleSimulator = () => {
    if (!isActive) {
      // Send initial data immediately
      const initialData: LoRaData = {
        timestamp: new Date().toISOString(),
        coordinates: { lat: 40.7128, lng: -74.0060 },
        batteryLevel: 85,
        signalStrength: 78,
        deviceId: 'LORA_DEVICE_001'
      };
      setLastData(initialData);
      setDataHistory([initialData]);
      onDataReceived?.(initialData);
    }
    setIsActive(!isActive);
    console.log(`LoRa simulator ${!isActive ? 'started' : 'stopped'}`);
  };

  const getSignalColor = (strength: number) => {
    if (strength >= 70) return 'text-green-600';
    if (strength >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBatteryColor = (level: number) => {
    if (level >= 50) return 'text-green-600';
    if (level >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className={className} data-testid="card-lora-simulator">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            LoRa Device Simulator
          </CardTitle>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <Badge variant={isActive ? "default" : "outline"}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={toggleSimulator}
            variant={isActive ? "destructive" : "default"}
            className="w-full"
            data-testid="button-toggle-simulator"
          >
            {isActive ? 'Stop Simulation' : 'Start Simulation'}
          </Button>

          {lastData && (
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Latest Transmission</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span className="font-mono">
                    {lastData.coordinates.lat.toFixed(6)}, {lastData.coordinates.lng.toFixed(6)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Signal className={`h-3 w-3 ${getSignalColor(lastData.signalStrength)}`} />
                    <span>Signal: {lastData.signalStrength}%</span>
                  </div>
                  <div className={`text-xs ${getBatteryColor(lastData.batteryLevel)}`}>
                    Battery: {lastData.batteryLevel.toFixed(0)}%
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(lastData.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}

          {!isOnline && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                📡 Offline mode: Data being stored locally for sync when connection restored.
              </p>
            </div>
          )}

          {dataHistory.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Recent Transmissions</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {dataHistory.slice(0, 5).map((data, index) => (
                  <div key={index} className="text-xs p-2 bg-muted/50 rounded flex justify-between">
                    <span>{new Date(data.timestamp).toLocaleTimeString()}</span>
                    <span className="font-mono">
                      {data.coordinates.lat.toFixed(4)}, {data.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}