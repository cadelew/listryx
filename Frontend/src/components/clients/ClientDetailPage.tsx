'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ChevronLeft, Mail, Phone, MapPin, Edit, FileText, Building, MessageSquare } from 'lucide-react';

export default function ClientDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [newNote, setNewNote] = useState('');

  const client = {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '789 Oak Street, San Francisco, CA 94102',
    status: 'Active',
    initials: 'JS',
    joinedDate: '2025-10-15',
  };

  const linkedListings = [
    { id: 1, address: '123 Main Street', status: 'Active', price: '$1,250,000' },
    { id: 2, address: '456 Oak Avenue', status: 'Pending', price: '$2,100,000' },
  ];

  const sharedDocuments = [
    { id: 1, name: 'Purchase Agreement.pdf', date: '2025-11-20', type: 'Contract' },
    { id: 2, name: 'Inspection Report.pdf', date: '2025-11-19', type: 'Report' },
    { id: 3, name: 'Disclosure Forms.pdf', date: '2025-11-18', type: 'Disclosure' },
  ];

  const interactions = [
    { id: 1, type: 'email', description: 'Sent property listing details', date: '2025-11-23', time: '10:30 AM' },
    { id: 2, type: 'call', description: 'Discussed financing options', date: '2025-11-22', time: '2:15 PM' },
    { id: 3, type: 'meeting', description: 'Property viewing at 123 Main St', date: '2025-11-21', time: '3:00 PM' },
    { id: 4, type: 'email', description: 'Shared market analysis report', date: '2025-11-20', time: '9:45 AM' },
  ];

  const addNote = () => {
    if (newNote.trim()) {
      alert('Note added successfully!');
      setNewNote('');
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/clients')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl">
                {client.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-gray-900">{client.name}</h1>
                <Badge>{client.status}</Badge>
              </div>
              <p className="text-gray-600">Client since {client.joinedDate}</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Client
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Timeline</CardTitle>
                <Button size="sm" variant="outline">Add Interaction</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <div key={interaction.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {interaction.type === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                        {interaction.type === 'call' && <Phone className="w-5 h-5 text-green-600" />}
                        {interaction.type === 'meeting' && <Building className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{interaction.description}</p>
                        <p className="text-xs text-gray-500">{interaction.date} at {interaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Linked Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Linked Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {linkedListings.map((listing) => (
                    <Link key={listing.id} href={`/listings/${listing.id}`}>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{listing.address}</p>
                            <p className="text-xs text-gray-500">{listing.price}</p>
                          </div>
                        </div>
                        <Badge variant={listing.status === 'Active' ? 'default' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shared Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Shared Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sharedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.date}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Note */}
            <Card>
              <CardHeader>
                <CardTitle>Add Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                  placeholder="Add a note about this client..."
                />
                <Button onClick={addNote} disabled={!newNote.trim()}>
                  Save Note
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-sm text-gray-900">{client.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Linked Listings</span>
                  <span className="text-sm">{linkedListings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents</span>
                  <span className="text-sm">{sharedDocuments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Interactions</span>
                  <span className="text-sm">{interactions.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Mail className="w-4 h-4" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="w-4 h-4" />
                  Share Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
