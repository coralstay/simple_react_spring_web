export interface CaseStudyMeta {
  title: string;
  subtitle: string;
  location: string;
  propertyType: string;
  tags: string[];
}

export interface SummaryStat {
  label: string;
  value: string;
}

export interface CaseStudyHero {
  headline: string;
  subheadline: string;
  heroImageUrl: string;
  summaryStats: SummaryStat[];
}

export interface OnSiteLesson {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ConstructionChapter {
  title: string;
  narrative: string;
  onSiteLessons: OnSiteLesson[];
}

export interface MaterialHandled {
  name: string;
  imageUrl: string;
  whatILearned: string;
}

export interface CraftDetail {
  title: string;
  description: string;
  images: string[];
}

export interface LessonCarriedForward {
  title: string;
  description: string;
}

export interface InteriorChapter {
  title: string;
  narrative: string;
  materialsHandled: MaterialHandled[];
  craftDetails: CraftDetail[];
  lessonsCarriedForward: LessonCarriedForward[];
}

export interface RenovationHighlight {
  title: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  cost: string;
  period: string;
}

export interface BridgeSection {
  title: string;
  narrative: string;
  renovation: RenovationHighlight;
}

export interface SpaceDecision {
  title: string;
  description: string;
  imageUrl: string;
}

export interface OperationMetric {
  label: string;
  value: string;
  unit: string;
}

export interface ReviewHighlight {
  quote: string;
  rating: number;
  date: string;
}

export interface OperationsChapter {
  title: string;
  narrative: string;
  spaceDecisions: SpaceDecision[];
  metrics: OperationMetric[];
  reviewHighlights: ReviewHighlight[];
}

export interface CaseStudyChapters {
  construction: ConstructionChapter;
  interior: InteriorChapter;
  bridge: BridgeSection;
  operations: OperationsChapter;
}

export interface CaseStudyClosing {
  reflection: string;
  contactCta: string;
}

export interface CaseStudy {
  meta: CaseStudyMeta;
  hero: CaseStudyHero;
  chapters: CaseStudyChapters;
  closing: CaseStudyClosing;
}
