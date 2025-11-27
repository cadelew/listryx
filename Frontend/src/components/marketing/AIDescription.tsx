import { useState } from 'react';
import AppLayout from '../AppLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Sparkles, Copy, RefreshCw, Check } from 'lucide-react';

export default function AIDescription() {
  const [propertyInfo, setPropertyInfo] = useState({
    address: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    features: '',
  });
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateDescription = () => {
    setLoading(true);
    // Mock AI generation
    setTimeout(() => {
      const generated = `Discover your dream home at ${propertyInfo.address || 'this stunning property'}! This magnificent ${propertyInfo.bedrooms}-bedroom, ${propertyInfo.bathrooms}-bathroom residence spans ${propertyInfo.sqft} square feet of luxurious living space. \n\nStep inside to find an open-concept floor plan designed for modern living. The gourmet kitchen features premium appliances and flows seamlessly into the spacious living areas. Natural light floods every room, creating a warm and inviting atmosphere throughout.\n\nKey features include: ${propertyInfo.features || 'hardwood floors, granite countertops, and stainless steel appliances'}.\n\nPerfectly located in a desirable neighborhood, this home offers the ideal blend of comfort, style, and convenience. Don't miss this opportunity to make it yours!`;
      setDescription(generated);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="mb-2">AI Description Generator</h1>
          <p className="text-gray-600">Generate compelling property descriptions with AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street, San Francisco"
                  value={propertyInfo.address}
                  onChange={(e) => setPropertyInfo(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="4"
                    value={propertyInfo.bedrooms}
                    onChange={(e) => setPropertyInfo(prev => ({ ...prev, bedrooms: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    placeholder="3"
                    value={propertyInfo.bathrooms}
                    onChange={(e) => setPropertyInfo(prev => ({ ...prev, bathrooms: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sqft">Square Feet</Label>
                <Input
                  id="sqft"
                  type="number"
                  placeholder="2400"
                  value={propertyInfo.sqft}
                  onChange={(e) => setPropertyInfo(prev => ({ ...prev, sqft: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Textarea
                  id="features"
                  rows={3}
                  placeholder="Hardwood floors, granite countertops, pool..."
                  value={propertyInfo.features}
                  onChange={(e) => setPropertyInfo(prev => ({ ...prev, features: e.target.value }))}
                />
              </div>

              <Button onClick={generateDescription} className="w-full gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate Description
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Output */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                rows={15}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your AI-generated description will appear here..."
                className="resize-none"
              />

              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex-1 gap-2"
                  disabled={!description}
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  onClick={generateDescription}
                  variant="outline"
                  className="gap-2"
                  disabled={!description || loading}
                >
                  <RefreshCw className="size-4" />
                  Regenerate
                </Button>
              </div>

              {description && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-900 mb-1">Pro Tip</p>
                  <p className="text-gray-700">You can edit the description above before copying it to your listing.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
