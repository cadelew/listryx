'use client';

import Link from 'next/link';
import AppLayout from '../layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Building, 
  AlertCircle, 
  Sparkles, 
  TrendingUp,
  Plus,
  ArrowRight,
  FileText,
  Upload,
  MessageSquare
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Active Listings', value: '12', icon: Building, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Pending Tasks', value: '8', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'AI Descriptions', value: '24', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'This Month Sales', value: '$2.4M', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const recentListings = [
    { id: 1, address: '123 Main St, San Francisco', status: 'Active', price: '$1,250,000', views: 342 },
    { id: 2, address: '456 Oak Ave, Palo Alto', status: 'Pending', price: '$2,100,000', views: 189 },
    { id: 3, address: '789 Pine Rd, San Jose', status: 'Draft', price: '$850,000', views: 0 },
  ];

  const pendingTasks = [
    { id: 1, title: 'Review compliance checklist for 123 Main St', due: 'Today', priority: 'high' },
    { id: 2, title: 'Upload seller disclosure for 456 Oak Ave', due: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Generate marketing materials for new listing', due: 'Dec 25', priority: 'low' },
  ];

  const recentActivity = [
    { action: 'AI description generated', listing: '123 Main St', time: '2 hours ago' },
    { action: 'New photos uploaded', listing: '456 Oak Ave', time: '5 hours ago' },
    { action: 'Compliance task completed', listing: '789 Pine Rd', time: '1 day ago' },
  ];

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-1">Welcome back, John</h1>
            <p className="text-gray-600">Here's what's happening with your listings today</p>
          </div>
          <div className="flex gap-2">
            <Link href="/listings/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Listing
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/listings/create">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div>Create Listing</div>
                    <div className="text-xs text-gray-500">Add a new property</div>
                  </div>
                </Button>
              </Link>
              <Link href="/documents/upload">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div>Upload Documents</div>
                    <div className="text-xs text-gray-500">Add contracts & forms</div>
                  </div>
                </Button>
              </Link>
              <Link href="/marketing/ai-description">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div>Generate Description</div>
                    <div className="text-xs text-gray-500">AI-powered copy</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Listings</CardTitle>
                <Link href="/listings">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="mb-1">{listing.address}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          listing.status === 'Active' ? 'default' :
                          listing.status === 'Pending' ? 'secondary' :
                          'outline'
                        }>
                          {listing.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{listing.views} views</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-right mb-1">{listing.price}</div>
                      <Link href={`/listings/${listing.id}`}>
                        <Button size="sm" variant="outline">View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Tasks</CardTitle>
                <Link href="/tasks">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <input type="checkbox" className="mt-1 rounded" />
                    <div className="flex-1">
                      <div className="mb-1">{task.title}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Due: {task.due}</span>
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'default' :
                          'secondary'
                        } className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <span className="text-gray-900">{activity.action}</span>
                    {' • '}
                    <span className="text-gray-600">{activity.listing}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
