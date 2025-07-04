import React from 'react';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const Pricing: React.FC = () => {
  const { user, isAuthenticated, setShowAuthModal } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: Sparkles,
      description: 'Perfect for trying out AI video generation',
      features: [
        '5 video generations per month',
        '720p video quality',
        'Basic voice options',
        'Standard processing time',
        'Community support',
        'Watermarked videos'
      ],
      limitations: [
        'Limited customization',
        'No priority support'
      ],
      buttonText: 'Current Plan',
      buttonDisabled: true,
      popular: false
    },
    {
      name: 'Pro',
      price: 29,
      icon: Crown,
      description: 'For content creators and small businesses',
      features: [
        '50 video generations per month',
        '1080p HD video quality',
        'Premium voice library',
        'Fast processing (2x speed)',
        'Priority support',
        'No watermarks',
        'Custom branding options',
        'Advanced analytics'
      ],
      buttonText: 'Upgrade to Pro',
      buttonDisabled: false,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      icon: Zap,
      description: 'For agencies and large organizations',
      features: [
        'Unlimited video generations',
        '4K ultra HD video quality',
        'Custom voice cloning',
        'Instant processing',
        'Dedicated account manager',
        'White-label solution',
        'API access',
        'Custom integrations',
        'Advanced security features'
      ],
      buttonText: 'Contact Sales',
      buttonDisabled: false,
      popular: false
    }
  ];

  const handleSubscribe = (planName: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (planName === 'Pro') {
      toast.success('Redirecting to payment...');
      // Integrate with Stripe here
    } else if (planName === 'Enterprise') {
      toast.success('Redirecting to contact form...');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scale your video creation with flexible pricing that grows with your needs. 
            Start free and upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular 
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 transform scale-105' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gray-700'
                  }`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">per month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.buttonDisabled}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.buttonDisabled
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 py-3">Feature</th>
                  <th className="text-center text-gray-300 py-3">Free</th>
                  <th className="text-center text-gray-300 py-3">Pro</th>
                  <th className="text-center text-gray-300 py-3">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly video generations', free: '5', pro: '50', enterprise: 'Unlimited' },
                  { feature: 'Video quality', free: '720p', pro: '1080p HD', enterprise: '4K Ultra HD' },
                  { feature: 'Processing speed', free: 'Standard', pro: '2x Faster', enterprise: 'Instant' },
                  { feature: 'Voice options', free: 'Basic', pro: 'Premium', enterprise: 'Custom cloning' },
                  { feature: 'Watermark', free: 'Yes', pro: 'No', enterprise: 'No' },
                  { feature: 'Support', free: 'Community', pro: 'Priority', enterprise: 'Dedicated manager' },
                  { feature: 'API access', free: '✗', pro: '✗', enterprise: '✓' },
                  { feature: 'Custom branding', free: '✗', pro: '✓', enterprise: '✓' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="py-3 text-white font-medium">{row.feature}</td>
                    <td className="py-3 text-center text-gray-300">{row.free}</td>
                    <td className="py-3 text-center text-gray-300">{row.pro}</td>
                    <td className="py-3 text-center text-gray-300">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
              },
              {
                question: 'Is there a free trial for paid plans?',
                answer: 'Yes, we offer a 7-day free trial for Pro and Enterprise plans with full access to features.'
              },
              {
                question: 'What happens to my videos if I downgrade?',
                answer: 'Your existing videos remain accessible, but you\'ll have reduced generation limits going forward.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.'
              },
              {
                question: 'Can I get a custom plan?',
                answer: 'Yes, we offer custom Enterprise plans with tailored features and pricing for large organizations.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Creating Amazing Videos?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already using AI to transform their content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleSubscribe('Pro')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Start Free Trial
            </button>
            <button className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};