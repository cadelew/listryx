import { useParams, Link } from 'react-router-dom';
import AppLayout from '../AppLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Edit, Share2, FileDown, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function ListingDetail() {
  const { id } = useParams();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const listing = {
    id: id,
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    price: '$1,250,000',
    status: 'active',
    bedrooms: 4,
    bathrooms: 3,
    sqft: '2,400',
    yearBuilt: 2015,
    lotSize: '5,000',
    propertyType: 'Single Family Home',
    description: 'Stunning 4-bedroom, 3-bathroom home located in the heart of San Francisco. This beautiful 2,400 sq ft property offers modern amenities and exceptional living spaces. Built in 2015, this home features spacious rooms, natural light throughout, and a prime location perfect for families and professionals alike.',
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Fireplace', 'Central AC', 'Garage'],
    photos: [
      'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NjM1MTk0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM0NzY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NjM1MTk0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    compliance: [
      { name: 'Fair Housing Review', status: 'completed', completedAt: '2 days ago' },
      { name: 'Disclosure Documents', status: 'completed', completedAt: '1 day ago' },
      { name: 'MLS Submission', status: 'pending', dueDate: 'Today' },
      { name: 'Photo Requirements', status: 'in-progress', dueDate: 'Tomorrow' },
    ],
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % listing.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + listing.photos.length) % listing.photos.length);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1>{listing.address}</h1>
              <span className={`px-3 py-1 rounded-full ${
                listing.status === 'active' ? 'bg-green-100 text-green-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">{listing.city}, {listing.state} {listing.zip}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Share2 className="size-4" />
              Share
            </Button>
            <Button variant="outline" className="gap-2">
              <Edit className="size-4" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-100">
                  <ImageWithFallback
                    src={listing.photos[currentPhotoIndex]}
                    alt={`${listing.address} - Photo ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 size-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full">
                    {currentPhotoIndex + 1} / {listing.photos.length}
                  </div>
                </div>
                <div className="p-4 grid grid-cols-6 gap-2">
                  {listing.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`aspect-video rounded overflow-hidden ${idx === currentPhotoIndex ? 'ring-2 ring-blue-600' : ''}`}
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Price</p>
                    <p className="text-2xl text-blue-600">{listing.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Property Type</p>
                    <p>{listing.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Bedrooms</p>
                    <p>{listing.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Bathrooms</p>
                    <p>{listing.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Square Feet</p>
                    <p>{listing.sqft}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Year Built</p>
                    <p>{listing.yearBuilt}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Lot Size</p>
                    <p>{listing.lotSize} sqft</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Description</CardTitle>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Sparkles className="size-4" />
                  Regenerate
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {listing.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Marketing Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Marketing Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/marketing/flyers?listing=${id}`}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileDown className="size-4" />
                    Generate Flyer
                  </Button>
                </Link>
                <Link to={`/marketing/social-media?listing=${id}`}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Share2 className="size-4" />
                    Create Social Post
                  </Button>
                </Link>
                <Link to={`/listings/${id}/photos`}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Sparkles className="size-4" />
                    Manage Photos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {listing.compliance.map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    {item.status === 'completed' ? (
                      <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : item.status === 'pending' ? (
                      <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="size-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="mb-0.5">{item.name}</p>
                      <p className="text-gray-500">
                        {item.status === 'completed' 
                          ? `Completed ${item.completedAt}`
                          : `Due ${item.dueDate}`
                        }
                      </p>
                    </div>
                  </div>
                ))}
                <Link to="/compliance">
                  <Button variant="outline" className="w-full mt-4">
                    View All Tasks
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
