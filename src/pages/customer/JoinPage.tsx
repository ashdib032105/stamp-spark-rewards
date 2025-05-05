
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CustomerSignupForm } from '@/components/CustomerSignupForm';
import { QrCode } from 'lucide-react';

const JoinPage = () => {
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate loading business data from a QR code parameter or URL
  // In a real app, this would check the URL parameters for a business ID
  useEffect(() => {
    setTimeout(() => {
      setBusinessData({
        id: "COFFEE123",
        name: "Coffee Haven",
        logo: "/placeholder.svg"
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-secondary/30">
      <Navbar />
      
      <main className="flex-1 container max-w-md mx-auto p-4">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <QrCode className="h-16 w-16 text-primary animate-pulse mb-4" />
            <p className="text-gray-600">Loading business information...</p>
          </div>
        ) : (
          <div className="py-8">
            <div className="mb-8 text-center">
              <img 
                src={businessData.logo} 
                alt={businessData.name} 
                className="w-24 h-24 mx-auto bg-secondary/30 rounded-xl mb-4 p-2"
              />
              <h1 className="text-3xl font-bold">Join {businessData.name}</h1>
              <p className="text-gray-600 mt-2">
                Sign up for our loyalty program and start earning rewards
              </p>
            </div>
            
            <CustomerSignupForm 
              businessName={businessData.name}
              businessId={businessData.id}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default JoinPage;
