import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LeaderboardEntry, 
  ActivityCategory, 
  createMockLeaderboardEntries 
} from "@/types";
import { Trophy, Medal, Award } from "lucide-react";

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock leaderboard data
      const mockLeaderboard = createMockLeaderboardEntries(20);
      setLeaderboard(mockLeaderboard);
      
      setIsLoading(false);
    };
    
    loadLeaderboard();
  }, []);

  const filterOptions = [
    { id: "all", label: "All Points" },
    { id: ActivityCategory.ATTENDANCE, label: "Attendance" },
    { id: ActivityCategory.ASSIGNMENT, label: "Assignments" },
    { id: ActivityCategory.TEST, label: "Tests" }
  ];

  // Filter leaderboard - in a real app, this would call an API with the filter
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setIsLoading(true);
    
    // Simulate API call with filter
    setTimeout(() => {
      const mockLeaderboard = createMockLeaderboardEntries(20);
      setLeaderboard(mockLeaderboard);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AppLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Leaderboard</h1>
          <p className="page-subtitle">
            See how you rank against other students
          </p>
        </div>

        <Card className="glass-card mb-8">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-2xl">
              <Trophy className="mr-2 h-6 w-6 text-amber-500" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Students ranked by points earned across different categories
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {filterOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={activeFilter === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange(option.id)}
                  className="transition-all duration-200"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="loading-spinner" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Top 3 podium */}
                <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
                  {leaderboard.slice(0, 3).map((entry, index) => {
                    // Order should be: 2nd (index 1), 1st (index 0), 3rd (index 2)
                    const position = index === 0 ? 1 : index === 1 ? 0 : 2;
                    const student = leaderboard[position];
                    
                    let height = "h-24";
                    let bgColor = "bg-amber-100 dark:bg-amber-950/30";
                    let textColor = "text-amber-500";
                    let icon = <Trophy className="h-6 w-6" />;
                    
                    if (position === 1) { // 2nd place
                      height = "h-20";
                      bgColor = "bg-gray-100 dark:bg-gray-800/50";
                      textColor = "text-gray-500";
                      icon = <Medal className="h-6 w-6" />;
                    } else if (position === 2) { // 3rd place
                      height = "h-16";
                      bgColor = "bg-amber-50 dark:bg-amber-900/30";
                      textColor = "text-amber-800";
                      icon = <Medal className="h-6 w-6" />;
                    }
                    
                    return (
                      <div 
                        key={student.studentId} 
                        className={`flex flex-col items-center justify-end animate-fade-in`}
                        style={{ animationDelay: `${position * 100}ms` }}
                      >
                        <div className="mb-3 flex flex-col items-center">
                          <img
                            src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.studentId}`}
                            alt={student.studentName}
                            className="w-12 h-12 rounded-full bg-muted ring-2 ring-white shadow-md"
                          />
                          <p className="font-medium text-sm mt-1 truncate max-w-[120px]">
                            {student.studentName}
                          </p>
                          <p className={`font-bold ${textColor}`}>
                            {student.totalPoints} pts
                          </p>
                        </div>
                        <div className={`w-full rounded-t-lg ${bgColor} ${height} flex items-center justify-center relative animate-scale-in`}>
                          <div className={`absolute -top-3 w-8 h-8 rounded-full flex items-center justify-center ${textColor} bg-white shadow-md`}>
                            {position + 1}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Rest of the leaderboard */}
                <div className="bg-white/50 dark:bg-black/20 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-12 py-3 px-4 bg-secondary text-sm font-medium">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-7">Student</div>
                    <div className="col-span-4 text-right">Points</div>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {leaderboard.slice(3).map((entry, index) => (
                      <div 
                        key={entry.studentId} 
                        className="grid grid-cols-12 items-center py-3 px-4 hover:bg-secondary/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${(index + 3) * 50}ms` }}
                      >
                        <div className="col-span-1 font-medium">{index + 4}</div>
                        <div className="col-span-7 flex items-center space-x-3">
                          <img
                            src={entry.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.studentId}`}
                            alt={entry.studentName}
                            className="w-8 h-8 rounded-full bg-muted"
                          />
                          <span className="font-medium truncate">{entry.studentName}</span>
                        </div>
                        <div className="col-span-4 text-right font-semibold text-primary">
                          {entry.totalPoints} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LeaderboardPage;
