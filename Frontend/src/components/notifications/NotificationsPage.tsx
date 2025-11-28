'use client';

import { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Filter,
  Sparkles,
  FileText,
  AlertCircle,
  Users,
  Calendar,
  Trash2
} from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const allNotifications = [
    {
      id: 1,
      title: 'New compliance task due',
      description: '123 Main St disclosure forms need review by end of day',
      time: '5 min ago',
      date: 'Nov 26, 2025',
      type: 'compliance',
      unread: true,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Document uploaded',
      description: 'Inspection report for 456 Oak Avenue has been uploaded to the system',
      time: '1 hour ago',
      date: 'Nov 26, 2025',
      type: 'document',
      unread: true,
      priority: 'normal',
    },
    {
      id: 3,
      title: 'AI description completed',
      description: 'Marketing content ready for 789 Pine Road - review and publish',
      time: '2 hours ago',
      date: 'Nov 26, 2025',
      type: 'ai',
      unread: true,
      priority: 'normal',
    },
    {
      id: 4,
      title: 'Client message',
      description: 'Sarah Johnson sent you a message about the property viewing',
      time: '3 hours ago',
      date: 'Nov 26, 2025',
      type: 'client',
      unread: false,
      priority: 'normal',
    },
    {
      id: 5,
      title: 'Listing status changed',
      description: '321 Elm Street listing has been updated to "Under Contract"',
      time: '5 hours ago',
      date: 'Nov 26, 2025',
      type: 'listing',
      unread: false,
      priority: 'normal',
    },
    {
      id: 6,
      title: 'Meeting reminder',
      description: 'Client meeting with Mike Anderson tomorrow at 2:00 PM',
      time: '1 day ago',
      date: 'Nov 25, 2025',
      type: 'calendar',
      unread: false,
      priority: 'normal',
    },
    {
      id: 7,
      title: 'Photo upload complete',
      description: '15 new photos uploaded for 567 Maple Drive',
      time: '2 days ago',
      date: 'Nov 24, 2025',
      type: 'document',
      unread: false,
      priority: 'normal',
    },
    {
      id: 8,
      title: 'Compliance deadline approaching',
      description: 'Lead paint disclosure due in 3 days for 890 Cedar Lane',
      time: '2 days ago',
      date: 'Nov 24, 2025',
      type: 'compliance',
      unread: false,
      priority: 'high',
    },
  ];

  const filteredNotifications = filter === 'unread' 
    ? allNotifications.filter(n => n.unread)
    : allNotifications;

  const unreadCount = allNotifications.filter(n => n.unread).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'document':
        return <FileText className="w-5 h-5 text-orange-600" />;
      case 'compliance':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'client':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'calendar':
        return <Calendar className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Mark all as read');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button 
              variant={filter === 'unread' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('unread')}
            >
              <Bell className="w-4 h-4 mr-2" />
              Unread ({unreadCount})
            </Button>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Stay updated on your listings and tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No notifications to display</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      notification.unread ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          notification.type === 'ai' ? 'bg-purple-100' :
                          notification.type === 'document' ? 'bg-orange-100' :
                          notification.type === 'compliance' ? 'bg-red-100' :
                          notification.type === 'client' ? 'bg-blue-100' :
                          notification.type === 'calendar' ? 'bg-green-100' :
                          'bg-gray-100'
                        }`}>
                          {getIcon(notification.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm text-gray-900">{notification.title}</p>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                              {notification.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">High Priority</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{notification.time}</span>
                              <span>•</span>
                              <span>{notification.date}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {notification.unread && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
