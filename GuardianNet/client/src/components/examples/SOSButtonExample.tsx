import SOSButton from '../SOSButton';

export default function SOSButtonExample() {
  const handleSOSActivate = (coordinates: { lat: number; lng: number }) => {
    console.log('SOS activated with coordinates:', coordinates);
  };

  return (
    <div className="p-8 bg-background">
      <SOSButton onSOSActivate={handleSOSActivate} />
    </div>
  );
}