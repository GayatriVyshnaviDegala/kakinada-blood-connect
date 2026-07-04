// Static constants for Kakinada Blood Link.
// All live data (donors, hospitals, requests, recipients) now comes from the Lovable Cloud database.

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

export type Donor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  blood_group: string;
  area: string;
  address: string | null;
  donations: number;
  available: boolean;
  last_donation: string | null;
  created_at: string;
};

export type Hospital = {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  stock: Record<string, number>;
};

export type BloodRequest = {
  id: string;
  patient_name: string;
  blood_group: string;
  units: number;
  hospital: string;
  area: string;
  urgency: string;
  contact: string;
  note: string | null;
  status: string;
  posted_at: string;
};
