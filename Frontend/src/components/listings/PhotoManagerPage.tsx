import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { 
  ChevronLeft, 
  Upload, 
  Trash2, 
  GripVertical,
  Sparkles,
  Download,
  Check
} from 'lucide-react';

export default function PhotoManagerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', caption: 'Beautiful front exterior with landscaping' },
    { id: 2, url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', caption: 'Spacious living room with natural light' },
    { id: 3, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', caption: 'Modern kitchen with stainless appliances' },
    { id: 4, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', caption: 'Master bedroom with hardwood floors' },
    { id: 5, url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800', caption: 'Updated bathroom with dual vanity' },
    { id: 6, url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800', caption: 'Backyard patio with pool' },
  ]);

  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const togglePhotoSelection = (photoId: number) => {
    setSelectedPhotos(prev =>
      prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const deleteSelectedPhotos = () => {
    setPhotos(prev => prev.filter(photo => !selectedPhotos.includes(photo.id)));
    setSelectedPhotos([]);
  };

  const generateCaptions = () => {
    // Simulate AI caption generation
    alert('AI captions generated for selected photos!');
  };

  const exportPhotos = () => {
    alert('Exporting photos...');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/listings/${id}`)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-gray-900">Photo Manager</h1>
              <p className="text-gray-600">123 Main Street, San Francisco</p>
            </div>
          </div>
          <div className="flex gap-2">
            {selectedPhotos.length > 0 && (
              <>
                <Button variant="outline" onClick={generateCaptions} className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Captions
                </Button>
                <Button variant="outline" onClick={exportPhotos} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export ({selectedPhotos.length})
                </Button>
                <Button variant="destructive" onClick={deleteSelectedPhotos} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedPhotos.length})
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Upload Area */}
        <Card>
          <CardContent className="p-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
              <p className="text-sm text-gray-500 mb-3">Supports: JPG, PNG (Max 10MB per file)</p>
              <Button>Choose Files</Button>
            </div>
          </CardContent>
        </Card>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className={`overflow-hidden ${selectedPhotos.includes(photo.id) ? 'ring-2 ring-blue-600' : ''}`}>
              <CardContent className="p-0">
                <div className="relative group">
                  <img 
                    src={photo.url} 
                    alt={`Photo ${photo.id}`}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => togglePhotoSelection(photo.id)}
                    >
                      {selectedPhotos.includes(photo.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        'Select'
                      )}
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Photo {photo.id}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 cursor-move"
                  >
                    <GripVertical className="w-4 h-4 text-white" />
                  </Button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">Photo Caption</Label>
                    <Input
                      value={photo.caption}
                      onChange={(e) => {
                        setPhotos(prev => prev.map(p => 
                          p.id === photo.id ? { ...p, caption: e.target.value } : p
                        ));
                      }}
                      placeholder="Add a caption..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => togglePhotoSelection(photo.id)}
                    >
                      {selectedPhotos.includes(photo.id) ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Selected
                        </>
                      ) : (
                        'Select'
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setPhotos(prev => prev.filter(p => p.id !== photo.id))}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No photos yet. Upload some photos to get started.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
