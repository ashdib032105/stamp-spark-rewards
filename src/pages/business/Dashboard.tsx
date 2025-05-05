
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomerSearch } from '@/components/CustomerSearch';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Award, QrCode, Activity } from 'lucide-react';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for demo purposes
  const stats = {
    totalCustomers: 128,
    totalRedemptions: 67,
    activeCustomers: 82,
    percentGrowth: 12.5,
  };
  
  // Mock recent activity
  const recentActivity = [
    { id: 1, customer: "Jane Smith", action: "Redeemed reward", item: "Free Coffee", time: "10 minutes ago" },
    { id: 2, customer: "John Doe", action: "Joined program", item: null, time: "1 hour ago" },
    { id: 3, customer: "Alice Johnson", action: "Earned points", item: "+5 points", time: "3 hours ago" },
    { id: 4, customer: "Bob Williams", action: "Earned stamp", item: "+1 stamp", time: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <BusinessSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-1">Business Dashboard</h1>
            <p className="text-gray-600 mb-6">Overview of your loyalty program performance</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Total Members</h3>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.totalCustomers}</div>
                  <div className="text-xs text-emerald-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stats.percentGrowth}% growth
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Redemptions</h3>
                    <div className="p-2 bg-brand-orange/10 rounded-full">
                      <Award className="h-5 w-5 text-brand-orange" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.totalRedemptions}</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>This month</span>
                    <span className="font-medium">+12</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Active Rate</h3>
                    <div className="p-2 bg-brand-green/10 rounded-full">
                      <Activity className="h-5 w-5 text-brand-green" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}%</div>
                  <Progress value={(stats.activeCustomers / stats.totalCustomers) * 100} className="h-1.5" />
                </CardContent>
              </Card>
              
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">QR Scans</h3>
                    <div className="p-2 bg-brand-blue/10 rounded-full">
                      <QrCode className="h-5 w-5 text-brand-blue" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">45</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>This week</span>
                    <span className="font-medium">+8</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Search */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Find & Reward Customer</h2>
                <CustomerSearch />
              </div>
              
              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Feed</CardTitle>
                    <CardDescription>
                      Recent customer interactions with your loyalty program
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map(item => (
                        <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                            {item.customer.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">{item.customer}</p>
                              <p className="text-sm text-gray-500">{item.time}</p>
                            </div>
                            <p className="text-sm text-gray-600">
                              {item.action}{" "}
                              {item.item && (
                                <span className="text-primary font-medium">{item.item}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
