import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, User, MapPin, Phone } from "lucide-react";

const kycSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  nationality: z.string().min(1, "Please select your nationality"),
  passportNumber: z.string().min(6, "Passport number must be at least 6 characters"),
  emergencyContact: z.string().min(2, "Emergency contact name required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone required"),
  destination: z.string().min(2, "Destination required"),
  purpose: z.string().min(10, "Please describe your purpose of visit"),
});

type KYCFormData = z.infer<typeof kycSchema>;

interface KYCFormProps {
  onSubmit?: (data: KYCFormData) => void;
  className?: string;
}

const nationalities = [
  "United States", "Canada", "United Kingdom", "Germany", "France", 
  "Japan", "Australia", "Singapore", "Other"
];

export default function KYCForm({ onSubmit, className }: KYCFormProps) {
  const [step, setStep] = useState(1);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  const form = useForm<KYCFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: "",
      passportNumber: "",
      emergencyContact: "",
      emergencyPhone: "",
      destination: "",
      purpose: "",
    },
  });

  const handleSubmit = (data: KYCFormData) => {
    // Generate mock blockchain ID
    const digitalId = `CHAIN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const kycData = {
      ...data,
      digitalId,
      timestamp: new Date().toISOString(),
      documentsVerified: documentUploaded && photoUploaded,
      status: 'pending'
    };
    
    // Store in localStorage for offline functionality
    localStorage.setItem('kycData', JSON.stringify(kycData));
    
    onSubmit?.(data);
    console.log('KYC submitted:', kycData);
    alert(`KYC submitted successfully! Digital ID: ${digitalId}`);
  };

  const handleDocumentUpload = () => {
    setDocumentUploaded(true);
    console.log('Document uploaded (simulated)');
  };

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
    console.log('Photo uploaded (simulated)');
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Card className={className} data-testid="card-kyc-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          KYC Registration - Step {step} of 3
        </CardTitle>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Badge
              key={i}
              variant={i === step ? "default" : i < step ? "secondary" : "outline"}
              className="text-xs"
            >
              {i}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} data-testid="input-first-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} data-testid="input-last-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-nationality">
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {nationalities.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Number</FormLabel>
                      <FormControl>
                        <Input placeholder="A12345678" {...field} data-testid="input-passport" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Emergency Contact & Travel Info */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Emergency Contact & Travel Details</h3>
                
                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} data-testid="input-emergency-contact" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 987-6543" {...field} data-testid="input-emergency-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travel Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="Paris, France" {...field} data-testid="input-destination" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose of Visit</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tourism, business meeting, family visit..."
                          {...field}
                          data-testid="textarea-purpose"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Document Upload */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Document Verification</h3>
                
                <div className="space-y-3">
                  <div className="p-4 border-2 border-dashed border-muted-foreground rounded-lg text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload Passport/ID Document</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDocumentUpload}
                      disabled={documentUploaded}
                      data-testid="button-upload-document"
                    >
                      {documentUploaded ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Document Uploaded
                        </>
                      ) : (
                        'Choose File'
                      )}
                    </Button>
                  </div>
                  
                  <div className="p-4 border-2 border-dashed border-muted-foreground rounded-lg text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload Profile Photo</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handlePhotoUpload}
                      disabled={photoUploaded}
                      data-testid="button-upload-photo"
                    >
                      {photoUploaded ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Photo Uploaded
                        </>
                      ) : (
                        'Choose File'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} data-testid="button-prev">
                  Previous
                </Button>
              )}
              
              {step < 3 ? (
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className="ml-auto"
                  data-testid="button-next"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="ml-auto"
                  disabled={!documentUploaded || !photoUploaded}
                  data-testid="button-submit-kyc"
                >
                  Submit KYC
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}