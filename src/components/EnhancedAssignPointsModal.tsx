
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';

interface EnhancedAssignPointsModalProps {
  open: boolean;
  onClose: () => void;
  customerName: string;
  customerPhone: string;
  currentPoints: number;
  currentStamps: number;
  cashier: any;
}

export function EnhancedAssignPointsModal({
  open,
  onClose,
  customerName,
  customerPhone,
  currentPoints,
  currentStamps,
  cashier,
}: EnhancedAssignPointsModalProps) {
  const { toast } = useToast();
  const [assignType, setAssignType] = useState<'points' | 'stamps'>('points');
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState('');
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Create a transaction record
    const transaction = {
      id: Date.now().toString(),
      customerId: customerPhone,
      customerName,
      cashierId: cashier.id,
      cashierName: cashier.name,
      type: assignType,
      amount,
      note,
      timestamp: new Date().toISOString(),
    };
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Transaction recorded:', transaction);
      
      toast({
        title: "Success!",
        description: `${amount} ${assignType} assigned to ${customerName} by ${cashier.name}.`,
      });
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Loyalty Rewards</DialogTitle>
          <DialogDescription>
            Add points or stamps to {customerName}'s loyalty account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-sm font-medium">Customer</p>
              <p>{customerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p>{customerPhone}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-sm font-medium">Current Points</p>
              <p className="font-semibold">{currentPoints}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Current Stamps</p>
              <p className="font-semibold">{currentStamps}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>What would you like to assign?</Label>
            <RadioGroup
              value={assignType}
              onValueChange={(value: 'points' | 'stamps') => setAssignType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="points" id="points" />
                <Label htmlFor="points">Points</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stamps" id="stamps" />
                <Label htmlFor="stamps">Stamps</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="e.g., Purchase of Coffee + Pastry"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          
          <div className="bg-secondary/30 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Cashier:</span> {cashier?.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              This transaction will be recorded with your cashier ID.
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Assign Rewards"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
