import React from 'react';
import { CircuitBoard, Users, Search, Calendar, BarChart, Shield, Zap } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <CircuitBoard className="h-12 w-12 text-cyan-400" />
              <h1 className="text-4xl font-bold text-white">TWITE AI ATS</h1>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Transform Your Hiring Process with AI-Powered Recruitment
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Streamline your recruitment workflow, make data-driven decisions, and find the perfect candidates faster than ever.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Get Started
              </button>
              <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Powerful Features for Modern Recruitment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-8 w-8 text-cyan-400" />}
              title="Candidate Management"
              description="Efficiently organize and track candidates throughout the hiring process with our intuitive interface."
            />
            <FeatureCard
              icon={<Search className="h-8 w-8 text-cyan-400" />}
              title="Smart Search"
              description="Find the right candidates quickly with our advanced search and filtering capabilities."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-cyan-400" />}
              title="Interview Scheduling"
              description="Streamline the interview process with automated scheduling and calendar integration."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8 text-cyan-400" />}
              title="Analytics & Reporting"
              description="Make data-driven decisions with comprehensive recruitment analytics and insights."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-cyan-400" />}
              title="Secure & Compliant"
              description="Keep your recruitment data safe with enterprise-grade security and compliance features."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-cyan-400" />}
              title="AI-Powered Matching"
              description="Let AI help you find the best candidates by automatically matching skills and requirements."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="10,000+" label="Companies Trust Us" />
            <StatCard number="1M+" label="Candidates Placed" />
            <StatCard number="98%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Recruitment Process?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that have streamlined their hiring with TWITE AI ATS
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg hover:transform hover:-translate-y-1 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const StatCard: React.FC<{
  number: string;
  label: string;
}> = ({ number, label }) => {
  return (
    <div className="text-center p-8 bg-gray-800 rounded-lg">
      <div className="text-4xl font-bold text-cyan-400 mb-2">{number}</div>
      <div className="text-white">{label}</div>
    </div>
  );
};

export default HomePage;