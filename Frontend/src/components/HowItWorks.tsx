import { Upload, Sparkles, Share2, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Property Details",
    description: "Add property information and photos through our simple drag-and-drop interface.",
    color: "blue",
  },
  {
    icon: Sparkles,
    title: "AI Generates Marketing Content",
    description: "Our AI analyzes your listing and creates compelling descriptions, captions, and marketing materials.",
    color: "purple",
  },
  {
    icon: Share2,
    title: "Review & Publish",
    description: "Review AI-generated content, make any adjustments, and publish across all your channels instantly.",
    color: "green",
  },
  {
    icon: CheckCircle2,
    title: "Track & Optimize",
    description: "Monitor compliance, track engagement, and optimize your listings with real-time insights.",
    color: "orange",
  },
];

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            From upload to published listing in minutes
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -translate-x-8 z-0"></div>
                )}
                
                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-sm mb-4">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`${colorMap[step.color as keyof typeof colorMap]} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
