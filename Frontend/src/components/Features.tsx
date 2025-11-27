import { Sparkles, Camera, Shield, FileText, Share2, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Listing Descriptions",
    description: "Generate compelling property descriptions in seconds using advanced AI. Highlight key features and attract more buyers automatically.",
  },
  {
    icon: Camera,
    title: "Photo-to-Marketing Workflow",
    description: "Upload property photos and instantly create marketing materials. AI-powered captions, social posts, and flyers ready to share.",
  },
  {
    icon: Shield,
    title: "Compliance Management",
    description: "Stay ahead of regulatory requirements with automated compliance checklists, risk alerts, and document tracking.",
  },
  {
    icon: FileText,
    title: "Smart Document Management",
    description: "AI-powered document organization and summaries. Find what you need instantly with intelligent search and tagging.",
  },
  {
    icon: Share2,
    title: "Multi-Channel Marketing",
    description: "Create and schedule social media posts, flyers, and marketing materials for all major platforms from one place.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automate repetitive tasks and focus on closing deals. From photo uploads to compliance checks, everything flows automatically.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Everything you need to scale your real estate business
          </h2>
          <p className="text-xl text-gray-600">
            Powerful AI tools designed specifically for modern real estate agents
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
