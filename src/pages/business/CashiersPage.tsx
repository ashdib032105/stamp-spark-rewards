
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Trash2, Mail, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  const [showInfoDialog, setShowInfoDialog] = useState(false);

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
                <p className="text-gray-600 flex items-center gap-1">
                  Manage cashiers who can assign rewards to customers
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="ml-1 h-6 w-6" 
                    onClick={() => setShowInfoDialog(true)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </p>
              </div>
              
              <Button onClick={() => setShowAddCashierDialog(true)} className="gap-1">
                <UserPlus className="h-4 w-4" /> Add Cashier
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cashier Management Guide</CardTitle>
                <CardDescription>
                  Learn how to effectively manage your cashiers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How to add a new cashier?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Click the "Add Cashier" button in the top-right corner</li>
                        <li>Fill in their name, email, phone, and set a temporary password</li>
                        <li>Share these login credentials with them securely</li>
                        <li>They can log in at the main login page with their email and password</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Managing cashier permissions</AccordionTrigger>
                    <AccordionContent>
                      <p>Cashiers have limited access to your business account. They can:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Search for customers by phone number</li>
                        <li>Assign points or stamps to customers</li>
                        <li>View their transaction history</li>
                      </ul>
                      <p className="mt-2">They cannot modify reward structures or access business settings.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Activating or deactivating cashiers</AccordionTrigger>
                    <AccordionContent>
                      <p>Click the status badge on any cashier to toggle their status between "Active" and "Inactive".</p>
                      <p className="mt-2"><strong>Active cashiers:</strong> Can log in and assign rewards</p>
                      <p><strong>Inactive cashiers:</strong> Cannot log in or access the system</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Monitoring cashier activity</AccordionTrigger>
                    <AccordionContent>
                      <p>The "Transactions" column shows how many rewards each cashier has assigned.</p>
                      <p className="mt-2">For detailed reporting on cashier activity:</p>
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>View individual cashier activity by clicking their name</li>
                        <li>Monitor overall trends in the Reports section</li>
                        <li>Set performance goals based on transaction counts</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
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
      
      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>About Cashier Management</DialogTitle>
            <DialogDescription>
              Understanding the cashier role and management process
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">What are cashiers in StampSpark?</h3>
              <p className="text-gray-600">
                Cashiers are staff members who can log in to a dedicated portal to assign points, stamps, and rewards to your customers. They have limited access to your business data.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Cashier account creation flow</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Add a cashier through this management page</li>
                <li>Share their login credentials with them</li>
                <li>They log in at yoursite.com/login with their email and password</li>
                <li>They'll automatically be directed to the cashier dashboard</li>
                <li>They can search for customers and assign rewards</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Cashier vs. Business Owner access</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <p className="font-medium mb-2">Cashiers can:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Search for customers</li>
                    <li>Assign points/stamps</li>
                    <li>View their own transaction history</li>
                  </ul>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <p className="font-medium mb-2">Cashiers cannot:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Modify reward structures</li>
                    <li>Access business settings</li>
                    <li>View sensitive business data</li>
                    <li>See other cashiers' activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowInfoDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashiersPage;
