import { Link } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, FileText, Shield, TrendingUp, Plus, Sparkles, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Listings', value: '24', icon: Home, trend: '+3 this month', color: 'bg-blue-100 text-blue-600' },
    { name: 'Active Tasks', value: '8', icon: FileText, trend: '3 due today', color: 'bg-purple-100 text-purple-600' },
    { name: 'Compliance Items', value: '5', icon: Shield, trend: '2 pending', color: 'bg-orange-100 text-orange-600' },
    { name: 'Active Clients', value: '32', icon: TrendingUp, trend: '+5 this month', color: 'bg-green-100 text-green-600' },
  ];

  const recentActivity = [
    { id: 1, action: 'Listing created', item: '123 Main St', time: '2 hours ago' },
    { id: 2, action: 'AI description generated', item: '456 Oak Ave', time: '5 hours ago' },
    { id: 3, action: 'Compliance task completed', item: 'Fair Housing Review', time: '1 day ago' },
    { id: 4, action: 'New client added', item: 'Sarah Johnson', time: '2 days ago' },
    { id: 5, action: 'Marketing flyer created', item: '789 Pine Rd', time: '3 days ago' },
  ];

  const quickActions = [
    { name: 'Create Listing', href: '/listings/create', icon: Home, color: 'bg-blue-600' },
    { name: 'Generate Description', href: '/marketing/ai-description', icon: Sparkles, color: 'bg-purple-600' },
    { name: 'Upload Document', href: '/documents/upload', icon: FileText, color: 'bg-green-600' },
  ];

  const pendingTasks = [
    { id: 1, title: 'Complete compliance checklist for 123 Main St', priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Review AI description for 456 Oak Ave', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Upload photos for 789 Pine Rd', priority: 'low', dueDate: 'Nov 22' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Welcome back, John</h1>
          <p className="text-gray-600">Here's what's happening with your listings today.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">{stat.name}</p>
                      <p className="text-3xl mb-1">{stat.value}</p>
                      <p className="text-gray-500">{stat.trend}</p>
                    </div>
                    <div className={`size-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <Icon className="size-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.name} to={action.href}>
                    <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                      <div className={`size-12 rounded-lg flex items-center justify-center ${action.color} text-white`}>
                        <Icon className="size-6" />
                      </div>
                      <span>{action.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="size-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p>{activity.action}</p>
                      <p className="text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Tasks</CardTitle>
              <Link to="/tasks">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4">
                    <input type="checkbox" className="mt-1 rounded" />
                    <div className="flex-1">
                      <p className="mb-1">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-gray-500">Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="size-6 text-orange-600 flex-shrink-0" />
              <div>
                <p className="mb-1">Compliance Alert</p>
                <p className="text-gray-600">2 listings require updated fair housing compliance documentation. Review them now to avoid delays.</p>
                <Link to="/compliance">
                  <Button variant="outline" size="sm" className="mt-4">Review Compliance</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
