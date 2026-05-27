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
                const res = await fetch(`${API_BASE}?r=site/api-general-course-detail&slug=${slugToFetch}`);
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
        <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: "#f8f9fc", minHeight: "100vh", color: "#1a1a2e" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        body { margin: 0; }
        .hover-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(91,78,255,0.13) !important; }
        .nav-link:hover { color: #5b4eff; }
        .btn-primary:hover { background: #4A3EE8 !important; transform: translateY(-1px); }
        .btn-outline:hover { background: #f3f4f6 !important; }
        .college-card:hover { border-color: #5b4eff !important; transform: translateY(-2px); }
        .career-card:hover { border-color: #5b4eff !important; background: #f5f3ff !important; }
        .fade-in { animation: fadeIn 0.5s ease both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

            {/* BREADCRUMB */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 40px", fontSize: 13, color: "#9ca3af" }}>
                <Link to="/" style={{ color: "inherit", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#5b4eff"} onMouseLeave={e => e.target.style.color = "inherit"}>Home</Link> › 
                <Link to="/course" style={{ color: "inherit", transition: "color 0.2s", marginLeft: 4, marginRight: 4 }} onMouseEnter={e => e.target.style.color = "#5b4eff"} onMouseLeave={e => e.target.style.color = "inherit"}>Courses</Link> › 
                <Link to={`/field/${course.category?.toLowerCase()}`} style={{ color: "inherit", transition: "color 0.2s", marginLeft: 4, marginRight: 4 }} onMouseEnter={e => e.target.style.color = "#5b4eff"} onMouseLeave={e => e.target.style.color = "inherit"}>{course.category}</Link> › 
                <span style={{ color: "#5b4eff", fontWeight: 500, marginLeft: 4 }}>{course.short_name}</span>
            </div>

            {/* HERO SECTION */}
            <div style={{ maxWidth: 1200, margin: "0 auto 0", padding: "0 40px 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", background: "white", borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }} className="fade-in">
                    {/* Left */}
                    <div>
                        <span style={{ display: "inline-block", background: "#eef0ff", color: "#5b4eff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, marginBottom: 16 }}>{course.category}</span>
                        <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, color: "#1a1a2e", marginBottom: 6 }}>{course.short_name}</h1>
                        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#374151", marginBottom: 16 }}>{course.full_name}</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500 }}>
                                <span style={{ color: "#f59e0b", fontSize: 16 }}>★</span> {course.rating} ({course.reviews_count} Reviews)
                            </span>
                            <span style={{ width: 1, height: 18, background: "#e5e7eb" }} />
                            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#ef4444" }}>
                                {course.badge}
                            </span>
                        </div>
                        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
                            {course.short_description}
                        </p>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button
                                className="btn-primary"
                                onClick={() => setEnquired(true)}
                                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: enquired ? "#22c55e" : "#5b4eff", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                            >
                                💬 {enquired ? "Enquiry Sent!" : "Enquire Now"}
                            </button>
                            <button
                                className="btn-outline"
                                onClick={() => setWishlist(!wishlist)}
                                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "white", color: wishlist ? "#ef4444" : "#374151", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                            >
                                {wishlist ? "❤️" : "🤍"} {wishlist ? "Wishlisted" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                    {/* Right: Image placeholder */}
                    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4338ca 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center", color: "white" }}>
                            <div style={{ fontSize: 80 }}>🎓</div>
                            <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>{course.short_name} — {course.full_name}</div>
                        </div>
                        <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(255,255,255,0.95)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                            🖼️ Image Gallery &nbsp;<strong>8 Photos</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS BAR */}
            <div style={{ maxWidth: 1200, margin: "0 auto 32px", padding: "0 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                    {STATS.map((s, i) => (
                        <div key={s.label} style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 14, borderRight: i < 3 ? "1px solid #f0f0f5" : "none" }}>
                            <div style={{ width: 44, height: 44, background: "#eef0ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{s.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ABOUT */}
            <div style={{ maxWidth: 1200, margin: "0 auto 32px", padding: "0 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, background: "white", borderRadius: 20, padding: 36, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                    <div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>About {course.short_name}</h3>
                        <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.8, marginBottom: 16 }}>
                            {course.about_description}
                        </p>
                        <a href="#" style={{ color: "#5b4eff", fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>Read More →</a>
                    </div>
                    <div style={{ background: "linear-gradient(135deg,#eef0ff,#e8f5ff)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, minHeight: 180 }}>
                        ⚙️
                    </div>
                </div>
            </div>

            {/* CAREER OPPORTUNITIES */}
            <div style={{ maxWidth: 1200, margin: "0 auto 32px", padding: "0 40px" }}>
                <div style={{ background: "white", borderRadius: 20, padding: 36, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Career Opportunities</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
                        {CAREERS.map(c => (
                            <div key={c.title} className="career-card hover-card" style={{ padding: "20px 14px", border: "1.5px solid #f0f0f5", borderRadius: 14, textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon || "💼"}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
                                <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>{c.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ELIGIBILITY + FEES + SPECIALIZATIONS */}
            <div style={{ maxWidth: 1200, margin: "0 auto 32px", padding: "0 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                    {/* Eligibility */}
                    <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Eligibility</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {ELIGIBILITY.map(e => (
                                <div key={e} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                    <span style={{ color: "#22c55e", marginTop: 2, flexShrink: 0 }}>✅</span>
                                    <span style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>{e}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fees */}
                    <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Average Fees</h4>
                        <div style={{ background: "linear-gradient(135deg,#eef0ff,#e8f5ff)", borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>💰</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: "#5b4eff", marginBottom: 6 }}>{course.fees_range}</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>/ Year</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>Fees may vary from college to college.</div>
                        </div>
                    </div>

                    {/* Specializations */}
                    <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Top Specializations</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                            {SPECIALIZATIONS.map((s, index) => (
                                <div key={s.label || s} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#374151", fontWeight: 500 }}>
                                    {/* Use icon from DB if available, else use a generated icon from frontend */}
                                    <span style={{ fontSize: 14 }}>{s.icon || getSpecIcon(index)}</span> {s.label || s}
                                </div>
                            ))}
                        </div>
                        <a href="#" style={{ color: "#5b4eff", fontWeight: 600, fontSize: 13 }}>View All Specializations →</a>
                    </div>
                </div>
            </div>

            {/* TOP COLLEGES */}
            <div style={{ maxWidth: 1200, margin: "0 auto 32px", padding: "0 40px" }}>
                <div style={{ background: "white", borderRadius: 20, padding: 36, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700 }}>Top Colleges Offering This Course</h3>
                        <a href="#" style={{ color: "#5b4eff", fontSize: 13, fontWeight: 600 }}>View All Colleges →</a>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
                        {COLLEGES.map(c => (
                            <div key={c.name} className="college-card hover-card" style={{ padding: "20px 12px", border: "1.5px solid #f0f0f5", borderRadius: 14, textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                                <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,#eef0ff,#e8f5ff)", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{c.icon || "🏛️"}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.3 }}>{c.name}</div>
                                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>{c.city}</div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                                    <Stars rating={c.rating} />
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{c.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA BANNER */}
            <div style={{ maxWidth: 1200, margin: "0 auto 48px", padding: "0 40px" }}>
                <div style={{ background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)", borderRadius: 20, padding: "36px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        <div style={{ fontSize: 56 }}>🎓</div>
                        <div>
                            <h3 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 6 }}>Not sure which course is right for you?</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>Get expert guidance from our counsellors and<br />make the right choice for your future.</p>
                        </div>
                    </div>
                    <button className="btn-primary" style={{ padding: "14px 28px", background: "white", color: "#5b4eff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                        Talk to Counsellor →
                    </button>
                </div>
            </div>

        </div>
    );
}