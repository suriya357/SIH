import LoRaSimulator from '../LoRaSimulator';

export default function LoRaSimulatorExample() {
  const handleDataReceived = (data: any) => {
    console.log('LoRa data received:', data);
  };

  return (
    <div className="p-8 bg-background">
      <LoRaSimulator onDataReceived={handleDataReceived} className="max-w-md mx-auto" />
    </div>
  );
}