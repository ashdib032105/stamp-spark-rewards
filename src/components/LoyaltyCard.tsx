
import { Stamp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LoyaltyCardProps {
  businessName: string;
  customerName: string;
  earnedPoints: number;
  totalPointsNeeded: number;
  earnedStamps: number;
  totalStampsNeeded: number;
  reward: string;
}

export function LoyaltyCard({
  businessName,
  customerName,
  earnedPoints,
  totalPointsNeeded,
  earnedStamps,
  totalStampsNeeded,
  reward,
}: LoyaltyCardProps) {
  const progress = (earnedPoints / totalPointsNeeded) * 100;
  const isRewardAvailable = earnedPoints >= totalPointsNeeded;

  return (
    <Card className="card-gradient overflow-hidden border-0">
      <CardHeader className="bg-gradient-purple text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{businessName}</CardTitle>
            <CardDescription className="text-white/80">Member: {customerName}</CardDescription>
          </div>
          <Badge className="bg-white text-primary hover:bg-white/90">
            {earnedPoints} points
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress toward {reward}</span>
              <span className="font-medium">
                {earnedPoints} / {totalPointsNeeded} points
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Stamps Collected</h4>
            <div className="flex justify-center flex-wrap gap-2">
              {Array.from({ length: totalStampsNeeded }).map((_, i) => (
                <div
                  key={i}
                  className={`loyalty-stamp ${
                    i < earnedStamps ? "loyalty-stamp-active animate-stamp-pulse" : "loyalty-stamp-inactive"
                  }`}
                >
                  <Stamp className="h-6 w-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button 
          className="w-full" 
          disabled={!isRewardAvailable}
        >
          {isRewardAvailable ? `Redeem ${reward}` : `Collect more stamps to earn ${reward}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
