import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Shield, AlertTriangle } from "lucide-react";

interface Route {
  id: string;
  name: string;
  distance: string;
  duration: string;
  safetyScore: number;
  landmarks: string[];
  riskFactors: string[];
}

interface RouteRecommendationProps {
  currentLocation?: { lat: number; lng: number };
  destination?: string;
  className?: string;
}

export default function RouteRecommendation({ 
  currentLocation, 
  destination = "Tourist Center", 
  className 
}: RouteRecommendationProps) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Simulate KNN algorithm for route calculation
    calculateRoutes();
  }, [currentLocation, destination]);

  const calculateRoutes = async () => {
    setIsCalculating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock KNN algorithm results //todo: remove mock functionality
    const mockRoutes: Route[] = [
      {
        id: 'route_1',
        name: 'Main Street Route',
        distance: '1.2 km',
        duration: '15 min',
        safetyScore: 95,
        landmarks: ['Police Station', 'Tourist Info Center', 'Hospital'],
        riskFactors: []
      },
      {
        id: 'route_2',
        name: 'Park Avenue Route',
        distance: '1.5 km',
        duration: '18 min',
        safetyScore: 85,
        landmarks: ['Central Park', 'Shopping Mall', 'Embassy'],
        riskFactors: ['Construction Zone']
      },
      {
        id: 'route_3',
        name: 'Waterfront Route',
        distance: '2.1 km',
        duration: '25 min',
        safetyScore: 70,
        landmarks: ['Marina', 'Restaurant District'],
        riskFactors: ['Poorly Lit Areas', 'Limited CCTV Coverage']
      }
    ];

    setRoutes(mockRoutes);
    setSelectedRoute(mockRoutes[0]); // Auto-select safest route
    setIsCalculating(false);
    
    console.log('KNN route calculation completed:', mockRoutes);
  };

  const getSafetyColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  const getSafetyLabel = (score: number) => {
    if (score >= 90) return 'Very Safe';
    if (score >= 75) return 'Moderately Safe';
    return 'Use Caution';
  };

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
    console.log('Route selected:', route);
  };

  const handleStartNavigation = () => {
    if (selectedRoute) {
      // Store route in localStorage for offline access
      localStorage.setItem('selectedRoute', JSON.stringify(selectedRoute));
      console.log('Navigation started for route:', selectedRoute.name);
      alert(`Navigation started: ${selectedRoute.name}`);
    }
  };

  return (
    <Card className={className} data-testid="card-route-recommendation">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Safe Route Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered route suggestions based on safety data
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Destination */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">To:</span>
              <span>{destination}</span>
            </div>
          </div>

          {isCalculating ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                Calculating safest routes using AI analysis...
              </p>
            </div>
          ) : (
            <>
              {/* Route Options */}
              <div className="space-y-3">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors hover-elevate ${
                      selectedRoute?.id === route.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border'
                    }`}
                    onClick={() => handleSelectRoute(route)}
                    data-testid={`route-option-${route.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{route.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{route.distance}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {route.duration}
                          </span>
                        </div>
                      </div>
                      <Badge className={getSafetyColor(route.safetyScore)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {route.safetyScore}% - {getSafetyLabel(route.safetyScore)}
                      </Badge>
                    </div>

                    {/* Landmarks */}
                    {route.landmarks.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">Key Landmarks:</p>
                        <div className="flex flex-wrap gap-1">
                          {route.landmarks.map((landmark, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {landmark}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Risk Factors */}
                    {route.riskFactors.length > 0 && (
                      <div>
                        <p className="text-xs text-red-600 dark:text-red-400 mb-1 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Risk Factors:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {route.riskFactors.map((risk, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation Button */}
              {selectedRoute && (
                <Button
                  onClick={handleStartNavigation}
                  className="w-full"
                  data-testid="button-start-navigation"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation - {selectedRoute.name}
                </Button>
              )}

              {/* AI Note */}
              <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
                <p>
                  🤖 Routes analyzed using K-Nearest Neighbors algorithm considering:
                  crime data, lighting, emergency services proximity, and real-time alerts.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}