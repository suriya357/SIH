import RouteRecommendation from '../RouteRecommendation';

export default function RouteRecommendationExample() {
  const mockLocation = { lat: 40.7128, lng: -74.0060 };

  return (
    <div className="p-8 bg-background">
      <RouteRecommendation 
        currentLocation={mockLocation}
        destination="Times Square"
        className="max-w-lg mx-auto" 
      />
    </div>
  );
}