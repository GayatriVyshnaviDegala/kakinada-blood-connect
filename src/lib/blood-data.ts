export const KAKINADA_AREAS = [
  "Jagannaickpur",
  "Sarpavaram",
  "Ramanayyapeta",
  "Ashok Nagar",
  "Bhanugudi Junction",
  "Gandhi Nagar",
  "Indrapalem",
  "Vakalapudi",
  "Sambamurthy Nagar",
  "Turangi",
  "Suryaraopeta",
  "Rama Rao Peta",
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const FIRST_NAMES = [
  "Ravi", "Sai", "Anitha", "Lakshmi", "Venkat", "Naga", "Sridhar", "Priya",
  "Divya", "Manoj", "Kiran", "Suresh", "Ramesh", "Sneha", "Harika", "Bhavana",
  "Vamsi", "Chaitanya", "Rajesh", "Anil", "Deepak", "Swapna", "Madhavi",
  "Praveen", "Srinivas", "Krishna", "Bhargav", "Pavan", "Teja", "Karthik",
];
const LAST_NAMES = [
  "Kumar", "Reddy", "Rao", "Naidu", "Sarma", "Sastry", "Gupta", "Varma",
  "Chowdary", "Prasad", "Babu", "Murthy", "Krishna", "Devi", "Kumari",
];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export interface Donor {
  id: number;
  name: string;
  bloodGroup: string;
  area: string;
  phone: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
  lastDonation: string;
  available: boolean;
  donations: number;
}

export function generateDonors(count = 55): Donor[] {
  const rand = seeded(42);
  const donors: Donor[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const bg = BLOOD_GROUPS[Math.floor(rand() * BLOOD_GROUPS.length)];
    const area = KAKINADA_AREAS[Math.floor(rand() * KAKINADA_AREAS.length)];
    const gender: "Male" | "Female" = rand() > 0.35 ? "Male" : "Female";
    const age = 19 + Math.floor(rand() * 40);
    const phone = "+91 9" + Math.floor(100000000 + rand() * 899999999);
    const donations = Math.floor(rand() * 12);
    const monthsAgo = Math.floor(rand() * 18);
    const d = new Date();
    d.setMonth(d.getMonth() - monthsAgo);
    donors.push({
      id: i + 1,
      name: `${first} ${last}`,
      bloodGroup: bg,
      area,
      phone,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.in`,
      age,
      gender,
      lastDonation: d.toISOString().slice(0, 10),
      available: monthsAgo >= 3,
      donations,
    });
  }
  return donors;
}

export const HOSPITALS = [
  {
    name: "Government General Hospital, Kakinada",
    address: "Sambamurthy Nagar, Kakinada, Andhra Pradesh 533005",
    phone: "+91 884 236 5100",
    type: "Government",
    stock: { "A+": 22, "A-": 6, "B+": 18, "B-": 4, "O+": 30, "O-": 9, "AB+": 8, "AB-": 3 },
  },
  {
    name: "Apollo Hospitals, Kakinada",
    address: "Main Road, Bhanugudi Junction, Kakinada 533003",
    phone: "+91 884 234 5000",
    type: "Private",
    stock: { "A+": 14, "A-": 3, "B+": 11, "B-": 2, "O+": 19, "O-": 5, "AB+": 4, "AB-": 1 },
  },
  {
    name: "Medicover Hospitals, Kakinada",
    address: "Ramanayyapeta Road, Kakinada 533005",
    phone: "+91 884 235 2222",
    type: "Private",
    stock: { "A+": 10, "A-": 2, "B+": 9, "B-": 3, "O+": 15, "O-": 4, "AB+": 5, "AB-": 2 },
  },
  {
    name: "Trust Hospital, Kakinada",
    address: "Gandhi Nagar, Kakinada 533004",
    phone: "+91 884 237 8899",
    type: "Private",
    stock: { "A+": 8, "A-": 1, "B+": 7, "B-": 1, "O+": 12, "O-": 3, "AB+": 3, "AB-": 1 },
  },
  {
    name: "Hope Hospital, Kakinada",
    address: "Ashok Nagar, Kakinada 533003",
    phone: "+91 884 238 4477",
    type: "Private",
    stock: { "A+": 6, "A-": 2, "B+": 5, "B-": 1, "O+": 10, "O-": 2, "AB+": 2, "AB-": 1 },
  },
];

export const EMERGENCY_REQUESTS = [
  { id: 1, patient: "Ramakrishna P.", bloodGroup: "O-", hospital: "Government General Hospital, Kakinada", area: "Sambamurthy Nagar", units: 2, urgency: "Critical", contact: "+91 98480 12345", posted: "2h ago" },
  { id: 2, patient: "Lakshmi Devi", bloodGroup: "B+", hospital: "Apollo Hospitals, Kakinada", area: "Bhanugudi Junction", units: 1, urgency: "High", contact: "+91 99590 22334", posted: "5h ago" },
  { id: 3, patient: "Venkatesh K.", bloodGroup: "A+", hospital: "Medicover Hospitals, Kakinada", area: "Ramanayyapeta", units: 3, urgency: "High", contact: "+91 90000 45566", posted: "Yesterday" },
  { id: 4, patient: "Priya S.", bloodGroup: "AB-", hospital: "Trust Hospital, Kakinada", area: "Gandhi Nagar", units: 1, urgency: "Critical", contact: "+91 91234 88221", posted: "3h ago" },
  { id: 5, patient: "Suresh M.", bloodGroup: "O+", hospital: "Hope Hospital, Kakinada", area: "Ashok Nagar", units: 2, urgency: "Moderate", contact: "+91 93456 77112", posted: "6h ago" },
];

export const SUCCESS_STORIES = [
  { name: "Ravi Kumar", area: "Jagannaickpur", quote: "Donating blood at GGH Kakinada helped save a road accident victim. Nothing compares to that feeling." },
  { name: "Anitha Rao", area: "Vakalapudi", quote: "I registered here and got called within a week for a thalassemia patient at Apollo Kakinada. Proud to help." },
  { name: "Sai Naidu", area: "Turangi", quote: "The Kakinada donor community responded overnight for my mother's surgery at Medicover." },
];

export const FAQS = [
  { q: "Who can donate blood?", a: "Any healthy person aged 18-65, weighing above 50kg, can donate blood every 3 months (men) or 4 months (women)." },
  { q: "Is blood donation safe?", a: "Yes. Sterile, single-use equipment is used at every licensed Kakinada hospital and camp." },
  { q: "How long does donation take?", a: "The entire process takes about 30-45 minutes; the actual donation is 8-10 minutes." },
  { q: "How often can I donate?", a: "Whole blood every 90 days for men and 120 days for women." },
  { q: "Will I feel weak after donating?", a: "Most donors resume normal activity within an hour. Rest, hydrate and eat well after donating." },
];
