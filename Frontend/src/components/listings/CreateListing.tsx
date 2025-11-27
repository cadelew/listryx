import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { ChevronLeft, ChevronRight, Upload, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CreateListing() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    propertyType: 'house',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    lotSize: '',
    description: '',
    features: [] as string[],
    photos: [] as string[],
  });

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Mock submission - in production, this would call an API
    navigate('/listings');
  };

  const generateAIDescription = () => {
    // Mock AI generation
    const aiDescription = `Stunning ${formData.bedrooms}-bedroom, ${formData.bathrooms}-bathroom ${formData.propertyType} located in the heart of ${formData.city}. This beautiful ${formData.sqft} sq ft property offers modern amenities and exceptional living spaces. Built in ${formData.yearBuilt}, this home features spacious rooms, natural light throughout, and a prime location perfect for families and professionals alike.`;
    handleChange('description', aiDescription);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Create New Listing</h1>
          <p className="text-gray-600">Follow the steps to create your listing</p>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`size-10 rounded-full flex items-center justify-center ${
                    s === step ? 'bg-blue-600 text-white' :
                    s < step ? 'bg-green-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {s < step ? <CheckCircle2 className="size-5" /> : s}
                  </div>
                  {s < 5 && (
                    <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <span className={step === 1 ? '' : 'text-gray-500'}>Basic Info</span>
              <span className={step === 2 ? '' : 'text-gray-500'}>Details</span>
              <span className={step === 3 ? '' : 'text-gray-500'}>Photos</span>
              <span className={step === 4 ? '' : 'text-gray-500'}>Description</span>
              <span className={step === 5 ? '' : 'text-gray-500'}>Review</span>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2>Basic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Property Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="San Francisco"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="CA"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code *</Label>
                  <Input
                    id="zip"
                    placeholder="94102"
                    value={formData.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <select
                    id="propertyType"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.propertyType}
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                  >
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="1250000"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2>Property Details</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="4"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange('bedrooms', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    step="0.5"
                    placeholder="3"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange('bathrooms', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sqft">Square Feet *</Label>
                  <Input
                    id="sqft"
                    type="number"
                    placeholder="2400"
                    value={formData.sqft}
                    onChange={(e) => handleChange('sqft', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="2015"
                    value={formData.yearBuilt}
                    onChange={(e) => handleChange('yearBuilt', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lotSize">Lot Size (sq ft)</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    placeholder="5000"
                    value={formData.lotSize}
                    onChange={(e) => handleChange('lotSize', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities & Features</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Fireplace', 'Pool', 'Garage'].map((feature) => (
                    <label key={feature} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2>Upload Photos</h2>
              
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="size-12 mx-auto mb-4 text-gray-400" />
                <p className="mb-2">Drag and drop photos here, or click to browse</p>
                <p className="text-gray-500 mb-4">Supports JPG, PNG up to 10MB</p>
                <Button variant="outline">Choose Files</Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-163966374219${i}-1b3dba2eebcf?w=400`}
                      alt={`Photo ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 size-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100">
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: AI Description */}
        {step === 4 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2>Property Description</h2>
                <Button onClick={generateAIDescription} className="gap-2">
                  <Sparkles className="size-4" />
                  Generate with AI
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={10}
                  placeholder="Describe the property..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
                <p className="text-gray-500">Our AI can generate a compelling description based on your property details</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Review & Compliance */}
        {step === 5 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2>Review & Compliance</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 rounded" />
                  <div>
                    <p>Fair Housing Compliance</p>
                    <p className="text-gray-600">Description follows fair housing guidelines</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 rounded" />
                  <div>
                    <p>Disclosure Documents</p>
                    <p className="text-gray-600">All required disclosures are attached</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 rounded" />
                  <div>
                    <p>MLS Guidelines</p>
                    <p className="text-gray-600">Listing meets MLS requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 rounded" />
                  <div>
                    <p>Photo Guidelines</p>
                    <p className="text-gray-600">Photos meet quality and content standards</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-900 mb-2">Listing Summary</p>
                <p className="text-gray-700">{formData.address}, {formData.city}</p>
                <p className="text-gray-700">${formData.price} • {formData.bedrooms} beds • {formData.bathrooms} baths • {formData.sqft} sqft</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>
          
          {step < 5 ? (
            <Button onClick={nextStep} className="gap-2">
              Next
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              <CheckCircle2 className="size-4" />
              Submit Listing
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
