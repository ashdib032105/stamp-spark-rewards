
import { Navbar } from '@/components/Navbar';
import { LoyaltyCard } from '@/components/LoyaltyCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Gift, Calendar, History } from 'lucide-react';

const LoyaltyCardPage = () => {
  const { user } = useAuth();
  
  // Mock data for demo purposes
  const loyaltyData = {
    businessName: "Coffee Haven",
    customerName: user?.name || "Customer",
    earnedPoints: 45,
    totalPointsNeeded: 100,
    earnedStamps: 4,
    totalStampsNeeded: 10,
    reward: "Free Coffee",
  };
  
  // Mock rewards
  const availableRewards = [
    {
      id: 1,
      name: "Free Coffee",
      pointsNeeded: 50,
      description: "Any size, any flavor"
    },
    {
      id: 2,
      name: "Pastry Discount",
      pointsNeeded: 30,
      description: "50% off any pastry"
    },
    {
      id: 3,
      name: "Birthday Special",
      pointsNeeded: 0,
      description: "Free dessert on your birthday"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-secondary/30">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-1">Your Loyalty Card</h1>
        <p className="text-gray-600 mb-6">Track your points and redeem rewards</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <LoyaltyCard {...loyaltyData} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">Points Earned</p>
                      <p className="text-sm text-gray-500">Coffee purchase</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-brand-green">+5 points</p>
                      <p className="text-sm text-gray-500">May 1, 2025</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">Stamp Added</p>
                      <p className="text-sm text-gray-500">Lunch visit</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-brand-purple">+1 stamp</p>
                      <p className="text-sm text-gray-500">Apr 28, 2025</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">Reward Redeemed</p>
                      <p className="text-sm text-gray-500">Free pastry</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-brand-orange">-20 points</p>
                      <p className="text-sm text-gray-500">Apr 15, 2025</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Available Rewards
                </CardTitle>
                <CardDescription>
                  Rewards you can redeem with your current points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableRewards.map(reward => (
                    <div 
                      key={reward.id}
                      className="p-4 rounded-lg border bg-secondary/30 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{reward.name}</h3>
                        <p className="text-sm text-gray-500">{reward.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {reward.pointsNeeded > 0 ? (
                          <>
                            <span className="text-sm font-medium">{reward.pointsNeeded} pts</span>
                            <Button 
                              size="sm" 
                              disabled={loyaltyData.earnedPoints < reward.pointsNeeded}
                            >
                              Redeem
                            </Button>
                          </>
                        ) : (
                          <span className="text-xs bg-brand-orange text-white px-2 py-1 rounded-full">
                            Special
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg border bg-gradient-to-r from-brand-purple/10 to-brand-blue/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-purple rounded-full p-2">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium">Double Points Weekend</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Earn double points on all purchases this weekend!
                  </p>
                  <p className="text-xs text-gray-500">Valid: May 7-8, 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoyaltyCardPage;
