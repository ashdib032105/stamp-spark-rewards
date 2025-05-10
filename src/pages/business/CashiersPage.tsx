
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Trash2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const CashiersPage = () => {
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCashierDialog, setShowAddCashierDialog] = useState(false);

  // Mock cashier data
  const [cashiers, setCashiers] = useState([
    { id: '1', name: 'Alex Johnson', email: 'alex@coffehaven.com', phone: '(555) 111-2222', status: 'active', transactionsCount: 145 },
    { id: '2', name: 'Jamie Smith', email: 'jamie@coffehaven.com', phone: '(555) 222-3333', status: 'active', transactionsCount: 98 },
    { id: '3', name: 'Taylor Brown', email: 'taylor@coffehaven.com', phone: '(555) 333-4444', status: 'inactive', transactionsCount: 67 },
  ]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Add new cashier to the list
    const newCashier = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      status: 'active',
      transactionsCount: 0
    };
    
    setCashiers([...cashiers, newCashier]);
    setShowAddCashierDialog(false);
    form.reset();
    
    toast({
      title: "Cashier added",
      description: `${values.name} has been added as a cashier.`,
    });
  };
  
  const handleDeleteCashier = (id: string) => {
    setCashiers(cashiers.filter(cashier => cashier.id !== id));
    
    toast({
      title: "Cashier removed",
      description: "The cashier has been removed.",
    });
  };
  
  const toggleCashierStatus = (id: string) => {
    setCashiers(cashiers.map(cashier => {
      if (cashier.id === id) {
        const newStatus = cashier.status === 'active' ? 'inactive' : 'active';
        return { ...cashier, status: newStatus };
      }
      return cashier;
    }));
    
    toast({
      title: "Status updated",
      description: "The cashier's status has been updated.",
    });
  };
  
  // Filter cashiers based on search query
  const filteredCashiers = cashiers.filter(cashier => 
    cashier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cashier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.phone.includes(searchQuery)
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
                <h1 className="text-3xl font-bold mb-1">Cashiers</h1>
                <p className="text-gray-600">Manage cashiers who can assign rewards to customers</p>
              </div>
              
              <Button onClick={() => setShowAddCashierDialog(true)} className="gap-1">
                <UserPlus className="h-4 w-4" /> Add Cashier
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search cashiers by name, email or phone..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cashier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transactions
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
                      {filteredCashiers.map((cashier) => (
                        <tr key={cashier.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                                {cashier.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{cashier.name}</div>
                                <div className="text-sm text-gray-500">ID: {cashier.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{cashier.email}</div>
                            <div className="text-sm text-gray-500">{cashier.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {cashier.transactionsCount} rewards assigned
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={cashier.status === 'active' ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleCashierStatus(cashier.id)}
                            >
                              {cashier.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                onClick={() => handleDeleteCashier(cashier.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredCashiers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                            No cashiers found matching "{searchQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredCashiers.length} of {cashiers.length} cashiers
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Add Cashier Dialog */}
      <Dialog open={showAddCashierDialog} onOpenChange={setShowAddCashierDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Cashier</DialogTitle>
            <DialogDescription>
              Create a new cashier account. They will be able to assign rewards to customers.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddCashierDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Cashier</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashiersPage;
