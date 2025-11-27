import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from '../AppLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Upload, X, GripVertical, Sparkles } from 'lucide-react';

export default function PhotoManager() {
  const { id } = useParams();
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=800', caption: 'Beautiful front exterior with modern landscaping' },
    { id: 2, url: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?w=800', caption: 'Spacious living room with natural light' },
    { id: 3, url: 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=800', caption: 'Gourmet kitchen with stainless appliances' },
  ]);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Photo Manager</h1>
            <p className="text-gray-600">Manage photos for listing #{id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Sparkles className="size-4" />
              Generate Captions
            </Button>
            <Button className="gap-2">
              <Upload className="size-4" />
              Upload Photos
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="size-10 mx-auto mb-3 text-gray-400" />
              <p className="mb-2">Drag and drop photos here</p>
              <p className="text-gray-500 mb-4">or click to browse</p>
              <Button variant="outline">Choose Files</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Photos ({photos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {photos.map((photo, index) => (
                <div key={photo.id} className="flex gap-4 items-start p-4 border rounded-lg">
                  <GripVertical className="size-5 text-gray-400 cursor-move mt-2" />
                  <ImageWithFallback
                    src={photo.url}
                    alt={`Photo ${index + 1}`}
                    className="w-32 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="mb-1">Photo {index + 1}</p>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg resize-none"
                      rows={2}
                      value={photo.caption}
                      onChange={() => {}}
                      placeholder="Add a caption..."
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </AppLayout>
  );
}
