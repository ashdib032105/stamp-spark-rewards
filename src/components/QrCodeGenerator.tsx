
import { useState } from 'react';
import { QrCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QrCodeGeneratorProps {
  businessName: string;
  businessId: string;
}

export function QrCodeGenerator({ businessName, businessId }: QrCodeGeneratorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // In a real app, this would generate a real QR code with the business ID
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=stampspark://join/${businessId}`;
  
  const handleDownload = () => {
    // In a real app, this would trigger a download of the QR code
    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been downloaded successfully.",
    });
  };
  
  const handlePrint = () => {
    // In a real app, this would open a print dialog
    toast({
      title: "Print Dialog",
      description: "The print dialog has been opened.",
    });
  };
  
  const handleRegenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "QR Code Regenerated",
        description: "Your QR code has been regenerated successfully.",
      });
    }, 1500);
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>Your Business QR Code</CardTitle>
        <CardDescription>
          Have customers scan this to join your loyalty program
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
          {isGenerating ? (
            <div className="w-[200px] h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
              <QrCode className="animate-pulse text-gray-300" size={80} />
            </div>
          ) : (
            <img 
              src={qrCodeUrl} 
              alt={`QR Code for ${businessName}`} 
              className="w-[200px] h-[200px]"
            />
          )}
        </div>
        <div className="w-full bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Business ID</p>
          <p className="font-mono font-medium">{businessId}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleDownload} variant="outline">
          Download QR Code
        </Button>
        <Button onClick={handlePrint} variant="outline">
          Print QR Code
        </Button>
        <Button onClick={handleRegenerate} disabled={isGenerating}>
          {isGenerating ? "Regenerating..." : "Regenerate QR Code"}
        </Button>
      </CardFooter>
    </Card>
  );
}
