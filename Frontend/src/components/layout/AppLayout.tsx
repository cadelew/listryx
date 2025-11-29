'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Building, 
  Sparkles, 
  FileCheck, 
  FileText, 
  Users, 
  CheckSquare, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useState, useRef, useEffect } from 'react';
import listryx from "../../assets/ChatGPT Image Nov 25, 2025, 11_36_36 PM-Picsart-BackgroundRemover.png";
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  const notifications = [
    {
      id: 1,
      title: 'New compliance task due',
      description: '123 Main St disclosure forms need review',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Document uploaded',
      description: 'Inspection report for 456 Oak Avenue',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'AI description completed',
      description: 'Marketing content ready for 789 Pine Road',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 4,
      title: 'Client message',
      description: 'Sarah Johnson sent you a message',
      time: '3 hours ago',
      unread: false,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Listings', href: '/listings', icon: Building },
    { name: 'Marketing', href: '/marketing/ai-description', icon: Sparkles },
    { name: 'Compliance', href: '/compliance', icon: FileCheck },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname?.startsWith(href) || false;
  };

  const fullName =
    (user?.user_metadata?.full_name as string | undefined)?.trim() ||
    user?.email ||
    'Listryx User';
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'LX';
  const email = user?.email ?? 'your@email.com';

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Checking authentication…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b fixed w-full top-0 z-40">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <img 
                src={listryx.src || listryx} 
                alt="Listryx" 
                className="h-8 w-auto object-contain" 
              />
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search listings, clients, tasks..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
              
              {/* Notifications Dropdown Menu */}
              {notificationsOpen && (
                <Card className="absolute right-0 top-12 w-96 max-h-[500px] overflow-hidden shadow-lg">
                  <div className="p-4 border-b">
                    <h3 className="text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.unread ? 'bg-blue-600' : 'bg-transparent'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t bg-gray-50">
                    <Link 
                      href="/notifications" 
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all notifications
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              >
                <Avatar className="cursor-pointer">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
              
              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <Card className="absolute right-0 top-12 w-64 shadow-lg">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform lg:transform-none pt-16 lg:pt-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}