'use client';

import { Button } from "./ui/button";
import Link from "next/link";
import listryx from "@/assets/ChatGPT Image Nov 25, 2025, 11_36_36 PM-Picsart-BackgroundRemover.png";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src={listryx.src || listryx} 
            alt="Listryx" 
            className="h-8 w-auto object-contain" 
          />
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
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}