
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reward } from "@/types";
import { Gift, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RewardsCardProps {
  rewards: Reward[];
  limit?: number;
}

const RewardsCard: React.FC<RewardsCardProps> = ({ rewards, limit = 3 }) => {
  const navigate = useNavigate();
  const displayRewards = rewards.slice(0, limit);

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Available Rewards</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/rewards")}>
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {displayRewards.map((reward, index) => (
            <div 
              key={reward.id} 
              className="glass-card-interactive p-4 flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-accent/10 text-accent">
                    <Gift className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{reward.name}</h3>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {reward.pointsCost} pts
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
              {reward.limited && reward.quantity && (
                <div className="text-xs text-muted-foreground mt-auto">
                  Limited availability: {reward.quantity} remaining
                </div>
              )}
            </div>
          ))}
          
          {displayRewards.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <Gift className="h-10 w-10 mb-2 text-muted-foreground/50" />
                <p>No rewards available yet</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
