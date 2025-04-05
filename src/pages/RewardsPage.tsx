
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Reward, UserRole, createMockReward } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Award, Check, Gift, LockIcon } from "lucide-react";

const RewardsPage: React.FC = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redeemed, setRedeemed] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isTeacher = user?.role === UserRole.TEACHER;
  const studentPoints = 310; // This would be fetched from the API in a real app
  
  useEffect(() => {
    const loadRewards = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock rewards data
      const mockRewards: Reward[] = [];
      for (let i = 0; i < 9; i++) {
        mockRewards.push(createMockReward());
      }
      setRewards(mockRewards);
      
      // Generate mock redeemed rewards
      const mockRedeemed: Reward[] = [];
      for (let i = 0; i < 2; i++) {
        const reward = createMockReward();
        mockRedeemed.push({
          ...reward,
          pointsCost: Math.floor(reward.pointsCost * 0.8) // Lower cost for already redeemed rewards
        });
      }
      setRedeemed(mockRedeemed);
      
      setIsLoading(false);
    };
    
    loadRewards();
  }, []);
  
  const handleRedeem = (reward: Reward) => {
    if (studentPoints < reward.pointsCost) {
      toast.error("Not enough points to redeem this reward");
      return;
    }
    
    toast.success(`You've redeemed "${reward.name}"`);
    // In a real app, this would call an API to redeem the reward
  };
  
  const handleApprove = (reward: Reward) => {
    toast.success(`Reward "${reward.name}" has been approved`);
    // In a real app, this would call an API to approve the redemption
  };
  
  const handleReject = (reward: Reward) => {
    toast.success(`Reward "${reward.name}" has been rejected`);
    // In a real app, this would call an API to reject the redemption
  };

  return (
    <AppLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Rewards</h1>
          <p className="page-subtitle">
            {isTeacher 
              ? "Manage and approve student reward redemptions" 
              : "Redeem your points for exclusive rewards"}
          </p>
        </div>
        
        {!isTeacher && (
          <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Your current balance</h3>
                <p className="text-2xl font-bold text-primary">{studentPoints} points</p>
              </div>
            </div>
            <Button variant="outline">View History</Button>
          </div>
        )}
        
        <Tabs defaultValue="available" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="available">
              {isTeacher ? "Pending Approvals" : "Available Rewards"}
            </TabsTrigger>
            <TabsTrigger value="redeemed">
              {isTeacher ? "Approved Rewards" : "Your Redeemed Rewards"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="loading-spinner" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward, index) => (
                  <Card 
                    key={reward.id} 
                    className="glass-card overflow-hidden flex flex-col animate-fade-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img 
                        src={reward.imageUrl || `https://source.unsplash.com/random/800x600?learning,${index}`} 
                        alt={reward.name}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {reward.pointsCost} points
                      </div>
                    </div>
                    <CardContent className="flex-1 flex flex-col p-5">
                      <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
                      <p className="text-muted-foreground mb-5 flex-1">{reward.description}</p>
                      
                      {isTeacher ? (
                        <div className="flex space-x-2 mt-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1" 
                            onClick={() => handleReject(reward)}
                          >
                            Reject
                          </Button>
                          <Button 
                            className="flex-1" 
                            onClick={() => handleApprove(reward)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-auto">
                          {studentPoints >= reward.pointsCost ? (
                            <Button 
                              className="w-full" 
                              onClick={() => handleRedeem(reward)}
                            >
                              <Gift className="mr-2 h-4 w-4" />
                              Redeem Reward
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              disabled
                            >
                              <LockIcon className="mr-2 h-4 w-4" />
                              {reward.pointsCost - studentPoints} more points needed
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {reward.limited && reward.quantity && (
                        <p className="text-xs text-muted-foreground mt-3 text-center">
                          Limited: {reward.quantity} remaining
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="redeemed">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="loading-spinner" />
              </div>
            ) : redeemed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redeemed.map((reward, index) => (
                  <Card 
                    key={reward.id} 
                    className="glass-card overflow-hidden flex flex-col animate-fade-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img 
                        src={reward.imageUrl || `https://source.unsplash.com/random/800x600?learning,${index}`} 
                        alt={reward.name}
                        className="object-cover w-full h-full grayscale-[30%]"
                      />
                      <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                        <div className="bg-green-500 text-white rounded-full p-3">
                          <Check className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="flex-1 flex flex-col p-5">
                      <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
                      <p className="text-muted-foreground mb-5">{reward.description}</p>
                      <div className="mt-auto flex items-center justify-center bg-green-500/10 text-green-500 py-2 rounded-md">
                        <Check className="mr-2 h-4 w-4" />
                        {isTeacher ? "Approved" : "Redeemed"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Gift className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No rewards {isTeacher ? "approved" : "redeemed"} yet</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    {isTeacher 
                      ? "Once you approve reward redemptions, they will appear here." 
                      : "Redeem your points for exclusive rewards to see them here."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default RewardsPage;
