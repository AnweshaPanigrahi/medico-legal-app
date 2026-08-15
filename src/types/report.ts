export interface IdentificationMarks {
  mark1: string;
  mark2: string;
}

export interface AccusedHistory {
  policeHistory: string;
  statement: string;
  knowsVictim: string;
  struggleInjury: string;
  clothingEvidence: string;
  clothingRecentTear: string;
  stdHistory: string;
  tookBath: string;
  changedClothes: string;
}

export interface MarksOfViolence {
  biteMarks: string;
  abrasions: string;
  contusions: string;
  other: string;
}

export interface GeneralConfiguration {
  height: string;
  weight: string;
  bodyBuilt: string;
  bloodPressure: string;
  pulse: string;
  mentalStatus: string;
}

export interface DentitionState {
  // Array of 16 booleans representing [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8]
  // true = ERUPTED/PRESENT, false = NOT ERUPTED (will be circled)
  upperJaw: boolean[];
  lowerJaw: boolean[];
  totalPermanent: string;
  totalTemporary: string;
  artificial: string;
  spacingBehind2ndMolar: string;
}

export interface GenitalTableState {
  mattedHairPubic: string;
  mattedHairThigh: string;
  seminalStainPubic: string;
  seminalStainThigh: string;
  bloodPubic: string;
  bloodThigh: string;
  looseHairPubic: string;
  looseHairThigh: string;
  injuriesPubic: string;
  injuriesThigh: string;
}

export interface PenisState {
  development: string;
  defect: string;
  deformity: string;
  flaccidLengthGirth: string;
  erectLengthGirth: string;
  glansFrenulum: string;
  foreskinRoll: string;
  frenulumInjury: string;
  otherInjury: string;
  stdEvidence: string;
  smegma: string;
  prepucalHair: string;
  nearbyStains: string;
  otherRemarks: string;
}

export interface ScrotumState {
  development: string;
  enlargement: string;
  testesDescended: string;
  disease: string;
  injury: string;
  cremastericReflex: string;
  otherRemarks: string;
}

export interface DiseaseInjuryState {
  vasDeferens: string;
  epididymis: string;
  prostate: string;
  onGenital: string;
  anywhereOnBody: string;
}

export interface BodyMapMark {
  id: string;
  view: 'anterior_posterior' | 'lateral_inner' | 'genital';
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  type: string; // e.g. "AB", "EC", "LA"
  description: string;
}

export interface ForensicSampleItem {
  step: string;
  material: string;
  collected: boolean;
  reason: string;
}

export interface PotencyTestState {
  isApplicable: boolean;
  bloodTests: string[];
  specialInvestigations: string[];
}

export interface OpinionState {
  sexualCapability: string;
  bodilyInjuries: string;
  wearingApparel: string;
  recentSexualAct: string;
  urethralSwab: string;
  forensicSamples: string;
}

export interface DoctorDetails {
  station: string;
  date: string;
  time: string;
  name: string;
  regNo: string;
  designation: string;
  seal: string;
}

export interface CaseParticulars {
  requisitionFrom: string;
  letterNo: string;
  letterDate: string;
  examinationOf: string;
  broughtBy: string;
}

export interface AccusedParticulars {
  name: string;
  fatherName: string;
  address: string;
  age: string;
  occupation: string;
  religion: string;
  consentGiven: boolean;
  consentText: string;
  examinedPresenceOf: string;
  placeOfExamination: string;
  dateTimeOfExamination: string;
}

export interface ReportData {
  caseParticulars: CaseParticulars;
  accusedParticulars: AccusedParticulars;
  identificationMarks: IdentificationMarks;
  history: AccusedHistory;
  clothingInfo: string;
  marksOfViolence: MarksOfViolence;
  generalConfiguration: GeneralConfiguration;
  axillaryHair: string;
  beardMustache: string;
  pubicHair: string;
  dentition: DentitionState;
  genitalTable: GenitalTableState;
  penis: PenisState;
  scrotum: ScrotumState;
  diseaseInjury: DiseaseInjuryState;
  bodyMapMarks: BodyMapMark[];
  forensicSamples: ForensicSampleItem[];
  potencyTests: PotencyTestState;
  opinion: OpinionState;
  doctorDetails: DoctorDetails;
}
