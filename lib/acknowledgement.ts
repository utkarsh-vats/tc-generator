import { TCData } from "./types";
import { formatDateIndian } from "./date-utils";

export function generateAcknowledgement(data: TCData): string {
    const { student } = data;

    const pronoun = student.gender === "Female" ? "She" : "He";
    const honorific = student.gender === "Female" ? "Smt." : "Shri.";
    const childOf = student.gender === "Female" ? "D/o" : "S/o";

    const admDate = formatDateIndian(student.dateOfFirstAdmission);
    const leaveDate = formatDateIndian(student.dateOfLeaving);
    const leaveYear = student.dateOfLeaving
        ? new Date(student.dateOfLeaving).getFullYear()
        : "____";

    return [
        `Certified that ${student.studentName || "____"} ${childOf} ${honorific}`,
        `${student.fatherName || "____"} had been studying in`,
        `Class ${student.classAtLeaving || "____"} of this school since ${admDate || "____"} to`,
        `${leaveDate || "____"}.`,
        `${pronoun} had paid all dues/sums to this school.`,
        `${pronoun} ${student.result || "Passed"} in ${student.classAtLeaving || "____"}`,
        `class in the year ${leaveYear}.`,
    ].join(" ");
}