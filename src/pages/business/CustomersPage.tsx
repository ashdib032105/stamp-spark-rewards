
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, UserPlus, Award, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssignPointsModal } from '@/components/AssignPointsModal';

const CustomersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  
  // Mock customer data
  const customers = [
    { id: '1', name: 'Jane Smith', phone: '(555) 123-4567', points: 45, stamps: 3, lastVisit: '2025-05-01', status: 'active' },
    { id: '2', name: 'John Doe', phone: '(555) 234-5678', points: 120, stamps: 8, lastVisit: '2025-04-28', status: 'active' },
    { id: '3', name: 'Alice Johnson', phone: '(555) 345-6789', points: 75, stamps: 5, lastVisit: '2025-04-15', status: 'active' },
    { id: '4', name: 'Bob Williams', phone: '(555) 456-7890', points: 30, stamps: 2, lastVisit: '2025-04-10', status: 'inactive' },
    { id: '5', name: 'Carol Davis', phone: '(555) 567-8901', points: 90, stamps: 6, lastVisit: '2025-03-22', status: 'active' },
    { id: '6', name: 'Dave Wilson', phone: '(555) 678-9012', points: 15, stamps: 1, lastVisit: '2025-03-15', status: 'inactive' },
  ];
  
  const handleAssignPoints = (customer: any) => {
    setSelectedCustomer(customer);
    setShowAssignModal(true);
  };
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.phone.includes(searchQuery)
  );

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Customers</h1>
                <p className="text-gray-600">Manage your loyalty program members</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button className="gap-1">
                  <UserPlus className="h-4 w-4" /> Add Customer
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search customers by name or phone..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="points">Most Points</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points / Stamps
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                                {customer.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-sm text-gray-500">{customer.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">{customer.points} points</div>
                            <div className="text-sm text-gray-500">{customer.stamps} stamps</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {customer.lastVisit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={customer.status === 'active' ? 'default' : 'outline'}>
                              {customer.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <Button 
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary hover:bg-primary/10"
                              onClick={() => handleAssignPoints(customer)}
                            >
                              <Award className="h-4 w-4 mr-1" />
                              Rewards
                            </Button>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredCustomers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                            No customers found matching "{searchQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredCustomers.length} of {customers.length} customers
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    1
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      
      {showAssignModal && selectedCustomer && (
        <AssignPointsModal
          open={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          customerName={selectedCustomer.name}
          customerPhone={selectedCustomer.phone}
          currentPoints={selectedCustomer.points}
          currentStamps={selectedCustomer.stamps}
        />
      )}
    </div>
  );
};

export default CustomersPage;
