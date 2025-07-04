import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Clock, Download, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, setShowAuthModal } = useAuth();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Create stunning videos from text using cutting-edge AI technology'
    },
    {
      icon: Clock,
      title: 'Lightning Fast',
      description: 'Generate professional videos in minutes, not hours'
    },
    {
      icon: Download,
      title: 'High Quality Output',
      description: 'Export videos in HD quality ready for social media platforms'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your content is encrypted and protected with enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'Multiple Providers',
      description: 'Choose from D-ID, HeyGen, and other top AI video providers'
    },
    {
      icon: Play,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for creators of all skill levels'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Scripts Into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Stunning AI Videos
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Create professional faceless videos for YouTube, Instagram, and TikTok using advanced AI technology. 
            No cameras, no actors, just powerful AI-generated content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Start Creating Free
              </button>
            )}
            <button className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Create Amazing Videos
            </h2>
            <p className="text-xl text-gray-300">
              Powerful features designed for content creators and marketers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Start Free, Scale as You Grow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-4xl font-bold text-purple-400 mb-4">$0</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>5 video generations/month</li>
                <li>720p quality</li>
                <li>Basic templates</li>
                <li>Community support</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-4xl font-bold text-purple-400 mb-4">$29</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>50 video generations/month</li>
                <li>1080p quality</li>
                <li>Premium templates</li>
                <li>Priority support</li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-4xl font-bold text-purple-400 mb-4">$99</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Unlimited generations</li>
                <li>4K quality</li>
                <li>Custom branding</li>
                <li>Dedicated support</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already using AI to transform their content strategy.
          </p>
          {!isAuthenticated && (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started for Free
            </button>
          )}
        </div>
      </section>
    </div>
  );
};