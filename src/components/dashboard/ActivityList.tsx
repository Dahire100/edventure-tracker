
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ActivityCategory } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Award, Book, Calendar, CheckCircle } from "lucide-react";

interface ActivityListProps {
  activities: Activity[];
  limit?: number;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, limit = 5 }) => {
  const displayActivities = activities.slice(0, limit);

  const getCategoryIcon = (category: ActivityCategory) => {
    switch (category) {
      case ActivityCategory.ATTENDANCE:
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case ActivityCategory.ASSIGNMENT:
        return <Book className="h-4 w-4 text-indigo-500" />;
      case ActivityCategory.TEST:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Award className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {displayActivities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-3">
              <div className="mt-0.5 p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                {getCategoryIcon(activity.category)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.activityType.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{formatDistanceToNow(activity.date, { addSuffix: true })}</span>
                  <span className="text-xs font-medium text-primary inline-flex items-center">
                    <span className="mr-1">+</span>
                    <span>{activity.points}</span>
                    <span className="ml-1">pts</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
          
          {displayActivities.length === 0 && (
            <li className="text-center py-6 text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <Calendar className="h-10 w-10 mb-2 text-muted-foreground/50" />
                <p>No recent activities</p>
              </div>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
