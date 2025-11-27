import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import listryx from "figma:asset/876dcc93115a38b84ce3df820b01ca8772ba3d8a.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl text-white mb-2">
              Stay updated with Listryx
            </h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for tips and updates
            </p>
            <div className="flex gap-3 mt-6 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/">
              <div className="flex items-center gap-2 mb-4">
                <img src={listryx} alt="Listryx" className="h-8 brightness-0 invert" />
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Transform your real estate workflow with AI-powered tools designed for modern agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#updates" className="hover:text-white transition-colors">Updates</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#compliance" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Listryx. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#facebook" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#instagram" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}