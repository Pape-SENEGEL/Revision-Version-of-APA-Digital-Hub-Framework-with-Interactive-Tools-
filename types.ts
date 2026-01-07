import React from 'react';

// Basic types
export type Translations = { [key: string]: string | Translations };

export enum LanguageCode {
  EN = 'en',
  FR = 'fr',
}

// Navigation
export interface NavItem {
  labelKey: string;
  path?: string;
  icon?: React.ReactNode;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
  children?: NavItem[];
}

// Gallery Item
export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
}


// Tours
export enum TourDifficulty {
    PIONEER = 'Pioneer',
    ADVENTURER = 'Adventurer',
    EXPLORER = 'Explorer'
}

export interface ItineraryItem {
    day: Translations;
    title: Translations;
    description: Translations;
}

export interface Facilitator {
    name: Translations;
    bio: Translations;
    image: string;
}

export interface Testimonial {
    quote: Translations;
    author: Translations;
    rating?: number;
}

export interface FAQItem {
    question: Translations;
    answer: Translations;
}

export interface Tour {
  id: string;
  title: Translations;
  description: Translations;
  destination: Translations;
  industry: Translations;
  image: string;
  price: Translations;
  targetAudience: Translations;
  objectives: (string | Translations)[];
  duration: Translations;
  difficulty: TourDifficulty;
  detailedDescription?: Translations;
  itinerary?: ItineraryItem[];
  gallery?: GalleryItem[];
  facilitators?: Facilitator[];
  testimonials?: Testimonial[];
  faq?: FAQItem[];
}


// Resources
export interface Resource {
  id: string;
  title: Translations;
  type: Translations;
  summary: Translations;
  imageUrl: string;
  link?: string;
  isInternal: boolean;
  content?: Translations;
  industry: Translations;
  date: string; // YYYY-MM-DD
}

// Solutions
export interface Solution {
    id: string;
    path?: string;
    title: Translations;
    summary: Translations;
    icon: string;
    details: {
        painPoint: Translations;
        competitiveAdvantage: Translations;
        revenueGeneration: Translations;
        aiLeverage: Translations;
    };
}

// User & Auth
export enum UserType {
  GUEST = 'guest',
  PROSPECTIVE = 'prospective',
  ALUMNI = 'alumni',
  PARTNER = 'partner',
  PARTNER_BUSINESS = 'partner_business',
  PARTNER_INVESTOR_FUNDER = 'partner_investor_funder',
  PARTNER_GOVERNMENT_NGO = 'partner_government_ngo',
  PARTNER_COMMUNITY = 'partner_community',
  APAER = 'apaer',
  APAER_ADMINISTRATOR = 'apaer_administrator',
  APAER_BUSINESS_DEVELOPMENT_MANAGER = 'apaer_business_development_manager',
  APAER_DATA_ANALYST = 'apaer_data_analyst',
  APAER_PROJECT_MANAGER = 'apaer_project_manager',
  APAER_EXPERT_CONSULTANT = 'apaer_expert_consultant',
  APAER_TRAINER = 'apaer_trainer',
  APAER_LOCAL_PARTNER_LEAD = 'apaer_local_partner_lead',
  APAER_AUDITOR = 'apaer_auditor',
}

export enum ApplicationStatus {
    SUBMITTED = 'Submitted',
    UNDER_REVIEW = 'Under Review',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
}

export interface UserApplication {
    applicationId: string;
    tourId: string;
    dateSubmitted: string;
    status: ApplicationStatus;
}

export interface UserHistoryItem {
    id: string;
    activity: string;
    date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  phone?: string;
  newsletter?: boolean;
  eventUpdates?: boolean;
  history?: UserHistoryItem[];
  applications?: UserApplication[];
  bookmarkedResourceIds?: string[];
}

export interface UserCredentials {
  email: string;
  password?: string;
}

export interface SignUpData extends UserCredentials {
    name: string;
    confirmPassword?: string;
    userType: UserType;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: UserCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  toggleBookmark: (resourceId: string) => void;
}

// AI Assistant
export interface ChatMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    file?: {
        name: string;
        type: string;
    };
}

