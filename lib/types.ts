export const BOARDS = ["CBSE", "ICSE", "UP Board", "Other"] as const;
export type BoardType = typeof BOARDS[number];

export const GENDERS = ["Male", "Female", "Other"] as const;
export type GenderType = typeof GENDERS[number];

export const RESULTS = ["Passed", "Failed"] as const;
export type ResultType = typeof RESULTS[number];

export const CASTE_CATEGORIES = ["General", "OBC", "SC", "ST", "Other"] as const;
export type CasteCategoryType = typeof CASTE_CATEGORIES[number];

export interface SchoolInfo {
	schoolName: string;
	schoolAddress: string;
	boardAffiliation: BoardType;
	boardNameCustom?: string;
	affiliationNumber?: string;
	schoolCode?: string;
	schoolPhone?: string;
	schoolEmail?: string;
	schoolLogoUrl?: string;
	schoolSubtitle?: string;
};

export interface CertificateMeta {
	tcSerialNumber: string;
	bookNumber: string;
	admissionNumber: string;
	dateOfIssue: string;
};

export interface StudentInfo {
	studentName: string;
	fatherName: string;
	motherName: string;
	guardianName?: string;
	nationality: string;
	religion: string;
	casteCategory: CasteCategoryType;
	otherCasteCategory?: string;
	dateOfBirth: string;
	dateOfBirthInWords: string;
	dateOfFirstAdmission: string;
	classOfFirstAdmission: string;
	dateOfLeaving: string;
	classAtLeaving: string;
	allDuesPaid: boolean; // "Yes" | "No"
	qualifiedForPromotion: boolean; // "Yes" | "No"
	totalWorkingDays: number | null;
	totalDaysPresent: number | null;
	nccScoutGuide?: string;
	gamesAndExtracurricular?: string;
	generalConduct: string;
	dateOfApplication: string;
	dateOfIssueOnCert: string;
	reasonForLeaving?: string;
	otherRemarks?: string;

	// fields for SLC template
	session?: string;
	residentialAddress?: string;
	gender?: GenderType;
	result?: ResultType;
};

export interface TCData {
	school: SchoolInfo;
	meta: CertificateMeta;
	student: StudentInfo;
};
