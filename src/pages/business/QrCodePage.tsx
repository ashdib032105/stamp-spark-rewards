
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { QrCodeGenerator } from '@/components/QrCodeGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Link, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const QrCodePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const [customUrl, setCustomUrl] = useState('https://your-website.com/join');
  
  // Mock business data
  const businessData = {
    name: "Coffee Haven",
    id: "COFFEE123"
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Link has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <BusinessSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-1">QR Code Management</h1>
            <p className="text-gray-600 mb-6">Create and manage QR codes for your loyalty program</p>
            
            <Tabs defaultValue="qrcode" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                <TabsTrigger value="links">Signup Links</TabsTrigger>
              </TabsList>
              
              <TabsContent value="qrcode" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Default QR Code</CardTitle>
                    <CardDescription>
                      Display this QR code in your business for customers to scan and join
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <QrCodeGenerator 
                        businessName={businessData.name} 
                        businessId={businessData.id} 
                      />
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="font-medium mb-2">Best Practices</h3>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Print and display this QR code at your counter</li>
                            <li>Add it to receipts or packaging</li>
                            <li>Include in marketing materials</li>
                            <li>Train staff to encourage customers to scan</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">QR Code Analytics</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-secondary/30 p-3 rounded-lg">
                              <p className="text-sm text-gray-500">Total Scans</p>
                              <p className="text-xl font-semibold">145</p>
                            </div>
                            <div className="bg-secondary/30 p-3 rounded-lg">
                              <p className="text-sm text-gray-500">Sign Ups</p>
                              <p className="text-xl font-semibold">87</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="links" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Signup Links</CardTitle>
                    <CardDescription>
                      Share these links with customers via email, social media, or text
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Direct Signup Link</p>
                      <div className="flex gap-2">
                        <Input 
                          value={`https://stampspark.com/join/${businessData.id}`} 
                          readOnly 
                          className="font-mono text-sm flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => copyToClipboard(`https://stampspark.com/join/${businessData.id}`)}
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Custom URL</p>
                      <div className="flex gap-2">
                        <Input 
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          placeholder="https://your-website.com/join"
                          className="flex-1"
                        />
                        <Button onClick={() => {
                          toast({
                            title: "URL Updated",
                            description: "Your custom URL has been updated",
                          });
                        }}>
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Point this URL to our system so customers can join from your website
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="font-medium mb-2">Quick Share</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-4 w-4" /> Email
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 bg-[#25D366] text-white border-[#25D366] hover:bg-[#25D366]/90 hover:text-white">
                          <ExternalLink className="h-4 w-4" /> WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 bg-[#3b5998] text-white border-[#3b5998] hover:bg-[#3b5998]/90 hover:text-white">
                          <ExternalLink className="h-4 w-4" /> Facebook
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 bg-[#1DA1F2] text-white border-[#1DA1F2] hover:bg-[#1DA1F2]/90 hover:text-white">
                          <ExternalLink className="h-4 w-4" /> Twitter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QrCodePage;
