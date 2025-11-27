import { useState } from 'react';
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
  Check
} from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@listingaipro.com',
    phone: '(555) 123-4567',
  });

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
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="gap-2">
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
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
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
