
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityList from "@/components/dashboard/ActivityList";
import LeaderboardCard from "@/components/dashboard/LeaderboardCard";
import RewardsCard from "@/components/dashboard/RewardsCard";
import { 
  Activity, 
  ActivityCategory, 
  DashboardStats, 
  LeaderboardEntry, 
  Reward, 
  UserRole, 
  createMockActivity, 
  createMockLeaderboardEntries, 
  createMockReward 
} from "@/types";
import { Award, GraduationCap, TrendingUp, Trophy, Users } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({});
  const [activities, setActivities] = useState<Activity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isTeacher = user?.role === UserRole.TEACHER;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data based on user role
      if (isTeacher) {
        setStats({
          totalStudents: 32,
          totalClasses: 4,
          totalPointsAwarded: 2540,
          totalRewardsRedeemed: 18
        });
      } else {
        setStats({
          pointsEarned: 310,
          currentRank: 5,
          rewardsRedeemed: 2
        });
      }
      
      // Generate mock activities
      const mockActivities: Activity[] = [];
      for (let i = 0; i < 10; i++) {
        mockActivities.push(
          createMockActivity(
            "student-123",
            "teacher-456",
            "class-789"
          )
        );
      }
      setActivities(mockActivities);
      
      // Generate mock leaderboard
      setLeaderboard(createMockLeaderboardEntries(10));
      
      // Generate mock rewards
      const mockRewards: Reward[] = [];
      for (let i = 0; i < 3; i++) {
        mockRewards.push(createMockReward());
      }
      setRewards(mockRewards);
      
      setIsLoading(false);
    };
    
    loadData();
  }, [user, navigate, isTeacher]);

  if (!user) return null;

  return (
    <AppLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Welcome, {user.name}</h1>
          <p className="page-subtitle">
            {isTeacher 
              ? "Track your class progress and student engagement" 
              : "Monitor your learning progress and achievements"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isTeacher ? (
            <>
              <StatCard 
                title="Total Students" 
                value={stats.totalStudents || 0} 
                icon={Users}
                trend={{ value: 12, positive: true }}
              />
              <StatCard 
                title="Total Classes" 
                value={stats.totalClasses || 0} 
                icon={GraduationCap}
              />
              <StatCard 
                title="Points Awarded" 
                value={stats.totalPointsAwarded || 0} 
                icon={TrendingUp}
                trend={{ value: 8, positive: true }}
              />
              <StatCard 
                title="Rewards Redeemed" 
                value={stats.totalRewardsRedeemed || 0} 
                icon={Award}
              />
            </>
          ) : (
            <>
              <StatCard 
                title="Your Points" 
                value={stats.pointsEarned || 0} 
                icon={TrendingUp}
                trend={{ value: 15, positive: true }}
              />
              <StatCard 
                title="Current Rank" 
                value={stats.currentRank || 0} 
                icon={Trophy}
                trend={{ value: 2, positive: true }}
              />
              <StatCard 
                title="Rewards Redeemed" 
                value={stats.rewardsRedeemed || 0} 
                icon={Award}
              />
              <StatCard 
                title="Next Reward" 
                value={rewards[0]?.pointsCost || 0} 
                icon={GraduationCap}
                description="Points needed"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ActivityList activities={activities} />
          </div>
          <div>
            <LeaderboardCard entries={leaderboard} />
          </div>
        </div>

        <div className="mb-6">
          <RewardsCard rewards={rewards} />
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
