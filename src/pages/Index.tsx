
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { QrCode, Stamp, Users, Trophy } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-secondary/30">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 md:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
              Loyalty Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              StampSpark helps businesses reward loyal customers with a digital loyalty card system that's easy to use and powerful.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-purple hover:opacity-90">
                <Link to="/register">Create Your Business Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/join">Join a Loyalty Program</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Easy Sign Up</h3>
                <p className="text-gray-600">Customers scan a QR code to join your loyalty program in seconds</p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stamp className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Collect Stamps</h3>
                <p className="text-gray-600">Award digital stamps or points with every visit or purchase</p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Earn Rewards</h3>
                <p className="text-gray-600">Customers redeem rewards when they reach loyalty milestones</p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Build Relationships</h3>
                <p className="text-gray-600">Send offers, updates and build customer loyalty over time</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-purple text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Reward Your Loyal Customers?</h2>
            <p className="text-xl mb-8">Get started with StampSpark today and watch your customer loyalty grow.</p>
            <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              <Link to="/register">Get Started For Free</Link>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StampSpark</h3>
            <p className="text-gray-300">The easiest way to create a digital loyalty program for your business.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">Need help? Contact our support team.</p>
            <p className="text-gray-300 mt-2">support@stampspark.com</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 StampSpark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
