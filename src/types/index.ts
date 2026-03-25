export type Jurisdiction =
  | 'ontario'
  | 'quebec'
  | 'british-columbia'
  | 'alberta'
  | 'new-york'
  | 'california'
  | 'texas'
  | 'florida'
  | 'illinois'
  | 'ohio'
  | 'pennsylvania'
  | 'georgia';

export type DebtType =
  | 'credit-card'
  | 'medical'
  | 'auto-loan'
  | 'personal-loan'
  | 'student-loan'
  | 'mortgage-deficiency'
  | 'utility-bill';

export type ScenarioType =
  | 'calling-demanding-payment'
  | 'written-notice-received'
  | 'threatening-to-sue'
  | 'calling-workplace'
  | 'contacting-family'
  | 'reporting-on-credit'
  | 'dont-recognize-debt'
  | 'already-paid'
  | 'wrong-amount';

export type ActionType =
  | 'demand-verification'
  | 'dispute-entirely'
  | 'cease-all-contact'
  | 'statute-of-limitations-defense'
  | 'report-violation';

export type LetterType =
  | 'debt-validation'
  | 'cease-and-desist'
  | 'statute-of-limitations'
  | 'dispute-amount'
  | 'not-my-debt'
  | 'cease-workplace-contact'
  | 'cease-third-party-contact';

export interface JurisdictionInfo {
  id: Jurisdiction;
  name: string;
  country: 'CA' | 'US';
  flag: string;
  abbreviation: string;
}

export interface DebtTypeInfo {
  id: DebtType;
  label: string;
  icon: string;
}

export interface ScenarioInfo {
  id: ScenarioType;
  label: string;
  icon: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ActionInfo {
  id: ActionType;
  label: string;
  description: string;
  icon: string;
}

export interface StatuteEntry {
  years: number;
  notes: string;
  citation: string;
  lawName: string;
}

export interface JurisdictionStatute {
  jurisdiction: Jurisdiction;
  jurisdictionName: string;
  country: 'CA' | 'US';
  generalSOL: number;
  generalCitation: string;
  debtTypes: Record<DebtType, StatuteEntry>;
  regulatoryBody: string;
  regulatoryBodyUrl: string;
  complaints: string;
}

export interface LegalCitation {
  act: string;
  section: string;
  description: string;
}

export interface LetterTemplate {
  letterType: LetterType;
  jurisdiction: Jurisdiction | 'us-federal' | 'canada-general';
  applicableToAllJurisdictions?: boolean;
  legalCitations: LegalCitation[];
  subject: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  demands: string[];
  consequencesStatement: string;
  closingStatement: string;
}

export interface WizardFormData {
  jurisdiction: Jurisdiction | '';
  debtType: DebtType | '';
  approximateAmount: string;
  debtAgeYears: string;
  originalCreditorName: string;
  collectorName: string;
  scenarios: ScenarioType[];
  actions: ActionType[];
  yourName: string;
  yourAddress: string;
}

export interface GeneratedLetter {
  letterType: LetterType;
  jurisdiction: Jurisdiction | '';
  yourName: string;
  yourAddress: string;
  collectorName: string;
  originalCreditorName: string;
  debtType: DebtType | '';
  approximateAmount: string;
  dateGenerated: string;
  letterBody: string;
  template: LetterTemplate;
  formData: WizardFormData;
}

export interface InteractionLog {
  id: string;
  date: string;
  collectorName: string;
  contactMethod: 'phone' | 'mail' | 'email' | 'in-person' | 'text';
  whatTheySaid: string;
  yourResponse: string;
  violationsNoted: string[];
  createdAt: number;
}
