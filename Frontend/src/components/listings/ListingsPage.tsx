'use client';

import Link from 'next/link';
import { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const listings = [
    { id: 1, address: '123 Main Street', city: 'San Francisco, CA', type: 'Single Family', price: '$1,250,000', status: 'Active', bedrooms: 3, bathrooms: 2, sqft: '2,100', views: 342, date: '2025-11-15' },
    { id: 2, address: '456 Oak Avenue', city: 'Palo Alto, CA', type: 'Condo', price: '$2,100,000', status: 'Pending', bedrooms: 4, bathrooms: 3, sqft: '2,850', views: 189, date: '2025-11-10' },
    { id: 3, address: '789 Pine Road', city: 'San Jose, CA', type: 'Townhouse', price: '$850,000', status: 'Draft', bedrooms: 2, bathrooms: 2, sqft: '1,650', views: 0, date: '2025-11-18' },
    { id: 4, address: '321 Elm Street', city: 'Mountain View, CA', type: 'Single Family', price: '$3,500,000', status: 'Active', bedrooms: 5, bathrooms: 4, sqft: '3,800', views: 521, date: '2025-11-01' },
    { id: 5, address: '654 Maple Drive', city: 'Sunnyvale, CA', type: 'Condo', price: '$975,000', status: 'Sold', bedrooms: 2, bathrooms: 2, sqft: '1,450', views: 456, date: '2025-10-20' },
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-1">Listings</h1>
            <p className="text-gray-600">Manage all your property listings</p>
          </div>
          <Link href="/listings/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Listing
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by address or location..."
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
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Property</th>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Type</th>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Price</th>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Details</th>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Views</th>
                  <th className="text-left px-6 py-3 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm">{listing.address}</div>
                        <div className="text-sm text-gray-500">{listing.city}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{listing.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{listing.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {listing.bedrooms} bd • {listing.bathrooms} ba • {listing.sqft} sqft
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        listing.status === 'Active' ? 'default' :
                        listing.status === 'Pending' ? 'secondary' :
                        listing.status === 'Sold' ? 'default' :
                        'outline'
                      }>
                        {listing.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        {listing.views}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/listings/${listing.id}`}>
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/listings/${listing.id}/photos`}>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="w-4 h-4" />
                              Manage Photos
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">No listings found matching your criteria</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
