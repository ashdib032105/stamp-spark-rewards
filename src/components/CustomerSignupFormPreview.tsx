
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CustomerSignupFormPreviewProps {
  businessName: string;
  businessId: string;
}

const formSchema = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  birthday: z.string().optional(),
});

export function CustomerSignupFormPreview({ businessName, businessId }: CustomerSignupFormPreviewProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      name: "",
      birthday: "",
    },
  });
  
  // This is just a preview, so the submit function is empty
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This is a preview, so we don't actually submit
    console.log("Preview form values:", values);
  };

  return (
    <Card className="card-gradient w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Join {businessName}</CardTitle>
        <CardDescription className="text-center">
          Sign up for our loyalty program to earn rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthday (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="button" // Changed from submit to button to prevent form submission in preview
              className="w-full bg-gradient-purple hover:opacity-90"
            >
              Join Loyalty Program
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-gray-500">
        <p>By joining, you agree to receive messages about rewards and offers</p>
      </CardFooter>
    </Card>
  );
}
