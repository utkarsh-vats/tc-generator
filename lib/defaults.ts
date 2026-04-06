import { TCData, SchoolInfo, CertificateMeta, StudentInfo } from "./types";

export function getDefaults(): TCData {
    const dateToday = new Date();
    const date = `${dateToday.getFullYear()}-${String(dateToday.getMonth() + 1).padStart(2, "0")}-${String(dateToday.getDate()).padStart(2, "0")}`;

    // console.log(date);

    const defaultSchoolInfo: SchoolInfo = {
        schoolName: "",
        schoolAddress: "",
        boardAffiliation: "CBSE",
        boardNameCustom: "",
        affiliationNumber: "",
        schoolCode: "",
        schoolPhone: "",
        schoolEmail: "",
        schoolLogoUrl: "",
        schoolSubtitle: "",
    };
    const defaultCertificateMeta: CertificateMeta = {
        tcSerialNumber: "",
        bookNumber: "",
        admissionNumber: "",
        dateOfIssue: date,
    };
    const defaultStudentInfo: StudentInfo = {
        studentName: "",
        fatherName: "",
        motherName: "",
        guardianName: "",
        nationality: "",
        religion: "",
        casteCategory: "General",
        otherCasteCategory: "",
        dateOfBirth: "",
        dateOfBirthInWords: "",
        dateOfFirstAdmission: "",
        classOfFirstAdmission: "",
        dateOfLeaving: "",
        classAtLeaving: "",
        allDuesPaid: true,
        qualifiedForPromotion: true,
        totalWorkingDays: null,
        totalDaysPresent: null,
        nccScoutGuide: "",
        gamesAndExtracurricular: "",
        generalConduct: "",
        dateOfApplication: "",
        dateOfIssueOnCert: "",
        reasonForLeaving: "",
        otherRemarks: "",

        printedParent: "Father",

        // fields for SLC template
        session: "",
        residentialAddress: "",
        gender: "Male",
        result: "Passed",
    };
    return {
        school: defaultSchoolInfo,
        meta: defaultCertificateMeta,
        student: defaultStudentInfo,
    };
}