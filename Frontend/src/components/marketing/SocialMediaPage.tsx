'use client';

import { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
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
import { Facebook, Instagram, Linkedin, Download, Sparkles, Calendar } from 'lucide-react';

export default function SocialMediaPage() {
  const [selectedListing, setSelectedListing] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [caption, setCaption] = useState('');

  const listings = [
    { id: '1', address: '123 Main Street', city: 'San Francisco, CA', price: '$1,250,000' },
    { id: '2', address: '456 Oak Avenue', city: 'Palo Alto, CA', price: '$2,100,000' },
    { id: '3', address: '789 Pine Road', city: 'San Jose, CA', price: '$850,000' },
  ];

  const platformConfig = {
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
      maxChars: 2200,
      aspectRatio: '1:1'
    },
    facebook: {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      maxChars: 63206,
      aspectRatio: '1.91:1'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      maxChars: 3000,
      aspectRatio: '1.91:1'
    }
  };

  const generateCaption = () => {
    const selectedListingData = listings.find(l => l.id === selectedListing);
    if (!selectedListingData) return;

    const captions = {
      instagram: `🏡 NEW LISTING ALERT! 🏡\n\n${selectedListingData.address}\n${selectedListingData.city}\n💰 ${selectedListingData.price}\n\n✨ Stunning property in prime location\n🛏️ Spacious living areas\n🌟 Modern amenities throughout\n\nDM for details or link in bio!\n\n#realestate #newhome #dreamhome #property #luxuryhomes #househunting #realtor #realty #home #forsale`,
      facebook: `🏡 JUST LISTED! 🏡\n\n${selectedListingData.address}, ${selectedListingData.city}\nPriced at ${selectedListingData.price}\n\nDon't miss this incredible opportunity! This beautiful property features spacious living areas, modern amenities, and is located in a highly desirable neighborhood.\n\nInterested? Contact us today for more information and to schedule a private showing!\n\n#RealEstate #NewListing #HomeForSale #DreamHome`,
      linkedin: `New Listing: ${selectedListingData.address}\n\nWe're excited to announce a new property listing in ${selectedListingData.city}. This exceptional property is priced at ${selectedListingData.price} and offers outstanding value in today's market.\n\nKey features include modern finishes, spacious layout, and prime location with excellent access to amenities.\n\nPlease reach out if you or anyone in your network is interested in learning more about this opportunity.\n\n#RealEstate #PropertyListing #Investment`
    };

    setCaption(captions[platform as keyof typeof captions] || '');
  };

  const downloadAsset = () => {
    alert('Social media asset downloaded!');
  };

  const schedulePost = () => {
    alert('Post scheduled successfully!');
  };

  const currentPlatform = platformConfig[platform as keyof typeof platformConfig];
  const PlatformIcon = currentPlatform.icon;

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900">Social Media Posts</h1>
          <p className="text-gray-600">Create engaging social media content for your listings</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
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
                          {listing.address} - {listing.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Platform</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(platformConfig).map(([key, config]) => {
                      const Icon = config.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setPlatform(key)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            platform === key 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-xs text-center">{config.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={10}
                    placeholder="Enter your caption or generate one with AI..."
                    maxLength={currentPlatform.maxChars}
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{caption.length} / {currentPlatform.maxChars} characters</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={generateCaption}
                      disabled={!selectedListing}
                      className="gap-2"
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={downloadAsset}
                    disabled={!selectedListing}
                  >
                    <Download className="w-4 h-4" />
                    Download Asset
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2"
                    onClick={schedulePost}
                    disabled={!selectedListing}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Platform Info */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Image Ratio</Badge>
                  <span className="text-sm text-gray-600">{currentPlatform.aspectRatio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Max Characters</Badge>
                  <span className="text-sm text-gray-600">{currentPlatform.maxChars.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    {platform === 'instagram' && 'Use hashtags and emojis for better engagement. First 125 characters are most important.'}
                    {platform === 'facebook' && 'Posts with images get 2.3x more engagement. Keep it conversational and friendly.'}
                    {platform === 'linkedin' && 'Professional tone works best. Include relevant industry hashtags.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Preview</CardTitle>
                <div className={`${currentPlatform.color} text-white px-3 py-1 rounded-full flex items-center gap-2`}>
                  <PlatformIcon className="w-4 h-4" />
                  <span className="text-sm">{currentPlatform.name}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mock Social Media Post */}
                <div className="border rounded-lg overflow-hidden bg-white">
                  {/* Post Header */}
                  <div className="p-3 flex items-center gap-3 border-b">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                      LA
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">ListingAI Pro</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="relative bg-gray-200 aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600" 
                      alt="Property preview"
                      className="w-full h-full object-cover"
                    />
                    {selectedListing && (
                      <div className="absolute bottom-3 left-3 bg-white px-3 py-2 rounded-lg shadow-lg">
                        <p className="text-xs text-gray-500">
                          {listings.find(l => l.id === selectedListing)?.address}
                        </p>
                        <p className="text-blue-600">
                          {listings.find(l => l.id === selectedListing)?.price}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Post Caption */}
                  <div className="p-3">
                    {caption ? (
                      <p className="text-sm whitespace-pre-wrap">{caption}</p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Your caption will appear here...</p>
                    )}
                  </div>
                </div>

                {!selectedListing && (
                  <div className="text-center py-6 text-sm text-gray-500">
                    Select a listing to see preview
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
