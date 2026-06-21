import React, { useState, useEffect } from "react";
import { Post, CATEGORIES, CategoryKey } from "./types";
import { DEFAULT_POSTS, triggerAdRedirect } from "./data";
import { 
  Flame, Search, ChevronDown, Home, BookOpen, Video, ShieldCheck, 
  Facebook, MessageCircle, Send, Play, Download, Award, Clock, 
  Eye, CornerDownRight, Menu, X, Sparkles, Filter
} from "lucide-react";
import AdminPanel from "./components/AdminPanel";
import PostDetailsModal from "./components/PostDetailsModal";

export default function App() {
  // Post states
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Modals & UI Toggles
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState<boolean>(false);

  // Initialize posts from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem("video_world_posts");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(DEFAULT_POSTS);
        localStorage.setItem("video_world_posts", JSON.stringify(DEFAULT_POSTS));
      }
    } else {
      setPosts(DEFAULT_POSTS);
      localStorage.setItem("video_world_posts", JSON.stringify(DEFAULT_POSTS));
    }
  }, []);

  // Sync to local storage on changes
  const savePostsToStorage = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("video_world_posts", JSON.stringify(updatedPosts));
  };

  // Add or Edit a post
  const handleSavePost = (savedPost: Post) => {
    const exists = posts.some(p => p.id === savedPost.id);
    let updated: Post[];
    if (exists) {
      updated = posts.map(p => p.id === savedPost.id ? savedPost : p);
    } else {
      updated = [savedPost, ...posts];
    }
    savePostsToStorage(updated);
  };

  // Delete a post
  const handleDeletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    savePostsToStorage(updated);
  };

  // Reset to default posts
  const handleResetPosts = () => {
    savePostsToStorage(DEFAULT_POSTS);
  };

  // Filter & Search Logic
  const filteredPosts = posts.filter(post => {
    const matchCategory = activeCategory === "all" || post.category === activeCategory;
    const matchSearch = searchQuery.trim() === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort by created time
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Pagination constraints (Max 5 posts per page)
  const POSTS_PER_PAGE = 5;
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Click handler to open ad and show post details
  const handlePostClick = (post: Post) => {
    triggerAdRedirect(); // monetization trigger in a new tab!
    setSelectedPost(post); // still open the details inside video world!
  };

  // Click play action helper
  const handlePlayAction = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerAdRedirect();
    setSelectedPost(post);
  };

  // Click download action helper
  const handleDownloadAction = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerAdRedirect();
    alert("আপনার ডাউনলোড সিকিউর লিঙ্ক জেনারেট হচ্ছে! অনুগ্রহ করে ডাউনলোড শুরু হওয়া পর্যন্ত অপেক্ষা করুন...");
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = post.videoUrl !== "#" ? post.videoUrl : "https://www.w3schools.com/html/mov_bbb.mp4";
      link.download = `${post.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  // Get viral posts
  const viralPosts = posts.filter(p => p.isViral).slice(0, 5);

  // Get recent posts
  const recentPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f1f2f6] flex flex-col justify-between selection:bg-[#ff003c] selection:text-white relative">
      
      {/* 1. HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-[#0d0e15]/95 border-b border-[#ff003c]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand / Flame Logo */}
          <div 
            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="relative">
              <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,0,60,0.8)] animate-pulse">🔥</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff003c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff003c]"></span>
              </span>
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-[#ff003c] bg-clip-text text-transparent group-hover:scale-102 transition duration-200">
              ভিডিও ওয়ার্ল্ড
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-300 hover:text-white transition px-3.5 py-2 rounded-xl"
            >
              <span>হোম</span>
            </button>
            <button
               className="flex items-center gap-1.5 text-sm font-semibold text-gray-300 hover:text-white transition px-3.5 py-2 rounded-xl"
            >
               <span>ক্যাটাগরি</span>
            </button>
          </nav>

            {/* Admin Panel Launch Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-850 hover:from-gray-850 hover:to-gray-800 border border-gray-800 hover:border-[#ff003c]/40 text-[#ff003c] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>এডমিন প্যানেল</span>
            </button>

            {/* Search bar inside header for instant search */}
            <div className="hidden md:flex items-center w-72 relative">
            <input
              type="text"
              placeholder="ভিডিও বা গল্প খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1e26] border border-gray-800 focus:border-[#ff003c] text-xs px-3.5 py-2.5 pl-9 rounded-xl focus:outline-none text-white transition placeholder-gray-500"
            />
            <Search className="absolute left-3 text-gray-500" size={14} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-gray-850 text-gray-300 hover:text-white rounded-xl border border-gray-800"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-[#0d0e15] p-4 flex flex-col gap-3 animate-scaleIn fixed inset-x-0 z-50">
            <div className="flex items-center relative w-full">
              <input
                type="text"
                placeholder="ভিডিও বা গল্প খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1c1e26] border border-gray-800 focus:border-[#ff003c] text-xs px-3 py-2 pl-9 rounded-xl focus:outline-none"
              />
              <Search className="absolute left-3 text-gray-500" size={14} />
            </div>

            <button
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-2 text-xs py-2 px-3 rounded-xl ${
                activeCategory === "all" ? "bg-[#ff003c] text-white" : "text-gray-300"
              }`}
            >
              <Home size={14} />
              <span>হোম পেজ</span>
            </button>

            <div className="text-xs font-bold text-gray-500 border-t border-gray-805/50 pt-2 px-1">ক্যাটাগরিসমূহ</div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); setIsMobileMenuOpen(false); }}
                  className={`text-left text-[11px] py-1.5 px-2 bg-gray-850 rounded-lg ${
                    activeCategory === cat.key ? "border border-[#ff003c] text-[#ff003c]" : "text-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-gray-500 border-t border-gray-805/50 pt-2 px-1">কমিউনিটি লিংক</div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <a href="https://facebook.com" onClick={() => { triggerAdRedirect(); setIsMobileMenuOpen(false); }} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 p-1.5 bg-gray-850 rounded-lg text-gray-300">
                <Facebook size={12} className="text-blue-500" /> Facebook
              </a>
              <a href="https://telegram.org" onClick={() => { triggerAdRedirect(); setIsMobileMenuOpen(false); }} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 p-1.5 bg-gray-850 rounded-lg text-gray-300">
                <Send size={11} className="text-sky-500" /> Telegram
              </a>
            </div>

            <button
              onClick={() => { setIsAdminOpen(true); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 w-full py-2 bg-gray-900 border border-gray-850 text-[#ff003c] font-bold text-xs uppercase tracking-wider rounded-xl mt-2"
            >
              <ShieldCheck size={14} />
              <span>এডমিন প্যানেলে প্রবেশ করুন</span>
            </button>
          </div>
        )}
      </header>

      {/* Hero Announcement Ticker */}
      <section className="bg-red-600 overflow-hidden flex items-center">
        <div className="bg-green-600 text-white px-4 py-2 text-xs font-bold whitespace-nowrap z-10">সতর্কতা:</div>
        <div className="text-white text-xs font-medium py-2 animate-marquee whitespace-nowrap">
          ১৮+ ভিডিও ওয়ার্ল্ডে স্বাগতম! কোনো প্লে বা ডাউনলোড বাটনে ক্লিকের পর অন্য কোনো পেজে নিয়ে গেল ঘাবড়াবেন না, সেটি অ্যাড পেজ। এই পেজ থেকে ব্যাক করে ভিডিও দেখুন। স্বাচ্ছন্দ্যে সম্পূর্ণ বিনোদন ফ্রিতে উপভোগ করতে থাকুন।
        </div>
      </section>

      {/* CORE LAYOUT GRID (Main Area Grid System + Sidebar) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Playable Grid Area - 8 columns */}
        <div id="main-content-region" className="lg:col-span-8 flex flex-col justify-between">
          
          {/* Posts Grid List */}
          <div className="space-y-6">
            {paginatedPosts.map((post, index) => {
              // Calculate global sequencial position e.g. "POST 01"
              const globalSeq = String(startIndex + index + 1).padStart(2, "0");
              const isVideo = post.category.startsWith("videos-");
              const categoryLabel = CATEGORIES.find(c => c.key === post.category)?.label || "জেনারেল";

              return (
                <article 
                  id={`post-card-${post.id}`}
                  key={post.id} 
                  className="bg-[#1c1e26] border border-gray-850 rounded-2xl overflow-hidden hover:border-[#ff003c]/40 transition-all duration-300 shadow-xl group flex flex-col md:flex-row relative"
                >
                  
                  {/* Top Badge (Sequential number) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-[#ff003c] to-[#cc0030] text-white text-[11px] font-mono font-extrabold px-3 py-1 rounded-lg tracking-wider shadow-lg uppercase">
                      POST {(currentPage - 1) * 8 + index + 1}
                    </span>
                  </div>

                  {/* Thumbnail Container 1:1 ratio */}
                  <div 
                    onClick={() => handlePostClick(post)}
                    className="w-full md:w-[320px] aspect-square md:aspect-auto md:h-auto relative overflow-hidden bg-black shrink-0 cursor-pointer"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 opacity-80"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80";
                      }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark Overlay mask */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                    {/* Centered Big Red Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={(e) => handlePlayAction(post, e)}
                        className="bg-[#ff003c] text-white p-3.5 rounded-full shadow-lg shadow-[#ff003c]/30 hover:bg-[#cc0030] focus:outline-none hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex-shrink-0"
                      >
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                      </button>
                    </div>

                    {/* Duration Badge Bottom Right */}
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="bg-black/80 border border-gray-800 text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock size={10} className="text-[#ff003c]" />
                        {post.duration}
                      </span>
                    </div>

                    {/* Left top subtle category label */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="bg-[#ff003c]/20 border border-[#ff003c]/40 text-[#ff003c] font-semibold text-[10px] px-2 py-0.5 rounded">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content & Action Area */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    
                    {/* Text Block */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-4 text-[11px] text-gray-500 font-mono">
                        <span className="flex items-center gap-1 text-gray-400">
                          <Eye size={12} className="text-[#ff003c]" />
                          {post.views.toLocaleString()} বার দেখা হয়েছে
                        </span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString("bn-BD")}</span>
                      </div>

                      {/* Title Caption Bengali - Clickable */}
                      <h3 
                        onClick={() => handlePostClick(post)}
                        className="text-base md:text-lg font-bold text-white leading-snug hover:text-[#ff003c] transition-colors cursor-pointer select-text line-clamp-2"
                      >
                        {post.title}
                      </h3>
                    </div>

                    {/* Buttons Section - PLAY (Green) and DOWNLOAD (Red) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-gray-800/60">
                      <button
                        id={`post-btn-play-${post.id}`}
                        onClick={(e) => handlePlayAction(post, e)}
                        className="bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white py-2 px-4 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Play size={14} fill="currentColor" />
                        <span>PLAY</span>
                      </button>

                      <button
                        id={`post-btn-download-${post.id}`}
                        onClick={(e) => handleDownloadAction(post, e)}
                        className="bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white py-2 px-4 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Download size={14} />
                        <span>DOWNLOAD</span>
                      </button>
                    </div>

                  </div>
                </article>
              );
            })}

            {paginatedPosts.length === 0 && (
              <div className="text-center py-16 bg-[#1c1e26] border border-gray-850 rounded-2xl">
                <span className="text-4xl">🔍</span>
                <h3 className="text-lg font-bold text-white mt-3">কোনো পোস্ট পাওয়া যায়নি</h3>
                <p className="text-gray-400 text-xs mt-1">অনুগ্রহ করে ভিন্ন কোনো শব্দ দিয়ে সার্চ করুন অথবা এডমিন ড্যাশবোর্ড থেকে পোস্ট যোগ করুন।</p>
                <button
                  onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                  className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-semibold rounded-lg transition"
                >
                  ফিড রিসেট করুন
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls - Max 5 posts per page */}
          {totalPages > 1 && (
            <div id="feed-pagination" className="flex items-center justify-center gap-2 mt-8 py-4">
              
              {/* Individual Pages mapping */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => { triggerAdRedirect(); setCurrentPage(pageNum); }}
                    className={`min-w-[36px] h-9 flex items-center justify-center rounded-xl text-xs font-bold transition border cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#ff003c] border-[#ff003c] text-white shadow-lg shadow-[#ff003c]/20"
                        : "bg-[#1c1e26] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                    }`}
                  >
                    [{pageNum}]
                  </button>
                );
              })}

              {/* Next Button */}
              {currentPage < totalPages && (
                <button
                  onClick={() => { 
                    triggerAdRedirect(); 
                    setCurrentPage(prev => Math.min(prev + 1, totalPages)); 
                  }}
                  className="px-4 h-9 flex items-center justify-center bg-[#1c1e26] border border-gray-800 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-gray-700 transition cursor-pointer"
                >
                  [Next »]
                </button>
              )}
            </div>
          )}

        </div>

        {/* SIDEBAR SECTIONS - 4 columns */}
        <aside id="sidebar-region" className="lg:col-span-4 space-y-6">
          
          {/* NEW POSTS WIDGET */}
          <div className="bg-[#1c1e26] border border-gray-850 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 mb-4 flex items-center gap-2">
              <Clock size={15} className="text-[#ff003c]" />
              <span>নতুন ভিডিও</span>
            </h3>

            <div className="space-y-4">
              {recentPosts.slice(0, 3).map((r) => {
                return (
                  <div 
                    key={r.id}
                    onClick={() => handlePostClick(r)}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <img 
                      src={r.image} 
                      alt={r.title} 
                      className="w-16 h-10 object-cover rounded-lg border border-gray-800 group-hover:opacity-80 transition flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80";
                      }}
                    />
                    
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-200 group-hover:text-[#ff003c] transition-colors line-clamp-2 leading-relaxed">
                        {r.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-gray-500 font-mono">
                        <span className="px-1 py-0.2 bg-gray-800 rounded font-semibold text-gray-400">
                          {r.level}
                        </span>
                        <span>•</span>
                        <span>{new Date(r.createdAt).toLocaleDateString("bn-BD")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VIRAL POSTS WIDGET */}
          <div className="bg-[#1c1e26] border border-gray-850 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={15} className="text-amber-500 animate-bounce" />
                <span>ভাইরাল ভিডিও</span>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Viral</span>
            </h3>

            <div className="space-y-3.5">
              {viralPosts.slice(0, 3).map((v) => (
                <div 
                  key={v.id}
                  onClick={() => handlePostClick(v)}
                  className="flex items-start gap-3 group cursor-pointer border-b border-gray-850/50 pb-3 last:border-b-0 last:pb-0"
                >
                  <img 
                      src={v.image} 
                      alt={v.title} 
                      className="w-16 h-10 object-cover rounded-lg border border-gray-800 group-hover:opacity-80 transition flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-[#ff003c] transition-colors leading-relaxed line-clamp-2">
                      {v.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[9px] text-gray-500 font-mono">
                      <span className="px-1 py-0.2 bg-gray-800 rounded font-semibold text-gray-400">
                        {v.level}
                      </span>
                      <span>•</span>
                      <span>{new Date(v.createdAt).toLocaleDateString("bn-BD")}</span>
                    </div>
                  </div>
                </div>
              ))}

              {viralPosts.length === 0 && (
                <div className="text-center py-4 text-xs text-gray-500">
                  কোনো ভাইরাল ভিডিও চিহ্নিত করা হয়নি!
                </div>
              )}
            </div>
          </div>

           {/* Category WIDGET */}
           <div className="bg-[#1c1e26] border border-gray-850 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 mb-4 flex items-center gap-2">
              <span className="text-[#ff003c]">●</span>
              <span>ক্যাটাগরি</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { triggerAdRedirect(); setActiveCategory("all"); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                  activeCategory === "all"
                    ? "bg-[#ff003c] border-[#ff003c] text-white"
                    : "bg-[#0b0c10] border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white"
                }`}
              >
                সব পোস্ট ({posts.length})
              </button>

              {CATEGORIES.map((cat) => {
                const count = posts.filter(p => p.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => { triggerAdRedirect(); setActiveCategory(cat.key); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                      activeCategory === cat.key
                        ? "bg-[#ff003c] border-[#ff003c] text-white"
                        : "bg-[#0b0c10] border-gray-800 text-gray-300 hover:border-gray-750 hover:text-white"
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Community quick access block */}
          <div className="bg-gradient-to-br from-[#1c1e26] to-red-950/10 border border-gray-850 rounded-2xl p-5 shadow-xl text-center space-y-3">
            <span className="text-3xl animate-bounce inline-block">🚀</span>
            <h3 className="text-sm font-bold text-white">নতুন চটি গল্প লিখতে চান?</h3>
            <p className="text-xs text-gray-400">আমাদের এই সাইটে আপনার নিজের লেখা কোনো গল্প বা নতুন রোমাঞ্চকর ভিডিও দিতে চাইলে আজই আমাদের এডমিনের সাথে যোগাযোগ করুন!</p>
            <div className="flex justify-center flex-wrap gap-2 pt-1">
              <a href="https://www.facebook.com/profile.php?id=61591104002454" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">FB</a>
              <a href="https://m.me/j/AbYnW0SyGb4ZCu6D/?send_source=gc%3Acopy_invite_link_t" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">Messenger</a>
              <a href="https://t.me/VideoWorldX" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">TG Channel</a>
              <a href="https://t.me/+cgZxBw7H_oJiMGJl" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">TG Group</a>
              <a href="https://t.me/VideoWorldXBot" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">TG Bot</a>
              <a href="https://whatsapp.com/channel/0029Vb8AjxR5fM5XNA2wlo0W" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">WA Channel</a>
              <a href="https://chat.whatsapp.com/L9hqWllhvmVIiUZwaRvdZG?s=cl&p=a&mlu=4&amv=0" target="_blank" rel="noreferrer" className="bg-[#1c1d26] border border-gray-700 p-2 rounded-lg text-xs hover:border-[#ff003c]">WA Group</a>
            </div>
          </div>

        </aside>

      </main>

      {/* 3. FOOTER SECTION */}
      <footer className="bg-[#0b0c10] border-t border-gray-805/85 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Centered branding with large fire logo 🔥 */}
            <div className="flex items-center gap-2 select-none">
              <span className="text-5xl filter drop-shadow-[0_0_15px_rgba(255,0,60,0.8)] animate-pulse">🔥</span>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                ভিডিও <span className="text-[#ff003c]">ওয়ার্ল্ড</span>
              </span>
            </div>

            {/* English description block */}
            <p className="max-w-2xl text-xs text-gray-400 leading-relaxed">
              ভিডিও ওয়ার্ল্ড একটি ফ্রি ভিডিও দেখার এবং বাংলা চটি গল্প পড়ার বাংলা প্ল্যাটফর্ম। এখনই প্রিমিয়াম বিনোদন উপভোগ করুন।
              সতর্কীকরণ: এখানে প্রকাশিত বিষয়বস্তু শুধুমাত্র বিনোদনের উদ্দেশ্যে এবং কেবলমাত্র ১৮+ প্রাপ্তবয়স্ক দর্শকদের জন্য।
            </p>

            {/* Nav anchors */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <button onClick={() => { setActiveCategory("all"); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition">হোম পেজ</button>
              <span>•</span>
              <button onClick={() => { setActiveCategory("videos-desi"); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition">দেশি ভিডিও</button>
              <span>•</span>
              <button onClick={() => { setActiveCategory("choti-mom"); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition">মা-ছেলে চটি</button>
              <span>•</span>
              <button onClick={() => { triggerAdRedirect(); alert("নীতিমালা আপডেট হচ্ছে..."); }} className="hover:text-white transition">প্রাইভেসি পলিসি</button>
              <span>•</span>
              <button onClick={() => { triggerAdRedirect(); alert("আমাদের সাথে মেইল করুন: contact@videoworld.com"); }} className="hover:text-white transition">বিজ্ঞাপন দিন</button>
            </div>

            {/* Divider line */}
            <div className="w-full max-w-sm h-[1px] bg-gray-800/60" />

            {/* Copyright block */}
            <p className="text-[11px] text-gray-600 font-mono">
              © 2026 Video World. All Rights Reserved. Designed by UI/UX Specialist.
            </p>

          </div>

        </div>
      </footer>

      {/* 4. MODALS (Core interactive views) */}
      
      {/* Dynamic Pop-up Details Reader / Media Player Modal */}
      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onRecentClick={(p) => setSelectedPost(p)}
          recentPosts={posts}
        />
      )}

      {/* Admin Panel Password Login & Config Dashboard */}
      <AdminPanel
        posts={posts}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSavePost={handleSavePost}
        onDeletePost={handleDeletePost}
        onResetPosts={handleResetPosts}
      />

    </div>
  );
}
