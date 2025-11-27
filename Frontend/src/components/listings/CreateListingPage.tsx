import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ChevronLeft, ChevronRight, Check, Upload, X, Sparkles } from 'lucide-react';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    propertyType: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    lotSize: '',
    amenities: [] as string[],
    photos: [] as string[],
    aiDescription: '',
    compliance: {
      leadDisclosure: false,
      sellerDisclosure: false,
      naturalHazard: false,
      smokeDetectors: false,
    }
  });

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Property Details' },
    { number: 3, title: 'Photos' },
    { number: 4, title: 'AI Description' },
    { number: 5, title: 'Compliance' },
  ];

  const amenitiesList = [
    'Pool', 'Garage', 'Fireplace', 'Hardwood Floors', 'Updated Kitchen',
    'Central AC', 'Walk-in Closet', 'Balcony', 'Washer/Dryer', 'Dishwasher'
  ];

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const generateAIDescription = () => {
    const description = `Stunning ${formData.bedrooms}-bedroom, ${formData.bathrooms}-bathroom ${formData.propertyType.toLowerCase()} in the heart of ${formData.city}. This beautiful property features ${formData.sqft} square feet of living space and was built in ${formData.yearBuilt}. ${formData.amenities.length > 0 ? `Notable amenities include ${formData.amenities.slice(0, 3).join(', ')}.` : ''} Perfectly located with easy access to shopping, dining, and entertainment. Don't miss this opportunity to own a piece of ${formData.city}!`;
    setFormData(prev => ({ ...prev, aiDescription: description }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 3) {
        generateAIDescription();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    navigate('/listings');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-1">Create New Listing</h1>
          <p className="text-gray-600">Add a new property to your portfolio</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm
                  ${currentStep > step.number ? 'bg-green-600 text-white' :
                    currentStep === step.number ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-600'}
                `}>
                  {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className="text-xs mt-2 text-center">{step.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-0.5 flex-1 ${currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl mb-4">Basic Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="San Francisco"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="94102"
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family">Single Family</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      placeholder="$1,000,000"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl mb-4">Property Details</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      placeholder="3"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="2"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input
                      id="sqft"
                      placeholder="2,100"
                      value={formData.sqft}
                      onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      placeholder="2015"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lotSize">Lot Size (acres)</Label>
                    <Input
                      id="lotSize"
                      placeholder="0.25"
                      value={formData.lotSize}
                      onChange={(e) => setFormData({...formData, lotSize: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenitiesList.map(amenity => (
                      <div
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`
                          p-3 border rounded-lg cursor-pointer transition-colors
                          ${formData.amenities.includes(amenity)
                            ? 'bg-blue-50 border-blue-600'
                            : 'hover:bg-gray-50'}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => {}}
                            className="rounded"
                          />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl mb-4">Upload Photos</h2>
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports: JPG, PNG (Max 10MB)</p>
                  <Button className="mt-4">Choose Files</Button>
                </div>

                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-video bg-gray-200 rounded-lg">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl">AI-Generated Description</h2>
                  <Button variant="outline" size="sm" onClick={generateAIDescription} className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Regenerate
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    rows={8}
                    placeholder="AI will generate a compelling description based on your property details..."
                    value={formData.aiDescription}
                    onChange={(e) => setFormData({...formData, aiDescription: e.target.value})}
                  />
                  <p className="text-sm text-gray-500">
                    This AI-generated description can be edited. Make any changes you'd like before proceeding.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-xl mb-4">Compliance Checklist</h2>
                <div className="space-y-3">
                  {Object.entries(formData.compliance).map(([key, checked]) => (
                    <div key={key} className="flex items-start gap-3 p-4 border rounded-lg">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setFormData({
                          ...formData,
                          compliance: {...formData.compliance, [key]: e.target.checked}
                        })}
                        className="mt-1 rounded"
                      />
                      <div className="flex-1">
                        <div className="mb-1">
                          {key === 'leadDisclosure' && 'Lead-Based Paint Disclosure'}
                          {key === 'sellerDisclosure' && 'Seller Property Disclosure'}
                          {key === 'naturalHazard' && 'Natural Hazard Disclosure'}
                          {key === 'smokeDetectors' && 'Smoke Detector Compliance'}
                        </div>
                        <p className="text-sm text-gray-500">
                          {key === 'leadDisclosure' && 'Required for homes built before 1978'}
                          {key === 'sellerDisclosure' && 'Mandatory property condition statement'}
                          {key === 'naturalHazard' && 'Disclosure of flood, fire, and earthquake zones'}
                          {key === 'smokeDetectors' && 'Verify smoke detector installation'}
                        </p>
                      </div>
                      <Badge variant={checked ? 'default' : 'secondary'}>
                        {checked ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>
          {currentStep < 5 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              <Check className="w-4 h-4" />
              Create Listing
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
