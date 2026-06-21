export interface Post {
  id: string;
  image: string;
  videoUrl: string;
  duration: string;
  title: string;
  content: string;
  category: string;
  level: string; // Add level field
  createdAt: string;
  views: number;
  isViral: boolean;
}

export type CategoryKey = 
  | "videos"
  | "choti";

export interface CategoryInfo {
  key: string;
  label: string;
  group: "videos" | "choti";
}

export const VIDEO_LEVELS = [
  "দেশি ভিডিও", "বিদেশি ভিডিও", "স্কুল গার্লস ভিডিও", "কলেজ গার্লস ভিডিও", 
  "ইউনিভার্সিটির ভিডিও", "ভাবীর পমপম", "আন্টির ভোদা", "আম্মুর পোঁদ"
];

export const CHOTI_LEVELS = [
  "মা-ছেলে চটি", "বাবা-মেয়ে চটি", "মামা-ভাগ্নি চটি", "মামি-ভাগ্নে চটি", 
  "গার্লফ্রেন্ড-বয়ফ্রেন্ড চটি", "পরকিয়া চটি"
];

export const CATEGORIES: CategoryInfo[] = [
  { key: "videos", label: "ভিডিও", group: "videos" },
  { key: "choti", label: "চটি গল্প", group: "choti" },
];
