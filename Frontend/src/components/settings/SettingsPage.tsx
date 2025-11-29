'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  User, 
  Building, 
  Palette, 
  CreditCard, 
  Upload,
  Plus,
  Trash2,
  Check,
  Edit,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

type ProfileData = {
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: null,
    email: null,
    phone: null,
  });
  const [originalProfile, setOriginalProfile] = useState<ProfileData>({
    full_name: null,
    email: null,
    phone: null,
  });

  // Fetch profile data from Supabase
  useEffect(() => {
    const fetchProfile = async (retryCount = 0) => {
      if (!user) return;

      // Ensure we have a valid session before querying
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (!session) {
        if (retryCount < 3) {
          // Retry after a short delay if session isn't ready
          setTimeout(() => fetchProfile(retryCount + 1), 500);
          return;
        }
        console.warn('No session found after retries');
        return;
      }

      // Debug: Log session info
      console.log('Session info:', {
        hasSession: !!session,
        userId: session.user?.id,
        accessToken: session.access_token ? 'present' : 'missing',
      });

      setIsLoading(true);
      try {
        // Try querying without explicit ID filter first (let RLS handle it)
        // If that doesn't work, fall back to explicit filter
        let { data, error } = await supabase
          .from('profiles')
          .select('full_name, email, phone')
          .eq('id', user.id)
          .single();

        // If we get a 403, try without the explicit filter (RLS should handle it)
        if (error && (error as any).status === 403) {
          console.log('Got 403 with explicit filter, trying without filter (RLS only)...');
          const result = await supabase
            .from('profiles')
            .select('full_name, email, phone')
            .single();
          data = result.data;
          error = result.error;
        }

        // Prioritize data - if we have data, use it regardless of error
        if (data) {
          setProfile({
            full_name: data.full_name,
            email: data.email || user.email || null,
            phone: data.phone,
          });
          setOriginalProfile({
            full_name: data.full_name,
            email: data.email || user.email || null,
            phone: data.phone,
          });
        } else if (error) {
          // Log full error details for debugging
          console.error('Error fetching profile:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
            status: (error as any).status,
            statusText: (error as any).statusText,
            fullError: error,
            userId: user.id,
          });
          
          // Check if it's a 403 (permission denied) - RLS issue or missing profile
          if ((error as any).status === 403 || error.code === '42501') {
            console.error('RLS Policy blocked access. User ID:', user.id);
            console.error('This might mean the profile doesn\'t exist. Attempting to create it...');
            
            // Try to create the profile if it doesn't exist
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email || '',
                full_name: user.user_metadata?.full_name || null,
                phone: null,
              })
              .select('full_name, email, phone')
              .single();

            if (insertError) {
              console.error('Error creating profile:', insertError);
              // Fallback to user data
              setProfile({
                full_name: user.user_metadata?.full_name || null,
                email: user.email || null,
                phone: null,
              });
              setOriginalProfile({
                full_name: user.user_metadata?.full_name || null,
                email: user.email || null,
                phone: null,
              });
            } else if (newProfile) {
              setProfile({
                full_name: newProfile.full_name,
                email: newProfile.email || user.email || null,
                phone: newProfile.phone,
              });
              setOriginalProfile({
                full_name: newProfile.full_name,
                email: newProfile.email || user.email || null,
                phone: newProfile.phone,
              });
              return; // Successfully created and set profile
            }
          }
          
          // If profile doesn't exist (different error code)
          if (error.code === 'PGRST116') {
            console.log('Profile not found, creating default profile...');
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email || '',
                full_name: user.user_metadata?.full_name || null,
                phone: null,
              })
              .select('full_name, email, phone')
              .single();

            if (insertError) {
              console.error('Error creating profile:', insertError);
              // Fallback to user data
              setProfile({
                full_name: user.user_metadata?.full_name || null,
                email: user.email || null,
                phone: null,
              });
              setOriginalProfile({
                full_name: user.user_metadata?.full_name || null,
                email: user.email || null,
                phone: null,
              });
            } else if (newProfile) {
              setProfile({
                full_name: newProfile.full_name,
                email: newProfile.email || user.email || null,
                phone: newProfile.phone,
              });
              setOriginalProfile({
                full_name: newProfile.full_name,
                email: newProfile.email || user.email || null,
                phone: newProfile.phone,
              });
            }
          } else {
            // For other errors, use user data as fallback
            setProfile({
              full_name: user.user_metadata?.full_name || null,
              email: user.email || null,
              phone: null,
            });
            setOriginalProfile({
              full_name: user.user_metadata?.full_name || null,
              email: user.email || null,
              phone: null,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        // Fallback to user data
        setProfile({
          full_name: user.user_metadata?.full_name || null,
          email: user.email || null,
          phone: null,
        });
        setOriginalProfile({
          full_name: user.user_metadata?.full_name || null,
          email: user.email || null,
          phone: null,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile({ ...originalProfile });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name || null,
          phone: profile.phone || null,
          // Note: email is typically managed by auth, but we can update it in profiles if needed
          email: profile.email || user.email || null,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
        return;
      }

      setOriginalProfile({ ...profile });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Get display values with placeholders
  const getDisplayValue = (value: string | null | undefined, placeholder: string) => {
    if (isEditing) {
      return value || '';
    }
    return value || placeholder;
  };

  // Get initials for avatar
  const getInitials = () => {
    if (profile.full_name) {
      return profile.full_name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(n => n[0]?.toUpperCase() || '')
        .join('') || 'U';
    }
    if (profile.email) {
      return profile.email[0]?.toUpperCase() || 'U';
    }
    return 'U';
  };

  const [brokerage, setBrokerage] = useState({
    name: 'Premium Realty Group',
    address: '123 Business Avenue',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    mls: 'MLS-12345',
  });

  const [branding, setBranding] = useState({
    logoUrl: '',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
  });

  const teamMembers = [
    { id: 1, name: 'Mike Wilson', email: 'mike@realty.com', role: 'Agent' },
    { id: 2, name: 'Sarah Parker', email: 'sarah@realty.com', role: 'Agent' },
    { id: 3, name: 'Tom Anderson', email: 'tom@realty.com', role: 'Admin' },
  ];

  const subscription = {
    plan: 'Professional',
    price: '$99/month',
    billingDate: 'December 1, 2025',
    paymentMethod: 'Visa ending in 4242',
    features: [
      'Unlimited listings',
      'AI description generation',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
    ],
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="brokerage" className="gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Brokerage</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Subscription</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </div>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="gap-2" disabled={!isEditing}>
                          <Upload className="w-4 h-4" />
                          Upload Photo
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF (max. 5MB)</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={getDisplayValue(profile.full_name, 'Enter your full name')}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value || null })}
                          disabled={!isEditing}
                          placeholder="Enter your full name"
                          className={!isEditing && !profile.full_name ? 'text-gray-400 italic' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={getDisplayValue(profile.email, 'Enter your email')}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value || null })}
                          disabled={!isEditing}
                          placeholder="Enter your email"
                          className={!isEditing && !profile.email ? 'text-gray-400 italic' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={getDisplayValue(profile.phone, 'Enter your phone number')}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value || null })}
                          disabled={!isEditing}
                          placeholder="Enter your phone number"
                          className={!isEditing && !profile.phone ? 'text-gray-400 italic' : ''}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                          {isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={handleCancel} disabled={isSaving} className="gap-2">
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brokerage Settings */}
          <TabsContent value="brokerage">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brokerage Information</CardTitle>
                  <CardDescription>Manage your brokerage details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="brokerageName">Brokerage Name</Label>
                      <Input
                        id="brokerageName"
                        value={brokerage.name}
                        onChange={(e) => setBrokerage({ ...brokerage, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={brokerage.address}
                        onChange={(e) => setBrokerage({ ...brokerage, address: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={brokerage.city}
                        onChange={(e) => setBrokerage({ ...brokerage, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={brokerage.state}
                        onChange={(e) => setBrokerage({ ...brokerage, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={brokerage.zip}
                        onChange={(e) => setBrokerage({ ...brokerage, zip: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mls">MLS ID</Label>
                      <Input
                        id="mls"
                        value={brokerage.mls}
                        onChange={(e) => setBrokerage({ ...brokerage, mls: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage your team access</CardDescription>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Member
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{member.role}</Badge>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Branding Settings */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>Customize your marketing materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">PNG or SVG (max. 2MB)</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Template Preview</Label>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)`
                    }}
                  >
                    <div className="text-center">
                      <p className="text-2xl mb-2">ListingAI Pro</p>
                      <p className="text-sm opacity-90">Your marketing materials preview</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Settings */}
          <TabsContent value="subscription">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                    <div>
                      <h3 className="text-2xl mb-1">{subscription.plan}</h3>
                      <p className="text-blue-100">{subscription.price}</p>
                    </div>
                    <Badge className="bg-white text-blue-600">Active</Badge>
                  </div>

                  <div>
                    <h4 className="text-sm mb-3">Plan Features</h4>
                    <div className="space-y-2">
                      {subscription.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button>Upgrade Plan</Button>
                    <Button variant="outline">Downgrade</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Update your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-xs">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{subscription.paymentMethod}</p>
                        <p className="text-xs text-gray-500">Expires 12/2026</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Next billing date</span>
                      <span className="text-sm text-gray-900">{subscription.billingDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="text-sm text-gray-900">{subscription.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
