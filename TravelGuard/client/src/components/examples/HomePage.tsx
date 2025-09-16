import HomePage from '../HomePage';

export default function HomePageExample() {
  // Mock registration data for demonstration
  const mockRegistrationData = {
    idType: 'aadhaar' as const,
    idNumber: '123456789012',
    mobileNumber: '9876543210',
    emergencyContactName: 'John Doe',
    emergencyContactNumber: '9123456789',
    travelDestination: 'Mumbai, Maharashtra',
    stayDuration: '4-7 days'
  };

  const handleLogout = () => {
    console.log('Update registration clicked');
  };

  return (
    <HomePage 
      registrationData={mockRegistrationData}
      onLogout={handleLogout}
    />
  );
}