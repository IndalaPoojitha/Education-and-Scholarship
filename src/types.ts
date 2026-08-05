export type EducationLevel = 
  | 'All Levels'
  | 'High School Senior'
  | 'Undergraduate'
  | 'Graduate / Master\'s'
  | 'PhD / Postdoctoral'
  | 'Vocational & Skill Training'
  | 'Adult & Re-entry Student';

export type FieldOfStudy = 
  | 'All Fields'
  | 'STEM (Science, Tech, Eng, Math)'
  | 'Medicine & Public Health'
  | 'Business & Entrepreneurship'
  | 'Arts & Humanities'
  | 'Law, Policy & Social Impact'
  | 'Environmental & Agricultural Sciences'
  | 'General Academic';

export type RegionScope = 
  | 'Global / All Countries'
  | 'North America'
  | 'Europe'
  | 'Asia-Pacific'
  | 'Africa'
  | 'Latin America & Caribbean'
  | 'Middle East';

export type FundingType = 
  | 'All Funding Types'
  | 'Fully Funded (Tuition + Stipend)'
  | 'Full Tuition Waiver'
  | 'Partial Tuition Grant'
  | 'Research & Travel Fellowship'
  | 'Emergency & Hardship Support';

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  logoUrl?: string;
  amount: string;
  amountValue: number; // For filtering & sorting (e.g., 50000)
  level: EducationLevel[];
  field: FieldOfStudy[];
  region: RegionScope[];
  deadline: string; // ISO or human readable date e.g. "2026-10-15"
  deadlineDate: string; 
  description: string;
  eligibility: string[];
  requirements: string[];
  tags: string[];
  isFullyFunded: boolean;
  websiteUrl: string;
  targetAudience: string; // e.g., "Women in Tech", "Single Mothers", "Underrepresented STEM Researchers"
  applicationFee: string; // "Free" or amount
  acceptanceRateEstimate?: string;
  keyDates?: { event: string; date: string }[];
}

export interface FilterOptions {
  search: string;
  level: EducationLevel;
  field: FieldOfStudy;
  region: RegionScope;
  fundingType: FundingType;
  minAmount: number;
  sortBy: 'deadline' | 'amount_high' | 'match' | 'title';
  onlyFullyFunded: boolean;
  onlyClosingSoon: boolean;
}

export interface UserProfile {
  educationLevel: EducationLevel;
  fieldOfStudy: FieldOfStudy;
  countryOfOrigin: string;
  targetCountry: string;
  gpa: string;
  financialNeed: 'Low' | 'Moderate' | 'High' | 'Severe';
  specialStatus: string[]; // e.g. "First-generation student", "Single mother", "Returning to school", "Minority in STEM"
  careerGoals: string;
}

export interface MatchResult {
  scholarshipId: string;
  matchPercentage: number;
  matchReason: string;
  strengthPoints: string[];
  recommendationTips: string[];
}

export interface EssayReviewRequest {
  scholarshipTitle: string;
  essayPrompt: string;
  essayDraft: string;
  targetWordCount?: string;
}

export interface EssayReviewResponse {
  overallScore: number; // 1-100
  toneAnalysis: string;
  strengths: string[];
  areasForImprovement: string[];
  leadershipAndImpactSuggestions: string[];
  polishedSnippetSample: string;
}

export type ApplicationStatus = 
  | 'saved'
  | 'in_progress'
  | 'submitted'
  | 'interview'
  | 'awarded'
  | 'not_selected';

export interface ApplicationTrackerItem {
  scholarshipId: string;
  status: ApplicationStatus;
  notes: string;
  addedAt: string;
  customDeadline?: string;
  checklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
}

export interface MentorshipProgram {
  id: string;
  title: string;
  organization: string;
  description: string;
  targetAudience: string;
  duration: string;
  locationType: 'Online / Global' | 'Hybrid' | 'In-Person';
  websiteUrl: string;
  tags: string[];
}

export interface EducationalGuide {
  id: string;
  title: string;
  category: 'Essay Writing' | 'Recommendation Letters' | 'Financial Planning' | 'Interview Prep' | 'Career Growth';
  readTime: string;
  excerpt: string;
  keyTakeaways: string[];
  content: string[];
}
