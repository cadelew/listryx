import { Route } from "../../App";
import { AppLayout } from "../layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Building2, 
  TrendingUp, 
  AlertCircle, 
  Sparkles, 
  Plus,
  Upload,
  FileText,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { Badge } from "../ui/badge";

interface DashboardPageProps {
  onNavigate: (route: Route) => void;
}

const stats = [
  {
    title: "Total Listings",
    value: "24",
    change: "+3 this week",
    icon: Building2,
    trend: "up",
  },
  {
    title: "Pending Compliance",
    value: "5",
    change: "2 due this week",
    icon: AlertCircle,
    trend: "neutral",
  },
  {
    title: "AI Descriptions",
    value: "42",
    change: "+12 this month",
    icon: Sparkles,
    trend: "up",
  },
  {
    title: "Active Clients",
    value: "18",
    change: "+4 this month",
    icon: TrendingUp,
    trend: "up",
  },
];

const recentActivity = [
  {
    title: "AI description generated",
    listing: "123 Main St, Apt 4B",
    time: "2 minutes ago",
    type: "ai",
  },
  {
    title: "Listing updated",
    listing: "456 Oak Avenue",
    time: "1 hour ago",
    type: "listing",
  },
  {
    title: "Compliance task completed",
    listing: "789 Pine Road",
    time: "3 hours ago",
    type: "compliance",
  },
  {
    title: "Document uploaded",
    listing: "321 Elm Street",
    time: "5 hours ago",
    type: "document",
  },
];

const pendingTasks = [
  {
    title: "Complete disclosure forms",
    listing: "123 Main St, Apt 4B",
    due: "Today",
    priority: "high",
  },
  {
    title: "Upload inspection report",
    listing: "456 Oak Avenue",
    due: "Tomorrow",
    priority: "medium",
  },
  {
    title: "Review marketing materials",
    listing: "789 Pine Road",
    due: "In 3 days",
    priority: "low",
  },
];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <AppLayout onNavigate={onNavigate} currentRoute="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, John! Here's what's happening today.</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => onNavigate('upload-documents')}>
              <Upload className="h-4 w-4" />
              Upload Docs
            </Button>
            <Button className="gap-2" onClick={() => onNavigate('create-listing')}>
              <Plus className="h-4 w-4" />
              New Listing
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-3xl mt-2 text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
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
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate('create-listing')}
              >
                <Plus className="h-6 w-6" />
                <span>Create Listing</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate('ai-description')}
              >
                <Sparkles className="h-6 w-6" />
                <span>Generate Description</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate('upload-documents')}
              >
                <Upload className="h-6 w-6" />
                <span>Upload Documents</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate('compliance')}
              >
                <FileText className="h-6 w-6" />
                <span>Check Compliance</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across your listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="bg-gray-100 p-2 rounded-lg mt-0.5">
                      {activity.type === 'ai' && <Sparkles className="h-4 w-4 text-purple-600" />}
                      {activity.type === 'listing' && <Building2 className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'compliance' && <AlertCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === 'document' && <FileText className="h-4 w-4 text-orange-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.listing}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('tasks')}>
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-gray-900">{task.title}</p>
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">High</Badge>
                        )}
                        {task.priority === 'medium' && (
                          <Badge variant="secondary" className="text-xs">Medium</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{task.listing}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      {task.due}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
