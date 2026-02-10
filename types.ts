
export enum SubscriptionType {
  FREE = 'Free',
  PRO = 'Pro'
}

export enum PlanDuration {
  MONTH = 'Month',
  QUARTER = 'Quarter',
  YEAR = 'Year'
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  slogan: string;
  role: string;
  industry: string;
  tags: string[];
  solving: string;
  resources: string;
  needs: string;
  location: string;
  completeness: number;
  isPro: boolean;
  isAdmin: boolean; // 新增管理员权限标识
  matchCount: number;
  viewCount: number;
  requestCount: number;
  expiryDate?: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface MatchResult {
  userId: string;
  score: number;
  reasons: string[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  duration: PlanDuration;
  dailyCost: string;
  recommended: boolean;
  description: string;
}
