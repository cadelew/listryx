'use client';

import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";
import Link from "next/link";
import landingPageHouse from "@/assets/landing_page_house.jpg";

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            
            <h1 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
              The AI Platform for Modern Real Estate Agents
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl">
              Transform your listings with AI-powered descriptions, automated marketing workflows, 
              and compliance management. Close deals faster with intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                Request a Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t">
              <div>
                <div className="text-2xl text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Active Agents</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">500K+</div>
                <div className="text-sm text-gray-600">Listings Created</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Agent Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative aspect-[3/2] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <ImageWithFallback 
                src={landingPageHouse.src || landingPageHouse}
                alt="Modern real estate platform dashboard"
                className="w-full h-full object-cover"
              />
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">AI Description Generated</div>
                    <div className="text-xs text-gray-500">Ready for review in 3 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}