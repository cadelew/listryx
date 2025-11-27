import { Button } from "./ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for individual agents getting started",
    features: [
      "Up to 25 active listings",
      "AI description generation",
      "Basic marketing templates",
      "Email support",
      "Mobile app access",
      "Photo management",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "99",
    description: "For growing agents and small teams",
    features: [
      "Unlimited active listings",
      "Advanced AI features",
      "All marketing templates",
      "Priority support",
      "Team collaboration (up to 5)",
      "Compliance management",
      "Custom branding",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and brokerages",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced compliance tools",
      "White-label options",
      "API access",
      "Custom training",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-2 border-blue-600 shadow-xl scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  {plan.price !== "Custom" && <span className="text-4xl text-gray-900">${plan.price}</span>}
                  {plan.price === "Custom" ? (
                    <span className="text-4xl text-gray-900">{plan.price}</span>
                  ) : (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
              </div>

              <Button 
                className={`w-full mb-6 ${
                  plan.popular 
                    ? '' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include 14-day free trial. No credit card required.{" "}
            <a href="#faq" className="text-blue-600 hover:underline">
              View FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