export interface GroundingChunkWeb {
    uri: string | null;
    title: string | null;
}

export interface GroundingChunk {
    web: GroundingChunkWeb;
}

// Flight Booking
export interface FlightSearchQuery {
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  airline?: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  stops: number;
}


// Forms
export interface ApplicationFormData {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    nationality: string;
    contactNumber: string;
    emailAddress: string;
    currentAddress: string;
    passportNumber: string;
    countryOfResidence: string;
    educationalInstitution: string;
    degreeProgram: string;
    yearOfGraduation: string;
    academicAchievements: string;
    currentEmploymentStatus: string;
    organizationCompany: string;
    jobTitleRole: string;
    currentResponsibilities: string;
    whyParticipate: string;
    howContributeGoals: string;
    excitedAspects: string;
    relevantSkills: string;
    previousPrograms: string; // "Yes" or "No"
    previousProgramsDetails: string;
    availableFullDuration: string;
    canCoverCost: string;
    dietaryMedical: string;
    reference1Name: string;
    reference1Email: string;
    reference1Phone: string;
    reference2Name: string;
    reference2Email: string;
    reference2Phone: string;
    declarationConfirm: boolean;
}

export interface FeedbackFormData {
    participantFullName?: string;
    participantEmail?: string;
    participantContact?: string;
    tourStartDate?: string;
    tourEndDate?: string;
    clarityPreTourInfo: number;
    responsivenessOrganizers: number;
    qualityAccommodations: number;
    cleanlinessAccommodations: number;
    efficiencyTransportation: number;
    comfortSafetyTravel: number;
    diversityItinerary: number;
    engagementLocalCommunities: number;
    alignmentSocialInnovationThemes: number;
    knowledgeGuides: number;
    supportivenessFacilitators: number;
    qualityEducationalSessions: number;
    opportunitiesPersonalGrowth: number;
    depthCulturalImmersion: number;
    opportunitiesInteractLocal: number;
    effectivenessSocialInnovation: number;
    tangibleOutcomesLocal: number;
    overallSatisfaction: number;
    likelihoodRecommend: number;
    mostValuableAspects: string;
    aspectsToImprove: string;
    expectationsMet: string;
    applyKnowledgeSkills: string;
    additionalFeedback: string;
}


// Framework & PDF
export interface ToolDefinition {
  termKey: string;
  definitionKey: string;
}

export interface ToolCategory {
  titleKey: string;
  icon: string;
  tools: ToolDefinition[];
}

export interface HierarchicalSection {
    id: string;
    sectionTitleKey: string;
    children?: HierarchicalSection[];
}

export interface PdfGenerationOptions {
    selectedSections: { [key: string]: boolean };
    orientation: 'p' | 'l';
    quality: number;
}

export interface ImplementationAssessmentData {
    s1q1?: string;
    s1q2?: string;
    s1q3?: string;
    s2q1?: string;
    s2q2?: string;
    s2q3?: string;
    s3q1?: string;
    s3q2?: string;
    s3q3?: string;
    s4q1?: string;
    s4q2?: string;
    s4q3?: string;
    s5q1?: string;
    s5q2?: string;
    s5q3?: string;
}

// Interactive Tools
export interface IncubatorFormData {
  purpose: string;
  phase1Objective: string;
  phase1CommunityImmersion: string;
  phase1ProblemIdentification: string;
  phase1AssetMapping: string;
  phase1KeyDeliverable: string;
  phase2Objective: string;
  phase2SharedValueCanvas: string;
  phase2Prototyping: string;
  phase2EthicalTech: string;
  phase2KeyDeliverable: string;
  phase3Objective: string;
  phase3EvaluationPlan: string;
  phase3GrievanceMechanism: string;
  phase3GoToMarket: string;
  phase3KeyDeliverable: string;
}

export interface PolicyFormData {
  purpose: string;
  phase1Objective: string;
  phase1PolicyReview: string;
  phase1StakeholderMapping: string;
  phase1InternalReadiness: string;
  phase1Outcome: string;
  phase2Objective: string;
  phase2CoDesignWorkshop: string;
  phase2SharedValueFramework: string;
  phase2LocalOwnership: string;
  phase2Outcome: string;
  phase3Objective: string;
  phase3GrievanceMechanism: string;
  phase3Evaluation: string;
  phase3Certification: string;
  phase3Outcome: string;
}

