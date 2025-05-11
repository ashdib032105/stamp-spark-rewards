
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { 
  Award, 
  BarChart, 
  CheckCircle, 
  CreditCard, 
  MessageCircle, 
  QrCode, 
  Rocket, 
  Shield, 
  Smartphone, 
  Users 
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Owner, Brew Haven Coffee",
      quote: "StampSpark increased our customer return rate by 40%. The digital loyalty system is so much more effective than our old punch cards!",
      image: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      position: "Manager, Fresh Bites Deli",
      quote: "Our customers love collecting stamps digitally. The automated messages bring people back when they haven't visited in a while.",
      image: "/placeholder.svg"
    },
    {
      name: "Emma Davis",
      position: "Owner, Blossom Boutique",
      quote: "The analytics from StampSpark have helped us understand our customers better and design more effective loyalty rewards.",
      image: "/placeholder.svg"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-secondary/20 py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute -right-60 md:-right-10 top-10 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-60 md:-left-10 bottom-10 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">
                Transform Customer Loyalty, <span className="text-primary">Digitally</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700">
                StampSpark helps businesses boost repeat visits with an effortless digital loyalty system that your customers and staff will love.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-purple hover:opacity-90 text-lg px-8">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8">
                  <Link to="/join">Join as Customer</Link>
                </Button>
              </div>
              <div className="pt-4 flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="StampSpark Digital Loyalty Card Demo" 
                className="w-full rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-600 mb-12">
            Trusted by 2,000+ businesses and 50,000+ customers worldwide
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">30%</p>
              <p className="text-gray-600">Average increase in customer retention</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">5x</p>
              <p className="text-gray-600">Return on investment</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">20%</p>
              <p className="text-gray-600">Increase in average purchase value</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">80%</p>
              <p className="text-gray-600">Customer signup rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Businesses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              StampSpark offers everything you need to create, manage and grow an effective loyalty program
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <QrCode className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Quick Join with QR Scan</h3>
              <p className="text-gray-600">Customers scan a QR code to join your loyalty program in seconds - no app download required</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Customizable Rewards</h3>
              <p className="text-gray-600">Create tiered rewards, offer points, free items, or discounts - completely customized to your business</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Customer Analytics</h3>
              <p className="text-gray-600">Gain insights about purchase patterns and customer behavior to optimize your loyalty strategy</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Re-engagement Messages</h3>
              <p className="text-gray-600">Automatically send personalized messages to bring customers back when they haven't visited in a while</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Digital Loyalty Cards</h3>
              <p className="text-gray-600">Beautiful digital cards that customers can access anytime - no more lost paper cards</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Staff Management</h3>
              <p className="text-gray-600">Add cashiers with limited permissions so your staff can award stamps without accessing sensitive settings</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How StampSpark Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is easy and your loyalty program can be up and running in minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h3 className="font-bold text-lg mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your business account in just 2 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h3 className="font-bold text-lg mb-2">Customize</h3>
              <p className="text-gray-600">Set up your rewards and loyalty structure</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h3 className="font-bold text-lg mb-2">Share</h3>
              <p className="text-gray-600">Display your QR code for customers to scan</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
              <h3 className="font-bold text-lg mb-2">Grow</h3>
              <p className="text-gray-600">Watch your customer loyalty and revenue increase</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-secondary/10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full mx-auto"
                        />
                      </div>
                      <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.position}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs
            </p>
            <div className="flex justify-center mt-6">
              <div className="bg-secondary/30 rounded-full p-1 inline-flex">
                <button 
                  className={`px-6 py-2 rounded-full ${activeTab === 'businesses' ? 'bg-white shadow-md' : ''}`}
                  onClick={() => setActiveTab('businesses')}
                >
                  For Businesses
                </button>
                <button 
                  className={`px-6 py-2 rounded-full ${activeTab === 'customers' ? 'bg-white shadow-md' : ''}`}
                  onClick={() => setActiveTab('customers')}
                >
                  For Customers
                </button>
              </div>
            </div>
          </div>
          
          {activeTab === 'businesses' ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl border p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Starter</h3>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-500 mt-2">Perfect for small businesses</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Up to 500 customers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>1 loyalty program</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
                
                <Button className="w-full" size="lg">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border-2 border-primary p-8 shadow-lg hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-purple text-white px-4 py-1 rounded-full font-medium text-sm">
                  Most Popular
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Growth</h3>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold">$79</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-500 mt-2">For growing businesses</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Unlimited customers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Multiple loyalty programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Re-engagement messaging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-gradient-purple hover:opacity-90" size="lg">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold">$199</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-500 mt-2">For large operations</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>24/7 phone support</span>
                  </li>
                </ul>
                
                <Button className="w-full" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-primary/5 rounded-xl p-10 max-w-2xl mx-auto">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Always Free for Customers</h3>
                <p className="text-gray-700 mb-4">
                  StampSpark is 100% free for customers to use. No downloads, no registration fees, just rewards!
                </p>
                <Button asChild>
                  <Link to="/join">Join a Loyalty Program</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Rocket className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Boost Your Customer Loyalty?</h2>
          <p className="text-xl mb-8">Join thousands of businesses already growing with StampSpark.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              <Link to="/register">Start Free 14-Day Trial</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="border border-white hover:bg-white/10 text-lg px-8">
              <a href="#features">Learn More</a>
            </Button>
          </div>
          <p className="mt-6 text-white/80 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StampSpark</h3>
            <p className="text-gray-400">The easiest way to create a digital loyalty program that keeps customers coming back.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 StampSpark. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
