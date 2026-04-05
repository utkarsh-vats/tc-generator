const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];

const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety",
];

const ordinals: Record<string, string> = {
    "1": "First", "2": "Second", "3": "Third", "4": "Fourth",
    "5": "Fifth", "6": "Sixth", "7": "Seventh", "8": "Eighth",
    "9": "Ninth", "10": "Tenth", "11": "Eleventh", "12": "Twelfth",
    "13": "Thirteenth", "14": "Fourteenth", "15": "Fifteenth",
    "16": "Sixteenth", "17": "Seventeenth", "18": "Eighteenth",
    "19": "Nineteenth", "20": "Twentieth", "21": "Twenty-First",
    "22": "Twenty-Second", "23": "Twenty-Third", "24": "Twenty-Fourth",
    "25": "Twenty-Fifth", "26": "Twenty-Sixth", "27": "Twenty-Seventh",
    "28": "Twenty-Eighth", "29": "Twenty-Ninth", "30": "Thirtieth",
    "31": "Thirty-First",
};

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function numberToWords(n: number): string {
    if (n === 0) return "Zero";
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numberToWords(n % 100) : "");
    if (n < 10000) return numberToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numberToWords(n % 1000) : "");
    return String(n);
}

export function dateToWords(isoDate: string): string {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    return `${ordinals[String(day)]} ${months[month]} ${numberToWords(year)}`;
}

export function formatDateIndian(isoDate: string): string {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}