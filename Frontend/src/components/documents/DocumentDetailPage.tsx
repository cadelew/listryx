'use client';

import { useParams, useRouter } from 'next/navigation';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronLeft, Download, FileText, Sparkles, Link as LinkIcon, User } from 'lucide-react';

export default function DocumentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const document = {
    id: 1,
    name: 'Purchase Agreement - 123 Main St.pdf',
    type: 'Contract',
    listing: '123 Main Street, San Francisco, CA',
    client: 'John Smith',
    uploadedBy: 'Jane Doe',
    uploadedDate: '2025-11-20',
    size: '2.4 MB',
    pages: 15,
    tags: ['contract', 'purchase agreement', 'active'],
  };

  const aiSummary = {
    highlights: [
      'Purchase price: $1,250,000',
      'Closing date: December 15, 2025',
      'Contingencies: Inspection (10 days), Financing (30 days)',
      'Earnest money deposit: $50,000',
      'Seller concessions: $5,000 towards closing costs',
    ],
    keyPoints: 'Standard residential purchase agreement with typical contingencies. No unusual terms or clauses identified. Property sold as-is with standard disclosures. Buyer pre-approved for financing.',
  };

  const metadata = [
    { label: 'Document Type', value: document.type },
    { label: 'File Size', value: document.size },
    { label: 'Pages', value: document.pages.toString() },
    { label: 'Uploaded By', value: document.uploadedBy },
    { label: 'Upload Date', value: document.uploadedDate },
  ];

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/documents')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-gray-900">{document.name}</h1>
              <p className="text-gray-600">Document Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline">Edit Tags</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[8.5/11] bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">PDF Document Preview</p>
                    <p className="text-sm text-gray-500">Click download to view full document</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card>
              <CardHeader className="flex-row items-center gap-2 space-y-0">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <CardTitle>AI Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm mb-3">Key Highlights</h4>
                  <ul className="space-y-2">
                    {aiSummary.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-blue-600">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm mb-2">Summary</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {aiSummary.keyPoints}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metadata.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-900">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Linked Items */}
            <Card>
              <CardHeader>
                <CardTitle>Linked To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <LinkIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm">Listing</p>
                    <p className="text-sm text-gray-600">{document.listing}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Client</p>
                    <p className="text-sm text-gray-600">{document.client}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button variant="outline" className="w-full">
                  Share Document
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Delete Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
