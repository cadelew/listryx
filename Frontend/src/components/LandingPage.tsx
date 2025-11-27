import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Home, Sparkles, Shield, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="size-6 text-blue-600" />
            <span>RealtyAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Sign In</Link>
          </nav>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
              The AI-native real estate platform
            </div>
            <h1 className="mb-6">The AI Revenue Platform for Next Gen Real Estate Agents</h1>
            <p className="text-gray-600 mb-8">
              RealtyAI unifies listing management, AI-powered marketing, and compliance in one automated platform. Create compelling listings, generate marketing content, and ensure compliance at scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ChevronRight className="size-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">Request a Demo</Button>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NjM1MTk0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Modern luxury home" 
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Everything you need to excel in real estate</h2>
            <p className="text-gray-600">Powerful features designed for modern real estate professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="size-6 text-blue-600" />
              </div>
              <h3 className="mb-2">AI Listing Descriptions</h3>
              <p className="text-gray-600">Generate compelling property descriptions in seconds. AI analyzes photos and property details to create engaging marketing copy.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="size-6 text-purple-600" />
              </div>
              <h3 className="mb-2">Photo-to-Marketing Workflow</h3>
              <p className="text-gray-600">Upload photos and automatically generate captions, social media posts, and marketing materials ready to share.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="size-6 text-green-600" />
              </div>
              <h3 className="mb-2">Compliance Management</h3>
              <p className="text-gray-600">Stay compliant with automated checklists, document tracking, and AI-powered risk detection.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="size-6 text-orange-600" />
              </div>
              <h3 className="mb-2">Client Management</h3>
              <p className="text-gray-600">Track interactions, share documents, and manage relationships all in one place.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="size-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="size-6 text-pink-600" />
              </div>
              <h3 className="mb-2">Marketing Automation</h3>
              <p className="text-gray-600">Create flyers, social media posts, and marketing materials with AI-powered templates.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="size-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="size-6 text-indigo-600" />
              </div>
              <h3 className="mb-2">Task Management</h3>
              <p className="text-gray-600">Never miss a deadline with smart task tracking and automated reminders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">How it works</h2>
            <p className="text-gray-600">Get started in minutes with our simple workflow</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="size-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="mb-2">Create Your Listing</h3>
              <p className="text-gray-600">Enter basic property details and upload photos</p>
            </div>
            
            <div className="text-center">
              <div className="size-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="mb-2">AI Generates Content</h3>
              <p className="text-gray-600">Our AI creates descriptions, captions, and marketing materials</p>
            </div>
            
            <div className="text-center">
              <div className="size-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="mb-2">Review & Customize</h3>
              <p className="text-gray-600">Edit and personalize the AI-generated content</p>
            </div>
            
            <div className="text-center">
              <div className="size-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">4</div>
              <h3 className="mb-2">Publish & Track</h3>
              <p className="text-gray-600">Share across platforms and monitor compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Trusted by top agents</h2>
            <p className="text-gray-600">See what real estate professionals are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-6">"RealtyAI has transformed how I manage my listings. The AI descriptions are spot-on and save me hours every week."</p>
              <div className="flex items-center gap-3">
                <div className="size-12 bg-gray-200 rounded-full"></div>
                <div>
                  <div>Sarah Johnson</div>
                  <div className="text-gray-600">Top Agent, NYC</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-6">"The compliance features give me peace of mind. I never worry about missing important documentation anymore."</p>
              <div className="flex items-center gap-3">
                <div className="size-12 bg-gray-200 rounded-full"></div>
                <div>
                  <div>Michael Chen</div>
                  <div className="text-gray-600">Broker, San Francisco</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-6">"The marketing automation alone is worth it. I can create professional materials in minutes instead of hours."</p>
              <div className="flex items-center gap-3">
                <div className="size-12 bg-gray-200 rounded-full"></div>
                <div>
                  <div>Emily Rodriguez</div>
                  <div className="text-gray-600">Agent, Miami</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600">Choose the plan that's right for your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="border rounded-lg p-8">
              <h3 className="mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl">$49</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Up to 10 active listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>AI descriptions & captions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Basic compliance tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Get Started</Button>
            </div>

            <div className="border-2 border-blue-600 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full">Popular</div>
              <h3 className="mb-2">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Unlimited listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Advanced AI features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Full compliance suite</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Client management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>

            <div className="border rounded-lg p-8">
              <h3 className="mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl">$299</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="size-6" />
                <span>RealtyAI</span>
              </div>
              <p className="text-gray-400">The AI-powered platform for modern real estate professionals.</p>
            </div>
            
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#how-it-works">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RealtyAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
