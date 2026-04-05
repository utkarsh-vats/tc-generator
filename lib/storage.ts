// 1. We need to save / load the TCData object to the browser's localStorage under the key "tc-generator-form".
// 2. Use JSON.stringify() to save, and JSON.parse() to load.
// 3. Write two exported functions: saveFormData(data: TCData) and loadFormData(): TCData | null.
// 4. Wrap your localStorage calls in if (typeof window !== "undefined") { ... } so Next.js doesn't crash on the server.

import { TCData } from "./types";

const storage_key = "tcdata";               // temporary storage key
const school_key = "tc_generator_school";   // temporary school key

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

export function saveSchoolInfo(school: TCData["school"]): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(school_key, JSON.stringify(school));
    }
}

export function loadSchoolInfo(): TCData["school"] | null {
    if (typeof window !== "undefined") {
        const raw_data = localStorage.getItem(school_key);
        if (!raw_data) return null;
        try {
            const parsed_data = JSON.parse(raw_data);
            return typeof parsed_data === "object" ? parsed_data : null;
        } catch (e) {
            console.error("Error parsing localStorage data:", e);
            return null;
        }
    }
    return null;
}

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


