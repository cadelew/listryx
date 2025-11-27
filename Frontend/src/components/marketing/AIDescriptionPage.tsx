import { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Sparkles, Copy, Check, RotateCw, Send } from 'lucide-react';

export default function AIDescriptionPage() {
  const [selectedListing, setSelectedListing] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [description, setDescription] = useState('');

  const listings = [
    { id: '1', address: '123 Main Street', city: 'San Francisco, CA' },
    { id: '2', address: '456 Oak Avenue', city: 'Palo Alto, CA' },
    { id: '3', address: '789 Pine Road', city: 'San Jose, CA' },
  ];

  const generateDescription = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedText = tone === 'luxury' 
        ? "Welcome to this exquisite residence, a masterpiece of architectural excellence nestled in the heart of San Francisco's most prestigious neighborhood. This exceptional property seamlessly blends timeless elegance with contemporary sophistication, offering an unparalleled living experience. Featuring meticulously curated interiors, state-of-the-art amenities, and breathtaking views, this home represents the pinnacle of luxury living. Every detail has been thoughtfully designed to create an ambiance of refined comfort and understated opulence."
        : tone === 'casual'
        ? "Check out this amazing home! Perfect for anyone looking for a great place to live in a fantastic location. This property has everything you need - spacious rooms, modern features, and a wonderful neighborhood. You'll love the open floor plan, updated kitchen, and beautiful outdoor space. Great schools nearby, easy commute, and tons of local amenities. Don't miss out on this gem!"
        : "Discover this exceptional property in San Francisco, offering the perfect blend of comfort and convenience. This well-maintained home features spacious living areas, modern amenities, and desirable finishes throughout. Located in a sought-after neighborhood with excellent schools, shopping, and dining options nearby. The property boasts an open floor plan ideal for both entertaining and everyday living, along with outdoor space perfect for relaxation.";
      
      setDescription(generatedText);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyToListing = () => {
    alert('Description applied to listing!');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900">AI Description Generator</h1>
          <p className="text-gray-600">Generate compelling property descriptions with AI</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Listing</Label>
                  <Select value={selectedListing} onValueChange={setSelectedListing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a listing" />
                    </SelectTrigger>
                    <SelectContent>
                      {listings.map((listing) => (
                        <SelectItem key={listing.id} value={listing.id}>
                          {listing.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (50-100 words)</SelectItem>
                      <SelectItem value="medium">Medium (100-200 words)</SelectItem>
                      <SelectItem value="long">Long (200+ words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full gap-2" 
                  onClick={generateDescription}
                  disabled={!selectedListing || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Description
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Ensure listing details are complete</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Choose tone based on target buyers</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Review and edit generated content</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Add personal touches for authenticity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Generated Description</CardTitle>
                {description && (
                  <div className="flex gap-2">
                    <Badge variant="secondary">{tone}</Badge>
                    <Badge variant="secondary">{length}</Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {description ? (
                  <>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={12}
                      placeholder="Your AI-generated description will appear here..."
                      className="resize-none"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={generateDescription}
                      >
                        <RotateCw className="w-4 h-4" />
                        Regenerate
                      </Button>
                      <Button 
                        className="gap-2 ml-auto"
                        onClick={applyToListing}
                      >
                        <Send className="w-4 h-4" />
                        Apply to Listing
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="py-24 text-center">
                    <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No description generated yet</p>
                    <p className="text-sm text-gray-400">Select a listing and click generate to create AI-powered content</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Character Count */}
            {description && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Word count: {description.split(' ').length}</span>
                    <span className="text-gray-600">Character count: {description.length}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
