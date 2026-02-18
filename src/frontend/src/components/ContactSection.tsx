import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { useSubmitContactForm } from '../hooks/useQueries';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Generate hour options in 12-hour format
const HOUR_OPTIONS = [
  '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
];

// Generate day options (1-31)
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    state: '',
    productInterest: '',
    coverageAmount: '',
    age: '',
    additionalComments: '',
    gender: '',
    bestTimeToContact: '9:00 AM',
    bestDayToContact: '1'
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const submitForm = useSubmitContactForm();

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) {
      errors.push('First name is required');
    }
    if (!formData.lastName.trim()) {
      errors.push('Last name is required');
    }
    if (!formData.state) {
      errors.push('State is required');
    }
    if (!formData.productInterest) {
      errors.push('Product interest is required');
    }
    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 120) {
      errors.push('Valid age (18-120) is required');
    }
    if (!formData.gender) {
      errors.push('Gender is required');
    }
    if (!formData.bestTimeToContact) {
      errors.push('Best time to contact is required');
    }
    if (!formData.bestDayToContact) {
      errors.push('Best day to contact is required');
    }

    // Validate bestDayToContact is a valid day number
    const dayNum = parseInt(formData.bestDayToContact);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      errors.push('Best day to contact must be between 1 and 31');
    }

    // Validate bestTimeToContact is in the correct format
    if (formData.bestTimeToContact && !HOUR_OPTIONS.includes(formData.bestTimeToContact)) {
      errors.push('Best time to contact must be a valid hour');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    setValidationErrors([]);
    setErrorMessage('');

    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Form data being submitted:', JSON.stringify(formData, null, 2));

    // Client-side validation
    if (!validateForm()) {
      console.error('Form validation failed:', validationErrors);
      return;
    }

    try {
      console.log('Calling mutation with validated data...');
      await submitForm.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        state: formData.state,
        productInterest: formData.productInterest as 'life-insurance' | 'annuities',
        coverageAmount: formData.coverageAmount,
        age: formData.age,
        gender: formData.gender as 'male' | 'female',
        additionalComments: formData.additionalComments,
        bestTimeToContact: formData.bestTimeToContact,
        bestDayToContact: formData.bestDayToContact,
      });

      console.log('✓ Form submission successful');

      // Clear form and show success message
      setFormData({
        firstName: '',
        lastName: '',
        state: '',
        productInterest: '',
        coverageAmount: '',
        age: '',
        additionalComments: '',
        gender: '',
        bestTimeToContact: '9:00 AM',
        bestDayToContact: '1'
      });
      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error: any) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error timestamp:', new Date().toISOString());
      console.error('Full error object:', error);
      console.error('Error message:', error?.message);
      console.error('Error name:', error?.name);
      console.error('Error stack:', error?.stack);
      console.error('Error cause:', error?.cause);
      
      if (error?.response) {
        console.error('Error response:', error.response);
      }
      
      if (error?.request) {
        console.error('Error request:', error.request);
      }

      // Set user-friendly error message
      const errorMsg = error?.message || 'An unknown error occurred';
      setErrorMessage(errorMsg);
      console.error('=== END ERROR LOG ===');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-light via-background to-accent-blue/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Let's Discuss Your Insurance Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to protect your family or secure your retirement? Get in touch today for a free consultation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-border rounded-xl shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-br from-navy/5 to-accent-blue/5 border-b-2 border-border rounded-t-xl">
              <CardTitle className="text-3xl font-bold text-navy">Get Your Free Quote</CardTitle>
              <CardDescription className="text-base">
                Fill out the form below and I'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              {showSuccess && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your request has been submitted successfully. I'll get back to you within 24 hours.
                  </AlertDescription>
                </Alert>
              )}

              {(submitForm.isError || validationErrors.length > 0) && (
                <Alert className="mb-6 bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Error</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {validationErrors.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {validationErrors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        {errorMessage || 'There was an error submitting your request. Please try again or contact me directly.'}
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-navy font-semibold">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="rounded-lg border-2 border-border focus:border-accent-blue"
                      placeholder="John"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-navy font-semibold">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="rounded-lg border-2 border-border focus:border-accent-blue"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-navy font-semibold">
                    State *
                  </Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                    required
                  >
                    <SelectTrigger id="state" className="rounded-lg border-2 border-border focus:border-accent-blue">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productInterest" className="text-navy font-semibold">
                    Product Interest *
                  </Label>
                  <Select
                    value={formData.productInterest}
                    onValueChange={(value) => setFormData({ ...formData, productInterest: value })}
                    required
                  >
                    <SelectTrigger id="productInterest" className="rounded-lg border-2 border-border focus:border-accent-blue">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="life-insurance">Life Insurance</SelectItem>
                      <SelectItem value="annuities">Annuities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverageAmount" className="text-navy font-semibold">
                    Coverage Amount
                  </Label>
                  <Input
                    id="coverageAmount"
                    type="text"
                    value={formData.coverageAmount}
                    onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
                    className="rounded-lg border-2 border-border focus:border-accent-blue"
                    placeholder="e.g., $500,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-navy font-semibold">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    min="18"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="rounded-lg border-2 border-border focus:border-accent-blue"
                    placeholder="e.g., 35"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-navy font-semibold">
                    Gender *
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    required
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" className="border-2 border-border" />
                      <Label htmlFor="male" className="text-foreground/80 font-normal cursor-pointer">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" className="border-2 border-border" />
                      <Label htmlFor="female" className="text-foreground/80 font-normal cursor-pointer">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bestTimeToContact" className="text-navy font-semibold">
                      Best Time to Contact *
                    </Label>
                    <select
                      id="bestTimeToContact"
                      required
                      size={6}
                      value={formData.bestTimeToContact}
                      onChange={(e) => setFormData({ ...formData, bestTimeToContact: e.target.value })}
                      className="w-full rounded-lg border-2 border-border focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 bg-background px-3 py-2 text-sm transition-colors"
                    >
                      {HOUR_OPTIONS.map((hour) => (
                        <option key={hour} value={hour} className="py-1">
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestDayToContact" className="text-navy font-semibold">
                      Best Day to Contact *
                    </Label>
                    <select
                      id="bestDayToContact"
                      required
                      size={6}
                      value={formData.bestDayToContact}
                      onChange={(e) => setFormData({ ...formData, bestDayToContact: e.target.value })}
                      className="w-full rounded-lg border-2 border-border focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 bg-background px-3 py-2 text-sm transition-colors"
                    >
                      {DAY_OPTIONS.map((day) => (
                        <option key={day} value={day} className="py-1">
                          Day {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalComments" className="text-navy font-semibold">
                    Additional Comments
                  </Label>
                  <Textarea
                    id="additionalComments"
                    rows={4}
                    value={formData.additionalComments}
                    onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                    className="rounded-lg border-2 border-border focus:border-accent-blue resize-none"
                    placeholder="Please share any relevant health conditions, medications, or additional information that would help us provide you with the best coverage options..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitForm.isPending}
                  className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {submitForm.isPending ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>

              <div className="border-t-2 border-border pt-8">
                <h3 className="text-xl font-bold text-navy mb-6 text-center">Or Contact Me Directly</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Location</h4>
                      <p className="text-foreground/80">Licensed in all 50 states</p>
                      <p className="text-sm text-muted-foreground mt-1">Equity Insurance Partners</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Phone className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Phone</h4>
                      <a href="tel:239-331-0544" className="text-foreground/80 hover:text-accent-blue transition-colors">
                        239-331-0544
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Call or text anytime</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Mail className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Email</h4>
                      <a href="mailto:jonathanayan.eip@gmail.com" className="text-foreground/80 hover:text-accent-blue transition-colors">
                        jonathanayan.eip@gmail.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">I'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Clock className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Availability</h4>
                      <p className="text-foreground/80">Available anytime</p>
                      <p className="text-sm text-muted-foreground mt-1">Flexible scheduling to fit your needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
