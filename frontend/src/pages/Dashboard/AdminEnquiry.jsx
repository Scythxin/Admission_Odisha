import { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import {
  FaEnvelope, FaUserPlus, FaPhoneAlt, FaCheck,
  FaSearch, FaCalendarAlt, FaFilter, FaRedo,
  FaFileExport, FaEye, FaChevronDown, FaTrash,
  FaUser, FaUniversity, FaGraduationCap, FaQuestionCircle,
  FaFileAlt, FaTimes, FaWhatsapp
} from "react-icons/fa";

/* ── STAT CARD ── */
const StatCard = ({ icon, label, value, iconBg }) => (
  <div className="bg-white rounded-2xl p-5 flex-1 min-w-[200px] border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:translate-y-[-2px]">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-3xl font-extrabold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

export default function AdminEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [activeFilterSearch, setActiveFilterSearch] = useState("");
  const [activeFilterDate, setActiveFilterDate] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0
  });

  // For Details Modal
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  async function fetchEnquiries() {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        r: "dashboard/get-enquiries",
        search: activeFilterSearch,
        date: activeFilterDate,
        page: page.toString(),
        perPage: perPage.toString()
      });

      const res = await fetch(`${API_BASE}?${queryParams.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const result = await res.json();

      if (result.status === "success") {
        setEnquiries(result.data);
        setTotal(result.total);
        if (result.stats) {
          setStats(result.stats);
        }
      } else {
        throw new Error(result.message || "Failed to fetch enquiries.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, [page, perPage, activeFilterSearch, activeFilterDate]);

  const handleFilter = () => {
    setPage(1);
    setActiveFilterSearch(search);
    setActiveFilterDate(date);
  };

  const handleReset = () => {
    setSearch("");
    setDate("");
    setPage(1);
    setActiveFilterSearch("");
    setActiveFilterDate("");
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}?r=dashboard/update-enquiry-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      const result = await res.json();
      if (result.status === "success") {
        // Optimistic state update
        setEnquiries(prev => prev.map(e => e.id == id ? { ...e, status: newStatus } : e));
        setViewEnquiry(prev => prev && prev.id == id ? { ...prev, status: newStatus } : prev);
        // Refetch stats to update totals
        fetchEnquiries();
      } else {
        throw new Error(result.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Error updating status");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}?r=dashboard/delete-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete enquiry");
      const result = await res.json();
      if (result.status === "success") {
        setDeleteId(null);
        fetchEnquiries();
      } else {
        throw new Error(result.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Error deleting enquiry");
    }
  };

  const handleExport = () => {
    // Generate CSV contents
    const headers = ["ID", "Name", "Phone", "Course", "College", "Location", "Guidance", "Status", "Date"];
    const rows = enquiries.map((e, idx) => [
      e.id,
      `"${e.full_name}"`,
      e.phone,
      `"${e.courses || ''}"`,
      `"${e.colleges || ''}"`,
      `"${e.location || ''}"`,
      e.guidance,
      e.status,
      e.created_at
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Enquiries_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to format date
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr.replace(/-/g, "/")); // format safe for JS date parser
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return {
      date: `${day} ${month} ${year}`,
      time: `${hours}:${minutes} ${ampm}`
    };
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="space-y-6 font-sans">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Enquiry</h1>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-gray-500 font-semibold">Enquiry</span>
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-md hover:shadow-lg hover:scale-[1.02]"
        >
          <FaFileExport className="text-xs" /> Export
        </button>
      </div>

      {/* ── FILTERS ── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, phone, course or college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Date Selector */}
        <div className="relative w-full md:w-64">
          <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex w-full md:w-auto gap-3">
          <button
            onClick={handleFilter}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-md shadow-blue-100"
          >
            <FaFilter className="text-xs" /> Filter
          </button>
          <button
            onClick={handleReset}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl transition"
          >
            <FaRedo className="text-xs" /> Reset
          </button>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<FaEnvelope className="text-blue-600" />}
          iconBg="bg-blue-50"
          label="Total Enquiry"
          value={stats.total}
        />
        <StatCard
          icon={<FaUserPlus className="text-emerald-600" />}
          iconBg="bg-emerald-50"
          label="New"
          value={stats.new}
        />
        <StatCard
          icon={<FaPhoneAlt className="text-purple-600" />}
          iconBg="bg-purple-50"
          label="Contacted"
          value={stats.contacted}
        />
        <StatCard
          icon={<FaCheck className="text-orange-600" />}
          iconBg="bg-orange-50"
          label="Closed"
          value={stats.closed}
        />
      </div>

      {/* ── TABLE CONTAINER ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-5 py-4 w-10">#</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Phone</th>
                <th className="px-4 py-4">Course</th>
                <th className="px-4 py-4">College</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4 w-24">Guidance</th>
                <th className="px-4 py-4 w-32">Status</th>
                <th className="px-4 py-4 w-40">Date</th>
                <th className="px-5 py-4 w-28 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-12 text-gray-500 font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading enquiries...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="10" className="text-center py-12 text-red-500 font-medium">
                    Error loading enquiries: {error}
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-12 text-gray-400 font-medium">
                    No enquiries found matching filters.
                  </td>
                </tr>
              ) : (
                enquiries.map((e, idx) => {
                  const formatted = formatDateTime(e.created_at);
                  const isYes = e.guidance?.toLowerCase() === "yes";

                  return (
                    <tr key={e.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-4 text-gray-400 font-medium">
                        {(page - 1) * perPage + idx + 1}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {e.full_name}
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-medium">
                        {e.phone}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {e.courses || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {e.colleges || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {e.location || "N/A"}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${isYes
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-500"
                          }`}>
                          {isYes && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                          {isYes ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative inline-block w-full">
                          <select
                            value={e.status || "New"}
                            onChange={(event) => handleStatusChange(e.id, event.target.value)}
                            className={`appearance-none w-full px-3 py-1.5 pr-8 rounded-lg text-xs font-bold border-0 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 transition-all ${e.status === "New"
                                ? "bg-blue-50 text-blue-600 focus:ring-blue-300"
                                : e.status === "Contacted"
                                  ? "bg-orange-50 text-orange-600 focus:ring-orange-300"
                                  : "bg-emerald-50 text-emerald-600 focus:ring-emerald-300"
                              }`}
                          >
                            <option value="New" className="bg-white text-gray-700 font-medium">New</option>
                            <option value="Contacted" className="bg-white text-gray-700 font-medium">Contacted</option>
                            <option value="Closed" className="bg-white text-gray-700 font-medium">Closed</option>
                          </select>
                          <FaChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[9px] ${e.status === "New"
                              ? "text-blue-500"
                              : e.status === "Contacted"
                                ? "text-orange-500"
                                : "text-emerald-500"
                            }`} />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-800 font-semibold">{formatted.date}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{formatted.time}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setViewEnquiry(e)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition"
                            title="View Details"
                          >
                            <FaEye className="text-xs" />
                          </button>
                          <button
                            onClick={() => setDeleteId(e.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition"
                            title="Delete"
                          >
                            <FaTrash className="text-xs" />
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

        {/* ── PAGINATION BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/40 gap-4">
          <p className="text-xs text-gray-400 font-semibold">
            Showing {total === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} entries
          </p>

          <div className="flex items-center gap-5">
            {/* Page Count Selection */}
            <div className="relative flex items-center gap-2">
              <select
                value={perPage}
                onChange={(event) => {
                  setPerPage(parseInt(event.target.value));
                  setPage(1);
                }}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-gray-600 outline-none cursor-pointer focus:border-blue-500 transition"
              >
                <option value="5">5/page</option>
                <option value="10">10/page</option>
                <option value="20">20/page</option>
                <option value="50">50/page</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-gray-500" />
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition text-xs font-bold"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                // simple pagination logic to limit number of buttons
                if (totalPages > 5 && Math.abs(page - n) > 1 && n !== 1 && n !== totalPages) {
                  if (n === 2 || n === totalPages - 1) {
                    return <span key={n} className="text-xs text-gray-400 px-1 font-bold">...</span>;
                  }
                  return null;
                }
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-extrabold transition ${page === n
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition text-xs font-bold"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DETAILS MODAL ── */}
      {viewEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-visible transform transition-all duration-300 scale-100 flex flex-col">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <FaFileAlt className="text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Enquiry Details</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Here are the details of this enquiry.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setViewEnquiry(null);
                  setStatusDropdownOpen(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-visible">
              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">Enquiry Information</h4>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="grid grid-cols-[160px_20px_1fr] items-center">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <FaUser className="text-blue-600 text-xs shrink-0" /> Full Name
                    </span>
                    <span className="text-gray-400 text-xs text-center">:</span>
                    <span className="text-xs font-bold text-gray-900">{viewEnquiry.full_name}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="grid grid-cols-[160px_20px_1fr] items-center">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <FaPhoneAlt className="text-blue-600 text-xs shrink-0" /> Phone Number
                    </span>
                    <span className="text-gray-400 text-xs text-center">:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-900">{viewEnquiry.phone}</span>
                      <a
                        href={`tel:${viewEnquiry.phone}`}
                        className="inline-flex items-center gap-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow-sm"
                      >
                        <FaPhoneAlt className="text-[9px]" /> Call Now
                      </a>
                    </div>
                  </div>

                  {/* Preferred College */}
                  <div className="grid grid-cols-[160px_20px_1fr] items-center">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <FaUniversity className="text-blue-600 text-xs shrink-0" /> Preferred College
                    </span>
                    <span className="text-gray-400 text-xs text-center">:</span>
                    <span className="text-xs font-bold text-gray-900">{viewEnquiry.colleges || "N/A"}</span>
                  </div>

                  {/* Preferred Course */}
                  <div className="grid grid-cols-[160px_20px_1fr] items-center">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <FaGraduationCap className="text-blue-600 text-xs shrink-0" /> Preferred Course
                    </span>
                    <span className="text-gray-400 text-xs text-center">:</span>
                    <span className="text-xs font-bold text-gray-900">{viewEnquiry.courses || "N/A"}</span>
                  </div>

                  {/* Need Guidance */}
                  <div className="grid grid-cols-[160px_20px_1fr] items-center">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <FaQuestionCircle className="text-blue-600 text-xs shrink-0" /> Need Guidance
                    </span>
                    <span className="text-gray-400 text-xs text-center">:</span>
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        viewEnquiry.guidance?.toLowerCase() === "yes"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-gray-50 text-gray-500 border border-gray-150"
                      }`}>
                        {viewEnquiry.guidance?.toLowerCase() === "yes" ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  {/* Submitted On */}
                  <div className="grid grid-cols-[160px_20px_1fr] items-center">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600 text-xs shrink-0" /> Submitted On
                    </span>
                    <span className="text-gray-400 text-xs text-center">:</span>
                    <span className="text-xs font-bold text-gray-900">
                      {formatDateTime(viewEnquiry.created_at).date}, {formatDateTime(viewEnquiry.created_at).time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="border-t border-gray-100 pt-5 relative">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Status</h4>
                <div className="relative max-w-xs">
                  <button
                    type="button"
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        viewEnquiry.status === "New" ? "bg-blue-600" :
                        viewEnquiry.status === "Contacted" ? "bg-orange-500" :
                        viewEnquiry.status === "In Progress" ? "bg-purple-600" :
                        viewEnquiry.status === "Converted" ? "bg-emerald-600" :
                        "bg-gray-500" // Closed
                      }`}></span>
                      {viewEnquiry.status || "New"}
                    </div>
                    <FaChevronDown className={`text-[9px] text-gray-400 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {statusDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-150 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-fade-in">
                      {[
                        { value: "New", color: "bg-blue-600", label: "New", desc: "Enquiry is new" },
                        { value: "Contacted", color: "bg-orange-500", label: "Contacted", desc: "Student has been contacted" },
                        { value: "In Progress", color: "bg-purple-600", label: "In Progress", desc: "Discussion is in progress" },
                        { value: "Converted", color: "bg-emerald-600", label: "Converted", desc: "Student converted to application" },
                        { value: "Closed", color: "bg-gray-500", label: "Closed", desc: "Enquiry closed / not interested" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            handleStatusChange(viewEnquiry.id, opt.value);
                            setStatusDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-left transition ${
                            viewEnquiry.status === opt.value ? 'bg-gray-50/50' : ''
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${opt.color}`}></span>
                          <span className="text-xs font-bold text-gray-700 w-20 shrink-0">{opt.label}</span>
                          <span className="text-[10px] text-gray-400">- {opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between gap-3 bg-gray-50/30 rounded-b-3xl">
              <div className="flex gap-2">
                <a
                  href={`tel:${viewEnquiry.phone}`}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <FaPhoneAlt className="text-[10px]" /> Call Now
                </a>
                <a
                  href={`https://wa.me/${viewEnquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <FaWhatsapp className="text-sm" /> WhatsApp
                </a>
              </div>
              <button
                onClick={() => {
                  setViewEnquiry(null);
                  setStatusDropdownOpen(false);
                }}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all duration-300 scale-100">
            <div className="text-4xl text-red-500 mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Lead?</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this enquiry? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl py-2.5 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-xs font-bold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
