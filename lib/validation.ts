import { TCData } from "./types";

export interface ValidationError {
    field: string;
    message: string;
}

export function validateTC(data: TCData): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.school.schoolName.trim()) {
        errors.push({
            field: "schoolName",
            message: "School name is required."
        });
    }
    if (!data.student.studentName.trim()) {
        errors.push({
            field: "studentName",
            message: "Student name is required."
        });
    }
    if (!data.student.fatherName.trim()) {
        errors.push({
            field: "fatherName",
            message: "Father's name is required."
        });
    }
    if (!data.student.motherName.trim()) {
        errors.push({
            field: "motherName",
            message: "Mother's name is required."
        });
    }
    if (!data.student.dateOfBirth.trim()) {
        errors.push({
            field: "dateOfBirth",
            message: "Date of birth is required."
        });
    }
    if (!data.student.classAtLeaving.trim()) {
        errors.push({
            field: "classAtLeaving",
            message: "Class at leaving is required."
        });
    }
    if (!data.student.dateOfLeaving.trim()) {
        errors.push({
            field: "dateOfLeaving",
            message: "Date of leaving is required."
        });
    }
    if (!data.meta.dateOfIssue.trim()) {
        errors.push({
            field: "dateOfIssue",
            message: "Date of issue is required."
        });
    }
    if (!data.student.dateOfFirstAdmission.trim()) {
        errors.push({
            field: "dateOfFirstAdmission",
            message: "Date of first admission is required."
        });
    }
    if (data.school.boardAffiliation === "Other" && !data.school.boardNameCustom?.trim()) {
        errors.push({
            field: "boardNameCustom",
            message: "Board name is required."
        });
    }
    if (data.student.casteCategory === "Other" && !data.student.otherCasteCategory?.trim()) {
        errors.push({
            field: "otherCasteCategory",
            message: "Caste category is required."
        });
    }
    if (data.student.totalWorkingDays !== null && data.student.totalWorkingDays < 0) {
        errors.push({
            field: "totalWorkingDays",
            message: "Working days cannot be negative."
        });
    }
    if (data.student.totalDaysPresent !== null && data.student.totalDaysPresent < 0) {
        errors.push({
            field: "totalDaysPresent",
            message: "Days present cannot be negative."
        });
    }

    // time travel check 1
    if (data.student.dateOfFirstAdmission && data.student.dateOfBirth) {
        if (data.student.dateOfFirstAdmission < data.student.dateOfBirth) {
            errors.push({
                field: "dateOfFirstAdmission",
                message: "Date of first admission cannot be before date of birth."
            });
        }
    }

    // time travel check 2
    if (data.student.dateOfLeaving && data.student.dateOfFirstAdmission) {
        if (data.student.dateOfLeaving < data.student.dateOfFirstAdmission) {
            errors.push({
                field: "dateOfLeaving",
                message: "Date of leaving cannot be before date of first admission."
            });
        }
    }

    // math check
    if (data.student.totalDaysPresent !== null && data.student.totalWorkingDays !== null) {
        if (data.student.totalDaysPresent > data.student.totalWorkingDays) {
            errors.push({
                field: "totalDaysPresent",
                message: "Total days present cannot be greater than total working days."
            });
        }
    }

    return errors;
}




