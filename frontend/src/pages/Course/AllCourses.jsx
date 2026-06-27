import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, Laptop, BookOpen, FlaskConical, Briefcase, Pill, Palette, Settings, ChevronRight, Zap, ArrowLeft } from "lucide-react";
import API_BASE from "../../config/api";

const iconMap = {
  "B.Tech": GraduationCap,
  "M.Tech": GraduationCap,
  "MBA": Briefcase,
  "B.Sc": FlaskConical,
  "BCA": Laptop,
  "B.Pharm": Pill,
  "Diploma": Settings,
  "B.Ed": BookOpen,
  "BA": Palette,
  "MBBS": Pill,
  "M.Sc": FlaskConical,
  "Ph.D": GraduationCap,
  "E-Master": Briefcase,
  "B.Tech & M.Tech Dual Degree": GraduationCap,
  "PG (Medical)": Pill,
  "MD": Pill,
  "MS": Pill,
  "Allied Medical Courses": Pill,
  "MCA": Laptop
};

const colorMap = {
  "B.Tech": { c: "text-indigo-600", bg: "bg-indigo-50" },
  "M.Tech": { c: "text-indigo-600", bg: "bg-indigo-50" },
  "MBA": { c: "text-teal-600", bg: "bg-teal-50" },
  "B.Sc": { c: "text-amber-600", bg: "bg-amber-50" },
  "BCA": { c: "text-pink-600", bg: "bg-pink-50" },
  "B.Pharm": { c: "text-blue-600", bg: "bg-blue-50" },
  "Diploma": { c: "text-amber-600", bg: "bg-amber-50" },
  "B.Ed": { c: "text-emerald-600", bg: "bg-emerald-50" },
  "BA": { c: "text-purple-600", bg: "bg-purple-50" },
  "MBBS": { c: "text-red-600", bg: "bg-red-50" },
  "M.Sc": { c: "text-amber-600", bg: "bg-amber-50" },
  "Ph.D": { c: "text-indigo-600", bg: "bg-indigo-50" },
  "E-Master": { c: "text-teal-600", bg: "bg-teal-50" },
  "B.Tech & M.Tech Dual Degree": { c: "text-indigo-600", bg: "bg-indigo-50" },
  "PG (Medical)": { c: "text-red-600", bg: "bg-red-50" },
  "MD": { c: "text-red-600", bg: "bg-red-50" },
  "MS": { c: "text-red-600", bg: "bg-red-50" },
  "Allied Medical Courses": { c: "text-blue-600", bg: "bg-blue-50" },
  "MCA": { c: "text-pink-600", bg: "bg-pink-50" }
};

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: token } : {};
        const res = await fetch(`${API_BASE}?r=site/api-courses`, { headers });
        if (!res.ok) throw new Error("Failed to fetch courses");
        const json = await res.json();
        if (json.status === "success") {
          setCourses(json.data);
        } else {
          throw new Error(json.message || "Something went wrong");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ["All Categories", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  const filteredCourses = courses.filter((c) => {
    const q = searchQuery.toLowerCase();
    const shortName = c.short_name ? c.short_name.toLowerCase() : "";
    const fullName = c.full_name ? c.full_name.toLowerCase() : "";
    const matchesSearch = !q || shortName.includes(q) || fullName.includes(q);
    const matchesCategory = selectedCategory === "All Categories" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8F8FC] min-h-screen font-sans pb-16 pt-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Return Button */}
        <div className="mb-6">
          <Link to="/course" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-semibold text-sm">
            <ArrowLeft size={16} /> Back to Courses Page
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#071B52]">All Available Courses</h1>
          <p className="text-gray-500 text-sm mt-2">Explore the complete list of courses offered by top colleges in Odisha</p>
        </div>

        {/* Filter controls */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none text-gray-700 focus:border-indigo-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-100 text-red-500 max-w-md mx-auto p-6 shadow-sm">
            <p className="font-semibold text-lg mb-2">Error Loading Courses</p>
            <p className="text-xs text-red-400">{error}</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400 shadow-sm">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm font-semibold">No courses match your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((c, i) => {
              const shortName = c.short_name || "";
              const IconComponent = iconMap[shortName] || GraduationCap;
              const colorInfo = colorMap[shortName] || { c: "text-indigo-600", bg: "bg-indigo-50" };
              const slug = c.slug || shortName.toLowerCase().replace(/\./g, "");
              
              return (
                <Link
                  key={c.id || i}
                  to={`/course-detail/${slug}`}
                  className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {c.badge && (
                      <div className="self-start mb-3">
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                          {c.badge}
                        </span>
                      </div>
                    )}
                    <div className={`${colorInfo.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <span className={colorInfo.c}>
                        <IconComponent size={22} />
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#071B52] group-hover:text-indigo-600 transition-colors">
                      {shortName}
                    </h4>
                    <p className="text-xs text-gray-400 mb-3">{c.full_name || ""}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {c.short_description || ""}
                    </p>
                  </div>
                  
                  <div>
                    <div className="space-y-1.5 mb-4">
                      <p className="text-xs font-semibold text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        {c.duration || "3 Years"} Program
                      </p>
                      <p className="text-xs font-semibold text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        {c.fees_range ? `Fees: ${c.fees_range}` : "Affordable Fees"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Colleges</span>
                      <span className="text-indigo-600 font-bold text-xs flex items-center gap-1">
                        Details <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
