import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE from "../../config/api";

const Stars = ({ rating }) => {
    const rounded = Math.round(Number(rating) || 0);
    return (
        <span style={{ color: "#f59e0b", fontSize: 13 }}>
            {"★".repeat(rounded)}{"☆".repeat(5 - rounded)}
        </span>
    );
};

export default function CourseDetail() {
    const { courseSlug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [wishlist, setWishlist] = useState(false);
    const [enquired, setEnquired] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [courseSlug]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const slugToFetch = courseSlug || 'btech';
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: token } : {};
                const res = await fetch(`${API_BASE}?r=site/api-general-course-detail&slug=${slugToFetch}`, { headers });
                const result = await res.json();

                if (result.status === 'success') {
                    setCourse(result.data);
                } else {
                    setError(result.message || "Course not found");
                }
            } catch (err) {
                setError("Failed to fetch course details");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseSlug]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-[#5b4eff] font-bold text-xl">Loading course details...</div>;
    }

    if (error || !course) {
        return <div className="flex justify-center items-center min-h-screen text-red-500 font-bold text-xl">{error || "Course not found"}</div>;
    }

    const CAREERS = course.career_opportunities || [];
    const ELIGIBILITY = course.eligibility || [];
    const SPECIALIZATIONS = course.top_specializations || [];
    const COLLEGES = course.top_colleges || [];

    const STATS = [
        { icon: "🕐", label: "Duration", value: course.duration },
        { icon: "🎓", label: "Degree", value: course.degree },
        { icon: "📋", label: "Mode", value: course.mode },
        { icon: "📊", label: "Level", value: course.level },
    ];

    // Generic icons for specializations if not provided in DB
    const getSpecIcon = (index) => {
        const icons = ["</>", "⚙️", "⚡", "🏗️", "📡", "💻", "🔬", "🧪"];
        return icons[index % icons.length];
    };

    return (
        <div className="font-sans bg-[#f8f9fc] min-h-screen text-[#1a1a2e]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .fade-in { animation: fadeIn 0.5s ease both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

            {/* BREADCRUMB */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-3 md:py-4 text-[13px] text-gray-400 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="text-inherit hover:text-[#5b4eff] transition-colors duration-200">Home</Link> <span className="mx-1">›</span>
                <Link to="/course" className="text-inherit hover:text-[#5b4eff] transition-colors duration-200 mx-1">Courses</Link> <span className="mx-1">›</span>
                <Link to={`/field/${course.category?.toLowerCase()}`} className="text-inherit hover:text-[#5b4eff] transition-colors duration-200 mx-1">{course.category}</Link> <span className="mx-1">›</span>
                <span className="text-[#5b4eff] font-medium ml-1">{course.short_name}</span>
            </div>

            {/* HERO SECTION */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pb-6 md:pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 md:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.06)] fade-in">
                    {/* Left */}
                    <div>
                        <span className="inline-block bg-[#eef0ff] text-[#5b4eff] text-xs font-semibold px-3 py-1 rounded-full mb-4">{course.category}</span>
                        <h1 className="text-4xl md:text-[52px] font-extrabold leading-tight text-[#1a1a2e] mb-2 md:mb-1.5">{course.short_name}</h1>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">{course.full_name}</h2>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                            <span className="flex items-center gap-1.5 text-sm font-medium">
                                <span className="text-amber-500 text-base">★</span> {course.rating} ({course.reviews_count} Reviews)
                            </span>
                            <span className="hidden md:inline-block w-px h-[18px] bg-gray-200" />
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
                                🔥 {course.badge}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 leading-[1.7] mb-6 md:mb-7 max-w-[420px]">
                            {course.short_description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setEnquired(true)}
                                className={`flex items-center justify-center gap-2 px-6 py-3 text-white border-none rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-[1px] ${enquired ? 'bg-green-500' : 'bg-[#5b4eff] hover:bg-[#4A3EE8]'}`}
                            >
                                💬 {enquired ? "Enquiry Sent!" : "Enquire Now"}
                            </button>
                            <button
                                onClick={() => setWishlist(!wishlist)}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-[1.5px] border-gray-200 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100"
                                style={{ color: wishlist ? "#ef4444" : "#374151" }}
                            >
                                {wishlist ? "❤️" : "🤍"} {wishlist ? "Wishlisted" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                    {/* Right: Image placeholder */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] flex items-center justify-center mt-6 lg:mt-0">
                        <div className="text-center text-white p-4">
                            <div className="text-6xl md:text-[80px]">🎓</div>
                            <div className="text-xs md:text-sm opacity-70 mt-2">{course.short_name} — {course.full_name}</div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-3.5 left-3 md:left-3.5 bg-white/95 rounded-xl px-3 md:px-3.5 py-2 flex items-center gap-2 text-xs md:text-[13px] font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                            🖼️ Image Gallery &nbsp;<strong>8 Photos</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS BAR */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                    {STATS.map((s, i) => (
                        <div key={s.label} className={`p-4 md:p-5 lg:p-7 flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-3 md:gap-3.5 ${i % 2 === 0 ? 'border-r border-gray-100' : ''} ${i < 2 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}>
                            <div className="w-10 h-10 md:w-11 md:h-11 bg-[#eef0ff] rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0">{s.icon}</div>
                            <div>
                                <div className="text-[10px] md:text-[11px] text-gray-400 font-medium mb-0.5">{s.label}</div>
                                <div className="text-sm md:text-[15px] font-bold text-[#1a1a2e]">{s.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ABOUT */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-8">
                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-7 bg-white rounded-2xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-3.5">About {course.short_name}</h3>
                        <p className="text-[13px] md:text-sm text-gray-600 leading-[1.8] mb-4">
                            {course.about_description}
                        </p>
                        <a href="#" className="text-[#5b4eff] font-semibold text-sm inline-flex items-center gap-1.5 hover:underline">Read More →</a>
                    </div>
                    <div className="bg-gradient-to-br from-[#eef0ff] to-[#e8f5ff] rounded-2xl flex items-center justify-center text-[64px] min-h-[180px] w-full">
                        ⚙️
                    </div>
                </div>
            </div>

            {/* CAREER OPPORTUNITIES */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-8">
                <div className="bg-white rounded-2xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                    <h3 className="text-lg md:text-xl font-bold mb-6">Career Opportunities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {CAREERS.map(c => (
                            <div key={c.title} className="p-4 md:py-5 md:px-3.5 border-[1.5px] border-[#f0f0f5] rounded-2xl text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(91,78,255,0.13)] hover:border-[#5b4eff] hover:bg-[#f5f3ff]">
                                <div className="text-[28px] mb-2.5">{c.icon || "💼"}</div>
                                <div className="text-xs md:text-[13px] font-bold text-[#1a1a2e] mb-2 leading-[1.3]">{c.title}</div>
                                <div className="text-[10px] md:text-[11px] text-gray-500 leading-[1.5] line-clamp-2">{c.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ELIGIBILITY + FEES + SPECIALIZATIONS */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Eligibility */}
                    <div className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                        <h4 className="text-base font-bold mb-4.5">Eligibility</h4>
                        <div className="flex flex-col gap-3">
                            {ELIGIBILITY.map(e => (
                                <div key={e} className="flex gap-2.5 items-start">
                                    <span className="text-green-500 mt-0.5 flex-shrink-0 text-sm">✅</span>
                                    <span className="text-[13px] text-gray-600 leading-[1.5]">{e}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fees */}
                    <div className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                        <h4 className="text-base font-bold mb-4.5">Average Fees</h4>
                        <div className="bg-gradient-to-br from-[#eef0ff] to-[#e8f5ff] rounded-2xl p-6 text-center">
                            <div className="text-[11px] text-gray-400 mb-2">💰</div>
                            <div className="text-[22px] font-extrabold text-[#5b4eff] mb-1.5">{course.fees_range}</div>
                            <div className="text-sm font-semibold text-gray-700">/ Year</div>
                            <div className="text-[11px] text-gray-400 mt-2">Fees may vary from college to college.</div>
                        </div>
                    </div>

                    {/* Specializations */}
                    <div className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                        <h4 className="text-base font-bold mb-4.5">Top Specializations</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 mb-3.5">
                            {SPECIALIZATIONS.map((s, index) => (
                                <div key={s.label || s} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                                    <span className="text-sm">{s.icon || getSpecIcon(index)}</span> <span className="truncate">{s.label || s}</span>
                                </div>
                            ))}
                        </div>
                        <a href="#" className="text-[#5b4eff] font-semibold text-[13px] hover:underline">View All Specializations →</a>
                    </div>
                </div>
            </div>

            {/* TOP COLLEGES */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-8">
                <div className="bg-white rounded-2xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                        <h3 className="text-lg md:text-xl font-bold">Top Colleges Offering This Course</h3>
                        <a href="#" className="text-[#5b4eff] text-[13px] font-semibold hover:underline">View All Colleges →</a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {COLLEGES.map(c => (
                            <div key={c.name} className="p-4 md:py-5 md:px-3 border-[1.5px] border-[#f0f0f5] rounded-2xl text-center cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5b4eff] hover:shadow-[0_8px_24px_rgba(91,78,255,0.13)]">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#eef0ff] to-[#e8f5ff] rounded-full mx-auto mb-3 flex items-center justify-center text-xl md:text-2xl">{c.icon || "🏛️"}</div>
                                <div className="text-xs md:text-[13px] font-bold text-[#1a1a2e] mb-1 leading-[1.3] truncate">{c.name}</div>
                                <div className="text-[10px] md:text-[11px] text-gray-400 mb-2 truncate">{c.city}</div>
                                <div className="flex items-center justify-center gap-1">
                                    <Stars rating={c.rating} />
                                    <span className="text-xs font-semibold text-gray-700">{c.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA BANNER */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-12">
                <div className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] rounded-2xl p-6 md:p-9 lg:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-0">
                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                        <div className="text-[48px] md:text-[56px]">🎓</div>
                        <div>
                            <h3 className="text-[19px] md:text-[22px] font-extrabold text-white mb-1.5 leading-tight">Not sure which course is right for you?</h3>
                            <p className="text-[13px] md:text-sm text-white/80 leading-[1.5]">Get expert guidance from our counsellors and<br className="hidden sm:block" />make the right choice for your future.</p>
                        </div>
                    </div>
                    <button className="px-6 md:px-7 py-3 md:py-3.5 bg-white text-[#5b4eff] border-none rounded-xl text-[13px] md:text-sm font-bold cursor-pointer whitespace-nowrap transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
                        Talk to Counsellor →
                    </button>
                </div>
            </div>

        </div>
    );
}