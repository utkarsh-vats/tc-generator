// /lib/storage.ts

import { TCData } from "./types";

const storage_key = "tcdata";               // temporary storage key
const school_key = "tc_generator_school";   // temporary school key

export type SavedSchools = TCData["school"][];

export function isTCData(obj: unknown): obj is TCData {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "school" in obj &&
        "meta" in obj &&
        "student" in obj &&
        typeof obj.school === "object" &&
        typeof obj.meta === "object" &&
        typeof obj.student === "object"
    );
}


export function saveFormData(data: TCData): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(storage_key, JSON.stringify(data));
    }
}

export function loadFormData(): TCData | null {
    if (typeof window !== "undefined") {
        const raw_data = localStorage.getItem(storage_key);
        if (!raw_data) return null;
        try {
            const parsed_data = JSON.parse(raw_data);
            return isTCData(parsed_data) ? parsed_data : null;
        } catch (e) {
            console.error("Error parsing localStorage data:", e);
            return null;
        }
    }
    return null;
}

// export function saveSchoolInfo(school: TCData["school"]): void {
//     if (typeof window !== "undefined") {
//         // localStorage.setItem(school_key, JSON.stringify(school));
//         const raw_data = localStorage.getItem(school_key);
//         if (raw_data) {
//             const parsed_data = JSON.parse(raw_data);
//             if (Array.isArray(parsed_data)) {
//                 parsed_data.push(school);
//                 localStorage.setItem(school_key, JSON.stringify(parsed_data));
//             }
//         }
//     }
// }

export function saveSchoolInfo(school: TCData["school"]): void {
    if (typeof window !== "undefined") {
        const existingSchools = loadSavedSchools() || [];
        if (!school.schoolID || school.schoolID === "") {
            school.schoolID = Date.now().toString();
        }
        const existingIndex = existingSchools.findIndex(s => s.schoolID === school.schoolID);
        if (existingIndex >= 0) {
            existingSchools[existingIndex] = school;
        } else {
            existingSchools.push(school);
        }
        localStorage.setItem(school_key, JSON.stringify(existingSchools));
    }
}

export function loadSavedSchools(): SavedSchools | null {
    if (typeof window !== "undefined") {
        const raw_data = localStorage.getItem(school_key);
        if (!raw_data) return null;

        try {
            const parsed_data = JSON.parse(raw_data);
            // Ensure it's actually an array before returning
            return Array.isArray(parsed_data) ? parsed_data : null;
        } catch (e) {
            console.error("Error parsing saved schools:", e);
            return null;
        }
    }
    return null;
}
// export function loadSchoolInfo(): TCData["school"] | null {
//     if (typeof window !== "undefined") {
//         const raw_data = localStorage.getItem(school_key);
//         if (!raw_data) return null;
//         try {
//             const parsed_data = JSON.parse(raw_data);
//             return typeof parsed_data === "object" ? parsed_data : null;
//         } catch (e) {
//             console.error("Error parsing localStorage data:", e);
//             return null;
//         }
//     }
//     return null;
// }

export function clearLocalData(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(storage_key);
    }
}

export function clearAllLocalData(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(storage_key);
        localStorage.removeItem(school_key);
    }
}


