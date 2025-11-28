'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ClientSelect, SelectItem } from '../ui/client-select';
import { Search, Filter, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';

export default function CompliancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const complianceTasks = [
    {
      id: 1,
      title: 'Complete disclosure forms',
      listing: '123 Main Street',
      dueDate: '2025-11-26',
      priority: 'high',
      status: 'pending',
      description: 'Lead-based paint and seller disclosure forms required',
    },
    {
      id: 2,
      title: 'Upload inspection report',
      listing: '456 Oak Avenue',
      dueDate: '2025-11-27',
      priority: 'medium',
      status: 'pending',
      description: 'Home inspection report from certified inspector',
    },
    {
      id: 3,
      title: 'Natural hazard disclosure',
      listing: '789 Pine Road',
      dueDate: '2025-11-28',
      priority: 'high',
      status: 'pending',
      description: 'Flood, fire, and earthquake zone disclosures',
    },
    {
      id: 4,
      title: 'Smoke detector compliance',
      listing: '321 Elm Street',
      dueDate: '2025-11-20',
      priority: 'low',
      status: 'complete',
      description: 'Verify smoke detector installation and certification',
    },
    {
      id: 5,
      title: 'HOA documentation',
      listing: '654 Maple Drive',
      dueDate: '2025-11-30',
      priority: 'medium',
      status: 'complete',
      description: 'HOA rules, regulations, and financial statements',
    },
  ];

  const filteredTasks = complianceTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.listing.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: complianceTasks.length,
    pending: complianceTasks.filter(t => t.status === 'pending').length,
    complete: complianceTasks.filter(t => t.status === 'complete').length,
    overdue: complianceTasks.filter(t => t.status === 'pending' && new Date(t.dueDate) < new Date()).length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900">Compliance</h1>
          <p className="text-gray-600">Track and manage compliance requirements</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <p className="text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-gray-900 mt-1">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Complete</p>
                  <p className="text-gray-900 mt-1">{stats.complete}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-gray-900 mt-1">{stats.overdue}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tasks or listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <ClientSelect 
            value={statusFilter} 
            onValueChange={setStatusFilter}
            placeholder="Status"
            className="w-full sm:w-48"
          >
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </ClientSelect>
          <ClientSelect 
            value={priorityFilter} 
            onValueChange={setPriorityFilter}
            placeholder="Priority"
            className="w-full sm:w-48"
          >
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </ClientSelect>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const daysUntil = getDaysUntilDue(task.dueDate);
            const isOverdue = daysUntil < 0 && task.status === 'pending';

            return (
              <Card key={task.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {task.status === 'complete' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : isOverdue ? (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          {task.status === 'complete' ? (
                            <Badge variant="default">Complete</Badge>
                          ) : isOverdue ? (
                            <Badge variant="destructive">Overdue</Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Listing: {task.listing}</span>
                          <span>•</span>
                          <span>
                            Due: {task.dueDate}
                            {task.status === 'pending' && (
                              <span className={isOverdue ? 'text-red-600 ml-1' : 'text-gray-500 ml-1'}>
                                ({isOverdue ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days`})
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {task.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              Mark Complete
                            </Button>
                          )}
                          <Link href={`/compliance/${task.id}`}>
                            <Button size="sm" variant="ghost" className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No compliance tasks found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
