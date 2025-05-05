
import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AssignPointsModal } from './AssignPointsModal';

interface CustomerSearchProps {
  onCustomerSelect?: (customer: any) => void;
}

export function CustomerSearch({ onCustomerSelect }: CustomerSearchProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  // Mock data for demo purposes
  const mockCustomer = {
    id: '12345',
    name: 'Jane Smith',
    phone: '(555) 123-4567',
    points: 45,
    stamps: 3,
    joinedDate: '2023-10-15',
    lastVisit: '2023-12-01',
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a phone number to search",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      // In a real app, this would check if the customer exists
      if (searchQuery.includes('555')) {
        setCustomer(mockCustomer);
        if (onCustomerSelect) {
          onCustomerSelect(mockCustomer);
        }
      } else {
        toast({
          title: "Customer Not Found",
          description: "No customer found with this phone number",
        });
      }
    }, 800);
  };
  
  const handleOpenAssignModal = () => {
    setShowAssignModal(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Customer</CardTitle>
          <CardDescription>
            Search for a customer by phone number to manage their loyalty rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Enter phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {customer && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Points</p>
                  <p className="font-medium">{customer.points}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Stamps</p>
                  <p className="font-medium">{customer.stamps}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{customer.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p className="font-medium">{customer.lastVisit}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleOpenAssignModal} 
              className="w-full bg-gradient-purple hover:opacity-90"
            >
              Assign Points or Stamps
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <AssignPointsModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        customerName={customer?.name || ''}
        customerPhone={customer?.phone || ''}
        currentPoints={customer?.points || 0}
        currentStamps={customer?.stamps || 0}
      />
    </div>
  );
}