export type PriorityLevel = 'Low' | 'Medium' | 'High';

export interface DesignSprintFormData {
  purpose: string;
  day1Objective: string;
  day1ExpertInterviews: string;
  day1ExpertInterviewsPriority: PriorityLevel;
  day1TrustAudit: string;
  day1TrustAuditPriority: PriorityLevel;
  day1ProblemReframing: string;
  day1ProblemReframingPriority: PriorityLevel;
  day1Outcome: string;
  day2Objective: string;
  day2HMWQuestions: string;
  day2HMWQuestionsPriority: PriorityLevel;
  day2LightningDemos: string;
  day2LightningDemosPriority: PriorityLevel;
  day2Crazy8s: string;
  day2Crazy8sPriority: PriorityLevel;
  day2Outcome: string;
  day3Objective: string;
  day3DotVoting: string;
  day3DotVotingPriority: PriorityLevel;
  day3GRM: string;
  day3GRMPriority: PriorityLevel;
  day3Storyboard: string;
  day3StoryboardPriority: PriorityLevel;
  day3Outcome: string;
  day4Objective: string;
  day4RapidPrototyping: string;
  day4RapidPrototypingPriority: PriorityLevel;
  day4Localization: string;
  day4LocalizationPriority: PriorityLevel;
  day4FeedbackLoops: string;
  day4FeedbackLoopsPriority: PriorityLevel;
  day4Outcome: string;
  day5Objective: string;
  day5UserInterviews: string;
  day5UserInterviewsPriority: PriorityLevel;
  day5MAEFramework: string;
  day5MAEFrameworkPriority: PriorityLevel;
  day5Synthesis: string;
  day5SynthesisPriority: PriorityLevel;
  day5Outcome: string;
}

export interface MaeToolkitFormData {
  purpose: string;
  section1Decolonization: string;
  section1Indigenization: string;
  section1Participation: string;
  section1Ubuntu: string;
  section2Purpose: string;
  section2TorObjectiveAnswer: string;
  section2TorKpiAnswer: string;
  section2TorDataCollectionAnswer: string;
  section2TorTimelineAnswer: string;
  section3Purpose: string;
  section3IndicatorTrainedAnswer: string;
  section3IndicatorClinicsAnswer: string;
  section3IndicatorLoansAnswer: string;
  section3IndicatorProduceAnswer: string;
  section4Purpose: string;
  section4RoleSeparation: string;
  section4RoleObjectivity: string;
  section4RoleMeasurement: string;
  section4RoleExtraction: string;
}

export interface LeadershipProgramFormData {
  purpose: string;
  module1Objective: string;
  module1Maxim: string;
  module1SharedPurpose: string;
  module1RelationalLeadership: string;
  module1Activity: string;
  module2Objective: string;
  module2Dialogue: string;
  module2Harmony: string;
  module2EmbodiedEmpathy: string;
  module2Activity: string;
  module3Objective: string;
  module3InternalizedBias: string;
  module3Narrative: string;
  module3SelfAwareness: string;
  module3Activity: string;
  module4Objective: string;
  module4Implementation: string;
  module4Mentorship: string;
  module4CommunityOfPractice: string;
  module4Activity: string;
}

export interface AiGovernanceFormData {
  purpose: string;
  pillar1Objective: string;
  pillar1CommunityImpact: string;
  pillar1CollectiveBenefit: string;
  pillar1LocalContext: string;
  pillar2Objective: string;
  pillar2ConsentOwnership: string;
  pillar2DataReciprocity: string;
  pillar2DataGovernance: string;
  pillar3Objective: string;
  pillar3BiasAudit: string;
  pillar3Explainability: string;
  pillar3HumanInLoop: string;
  toolsetDataSovereignty: string;
  toolsetAiBiasAudit: string;
  toolsetGrmForAi: string;
  toolsetCommunityLedImpact: string;
}

