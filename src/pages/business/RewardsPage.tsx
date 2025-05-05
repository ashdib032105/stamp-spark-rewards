
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BusinessSidebar } from '@/components/BusinessSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Award, Plus, Gift, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RewardsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  
  // Mock rewards data
  const [rewards, setRewards] = useState([
    { id: 1, name: "Free Coffee", pointsNeeded: 50, description: "Any size, any flavor", active: true },
    { id: 2, name: "Pastry Discount", pointsNeeded: 30, description: "50% off any pastry", active: true },
    { id: 3, name: "Birthday Special", pointsNeeded: 0, description: "Free dessert on your birthday", active: true },
  ]);
  
  const handleToggleActive = (id: number) => {
    setRewards(rewards.map(reward => 
      reward.id === id ? { ...reward, active: !reward.active } : reward
    ));
    
    const reward = rewards.find(r => r.id === id);
    
    toast({
      title: reward?.active ? "Reward Disabled" : "Reward Enabled",
      description: `${reward?.name} is now ${reward?.active ? 'disabled' : 'enabled'}`,
    });
  };
  
  const handleDeleteReward = (id: number) => {
    const reward = rewards.find(r => r.id === id);
    setRewards(rewards.filter(reward => reward.id !== id));
    
    toast({
      title: "Reward Deleted",
      description: `${reward?.name} has been deleted`,
      variant: "destructive",
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
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Rewards Management</h1>
                <p className="text-gray-600">Create and manage loyalty rewards for your customers</p>
              </div>
              
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Add New Reward
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reward Settings</CardTitle>
                    <CardDescription>
                      Configure how customers earn points and stamps
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Points System</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="points-per-purchase">Points per purchase</Label>
                        <Input id="points-per-purchase" type="number" defaultValue="5" min="1" />
                        <p className="text-sm text-gray-500">
                          How many points customers earn for each purchase
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="spend-based" className="flex-grow">
                          Use spend-based points
                        </Label>
                        <Switch id="spend-based" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Award points based on purchase amount (1 point per $1)
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Stamps System</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stamps-requirement">Stamps for reward</Label>
                        <Input id="stamps-requirement" type="number" defaultValue="10" min="1" />
                        <p className="text-sm text-gray-500">
                          How many stamps needed to earn a free reward
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="enable-stamps" className="flex-grow">
                          Enable stamp card
                        </Label>
                        <Switch id="enable-stamps" defaultChecked />
                      </div>
                      <p className="text-sm text-gray-500">
                        Show digital stamp card on customer's loyalty account
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Rewards</CardTitle>
                    <CardDescription>
                      Rewards that customers can redeem with their points
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rewards.length > 0 ? (
                      rewards.map((reward) => (
                        <div 
                          key={reward.id}
                          className={`p-4 rounded-lg border ${reward.active ? 'bg-white' : 'bg-gray-50'} flex justify-between items-center gap-4`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Award className={`h-5 w-5 ${reward.active ? 'text-brand-purple' : 'text-gray-400'}`} />
                              <h3 className="font-medium">{reward.name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                reward.pointsNeeded > 0 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'bg-brand-orange/10 text-brand-orange'
                              }`}>
                                {reward.pointsNeeded > 0 ? `${reward.pointsNeeded} points` : 'Special'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Switch 
                              checked={reward.active} 
                              onCheckedChange={() => handleToggleActive(reward.id)} 
                            />
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-destructive"
                              onClick={() => handleDeleteReward(reward.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Gift className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p>No rewards available</p>
                        <p className="text-sm">Create rewards for your customers to redeem</p>
                      </div>
                    )}
                    
                    <Button variant="outline" className="w-full gap-1">
                      <Plus className="h-4 w-4" /> Add New Reward
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RewardsPage;
