import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ChevronLeft, Upload, File, X } from 'lucide-react';

export default function UploadDocumentPage() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState('');
  const [linkedListing, setLinkedListing] = useState('');
  const [linkedClient, setLinkedClient] = useState('');

  const listings = [
    { id: '1', address: '123 Main Street' },
    { id: '2', address: '456 Oak Avenue' },
    { id: '3', address: '789 Pine Road' },
  ];

  const clients = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Robert Brown' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    alert('Documents uploaded successfully!');
    navigate('/documents');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/documents')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-gray-900">Upload Documents</h1>
            <p className="text-gray-600">Add new documents to your library</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Files</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer block">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-gray-500 mb-3">Supports: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                  <Button type="button">Choose Files</Button>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600 mb-2">{selectedFiles.length} file(s) selected</p>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <File className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Document Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="disclosure">Disclosure</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="appraisal">Appraisal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Link to Listing (Optional)</Label>
                  <Select value={linkedListing} onValueChange={setLinkedListing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {listings.map((listing) => (
                        <SelectItem key={listing.id} value={listing.id}>
                          {listing.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Link to Client (Optional)</Label>
                  <Select value={linkedClient} onValueChange={setLinkedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  After upload, our AI will automatically analyze your documents and provide key highlights and summaries.
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/documents')}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || !documentType}
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