export interface CertificationPlatformFormData {
  purpose: string;
  module1Purpose: string;
  module1Quizzes: string;
  module1RealTimeFeedback: string;
  module1ResourceLibrary: string;
  module1Outcome: string;
  module2Purpose: string;
  module2DocCoCreation: string;
  module2TransparentDashboard: string;
  module2GrmIntegration: string;
  module2Outcome: string;
  module3Purpose: string;
  module3IndependentAudit: string;
  module3CommunityLedVerification: string;
  module3PublicCredibilityScore: string;
  module3Outcome: string;
}

export interface GrmCoDesignFormData {
  purpose: string;
  step1Goal: string;
  step1IdentifyActors: string;
  step1FormTeam: string;
  step2Goal: string;
  step2MapChannels: string;
  step2IdentifyBarriers: string;
  step2DefineGrievance: string;
  step3Goal: string;
  step3PrincipleFair: string;
  step3PrincipleSimple: string;
  step3PrincipleInclusive: string;
  step3PrinciplePredictable: string;
  step3ProcedureReceiveAction: string;
  step3ProcedureReceiveResponsibility: string;
  step3ProcedureReceiveTimeline: string;
  step3ProcedureAcknowledgeAction: string;
  step3ProcedureAcknowledgeResponsibility: string;
  step3ProcedureAcknowledgeTimeline: string;
  step3ProcedureEvaluateAction: string;
  step3ProcedureEvaluateResponsibility: string;
  step3ProcedureEvaluateTimeline: string;
  step3ProcedureResolveAction: string;
  step3ProcedureResolveResponsibility: string;
  step3ProcedureResolveTimeline: string;
  step3ProcedureClosingAction: string;
  step3ProcedureClosingResponsibility: string;
  step3ProcedureClosingTimeline: string;
  step4Goal: string;
  step4CommunicationPlan: string;
  step4DisseminateInfo: string;
  step5Goal: string;
  step5RegularReviews: string;
  step5IntegrateFeedback: string;
}

export interface ImpactFunderFormData {
  purpose: string;
  pillar1Objective: string;
  pillar1LongTermFunding: string;
  pillar1GeneralSupport: string;
  pillar1SharedValue: string;
  pillar2Objective: string;
  pillar2SuccessMetrics: string;
  pillar2TrustBasedReporting: string;
  pillar2PeerLearning: string;
  pillar3Objective: string;
  pillar3PowerSharing: string;
  pillar3Grm: string;
  pillar3CapacityBuilding: string;
}

export interface TrustAuditFormData {
  purpose: string;
  section1Project: string;
  section1Community: string;
  section1Team: string;
  section1Timeline: string;
  section2StakeholderAnalysis: string;
  section2Reflection: string;
  section3PastExperiences: string;
  section3Reasons: string;
  section3Beliefs: string;
  section3Communication: string;
  section3PowerImbalance: string;
  section3Reflection: string;
  section4ReadinessPartner: string;
  section4ReadinessPowerSharing: string;
  section4ReadinessGrievance: string;
  section4ReadinessSuccess: string;
  section4ReadinessCompetence: string;
  finalRecommendation: string;
}

export interface PartnershipVettingFormData {
  purpose: string;
  orgName: string;
  orgType: string;
  yearFounded: string;
  countryOfOperation: string;
  missionStatement: string;
  keyContactPerson: string;
  legalStatus: string;
  financialStatements: string;
  fundingSources: string;
  complianceIssues: string;
  apaPrincipleAlignment: string;
  communityEngagementHistory: string;
  deiPolicy: string;
  grmExistence: string;
  reference1: string;
  reference2: string;
  summaryOfStrengths: string;
  areasOfConcern: string;
  recommendation: string;
}
export interface PartnershipReadinessFormData {
  purpose: string;
  understandingOfEquity: string;
  approachToFailure: string;
  longTermCommitment: string;
  dedicatedPersonnel: string;
  culturalCompetencyTraining: string;
  decisionMakingProcess: string;
  flexibleFunding: string;
  reportingExpectations: string;
  grmIntegrationPlan: string;
  sharedValueGoals: string;
  riskAppetite: string;
  successMetrics: string;
}