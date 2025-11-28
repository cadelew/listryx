'use client';

import { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Download, Printer, FileText, Check } from 'lucide-react';

export default function FlyersPage() {
  const [selectedListing, setSelectedListing] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const listings = [
    { id: '1', address: '123 Main Street', city: 'San Francisco, CA', price: '$1,250,000', beds: 3, baths: 2, sqft: '2,100' },
    { id: '2', address: '456 Oak Avenue', city: 'Palo Alto, CA', price: '$2,100,000', beds: 4, baths: 3, sqft: '2,850' },
    { id: '3', address: '789 Pine Road', city: 'San Jose, CA', price: '$850,000', beds: 2, baths: 2, sqft: '1,650' },
  ];

  const templates = [
    { id: 'modern', name: 'Modern Minimalist', description: 'Clean lines and contemporary design' },
    { id: 'luxury', name: 'Luxury Gold', description: 'Elegant gold accents for high-end properties' },
    { id: 'traditional', name: 'Classic Traditional', description: 'Timeless design with professional appeal' },
    { id: 'vibrant', name: 'Vibrant Bold', description: 'Eye-catching colors and dynamic layout' },
  ];

  const downloadPDF = () => {
    alert('Downloading flyer as PDF...');
  };

  const printFlyer = () => {
    window.print();
  };

  const currentListing = listings.find(l => l.id === selectedListing);

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900">Marketing Flyers</h1>
          <p className="text-gray-600">Create professional flyers for your listings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flyer Settings</CardTitle>
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
                  <Label>Template</Label>
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm mb-1">{template.name}</p>
                            <p className="text-xs text-gray-500">{template.description}</p>
                          </div>
                          {selectedTemplate === template.id && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Button 
                    className="w-full gap-2" 
                    onClick={downloadPDF}
                    disabled={!selectedListing}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={printFlyer}
                    disabled={!selectedListing}
                  >
                    <Printer className="w-4 h-4" />
                    Print Flyer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Info */}
            <Card>
              <CardHeader>
                <CardTitle>Flyer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Size</Badge>
                    <span className="text-sm text-gray-600">8.5" × 11" (Letter)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Format</Badge>
                    <span className="text-sm text-gray-600">PDF (Print-ready)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Resolution</Badge>
                    <span className="text-sm text-gray-600">300 DPI</span>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    Flyers include property photos, details, and your contact information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Preview</CardTitle>
                  {selectedTemplate && (
                    <Badge variant="secondary">{templates.find(t => t.id === selectedTemplate)?.name}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {selectedListing && currentListing ? (
                  <div className="bg-white border-2 rounded-lg overflow-hidden shadow-lg aspect-[8.5/11]">
                    {/* Flyer Preview - Modern Template */}
                    {selectedTemplate === 'modern' && (
                      <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                          <h2 className="text-2xl mb-2">FOR SALE</h2>
                          <p className="text-3xl mb-1">{currentListing.price}</p>
                          <p className="text-blue-100">{currentListing.address}</p>
                          <p className="text-blue-100">{currentListing.city}</p>
                        </div>

                        {/* Property Image */}
                        <div className="flex-1 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600" 
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Property Details */}
                        <div className="bg-gray-50 p-6">
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <p className="text-2xl text-blue-600 mb-1">{currentListing.beds}</p>
                              <p className="text-sm text-gray-600">Bedrooms</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl text-blue-600 mb-1">{currentListing.baths}</p>
                              <p className="text-sm text-gray-600">Bathrooms</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl text-blue-600 mb-1">{currentListing.sqft}</p>
                              <p className="text-sm text-gray-600">Sq Ft</p>
                            </div>
                          </div>

                          {/* Agent Info */}
                          <div className="border-t pt-4 text-center">
                            <p className="mb-1">ListingAI Pro</p>
                            <p className="text-sm text-gray-600">Contact: (555) 123-4567</p>
                            <p className="text-sm text-gray-600">info@listingaipro.com</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Luxury Template */}
                    {selectedTemplate === 'luxury' && (
                      <div className="h-full flex flex-col bg-gradient-to-b from-amber-50 to-white">
                        <div className="border-b-4 border-amber-400 p-6 text-center">
                          <p className="text-amber-600 text-sm mb-2">LUXURY LIVING</p>
                          <h2 className="text-3xl text-gray-900 mb-3">{currentListing.price}</h2>
                          <p className="text-gray-700">{currentListing.address}</p>
                          <p className="text-gray-600">{currentListing.city}</p>
                        </div>

                        <div className="flex-1 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600" 
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-6 bg-gradient-to-b from-amber-50 to-amber-100">
                          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                            <div>
                              <p className="text-2xl text-amber-700">{currentListing.beds}</p>
                              <p className="text-xs text-gray-600">BEDROOMS</p>
                            </div>
                            <div>
                              <p className="text-2xl text-amber-700">{currentListing.baths}</p>
                              <p className="text-xs text-gray-600">BATHROOMS</p>
                            </div>
                            <div>
                              <p className="text-2xl text-amber-700">{currentListing.sqft}</p>
                              <p className="text-xs text-gray-600">SQ FT</p>
                            </div>
                          </div>
                          <div className="border-t-2 border-amber-400 pt-4 text-center">
                            <p className="text-gray-900 mb-1">ListingAI Pro</p>
                            <p className="text-sm text-gray-600">(555) 123-4567 | info@listingaipro.com</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Traditional Template */}
                    {selectedTemplate === 'traditional' && (
                      <div className="h-full flex flex-col bg-white">
                        <div className="bg-gray-900 text-white p-6 text-center">
                          <h2 className="text-sm mb-2">PROPERTY FOR SALE</h2>
                          <p className="text-2xl mb-3">{currentListing.price}</p>
                        </div>

                        <div className="flex-1 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600" 
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-6">
                          <p className="text-xl mb-1">{currentListing.address}</p>
                          <p className="text-gray-600 mb-4">{currentListing.city}</p>
                          
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <p className="text-2xl text-gray-900">{currentListing.beds}</p>
                              <p className="text-xs text-gray-600">Bedrooms</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <p className="text-2xl text-gray-900">{currentListing.baths}</p>
                              <p className="text-xs text-gray-600">Bathrooms</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <p className="text-2xl text-gray-900">{currentListing.sqft}</p>
                              <p className="text-xs text-gray-600">Sq Ft</p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <p className="text-center text-sm text-gray-700">
                              ListingAI Pro • (555) 123-4567 • info@listingaipro.com
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Vibrant Template */}
                    {selectedTemplate === 'vibrant' && (
                      <div className="h-full flex flex-col">
                        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-6">
                          <h2 className="text-3xl mb-2">NEW LISTING!</h2>
                          <p className="text-4xl mb-2">{currentListing.price}</p>
                        </div>

                        <div className="flex-1 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600" 
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg">
                            <p className="text-lg mb-1">{currentListing.address}</p>
                            <p className="text-gray-600">{currentListing.city}</p>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
                          <div className="flex justify-around mb-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2">
                                {currentListing.beds}
                              </div>
                              <p className="text-xs text-gray-600">Beds</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2">
                                {currentListing.baths}
                              </div>
                              <p className="text-xs text-gray-600">Baths</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2">
                                {currentListing.sqft}
                              </div>
                              <p className="text-xs text-gray-600">Sq Ft</p>
                            </div>
                          </div>
                          <div className="text-center pt-4 border-t">
                            <p className="mb-1">ListingAI Pro</p>
                            <p className="text-sm text-gray-600">(555) 123-4567 • info@listingaipro.com</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[8.5/11] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 mb-2">No listing selected</p>
                      <p className="text-sm text-gray-400">Choose a listing to see flyer preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
