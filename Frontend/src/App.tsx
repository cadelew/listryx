import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import AppLayout from "./components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  Building2, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  Plus, 
  Upload, 
  FileText,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
import ListingsPage from "./components/listings/ListingsPage";
import CreateListingPage from "./components/listings/CreateListingPage";
import ListingDetailPage from "./components/listings/ListingDetailPage";
import PhotoManagerPage from "./components/listings/PhotoManagerPage";
import AIDescriptionPage from "./components/marketing/AIDescriptionPage";
import PhotoCaptionsPage from "./components/marketing/PhotoCaptionsPage";
import SocialMediaPage from "./components/marketing/SocialMediaPage";
import FlyersPage from "./components/marketing/FlyersPage";
import CompliancePage from "./components/compliance/CompliancePage";
import ComplianceTaskDetailPage from "./components/compliance/ComplianceTaskDetailPage";
import DocumentsPage from "./components/documents/DocumentsPage";
import UploadDocumentPage from "./components/documents/UploadDocumentPage";
import DocumentDetailPage from "./components/documents/DocumentDetailPage";
import ClientsPage from "./components/clients/ClientsPage";
import ClientDetailPage from "./components/clients/ClientDetailPage";
import TasksPage from "./components/tasks/TasksPage";
import TaskDetailPage from "./components/tasks/TaskDetailPage";
import SettingsPage from "./components/settings/SettingsPage";
import NotificationsPage from "./components/notifications/NotificationsPage";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}

function DashboardContent() {
  const stats = [
    {
      title: "Total Listings",
      value: "24",
      change: "+3 this week",
      icon: "Building2",
      trend: "up",
    },
    {
      title: "Pending Compliance",
      value: "5",
      change: "2 due this week",
      icon: "AlertCircle",
      trend: "neutral",
    },
    {
      title: "AI Descriptions",
      value: "42",
      change: "+12 this month",
      icon: "Sparkles",
      trend: "up",
    },
    {
      title: "Active Clients",
      value: "18",
      change: "+4 this month",
      icon: "TrendingUp",
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/documents/upload">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Docs
            </Button>
          </Link>
          <Link to="/listings/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Listings</p>
                <p className="text-gray-900 mt-2">24</p>
                <p className="text-sm text-gray-500 mt-1">+3 this week</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Pending Compliance</p>
                <p className="text-gray-900 mt-2">5</p>
                <p className="text-sm text-gray-500 mt-1">2 due this week</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">AI Descriptions</p>
                <p className="text-gray-900 mt-2">42</p>
                <p className="text-sm text-gray-500 mt-1">+12 this month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-gray-900 mt-2">18</p>
                <p className="text-sm text-gray-500 mt-1">+4 this month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/listings/create">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4 w-full"
              >
                <Plus className="h-6 w-6" />
                <span>Create Listing</span>
              </Button>
            </Link>
            <Link to="/marketing/ai-description">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4 w-full"
              >
                <Sparkles className="h-6 w-6" />
                <span>Generate Description</span>
              </Button>
            </Link>
            <Link to="/documents/upload">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4 w-full"
              >
                <Upload className="h-6 w-6" />
                <span>Upload Documents</span>
              </Button>
            </Link>
            <Link to="/compliance">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4 w-full"
              >
                <FileText className="h-6 w-6" />
                <span>Check Compliance</span>
              </Button>
            </Link>
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

        {/* Pending Tasks / Notifications */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={
          <AppLayout>
            <DashboardContent />
          </AppLayout>
        } />
        
        {/* Listings */}
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/create" element={<CreateListingPage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route path="/listings/:id/photos" element={<PhotoManagerPage />} />
        
        {/* Marketing Tools */}
        <Route path="/marketing/ai-description" element={<AIDescriptionPage />} />
        <Route path="/marketing/photo-captions" element={<PhotoCaptionsPage />} />
        <Route path="/marketing/social-media" element={<SocialMediaPage />} />
        <Route path="/marketing/flyers" element={<FlyersPage />} />
        
        {/* Compliance */}
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/compliance/:id" element={<ComplianceTaskDetailPage />} />
        
        {/* Documents */}
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/upload" element={<UploadDocumentPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
        
        {/* Clients */}
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:id" element={<ClientDetailPage />} />
        
        {/* Tasks */}
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        
        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Notifications */}
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}