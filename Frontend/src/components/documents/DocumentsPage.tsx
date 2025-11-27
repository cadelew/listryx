import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  Search, 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Purchase Agreement - 123 Main St.pdf',
      type: 'Contract',
      listing: '123 Main Street',
      client: 'John Smith',
      uploadedBy: 'Jane Doe',
      uploadedDate: '2025-11-20',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Home Inspection Report.pdf',
      type: 'Report',
      listing: '456 Oak Avenue',
      client: 'Sarah Johnson',
      uploadedBy: 'Mike Wilson',
      uploadedDate: '2025-11-19',
      size: '5.1 MB',
    },
    {
      id: 3,
      name: 'Disclosure Forms.pdf',
      type: 'Disclosure',
      listing: '789 Pine Road',
      client: 'Robert Brown',
      uploadedBy: 'Jane Doe',
      uploadedDate: '2025-11-18',
      size: '1.2 MB',
    },
    {
      id: 4,
      name: 'Title Report.pdf',
      type: 'Title',
      listing: '321 Elm Street',
      client: 'Emily Davis',
      uploadedBy: 'Mike Wilson',
      uploadedDate: '2025-11-17',
      size: '3.8 MB',
    },
    {
      id: 5,
      name: 'Appraisal Report.pdf',
      type: 'Appraisal',
      listing: '654 Maple Drive',
      client: 'Michael Chen',
      uploadedBy: 'Jane Doe',
      uploadedDate: '2025-11-15',
      size: '4.5 MB',
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.listing.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Contract': 'bg-blue-100 text-blue-700',
      'Report': 'bg-purple-100 text-purple-700',
      'Disclosure': 'bg-orange-100 text-orange-700',
      'Title': 'bg-green-100 text-green-700',
      'Appraisal': 'bg-pink-100 text-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Documents</h1>
            <p className="text-gray-600">Manage all your listing and client documents</p>
          </div>
          <Link to="/documents/upload">
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Report">Report</SelectItem>
              <SelectItem value="Disclosure">Disclosure</SelectItem>
              <SelectItem value="Title">Title</SelectItem>
              <SelectItem value="Appraisal">Appraisal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{doc.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span>Listing: {doc.listing}</span>
                          <span>•</span>
                          <span>Client: {doc.client}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                      <Badge className={getTypeColor(doc.type)}>
                        {doc.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Uploaded by {doc.uploadedBy} on {doc.uploadedDate}
                      </p>

                      <div className="flex gap-2">
                        <Link to={`/documents/${doc.id}`}>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Download className="w-4 h-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No documents found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
