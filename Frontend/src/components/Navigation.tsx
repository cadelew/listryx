import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import listryx from "../assets/ChatGPT Image Nov 25, 2025, 11_36_36 PM-Picsart-BackgroundRemover.png";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={listryx} alt="Listryx" className="h-8" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">
            About
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/signup')}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}