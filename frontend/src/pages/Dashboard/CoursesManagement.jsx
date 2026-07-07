import { useState, useEffect } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";
import { FaPlus, FaSearch, FaFilter, FaRedo, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/admin/Pagination";
import AddCourseModel from "../../components/admin/AddCourseModel";
import EditCourseModel from "../../components/admin/EditCourseModel";

const levelColors = {
  undergraduate: "bg-blue-100 text-blue-800",
  postgraduate: "bg-purple-100 text-purple-800",
  doctoral: "bg-amber-100 text-amber-800",
};

const getFieldColorClass = (fieldName) => {
  if (!fieldName) return "bg-gray-50 text-gray-700 ring-1 ring-gray-200";
  const lower = fieldName.toLowerCase();
  if (lower.includes("engineering") || lower.includes("technology")) return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  if (lower.includes("management") || lower.includes("commerce")) return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (lower.includes("medical") || lower.includes("health") || lower.includes("science")) return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
  return "bg-orange-50 text-orange-700 ring-1 ring-orange-200";
};

const getCourseIcon = (courseCode) => {
  if (!courseCode) return "📚";
  const code = courseCode.toUpperCase();
  if (code.includes("B.TECH") || code.includes("M.TECH") || code.includes("B.E.")) return "⚙️";
  if (code.includes("MBA") || code.includes("BBA")) return "💼";
  if (code.includes("MBBS") || code.includes("NURSING") || code.includes("PHARMACY")) return "🏥";
  if (code.includes("BCA") || code.includes("MCA") || code.includes("BSC")) return "💻";
  return "📚";
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return { date: "N/A", time: "" };
  const dateObj = new Date(dateStr.replace(/-/g, "/"));
  if (isNaN(dateObj.getTime())) return { date: dateStr, time: "" };
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours ? hours : 12;
  hours = hours > 12 ? hours - 12 : hours;
  return {
    date: `${day} ${month} ${year}`,
    time: `${hours}:${minutes} ${ampm}`
  };
};

export default function CoursesManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [pageWindowStart, setPageWindowStart] = useState(1);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json.status === "success") {
        fetchCourses();
      } else {
        alert(json.message || "Failed to delete course.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting course.");
    }
  };

  useEffect(() => {
    setPageWindowStart(1);
  }, [search, perPage]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/get-courses`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const result = await res.json();
      if (result.status === "success") {
        setCourses(result.data || []);
      } else {
        throw new Error(result.message || "Failed to fetch courses.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Compute live stats based on DB data
  const totalCount = courses.length;
  const ugCount = courses.filter(c => c.degree_level?.toLowerCase() === "undergraduate").length;
  const pgCount = courses.filter(c => c.degree_level?.toLowerCase() === "postgraduate").length;
  const otherCount = totalCount - ugCount - pgCount;

  const STATS = [
    { label: "Total Courses", value: totalCount, sub: "All Courses", color: "from-blue-500 to-blue-600", icon: "📚", trend: "↗" },
    { label: "Undergraduate", value: ugCount, sub: "Courses", color: "from-emerald-500 to-emerald-600", icon: "🎓", trend: "↗" },
    { label: "Postgraduate", value: pgCount, sub: "Courses", color: "from-violet-500 to-violet-600", icon: "📖", trend: "↗" },
    { label: "Diploma/Other", value: otherCount, sub: "Courses", color: "from-amber-500 to-amber-600", icon: "📄", trend: "↗" },
  ];

  // Filtering
  const filteredCourses = courses.filter((c) => {
    const term = search.toLowerCase();
    return (
      (c.name || "").toLowerCase().includes(term) ||
      (c.field_name || "").toLowerCase().includes(term) ||
      (c.degree_level || "").toLowerCase().includes(term)
    );
  });

  // Pagination
  const totalFiltered = filteredCourses.length;
  const totalPages = Math.ceil(totalFiltered / perPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Courses Management</h1>
          <nav className="flex items-center gap-1.5 mt-1 text-sm">
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">Dashboard</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-300"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-slate-400">Courses</span>
          </nav>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-blue-200 transition-all"
        >
          <FaPlus />
          Add Course
        </button>
        {showAddModal && (
          <AddCourseModel
            onClose={() => setShowAddModal(false)}
            onCreated={() => {
              setShowAddModal(false);
              fetchCourses();
            }}
          />
        )}
        {editingCourse && (
          <EditCourseModel
            course={editingCourse}
            onClose={() => setEditingCourse(null)}
            onUpdated={() => {
              setEditingCourse(null);
              fetchCourses();
            }}
          />
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3.5 group hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl shadow-sm`}>
              {stat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800 leading-tight">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
            <div className="text-emerald-500 text-xs font-bold opacity-60">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-50 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <FaSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by course name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-slate-700 placeholder-slate-400 transition"
            />
          </div>
          {["Select Field", "Select Degree Level", "Select Status"].map((ph) => (
            <select key={ph} className="pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-slate-500 appearance-none cursor-pointer transition">
              <option>{ph}</option>
            </select>
          ))}
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200">
            <FaFilter />
            Filter
          </button>
          <button
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 text-slate-500 text-sm font-medium rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
          >
            <FaRedo />
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["#", "Course Name", "Field", "Duration", "Degree Level", "Status", "Created At", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      {h}
                      {["Course Name", "Field", "Duration", "Degree Level", "Status", "Created At"].includes(h) && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-slate-300"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400 font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading courses...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-red-500 font-medium">
                    Error loading courses: {error}
                  </td>
                </tr>
              ) : paginatedCourses.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400 font-medium">
                    No courses found.
                  </td>
                </tr>
              ) : (
                paginatedCourses.map((course, idx) => {
                  const parts = (course.name || "").split(" in ");
                  const courseCode = parts[0] || "General";
                  const subName = parts[1] || course.specialization_name || "General Course";
                  const formatted = formatDateTime(course.created_at);

                  return (
                    <tr key={course.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-5 py-4 text-sm text-slate-400 font-medium">
                        {(currentPage - 1) * perPage + idx + 1}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-white flex items-center justify-center text-base shadow-sm transition-colors border border-slate-100">
                            {getCourseIcon(courseCode)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{courseCode}</p>
                            <p className="text-xs text-slate-400">{subName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getFieldColorClass(course.field_name)}`}>
                          {course.field_name || "General"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 font-medium">{course.duration || "N/A"}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          levelColors[course.degree_level?.toLowerCase()] || "bg-gray-100 text-gray-700"
                        }`}>
                          {course.degree_level || "Undergraduate"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold ${
                          course.status === "Active" ? "text-emerald-600" : "text-gray-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            course.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                          }`}></span>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs font-medium text-slate-600">{formatted.date}</p>
                        <p className="text-xs text-slate-400">{formatted.time}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => setEditingCourse(course)}
                            className="p-2 rounded-lg text-amber-400 hover:bg-amber-50 hover:text-amber-600 transition-colors" title="Edit">
                            <FaEdit className="text-sm" />
                          </button>
                          <button 
                            onClick={() => handleDelete(course.id)}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
          rowsPerPage={perPage}
          setRowsPerPage={setPerPage}
          totalItems={totalFiltered}
        />
      </div>
    </div>
  );
}