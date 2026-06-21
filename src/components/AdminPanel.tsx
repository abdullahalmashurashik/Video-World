import React, { useState } from "react";
import { Post, CATEGORIES, VIDEO_LEVELS, CHOTI_LEVELS } from "../types";
import { X, Plus, Trash2, Edit2, Key, HelpCircle, FileText, Video, RefreshCw, Save } from "lucide-react";

interface AdminPanelProps {
  posts: Post[];
  isOpen: boolean;
  onClose: () => void;
  onSavePost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onResetPosts: () => void;
}

export default function AdminPanel({
  posts,
  isOpen,
  onClose,
  onSavePost,
  onDeletePost,
  onResetPosts,
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Post form state
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form Fields
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("videos");
  const [level, setLevel] = useState(VIDEO_LEVELS[0]);
  const [isViral, setIsViral] = useState(false);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "000000") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
    }
  };

  // Open form for a new post
  const handleAddNew = () => {
    setEditingPost(null);
    setImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80");
    setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");
    setDuration("10:00");
    setTitle("");
    setContent("");
    setCategory("videos");
    setLevel(VIDEO_LEVELS[0]);
    setIsViral(false);
    setIsFormOpen(true);
  };

  // Open form to edit an existing post
  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setImage(post.image);
    setVideoUrl(post.videoUrl);
    setDuration(post.duration);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setLevel(post.level);
    setIsViral(post.isViral || false);
    setIsFormOpen(true);
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("শিরোনাম এবং বিস্তারিত ডেসক্রিপশন অবশ্যই পূরণ করতে হবে!");
      return;
    }

    const savedPost: Post = {
      id: editingPost ? editingPost.id : "post-" + Date.now(),
      image: image.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      videoUrl: videoUrl.trim() || "#",
      duration: duration.trim() || "05:00",
      title: title.trim(),
      content: content.trim(),
      category: category,
      level: level,
      createdAt: editingPost ? editingPost.createdAt : new Date().toISOString(),
      views: editingPost ? editingPost.views : Math.floor(Math.random() * 5000) + 500,
      isViral: isViral,
    };

    onSavePost(savedPost);
    setIsFormOpen(false);
    alert(editingPost ? "পোস্টটি সফলভাবে এডিট করা হয়েছে!" : "নতুন পোস্ট সফলভাবে পাবলিশ করা হয়েছে!");
  };

  if (!isOpen) return null;

  return (
    <div id="admin-panel-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      {/* Password Prompt */}
      {!isAuthenticated ? (
        <div id="admin-login-card" className="w-full max-w-md bg-[#1c1e26] border-2 border-[#ff003c]/30 rounded-2xl p-6 shadow-2xl relative">
          <button
            id="close-login-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-[#ff003c]/10 rounded-full text-[#ff003c] mb-3">
              <Key size={32} className="animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">সুপার এডমিন লগইন</h2>
            <p className="text-gray-400 text-sm mt-1">এই সেকশনে প্রবেশের জন্য সিকিউরিটি পাসওয়ার্ড দিন</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-400 mb-1 tracking-wider">
                পাসওয়ার্ড টাইপ করুন
              </label>
              <input
                id="admin-passwd-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full bg-[#0b0c10] border border-gray-700 focus:border-[#ff003c] text-white px-4 py-3 rounded-xl focus:outline-none transition duration-200 text-center text-lg font-mono tracking-widest"
                autoFocus
              />
            </div>

            {authError && (
              <p id="admin-auth-error" className="text-sm text-[#ff003c] text-center bg-[#ff003c]/10 py-2 rounded-lg font-medium">
                {authError}
              </p>
            )}

            <button
              id="admin-login-submit"
              type="submit"
              className="w-full bg-[#ff003c] hover:bg-[#cc0030] active:scale-95 text-white font-bold py-3 rounded-xl transition duration-200 uppercase tracking-widest text-sm cursor-pointer shadow-lg shadow-[#ff003c]/20"
            >
              প্রবেশ করুন (লগইন)
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-500 font-mono">HINT PASSWORD: 000000</p>
          </div>
        </div>
      ) : (
        /* Real Admin Dashboard */
        <div id="admin-dashboard-container" className="w-full max-w-4xl bg-[#1c1e26] border border-[#ff003c]/50 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div id="admin-dash-header" className="flex items-center justify-between border-b border-gray-800 p-5 bg-[#0b0c10] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-bounce">🔥</span>
              <div>
                <h2 className="text-xl font-bold text-white">ভিডিও ওয়ার্ল্ড এডমিন ড্যাশবোর্ড</h2>
                <p className="text-xs text-gray-400">এখান থেকে নতুন পোস্ট যুক্ত, এডিট এবং ডিলিট করতে পারবেন</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                id="reset-demo-btn"
                onClick={() => {
                  if (confirm("আপনি কি সত্যিই সমস্ত ডাটা রিসেট করে ডিফল্ট ডেমো পোস্টে ফিরে যেতে চান?")) {
                    onResetPosts();
                    alert("পোস্টগুলো সফলভাবে রিসেট করা হয়েছে!");
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition"
                title="রিসেট ডেমো ডাটা"
              >
                <RefreshCw size={14} />
                <span>রিসেট ডেমো</span>
              </button>
              <button
                id="close-admin-dash"
                onClick={onClose}
                className="p-1 px-2.5 rounded-lg bg-[#ff003c]/10 text-[#ff003c] hover:bg-[#ff003c] hover:text-white transition duration-200"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Action Bar */}
            {!isFormOpen && (
              <div className="flex justify-between items-center bg-[#0b0c10] p-4 rounded-xl border border-gray-800">
                <span className="text-sm text-gray-400">মোট পোস্ট সংখ্যা: <strong className="text-[#ff003c] text-base">{posts.length}</strong> টি</span>
                <button
                  id="add-new-post-btn"
                  onClick={handleAddNew}
                  className="flex items-center gap-2 bg-[#ff003c] hover:bg-[#cc0030] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#ff003c]/20 transition cursor-pointer"
                >
                  <Plus size={16} />
                  <span>নতুন পোস্ট পাবলিশ করুন</span>
                </button>
              </div>
            )}

            {/* Form Segment */}
            {isFormOpen && (
              <form onSubmit={handleSubmit} className="bg-[#0b0c10] border border-[#ff003c]/20 rounded-xl p-5 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h3 className="text-lg font-bold text-[#ff003c] flex items-center gap-2">
                    {editingPost ? <Edit2 size={18} /> : <Plus size={18} />}
                    <span>{editingPost ? "পোস্ট সম্পাদনা (Edit Post)" : "নতুন পোস্ট তৈরি করুন"}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-white text-xs px-2.5 py-1 bg-gray-850 hover:bg-gray-800 rounded-md transition"
                  >
                    ফর্ম বন্ধ করুন
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      পোস্টের আকর্ষণীয় শিরোনাম (বাংলায়) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="যেমন: college পড়ুয়া মেয়েদের চমৎকার রোমান্টিক নাটক বা নতুন চটি গল্প..."
                      className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm transition"
                    />
                  </div>

                  {/* Thumbnail / Image Link */}
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      থাম্বনেইল ইমেজ লিংক (Image URL)
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... বা যেকোনো URL"
                      className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm font-mono transition"
                    />
                  </div>

                  {/* Video Link */}
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      ভিডিও ফাইল বা স্ট্রিমিং লিংক (Video MP4 URL)
                    </label>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.w3schools.com/html/mov_bbb.mp4 বা MP4 লিংক"
                      className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm font-mono transition"
                    />
                  </div>

                  {/* Duration Text */}
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      ভিডিওর দৈর্ঘ্য / সময় (Duration)
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="যেমন: 11:47 বা 15:20"
                      className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm transition text-center"
                    />
                  </div>

                  {/* Category and Level Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 font-medium mb-1">
                        ক্যাটাগরি সিলেক্ট করুন <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setLevel(e.target.value === "videos" ? VIDEO_LEVELS[0] : CHOTI_LEVELS[0]);
                        }}
                        className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm transition"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.key} value={cat.key}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 font-medium mb-1">
                        সাব-ক্যাটাগরি/লেভেল <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm transition"
                      >
                         {(category === "videos" ? VIDEO_LEVELS : CHOTI_LEVELS).map((lvl) => (
                           <option key={lvl} value={lvl}>{lvl}</option>
                         ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-1">
                    বিস্তারিত গল্প অথবা ভিডিওর বর্ণনা (Rich Text/Content Area) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="পুরো চটি গল্পটি অথবা ভিডিওর সুন্দর আকর্ষণীয় বর্ণনা এখানে লিখুন..."
                    className="w-full bg-[#1c1e26] border border-gray-700 focus:border-[#ff003c] text-white px-3.5 py-2 rounded-lg focus:outline-none text-sm transition leading-relaxed"
                  />
                </div>

                {/* Viral status */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="is-viral-checkbox"
                    checked={isViral}
                    onChange={(e) => setIsViral(e.target.checked)}
                    className="w-4 h-4 text-[#ff003c] bg-gray-800 rounded border-gray-700 focus:ring-[#ff003c] cursor-pointer"
                  />
                  <label htmlFor="is-viral-checkbox" className="text-sm text-gray-300 cursor-pointer select-none">
                    পোস্টটি কি <strong className="text-[#ff003c]">VIRAL POSTS</strong> হিসেবে উইজেটে দেখাতে চান?
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition text-sm font-semibold cursor-pointer"
                  >
                    বাতিল (Cancel)
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-[#4caf50] hover:bg-[#43a047] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition cursor-pointer"
                  >
                    <Save size={16} />
                    <span>সংরক্ষণ করুন (Publish)</span>
                  </button>
                </div>
              </form>
            )}

            {/* List of Current Posts */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-2">বিদ্যমান পোস্টসমূহের তালিকা ({posts.length})</h3>
              
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {posts.map((post, idx) => {
                  const categoryObj = CATEGORIES.find(c => c.key === post.category);
                  return (
                    <div id={`admin-post-item-${post.id}`} key={post.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-[#0b0c10] rounded-xl border border-gray-800 hover:border-gray-700 transition gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail small view */}
                        <img
                          src={post.image}
                          alt="Thumbnail"
                          className="w-16 h-10 object-cover rounded-lg border border-gray-800 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80";
                          }}
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">{post.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-0.5">
                            <span className="px-1.5 py-0.5 bg-[#ff003c]/20 text-[#ff003c] rounded text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span>•</span>
                            <span className="text-gray-300 font-medium">
                              {categoryObj ? categoryObj.label : post.category}
                            </span>
                            <span>•</span>
                            <span className="font-mono">{post.duration}</span>
                            {post.isViral && (
                              <>
                                <span>•</span>
                                <span className="text-amber-400 font-bold text-[10px] uppercase tracking-wider">Viral</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-800/50">
                        <button
                          type="button"
                          onClick={() => handleEdit(post)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-900/30 text-blue-400 hover:bg-blue-900/65 rounded-lg transition"
                        >
                          <Edit2 size={13} />
                          <span>সম্পাদনা</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`আপনি কি সত্যিই "${post.title}" পোস্টটি ডিলিট করতে চান?`)) {
                              onDeletePost(post.id);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-950/40 text-red-400 hover:bg-red-950/80 rounded-lg transition"
                        >
                          <Trash2 size={13} />
                          <span>মুছে ফেলুন</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {posts.length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-[#0b0c10] border border-gray-800 rounded-xl">
                    কোনো পোস্ট পাওয়া যায়নি! ডেমো পোস্ট রিসেট করুন বা নতুন পোস্ট পাবলিশ করুন।
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4 bg-[#0b0c10] flex justify-between items-center text-xs text-gray-500 rounded-b-2xl">
            <span>ড্যাশবোর্ড ভার্সন ১.০.০</span>
            <span>নিয়ন্ত্রিত ভিডিও ওয়ার্ল্ড প্যানেল</span>
          </div>
        </div>
      )}
    </div>
  );
}
