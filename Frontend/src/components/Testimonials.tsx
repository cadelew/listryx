import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Real Estate Agent",
    company: "Premier Realty Group",
    content: "ListingAI Pro has completely transformed how I manage my properties. What used to take hours now takes minutes. The AI descriptions are incredibly accurate and engaging.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNDc0NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Michael Chen",
    role: "Broker & Team Lead",
    company: "Urban Properties",
    content: "The compliance management features alone are worth the investment. Our team stays organized, and we've never missed a regulatory deadline since switching to this platform.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNDc0NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Emily Rodriguez",
    role: "Independent Agent",
    company: "Coastal Properties",
    content: "As a solo agent, I needed tools that could help me compete with larger teams. This platform gives me everything I need to market my listings professionally and efficiently.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNDc0NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'Lora, serif' }}>
            Trusted by Real Estate Professionals
          </h2>
          <p className="text-xl text-gray-600">
            See what agents are saying about Listryx
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <ImageWithFallback 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t">
          <div className="text-center">
            <div className="text-3xl text-gray-900 mb-1">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-gray-900 mb-1">10,000+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-gray-900 mb-1">500K+</div>
            <div className="text-gray-600">Listings Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-gray-900 mb-1">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}