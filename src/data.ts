import { Post } from "./types";

export const AD_LINKS = [
  "https://interestingcollide.com/e6zmxgk14?key=a3a9577d4d83faa6e3b7b8c6e1ba6f51",
  "https://interestingcollide.com/u6x1r6wt7?key=d34022bcd0590c714f0b9e5885957a21",
  "https://interestingcollide.com/nqgkbd4ie?key=ad23475dfd2d838d8c6239a3b14f5c55",
  "https://interestingcollide.com/brnisrcf?key=beecf88983f1defa2726812d21e3bc44",
  "https://interestingcollide.com/znzneaun?key=cf3aa0440677b8968af7f02776c89f22",
  "https://interestingcollide.com/srfyd96r8u?key=9354de4a656f8eecfbee6b4754851946",
  "https://interestingcollide.com/rbvs69uf?key=46af28663815ec386b274962639d8e19",
  "https://interestingcollide.com/q01z0m63m?key=ec4bc6db7785799fae395f4bc887a868",
  "https://interestingcollide.com/k5epft6h?key=9d0508b117bbd6566f186aac15387f64",
  "https://interestingcollide.com/juit9jgg50?key=b0704286e736560b8c98f0642a2acca2"
];

// Helper to trigger advertisement redirection popup sequentially or randomly
let currentAdIndex = 0;
export function getNextAdLink(): string {
  // Use sequential or random mix
  const link = AD_LINKS[currentAdIndex];
  currentAdIndex = (currentAdIndex + 1) % AD_LINKS.length;
  return link;
}

export function triggerAdRedirect(): void {
  const link = getNextAdLink();
  // Safe popup opening that works in browsers
  window.open(link, "_blank", "noopener,noreferrer");
}

