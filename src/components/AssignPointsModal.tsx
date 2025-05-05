
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface AssignPointsModalProps {
  open: boolean;
  onClose: () => void;
  customerName: string;
  customerPhone: string;
  currentPoints: number;
  currentStamps: number;
}

export function AssignPointsModal({
  open,
  onClose,
  customerName,
  customerPhone,
  currentPoints,
  currentStamps,
}: AssignPointsModalProps) {
  const { toast } = useToast();
  const [assignType, setAssignType] = useState<'points' | 'stamps'>('points');
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: `${amount} ${assignType} assigned to ${customerName}.`,
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
