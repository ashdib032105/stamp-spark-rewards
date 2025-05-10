
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerSearch } from '@/components/CustomerSearch';
import { useAuth } from '@/context/AuthContext';
import { Award, Clock, List, Badge as BadgeIcon } from 'lucide-react';
import { CashierSidebar } from '@/components/CashierSidebar';
import { EnhancedAssignPointsModal } from '@/components/EnhancedAssignPointsModal';

const CashierDashboard = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  // Mock recent activity by this cashier
  const recentActivity = [
    { id: 1, customer: "Jane Smith", action: "5 points assigned", time: "10 minutes ago" },
    { id: 2, customer: "John Doe", action: "2 stamps assigned", time: "1 hour ago" },
    { id: 3, customer: "Alice Johnson", action: "1 stamp assigned", time: "3 hours ago" },
    { id: 4, customer: "Bob Williams", action: "Reward redeemed - Free Coffee", time: "5 hours ago" },
  ];

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setShowAssignModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <CashierSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Cashier Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name || 'Cashier'}</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Today's Points</h3>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <BadgeIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">32</div>
                  <div className="text-xs text-gray-500">Points assigned today</div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Today's Stamps</h3>
                    <div className="p-2 bg-brand-orange/10 rounded-full">
                      <Award className="h-5 w-5 text-brand-orange" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">18</div>
                  <div className="text-xs text-gray-500">Stamps assigned today</div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Customers Served</h3>
                    <div className="p-2 bg-brand-green/10 rounded-full">
                      <List className="h-5 w-5 text-brand-green" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">24</div>
                  <div className="text-xs text-gray-500">Unique customers today</div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Time Logged</h3>
                    <div className="p-2 bg-brand-blue/10 rounded-full">
                      <Clock className="h-5 w-5 text-brand-blue" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">4h 25m</div>
                  <div className="text-xs text-gray-500">Today's shift</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Search */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Find & Reward Customer</h2>
                <CustomerSearch onCustomerSelect={handleCustomerSelect} />
              </div>
              
              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Recent Activity</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Feed</CardTitle>
                    <CardDescription>
                      Your recent interactions with customers
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
                              {item.action}
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
      
      {showAssignModal && selectedCustomer && (
        <EnhancedAssignPointsModal
          open={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          customerName={selectedCustomer.name}
          customerPhone={selectedCustomer.phone}
          currentPoints={selectedCustomer.points}
          currentStamps={selectedCustomer.stamps}
          cashier={user}
        />
      )}
    </div>
  );
};

export default CashierDashboard;
