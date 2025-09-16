import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationData {
  idType: 'aadhaar' | 'passport';
  idNumber: string;
  mobileNumber: string;
  otp: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  travelDestination: string;
  stayDuration: string;
}

interface RegistrationPageProps {
  onComplete: (data: RegistrationData) => void;
  onBack: () => void;
}

/**
 * Registration page component with form validation for tourist data
 * Handles Aadhaar/Passport validation, OTP verification, and emergency contacts
 */
export default function RegistrationPage({ onComplete, onBack }: RegistrationPageProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    idType: 'aadhaar',
    idNumber: '',
    mobileNumber: '',
    otp: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    travelDestination: '',
    stayDuration: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { toast } = useToast();

  // Validation functions
  const validateAadhaar = (aadhaar: string) => {
    return /^\d{12}$/.test(aadhaar);
  };

  const validatePassport = (passport: string) => {
    return /^[A-Z0-9]{8,9}$/i.test(passport);
  };

  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile);
  };

  const validateStep1 = () => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.idNumber) {
      newErrors.idNumber = 'ID number is required';
    } else if (formData.idType === 'aadhaar' && !validateAadhaar(formData.idNumber)) {
      newErrors.idNumber = 'Aadhaar must be exactly 12 digits';
    } else if (formData.idType === 'passport' && !validatePassport(formData.idNumber)) {
      newErrors.idNumber = 'Passport must be 8-9 alphanumeric characters';
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    }

    if (!formData.emergencyContactNumber) {
      newErrors.emergencyContactNumber = 'Emergency contact number is required';
    } else if (!validateMobile(formData.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = 'Contact number must be exactly 10 digits';
    }

    if (!formData.travelDestination.trim()) {
      newErrors.travelDestination = 'Travel destination is required';
    }

    if (!formData.stayDuration) {
      newErrors.stayDuration = 'Stay duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      // Simulate OTP sending
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to +91-${formData.mobileNumber}`,
      });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      toast({
        title: "OTP Verified",
        description: "Phone number verified successfully",
      });
    } else if (currentStep === 3 && validateStep3()) {
      onComplete(formData);
    }
  };

  const sendOtp = () => {
    if (validateStep1()) {
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `New verification code sent to +91-${formData.mobileNumber}`,
      });
    }
  };

  const updateFormData = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Registration
          </h1>
          <p className="text-muted-foreground text-sm">
            Step {currentStep} of 3: {currentStep === 1 ? 'Identity Verification' : currentStep === 2 ? 'Phone Verification' : 'Travel Details'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full mx-1 ${
                step <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {currentStep === 1 && 'Identity & Contact Information'}
              {currentStep === 2 && 'Phone Number Verification'}
              {currentStep === 3 && 'Emergency Contacts & Travel Details'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Identity & Mobile */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select 
                    value={formData.idType} 
                    onValueChange={(value: 'aadhaar' | 'passport') => updateFormData('idType', value)}
                  >
                    <SelectTrigger data-testid="select-id-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">
                    {formData.idType === 'aadhaar' ? 'Aadhaar Number' : 'Passport Number'}
                  </Label>
                  <Input
                    id="idNumber"
                    data-testid="input-id-number"
                    placeholder={formData.idType === 'aadhaar' ? '1234 5678 9012' : 'A1234567'}
                    value={formData.idNumber}
                    onChange={(e) => updateFormData('idNumber', e.target.value)}
                    className={errors.idNumber ? 'border-destructive' : ''}
                  />
                  {errors.idNumber && (
                    <p className="text-sm text-destructive">{errors.idNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    data-testid="input-mobile"
                    placeholder="9876543210"
                    value={formData.mobileNumber}
                    onChange={(e) => updateFormData('mobileNumber', e.target.value)}
                    className={errors.mobileNumber ? 'border-destructive' : ''}
                  />
                  {errors.mobileNumber && (
                    <p className="text-sm text-destructive">{errors.mobileNumber}</p>
                  )}
                </div>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 2 && (
              <>
                <div className="text-center mb-4">
                  <p className="text-muted-foreground text-sm">
                    Enter the 6-digit code sent to +91-{formData.mobileNumber}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Demo: Use any 6-digit number (e.g., 123456)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    data-testid="input-otp"
                    placeholder="123456"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => updateFormData('otp', e.target.value)}
                    className={`text-center text-lg tracking-widest ${errors.otp ? 'border-destructive' : ''}`}
                  />
                  {errors.otp && (
                    <p className="text-sm text-destructive">{errors.otp}</p>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={sendOtp}
                  className="w-full"
                  data-testid="button-resend-otp"
                >
                  Resend OTP
                </Button>
              </>
            )}

            {/* Step 3: Emergency Contacts & Travel Details */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyName"
                    data-testid="input-emergency-name"
                    placeholder="John Doe"
                    value={formData.emergencyContactName}
                    onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                    className={errors.emergencyContactName ? 'border-destructive' : ''}
                  />
                  {errors.emergencyContactName && (
                    <p className="text-sm text-destructive">{errors.emergencyContactName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
                  <Input
                    id="emergencyNumber"
                    data-testid="input-emergency-number"
                    placeholder="9876543210"
                    value={formData.emergencyContactNumber}
                    onChange={(e) => updateFormData('emergencyContactNumber', e.target.value)}
                    className={errors.emergencyContactNumber ? 'border-destructive' : ''}
                  />
                  {errors.emergencyContactNumber && (
                    <p className="text-sm text-destructive">{errors.emergencyContactNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Travel Destination</Label>
                  <Input
                    id="destination"
                    data-testid="input-destination"
                    placeholder="Mumbai, Maharashtra"
                    value={formData.travelDestination}
                    onChange={(e) => updateFormData('travelDestination', e.target.value)}
                    className={errors.travelDestination ? 'border-destructive' : ''}
                  />
                  {errors.travelDestination && (
                    <p className="text-sm text-destructive">{errors.travelDestination}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Number of Days Staying</Label>
                  <Select 
                    value={formData.stayDuration} 
                    onValueChange={(value) => updateFormData('stayDuration', value)}
                  >
                    <SelectTrigger data-testid="select-stay-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 days</SelectItem>
                      <SelectItem value="4-7">4-7 days</SelectItem>
                      <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                      <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
                      <SelectItem value="1month+">1 month or more</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.stayDuration && (
                    <p className="text-sm text-destructive">{errors.stayDuration}</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === 1 ? 'Back to Instructions' : 'Previous'}
          </Button>
          
          <Button 
            onClick={handleNext}
            data-testid="button-next"
          >
            {currentStep === 3 ? 'Complete Registration' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}