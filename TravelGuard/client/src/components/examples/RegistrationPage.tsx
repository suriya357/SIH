import RegistrationPage from '../RegistrationPage';

export default function RegistrationPageExample() {
  const handleComplete = (data: any) => {
    console.log('Registration completed with data:', data);
  };

  const handleBack = () => {
    console.log('Navigate back to instructions');
  };

  return <RegistrationPage onComplete={handleComplete} onBack={handleBack} />;
}