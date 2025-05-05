
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from '@/components/Navbar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const phoneFormSchema = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'business' | 'customer'>('business');
  
  const businessForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const customerForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: "",
    },
  });
  
  const onBusinessSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Login the user
      login({
        id: 'b123',
        name: 'Coffee Haven',
        role: 'business',
        email: values.email,
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome back to your business dashboard.",
      });
      
      // Redirect to business dashboard
      navigate('/business/dashboard');
    }, 1000);
  };
  
  const onCustomerSubmit = (values: z.infer<typeof phoneFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Login the user
      login({
        id: 'c123',
        name: 'Jane Smith',
        role: 'customer',
        phone: values.phone,
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome back to your loyalty card.",
      });
      
      // Redirect to customer loyalty card page
      navigate('/customer/loyalty-card');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-secondary/30">
      <Navbar />
      
      <main className="flex-1 container max-w-md mx-auto p-4">
        <Card className="card-gradient mt-8">
          <CardHeader>
            <CardTitle className="text-center">Log In</CardTitle>
            <CardDescription className="text-center">
              Access your account to manage your loyalty program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'business' | 'customer')}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="business">Business Owner</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="business">
                <Form {...businessForm}>
                  <form onSubmit={businessForm.handleSubmit(onBusinessSubmit)} className="space-y-4">
                    <FormField
                      control={businessForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={businessForm.control}
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
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-purple hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging In..." : "Login as Business"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="customer">
                <Form {...customerForm}>
                  <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-4">
                    <FormField
                      control={customerForm.control}
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
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-purple hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging In..." : "Login as Customer"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Don't have an account?</p>
                  <p>Scan a business QR code to join their loyalty program</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              New to StampSpark?{" "}
              <a href={activeTab === 'business' ? "/register" : "/join"} className="text-primary font-medium hover:underline">
                {activeTab === 'business' ? "Create Business Account" : "Join a Program"}
              </a>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;
