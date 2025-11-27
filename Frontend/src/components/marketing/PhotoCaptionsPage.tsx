import { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Sparkles, Copy, Check, RotateCw, Send } from 'lucide-react';

export default function PhotoCaptionsPage() {
  const [selectedListing, setSelectedListing] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const listings = [
    { id: '1', address: '123 Main Street', city: 'San Francisco, CA' },
    { id: '2', address: '456 Oak Avenue', city: 'Palo Alto, CA' },
    { id: '3', address: '789 Pine Road', city: 'San Jose, CA' },
  ];

  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', caption: 'Stunning curb appeal with professional landscaping and modern exterior finishes' },
    { id: 2, url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', caption: 'Bright and spacious living room with vaulted ceilings and abundant natural light' },
    { id: 3, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600', caption: 'Gourmet kitchen featuring quartz countertops and stainless steel appliances' },
    { id: 4, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', caption: 'Luxurious master suite with hardwood floors and walk-in closet' },
    { id: 5, url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600', caption: 'Spa-like bathroom with dual vanity and elegant tile work' },
    { id: 6, url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600', caption: 'Private backyard oasis with pool and patio perfect for entertaining' },
  ]);

  const generateCaption = (photoId: number) => {
    const captions = [
      'Beautifully designed space with premium finishes throughout',
      'Modern elegance meets functional design in this stunning room',
      'Experience luxury living at its finest',
      'Impeccable attention to detail in every corner',
      'A perfect blend of comfort and sophistication',
    ];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    setPhotos(prev => prev.map(p => 
      p.id === photoId ? { ...p, caption: randomCaption } : p
    ));
  };

  const generateAllCaptions = () => {
    photos.forEach(photo => generateCaption(photo.id));
  };

  const copyCaption = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllCaptions = () => {
    const allCaptions = photos.map((p, i) => `Photo ${i + 1}: ${p.caption}`).join('\n\n');
    navigator.clipboard.writeText(allCaptions);
    alert('All captions copied to clipboard!');
  };

  const applyToListing = () => {
    alert('Captions applied to listing photos!');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Photo Captions</h1>
            <p className="text-gray-600">Generate and manage captions for listing photos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={copyAllCaptions} className="gap-2">
              <Copy className="w-4 h-4" />
              Copy All
            </Button>
            <Button onClick={applyToListing} className="gap-2">
              <Send className="w-4 h-4" />
              Apply to Listing
            </Button>
          </div>
        </div>

        {/* Listing Selector */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Select Listing</Label>
                <Select value={selectedListing} onValueChange={setSelectedListing}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a listing" />
                  </SelectTrigger>
                  <SelectContent>
                    {listings.map((listing) => (
                      <SelectItem key={listing.id} value={listing.id}>
                        {listing.address}, {listing.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generateAllCaptions} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Generate All Captions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Photo Grid with Captions */}
        <div className="grid md:grid-cols-2 gap-6">
          {photos.map((photo, index) => (
            <Card key={photo.id}>
              <CardContent className="p-0">
                <img 
                  src={photo.url} 
                  alt={`Photo ${photo.id}`}
                  className="w-full aspect-video object-cover rounded-t-lg"
                />
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Caption {index + 1}</Label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => generateCaption(photo.id)}
                        className="gap-2 text-xs"
                      >
                        <Sparkles className="w-3 h-3" />
                        Regenerate
                      </Button>
                    </div>
                    <Input
                      value={photo.caption}
                      onChange={(e) => {
                        setPhotos(prev => prev.map(p => 
                          p.id === photo.id ? { ...p, caption: e.target.value } : p
                        ));
                      }}
                      placeholder="Enter photo caption..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => copyCaption(photo.caption, index)}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-gray-500 flex items-center">
                      {photo.caption.length} chars
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {photos.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No photos available. Select a listing with photos to manage captions.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
