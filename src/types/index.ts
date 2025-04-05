
export enum UserRole {
  TEACHER = "teacher",
  STUDENT = "student"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Student extends User {
  role: UserRole.STUDENT;
  totalPoints: number;
  rank?: number;
  classId: string;
}

export interface Teacher extends User {
  role: UserRole.TEACHER;
  classIds: string[];
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  students: string[]; // student ids
  createdAt: Date;
}

export interface ActivityType {
  id: string;
  name: string;
  pointsValue: number;
  description?: string;
}

export enum ActivityCategory {
  ATTENDANCE = "attendance",
  ASSIGNMENT = "assignment",
  TEST = "test",
  PARTICIPATION = "participation",
  OTHER = "other"
}

export interface Activity {
  id: string;
  studentId: string;
  teacherId: string;
  classId: string;
  activityType: ActivityType;
  category: ActivityCategory;
  points: number;
  date: Date;
  description?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  limited: boolean;
  quantity?: number;
  imageUrl?: string;
}

export interface RewardRedemption {
  id: string;
  studentId: string;
  rewardId: string;
  redeemedAt: Date;
  status: "pending" | "approved" | "rejected";
  teacherId?: string; // Teacher who approved/rejected
  resolvedAt?: Date;
}

export interface LeaderboardEntry {
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  totalPoints: number;
  rank: number;
}

export interface DashboardStats {
  totalStudents?: number;
  totalClasses?: number;
  totalPointsAwarded?: number;
  totalRewardsRedeemed?: number;
  pointsEarned?: number;
  currentRank?: number;
  rewardsRedeemed?: number;
}

// Mock data functions
export const createMockUser = (role: UserRole): User => {
  return {
    id: `user-${Math.random().toString(36).substring(2, 9)}`,
    name: role === UserRole.TEACHER ? "Professor Smith" : "Student Doe",
    email: `${role}@example.com`,
    role: role,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}-${Math.floor(Math.random() * 1000)}`
  };
};

export const createMockStudent = (): Student => {
  const user = createMockUser(UserRole.STUDENT);
  return {
    ...user,
    role: UserRole.STUDENT,
    totalPoints: Math.floor(Math.random() * 500),
    rank: Math.floor(Math.random() * 30) + 1,
    classId: `class-${Math.random().toString(36).substring(2, 9)}`
  };
};

export const createMockTeacher = (): Teacher => {
  const user = createMockUser(UserRole.TEACHER);
  return {
    ...user,
    role: UserRole.TEACHER,
    classIds: Array(3).fill(null).map(() => `class-${Math.random().toString(36).substring(2, 9)}`)
  };
};

export const createMockActivity = (studentId: string, teacherId: string, classId: string): Activity => {
  const categories = Object.values(ActivityCategory);
  const activityTypes = [
    { id: "1", name: "Class Attendance", pointsValue: 5 },
    { id: "2", name: "Homework Completion", pointsValue: 10 },
    { id: "3", name: "Test Score A", pointsValue: 20 },
    { id: "4", name: "Class Participation", pointsValue: 5 }
  ];
  
  const selectedType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  
  return {
    id: `activity-${Math.random().toString(36).substring(2, 9)}`,
    studentId,
    teacherId,
    classId,
    activityType: selectedType,
    category: categories[Math.floor(Math.random() * categories.length)] as ActivityCategory,
    points: selectedType.pointsValue,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    description: `${selectedType.name} activity`
  };
};

export const createMockReward = (): Reward => {
  const rewards = [
    { name: "Extra Study Materials", description: "Access to premium study resources", pointsCost: 50 },
    { name: "Mentorship Session", description: "30-minute one-on-one session with a professor", pointsCost: 100 },
    { name: "Project Guidance", description: "Personalized feedback on a project", pointsCost: 75 },
    { name: "Homework Extension", description: "48-hour extension on any assignment", pointsCost: 40 }
  ];
  
  const selected = rewards[Math.floor(Math.random() * rewards.length)];
  
  return {
    id: `reward-${Math.random().toString(36).substring(2, 9)}`,
    ...selected,
    limited: Math.random() > 0.5,
    quantity: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined,
    imageUrl: `https://source.unsplash.com/random/300x200?sig=${Math.random()}`
  };
};

export const createMockLeaderboardEntries = (count: number): LeaderboardEntry[] => {
  return Array(count).fill(null).map((_, index) => ({
    studentId: `student-${Math.random().toString(36).substring(2, 9)}`,
    studentName: `Student ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=student-${Math.floor(Math.random() * 1000)}`,
    totalPoints: Math.floor(Math.random() * 1000),
    rank: index + 1
  })).sort((a, b) => b.totalPoints - a.totalPoints)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
};
