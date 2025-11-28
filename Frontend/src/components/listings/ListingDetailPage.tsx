'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { 
  ChevronLeft, 
  Edit, 
  Image, 
  Download, 
  Share2, 
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft as CarouselLeft,
  Check,
  X
} from 'lucide-react';

export default function ListingDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(
    "Stunning 3-bedroom, 2-bathroom single family home in the heart of San Francisco. This beautiful property features 2,100 square feet of living space and was built in 2015. Notable amenities include pool, garage, and fireplace. Perfectly located with easy access to shopping, dining, and entertainment. Don't miss this opportunity to own a piece of San Francisco!"
  );

  const listing = {
    id: 1,
    address: '123 Main Street',
    city: 'San Francisco, CA 94102',
    type: 'Single Family',
    price: '$1,250,000',
    status: 'Active',
    bedrooms: 3,
    bathrooms: 2,
    sqft: '2,100',
    yearBuilt: 2015,
    lotSize: '0.25 acres',
    amenities: ['Pool', 'Garage', 'Fireplace', 'Central AC', 'Hardwood Floors'],
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    views: 342,
    likes: 28,
    listingDate: '2025-11-15'
  };

  const complianceTasks = [
    { name: 'Lead-Based Paint Disclosure', status: 'complete', required: true },
    { name: 'Seller Property Disclosure', status: 'complete', required: true },
    { name: 'Natural Hazard Disclosure', status: 'pending', required: true },
    { name: 'Smoke Detector Compliance', status: 'complete', required: true },
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % listing.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + listing.photos.length) % listing.photos.length);
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/listings')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-gray-900">{listing.address}</h1>
              <p className="text-gray-600">{listing.city}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/listings/${id}/photos`}>
              <Button variant="outline" className="gap-2">
                <Image className="w-4 h-4" />
                Manage Photos
              </Button>
            </Link>
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Listing
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Carousel */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={listing.photos[currentPhotoIndex]} 
                    alt={`Property ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={prevPhoto}
                  >
                    <CarouselLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={nextPhoto}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentPhotoIndex + 1} / {listing.photos.length}
                  </div>
                </div>
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {listing.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                        idx === currentPhotoIndex ? 'border-blue-600' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Description */}
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Property Description</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditingDescription(!isEditingDescription)}
                >
                  {isEditingDescription ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingDescription ? (
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                )}
              </CardContent>
            </Card>

            {/* Compliance Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {task.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        )}
                        <div>
                          <p className="text-sm">{task.name}</p>
                          {task.required && (
                            <p className="text-xs text-gray-500">Required</p>
                          )}
                        </div>
                      </div>
                      <Badge variant={task.status === 'complete' ? 'default' : 'secondary'}>
                        {task.status === 'complete' ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Marketing Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Marketing Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Link href={`/marketing/flyers?listing=${id}`}>
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="w-4 h-4" />
                      Generate Flyer
                    </Button>
                  </Link>
                  <Link href={`/marketing/social-media?listing=${id}`}>
                    <Button variant="outline" className="w-full gap-2">
                      <Share2 className="w-4 h-4" />
                      Social Post
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-600">{listing.price}</CardTitle>
                  <Badge>{listing.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p>{listing.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p>{listing.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sq Ft</p>
                    <p>{listing.sqft}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year Built</p>
                    <p>{listing.yearBuilt}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Lot Size</p>
                    <p>{listing.lotSize}</p>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-500 mb-2">Property Type</p>
                  <p>{listing.type}</p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity, idx) => (
                    <Badge key={idx} variant="secondary">{amenity}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Listing Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Views</span>
                  <span>{listing.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Likes</span>
                  <span>{listing.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Listed</span>
                  <span className="text-sm">{listing.listingDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