export const DEFAULT_POSTS: Post[] = [
  {
    id: "post-1",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "11:47",
    title: "নতুন দেশি রোমান্টিক ভিডিও ক্লিপ ২০২৬ - চরম মুহূর্তের ভাইরাল ভিডিও",
    content: "এটি একটি চমৎকার দেশি ভিডিও যা সম্প্রতি সোশ্যাল মিডিয়ায় অত্যন্ত ভাইরাল হয়েছে। ভিডিওটিতে সুন্দর গ্রামীণ ব্যাকগ্রাউন্ড এবং চমৎকার আবহ ফুটিয়ে তোলা হয়েছে। সম্পূর্ণ ভিডিওটি দেখতে প্লে বাটনে ক্লিক করুন। এছাড়া সরাসরি ডাউনলোড লিঙ্ক ব্যবহার করে মেমরিতে সংরক্ষণ করতে পারেন।",
    category: "videos-desi",
    createdAt: "2026-06-19T10:00:00Z",
    views: 12450,
    isViral: true
  },
  {
    id: "post-2",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: "08:25",
    title: "কলেজ পড়ুয়া স্কুল গার্লস গ্রুপ ড্যান্স ও বিহাইন্ড দ্য সিন কালেকশনস",
    content: "স্কুল এবং কলেজ পড়ুয়া মেয়েদের চমৎকার একটি গ্রুপ ড্যান্স পারফর্মেন্সের ভাইরাল ভিডিও। এই ভিডিওটির শুটিংয়ের পেছনের কিছু হাসিখুশি এবং রোমাঞ্চকর দৃশ্য এই প্রথমবার আপনাদের মাঝে শেয়ার করা হলো। ভিডিওটি মিস করতে না চাইলে এখনই প্লে বাটন চাপুন।",
    category: "videos-school",
    createdAt: "2026-06-18T14:20:00Z",
    views: 9810,
    isViral: true
  },
  {
    id: "post-3",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    videoUrl: "#",
    duration: "25:40",
    title: "মা ও ছেলের এক বৃষ্টির দুপুরের রোমাঞ্চকর চটি গল্প - পর্ব ০১",
    content: "বাইরে তখন মুষলধারে বৃষ্টি হচ্ছিল। মা রান্নাঘরে খিচুড়ি রান্না করছিলেন, আর আমি সোফায় বসে ফোন টিপছিলাম। হঠাৎ বিদ্যুৎ চলে গেল। ঘর অন্ধকার হয়ে আসায় মা আমাকে মোমবাতি খুঁজতে বললেন। মোমবাতি খুঁজতে গিয়ে মায়ের স্পর্শে আমার সারা শরীরে এক অদ্ভুত শিহরণ বয়ে গেল। মায়ের সেই মায়াবী মুখের দিকে তাকিয়ে আমি আর নিজেকে সামলাতে পারলাম না... বাকি অংশ পড়তে এবং সম্পূর্ণ রোমাঞ্চের স্বাদ নিতে গল্পটি লাইভ পড়ুন।",
    category: "choti-mom",
    createdAt: "2026-06-17T08:15:00Z",
    views: 15400,
    isViral: true
  },
  {
    id: "post-4",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "14:15",
    title: "বিদেশি মডেলদের সমুদ্র সৈকতে হট বিকিনি ফটোশুট এবং এক্সক্লুসিভ স্ট্রিমিং",
    content: "মালদ্বীপের সমুদ্র সৈকতে অনুষ্ঠিত হয়ে গেল বিদেশি নামী মডেলদের এই সিজনের সবচেয়ে বোল্ড ফটোশুট। সোনালী বালুচরে মডেলদের মোহনীয় সাজ ও ক্যামেরার পেছনের গল্প নিয়ে তৈরি এই এক্সক্লুসিভ ফুটেজটি দেখতে প্লে বাটনে ক্লিক করুন।",
    category: "videos-foreign",
    createdAt: "2026-06-16T19:30:00Z",
    views: 8120,
    isViral: false
  },
  {
    id: "post-5",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    videoUrl: "#",
    duration: "18:00",
    title: "বাবা ও মেয়ের খুনসুটি ও গভীর ভালোবাসার গোপন চটি কাহিনী - নতুন পর্ব",
    content: "পরীক্ষার রেজাল্ট খারাপ হওয়ায় মেয়েটা কোণঠাসা হয়ে মুখ ভার করে বিছানায় শুয়ে ছিল। বাবা অফিস থেকে ফিরে মেয়ের জন্য পছন্দের আইসক্রিম নিয়ে আসলেন। মাথায় হাত বুলিয়ে আদর করতে করতে বাবা বললেন ভুল মানুষেরই হয়। বাবার সেই মায়াবী আদরের ছোঁয়া পেয়ে মেয়েটি বাবাকে জড়িয়ে ধরে কেঁদে ফেলল। এরপর এক আবেগপূর্ণ সম্পর্কের এক নতুন মাত্রা শুরু হলো আমাদের জীবনের পাতায়...",
    category: "choti-father",
    createdAt: "2026-06-15T22:10:00Z",
    views: 21300,
    isViral: true
  },
  {
    id: "post-6",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: "05:10",
    title: "স্কুল হোস্টেলের রাতের দুষ্টু মিষ্টি কান্ড - এক্সক্লুসিভ সিসিটিভি ফুটেজ ক্লিপ",
    content: "রাতের অন্ধকারে স্কুল হোস্টেলের ছাত্রীদের রুমে কী কী ঘটে তা নিয়ে কৌতুহলের শেষ নেই। এই শর্ট ভাইরাল সিসিটিভি ফুটেজে দেখুন একদল মেয়ের হোস্টেল সুপারভাইজারকে বোকা বানানোর দারুণ এক মজার কান্ড। ভিডিও প্লে করুন এবং এনজয় করুন!",
    category: "videos-school",
    createdAt: "2026-06-14T11:05:00Z",
    views: 7420,
    isViral: false
  },
  {
    id: "post-7",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    videoUrl: "#",
    duration: "30:15",
    title: "দুষ্টু ছেলের আবদার রক্ষা করলেন মা - অন্ধকার ঘরের রোমহর্ষক ঘটনা",
    content: "মা তখন একা শুয়ে ছিলেন। ড্রয়িং রুমে সবাই ঘুমে মগ্ন। আমি আস্তে করে মায়ের ঘরে পা বাড়ালাম। মায়ের শাড়ির আঁচলটা একটু সরে গিয়েছিল, চন্দ্রালোকিত রাতে মাকে যেন অপ্সরার চেয়েও রূপসী লাগছিল। আমি আলতো করে মায়ের চুলে হাত রাখলাম, মা চোখ পিটপিট করে তাকালেন...",
    category: "choti-mom",
    createdAt: "2026-06-13T15:35:00Z",
    views: 18900,
    isViral: false
  },
  {
    id: "post-8",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "20:45",
    title: "বিদেশি বিলাসবহুল রিসোর্টে রোমান্টিক লাভ স্টোরি আনকাট ভার্সন",
    content: "সুইজারল্যান্ডের বরফে ঢাকা পাহাড়ি রিসোর্টে এক নবদম্পতির প্রথম রোমান্টিক হানিমুন যাপনের বিশেষ দৃশ্যাবলী। এই সিনেমাটিক ভিডিওটি দেখে আপনিও হারিয়ে যাবেন ভালোবাসার অন্য এক দুনিয়ায়।",
    category: "videos-foreign",
    createdAt: "2026-06-12T09:40:00Z",
    views: 5200,
    isViral: false
  }
];
