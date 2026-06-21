import React, { useState } from "react";
import { Post, CATEGORIES } from "../types";
import { X, Play, Download, ThumbsUp, MessageSquare, AlertCircle, Eye, Calendar, Share2, BookOpen, Volume2, Type } from "lucide-react";
import { triggerAdRedirect } from "../data";

interface PostDetailsModalProps {
  post: Post | null;
  onClose: () => void;
  onRecentClick: (post: Post) => void;
  recentPosts: Post[];
}

export default function PostDetailsModal({
  post,
  onClose,
  onRecentClick,
  recentPosts,
}: PostDetailsModalProps) {
  if (!post) return null;

  const [likes, setLikes] = useState(() => Math.floor(Math.random() * 800) + 200);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Array<{ name: string; text: string; time: string }>>([
    { name: "তাহসিন আহমেদ", text: "চরম একটি পোস্ট! ভিডিও কোয়ালিটি অনেক ভালো। ধন্যবাদ এডমিন।", time: "২ ঘন্টা আগে" },
    { name: "নাবিলা হাসান", text: "গল্পটির দ্বিতীয় পর্ব কবে আসবে? খুব সুন্দর করে লেখা হয়েছে।", time: "৫ ঘন্টা আগে" },
    { name: "সাকিব খান", text: "ডাউনলোড লিঙ্কটি কাজ করছে খুব দ্রুত। অনেক বেশি গতি পেলাম!", time: "১০ ঘন্টা আগে" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");

  // Determine if post is a video
  const isVideoCategory = post.category.startsWith("videos-");

  const handleLike = () => {
    // Open ad tab whenever they interact as requested or simulated
    triggerAdRedirect();
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleDownload = () => {
    // Force ad trigger
    triggerAdRedirect();
    
    // Simulate downloading message or download action
    alert("আপনার ডাউনলোড লিঙ্ক জেনারেট হচ্ছে! অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন...");
    setTimeout(() => {
      // Open file download if applicable
      const downloadElement = document.createElement("a");
      downloadElement.href = post.videoUrl !== "#" ? post.videoUrl : "https://www.w3schools.com/html/mov_bbb.mp4";
      downloadElement.download = `${post.title}.mp4`;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
    }, 1500);
  };

  const handlePlayInModal = () => {
    triggerAdRedirect();
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    triggerAdRedirect(); // monetized interaction!
    setComments([
      { name: "ভিজিটর", text: newComment.trim(), time: "এইমাত্র" },
      ...comments,
    ]);
    setNewComment("");
  };

  // Find category display label
  const categoryLabel = CATEGORIES.find((cat) => cat.key === post.category)?.label || "জেনারেল";

  return (
    <div id="post-details-overlay" className="fixed inset-0 z-45 bg-black/95 flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div id="post-details-container" className="w-full max-w-5xl bg-[#1c1e26] border-0 md:border border-gray-800 rounded-none md:rounded-2xl shadow-2xl flex flex-col md:flex-row h-full md:h-[90vh] overflow-hidden dynamic-modal-entrance">
        
        {/* Left Column: Media Player / Story Content */}
        <div className="flex-1 bg-black flex flex-col justify-between relative min-h-[300px] md:min-h-0">
          
          {/* Header over media or document on mobile */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="px-3 py-1 bg-[#ff003c] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
              {categoryLabel}
            </span>
          </div>

          <button
            id="modal-close-left-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-[#ff003c] text-white rounded-full hover:bg-[#cc0030] transition shadow-lg md:hidden block"
            title="বন্ধ করুন"
          >
            <X size={18} />
          </button>

          {/* Core Content Box based on category */}
          <div className="flex-1 flex flex-col justify-center items-center p-0 w-full overflow-y-auto">
            {isVideoCategory ? (
              /* High Polished Custom Video player with play alerts */
              <div id="video-wrapper" className="w-full h-full relative flex items-center justify-center bg-[#050608]">
                <video
                  id="modal-html5-video-player"
                  src={post.videoUrl !== "#" ? post.videoUrl : "https://www.w3schools.com/html/mov_bbb.mp4"}
                  poster={post.image}
                  controls
                  className="w-full max-h-full object-contain"
                  onPlay={handlePlayInModal}
                />
              </div>
            ) : (
              /* Beautiful Scrollable Reader View for Choti Stories */
              <div id="story-reader-container" className="w-full h-full bg-[#111218] p-6 md:p-8 overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen size={20} className="text-[#ff003c]" />
                    <span className="text-gray-400 text-xs font-mono">লাইভ রিডার মোড</span>
                  </div>
                  
                  {/* Font Size Selector */}
                  <div className="flex items-center gap-1 bg-[#1c1d26] rounded-lg p-0.5 border border-gray-800">
                    <button
                      onClick={() => { setFontSize("sm"); triggerAdRedirect(); }}
                      className={`px-2 py-1 rounded text-xs transition font-semibold ${fontSize === "sm" ? "bg-[#ff003c] text-white" : "text-gray-400 hover:text-white"}`}
                    >
                      ক
                    </button>
                    <button
                      onClick={() => { setFontSize("md"); triggerAdRedirect(); }}
                      className={`px-2 py-1 rounded text-xs transition font-semibold ${fontSize === "md" ? "bg-[#ff003c] text-white" : "text-gray-400 hover:text-white"}`}
                    >
                      ক+
                    </button>
                    <button
                      onClick={() => { setFontSize("lg"); triggerAdRedirect(); }}
                      className={`px-2 py-1 rounded text-xs transition font-semibold ${fontSize === "lg" ? "bg-[#ff003c] text-white" : "text-gray-400 hover:text-white"}`}
                    >
                      ক++
                    </button>
                  </div>
                </div>

                <article className="prose prose-invert max-w-none flex-1">
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 border-y border-gray-805/40 py-2">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {post.views.toLocaleString()} ভিউস
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString("bn-BD")}
                    </span>
                  </div>

                  <p
                    className={`text-gray-200 leading-relaxed space-y-4 whitespace-pre-wrap select-text ${
                      fontSize === "sm" ? "text-sm" : fontSize === "md" ? "text-base md:text-lg" : "text-lg md:text-xl font-medium"
                    }`}
                  >
                    {post.content}
                  </p>
                </article>

                <div className="mt-8 p-4 bg-[#ff003c]/5 border border-[#ff003c]/20 rounded-xl flex items-center gap-3">
                  <AlertCircle size={20} className="text-[#ff003c] shrink-0" />
                  <p className="text-xs text-gray-300">
                    পরবর্তী আকর্ষণীয় চটি গল্প সবার আগে পেতে নিয়মিত আমাদের সাইট ভিজিট করুন এবং শেয়ার করুন!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interaction, Meta Details & Social Widgets */}
        <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l border-gray-800 flex flex-col justify-between bg-[#1c1e26] max-h-[50vh] md:max-h-full overflow-hidden">
          
          {/* Header containing meta data */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#0b0c10] shrink-0">
            <span className="text-xs font-bold text-gray-400 tracking-wider font-mono">
              পোস্ট ইনফো (POST META)
            </span>
            <button
              id="modal-close-right-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition md:block hidden cursor-pointer"
              title="বন্ধ করুন"
            >
              <X size={18} />
            </button>
          </div>

          {/* Details Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Title display */}
            <div>
              <h2 className="text-base font-bold text-white leading-snug">
                {post.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1 bg-[#1c1d26] px-2 py-1 rounded">
                  <Eye size={12} className="text-[#ff003c]" />
                  <span>{post.views.toLocaleString()} বার দেখা হয়েছে</span>
                </span>
                <span className="font-mono bg-[#1c1d26] px-2 py-1 rounded">
                  {post.duration} মিনিট
                </span>
              </div>
            </div>

            {/* Quick Actions (Full length play & download) */}
            <div className="space-y-2 border-t border-b border-gray-800 py-4">
              <button
                id="modal-action-play"
                onClick={() => { triggerAdRedirect(); alert("ভিডিও প্লে সংযোগ সুরক্ষিত হচ্ছে... উপভোগ করুন!"); }}
                className="w-full bg-[#ff003c] hover:bg-[#cc0030] text-white py-2.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition shadow-lg shadow-[#ff003c]/20 cursor-pointer"
              >
                <Play size={16} fill="currentColor" />
                <span>ভিডিও প্লে করুন (PLAY VIDEO)</span>
              </button>

              <button
                id="modal-action-download"
                onClick={handleDownload}
                className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-2.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition shadow-lg shadow-[#4caf50]/20 cursor-pointer"
              >
                <Download size={16} />
                <span>সুপার ফাস্ট ডাউনলোড (DOWNLOAD)</span>
              </button>
            </div>

            {/* Likes, Shares */}
            <div className="flex justify-between items-center text-xs text-gray-400 bg-[#0b0c10] p-2.5 rounded-xl border border-gray-850">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${
                  hasLiked ? "bg-[#ff003c]/15 text-[#ff003c]" : "hover:text-white"
                }`}
              >
                <ThumbsUp size={14} />
                <span>{likes} লাইকস</span>
              </button>

              <button
                onClick={() => {
                  triggerAdRedirect();
                  navigator.clipboard.writeText(window.location.href);
                  alert("পোস্ট লিংক ক্লিপবোর্ডে কপি করা হয়েছে!");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white transition font-semibold cursor-pointer"
              >
                <Share2 size={14} />
                <span>শেয়ার পোস্ট</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-gray-400 block tracking-wider uppercase">
                মন্তব্যসমূহ (COMMENTS)
              </span>

              {/* Input Form */}
              <form onSubmit={handlePostComment} className="flex gap-1">
                <input
                  type="text"
                  placeholder="আপনার মন্তব্য লিখুন..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-[#0b0c10] border border-gray-850 focus:border-[#ff003c] text-white placeholder-gray-500 rounded-xl px-3 py-1.5 text-xs focus:outline-none transition"
                />
                <button
                  type="submit"
                  className="bg-[#ff003c] hover:bg-[#cc0030] text-white px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition"
                >
                  করুন
                </button>
              </form>

              {/* List */}
              <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1">
                {comments.map((comment, i) => (
                  <div key={i} className="bg-[#0b0c10]/75 p-2 rounded-xl text-xs space-y-0.5 border border-gray-900">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="font-bold text-gray-300">{comment.name}</span>
                      <span className="text-[10px] font-mono">{comment.time}</span>
                    </div>
                    <p className="text-gray-300 select-text leading-tight">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts quick sidebar inside view */}
            <div className="space-y-2 border-t border-gray-855/50 pt-3">
              <span className="text-xs font-semibold text-gray-400 block tracking-wider uppercase">
                অন্যান্য রিসেন্ট পোস্ট
              </span>
              <div className="space-y-2">
                {recentPosts.slice(0, 3).map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      triggerAdRedirect();
                      onRecentClick(r);
                    }}
                    className="flex items-center gap-2 p-1.5 bg-[#0b0c10] hover:bg-[#ff003c]/10 rounded-lg cursor-pointer border border-gray-900 hover:border-[#ff003c]/20 transition"
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-12 h-8 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-200 line-clamp-1 hover:text-[#ff003c] transition">
                        {r.title}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono block">
                        {r.duration} • {r.views.toLocaleString()} ভিউস
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer warning */}
          <div className="p-3 bg-red-950/20 border-t border-gray-800 flex items-center gap-2 text-[11px] text-gray-400 shrink-0">
            <AlertCircle size={14} className="text-[#ff003c]" />
            <span>১৮+ শুধুমাত্র প্রাপ্তবয়স্কদের বিনোদনের জন্য।</span>
          </div>

        </div>

      </div>
    </div>
  );
}
