import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, Plus, Mail, Phone, Eye } from 'lucide-react';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      status: 'Active',
      listings: 2,
      lastContact: '2025-11-23',
      initials: 'JS',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 234-5678',
      status: 'Lead',
      listings: 0,
      lastContact: '2025-11-22',
      initials: 'SJ',
    },
    {
      id: 3,
      name: 'Robert Brown',
      email: 'rbrown@email.com',
      phone: '(555) 345-6789',
      status: 'Active',
      listings: 1,
      lastContact: '2025-11-21',
      initials: 'RB',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '(555) 456-7890',
      status: 'Pending',
      listings: 1,
      lastContact: '2025-11-20',
      initials: 'ED',
    },
    {
      id: 5,
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      phone: '(555) 567-8901',
      status: 'Active',
      listings: 3,
      lastContact: '2025-11-19',
      initials: 'MC',
    },
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Clients</h1>
            <p className="text-gray-600">Manage your client relationships</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {client.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1">{client.name}</h3>
                    <Badge variant={
                      client.status === 'Active' ? 'default' :
                      client.status === 'Pending' ? 'secondary' :
                      'outline'
                    }>
                      {client.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm">
                    <p className="text-gray-500">Listings</p>
                    <p className="text-gray-900">{client.listings}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Last Contact</p>
                    <p className="text-gray-900">{client.lastContact}</p>
                  </div>
                </div>

                <Link to={`/clients/${client.id}`}>
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">No clients found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
