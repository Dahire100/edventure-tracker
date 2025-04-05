
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaderboardEntry } from "@/types";
import { Medal, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  limit?: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entries, limit = 5 }) => {
  const navigate = useNavigate();
  const displayEntries = entries.slice(0, limit);
  
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-amber-500" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-gray-400" />;
    if (rank === 3) return <Medal className="h-4 w-4 text-amber-800" />;
    return <span className="text-xs font-medium px-1.5">{rank}</span>;
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Leaderboard</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/leaderboard")}>
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {displayEntries.map((entry) => (
            <li key={entry.studentId} className="animate-fade-in" style={{ animationDelay: `${entry.rank * 50}ms` }}>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
                  {getMedalIcon(entry.rank)}
                </div>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <img
                    src={entry.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.studentId}`}
                    alt={entry.studentName}
                    className="w-8 h-8 rounded-full bg-muted"
                  />
                  <span className="font-medium truncate">{entry.studentName}</span>
                </div>
                <div className="font-semibold text-primary">
                  {entry.totalPoints} pts
                </div>
              </div>
            </li>
          ))}
          
          {displayEntries.length === 0 && (
            <li className="text-center py-6 text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <Trophy className="h-10 w-10 mb-2 text-muted-foreground/50" />
                <p>No leaderboard data available</p>
              </div>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
