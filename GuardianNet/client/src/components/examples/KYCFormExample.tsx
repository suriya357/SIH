import KYCForm from '../KYCForm';

export default function KYCFormExample() {
  const handleKYCSubmit = (data: any) => {
    console.log('KYC form submitted:', data);
  };

  return (
    <div className="p-8 bg-background">
      <KYCForm onSubmit={handleKYCSubmit} className="max-w-2xl mx-auto" />
    </div>
  );
}