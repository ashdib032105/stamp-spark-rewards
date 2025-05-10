
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Phone, Clock, MessageSquare, Settings } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [enableSmsNotifications, setEnableSmsNotifications] = useState(false);
  
  // Re-engagement settings
  const [enableReEngagement, setEnableReEngagement] = useState(false);
  const [reEngagementDays, setReEngagementDays] = useState(30);
  const [reEngagementMessage, setReEngagementMessage] = useState(
    "We miss you! It's been a while since your last visit. Come back to {business_name} and enjoy a special offer on your next purchase!"
  );
  
  const handleSavePhoneNumber = () => {
    // In a real app, this would save the phone number to the backend
    toast({
      title: "Phone number updated",
      description: "Your notification phone number has been updated successfully.",
    });
  };

  const handleSaveReEngagement = () => {
    // In a real app, this would save the re-engagement settings to the backend
    toast({
      title: "Re-engagement settings saved",
      description: "Your customer re-engagement settings have been updated successfully.",
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
            <h1 className="text-3xl font-bold mb-1">Settings</h1>
            <p className="text-gray-600 mb-6">Configure your business settings</p>
            
            <Tabs defaultValue="notifications" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="branding">Branding</TabsTrigger>
              </TabsList>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>SMS Notifications</CardTitle>
                    <CardDescription>
                      Configure the phone number for sending notifications to customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="enable-sms" 
                        checked={enableSmsNotifications}
                        onCheckedChange={setEnableSmsNotifications}
                      />
                      <Label htmlFor="enable-sms">Enable SMS notifications</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Business Phone Number</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Phone className="h-4 w-4 text-gray-500" />
                          </div>
                          <Input 
                            id="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="pl-8"
                            disabled={!enableSmsNotifications}
                          />
                        </div>
                        <Button 
                          onClick={handleSavePhoneNumber} 
                          disabled={!enableSmsNotifications}
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        This phone number will be used to send SMS notifications to your customers
                      </p>
                    </div>

                    <div className="space-y-2 p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium">SMS Notification Types</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Welcome Message</p>
                            <p className="text-sm text-gray-500">Send a welcome message when customers join</p>
                          </div>
                          <Switch disabled={!enableSmsNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Point Updates</p>
                            <p className="text-sm text-gray-500">Notify customers when they earn points</p>
                          </div>
                          <Switch disabled={!enableSmsNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Reward Redemption</p>
                            <p className="text-sm text-gray-500">Notify customers when they redeem rewards</p>
                          </div>
                          <Switch disabled={!enableSmsNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Birthday Rewards</p>
                            <p className="text-sm text-gray-500">Send special offers on customer birthdays</p>
                          </div>
                          <Switch disabled={!enableSmsNotifications} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      SMS charges may apply based on your plan
                    </p>
                  </CardFooter>
                </Card>

                {/* Re-engagement Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Re-Engagement Messages
                    </CardTitle>
                    <CardDescription>
                      Automatically send messages to customers who haven't visited in a while
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="enable-reengagement" 
                        checked={enableReEngagement}
                        onCheckedChange={setEnableReEngagement}
                      />
                      <Label htmlFor="enable-reengagement">Enable re-engagement messages</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inactive-days">
                        Send message after customer is inactive for
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="inactive-days"
                          type="number"
                          min="1"
                          value={reEngagementDays}
                          onChange={(e) => setReEngagementDays(parseInt(e.target.value))}
                          className="w-24"
                          disabled={!enableReEngagement}
                        />
                        <span>days</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Messages will be sent to customers who haven't visited your business in this many days
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reengagement-message">Custom Message</Label>
                      <div className="flex flex-col gap-2">
                        <Textarea 
                          id="reengagement-message"
                          value={reEngagementMessage}
                          onChange={(e) => setReEngagementMessage(e.target.value)}
                          placeholder="Enter your custom re-engagement message"
                          className="min-h-[120px]"
                          disabled={!enableReEngagement}
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <p className="text-xs text-gray-500">
                            Use {"{business_name}"} to include your business name and {"{customer_name}"} to personalize the message
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSaveReEngagement} 
                      disabled={!enableReEngagement}
                      className="w-full sm:w-auto"
                    >
                      Save Re-engagement Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your business account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Account settings will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="branding" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Branding</CardTitle>
                    <CardDescription>
                      Customize your brand colors and logo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Branding customization will be available soon.
                    </p>
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

export default SettingsPage;
