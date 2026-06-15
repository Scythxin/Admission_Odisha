import React, { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import {
  FaUsers,
  FaSignInAlt,
  FaHeart,
  FaCommentDots,
  FaUserEdit,
  FaSearch,
  FaFilter,
  FaUndo,
  FaEye,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Dummy data removed, fetching from API

/* ── AVATAR COMPONENT ── */
const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const colors = [
    "bg-indigo-200 text-indigo-700",
    "bg-pink-200 text-pink-700",
    "bg-green-200 text-green-700",
    "bg-orange-200 text-orange-700",
    "bg-blue-200 text-blue-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors[idx]}`}
    >
      {initials}
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const UserActivity = ({ setActiveNav }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityType, setActivityType] = useState("All Activities");
  const [userFilter, setUserFilter] = useState("All Users");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ stats: null, logs: [], pagination: {} });
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_BASE}?r=dashboard/get-user-activity&search=${searchTerm}&activityType=${activityType}&userFilter=${userFilter}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching activity:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchData();
  };

  const handleReset = () => {
    setSearchTerm("");
    setActivityType("All Activities");
    setUserFilter("All Users");
    setPage(1);
    setTimeout(() => {
        setLoading(true);
        fetch(`${API_BASE}?r=dashboard/get-user-activity&search=&activityType=All Activities&userFilter=All Users&page=1`)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "success") setData(res.data);
            setLoading(false);
          });
    }, 50);
  };

  const getBadgeAndIcon = (type) => {
    let typeBadge = "bg-gray-100 text-gray-700";
    let typeIcon = <FaEye />;
    if (!type) return { typeBadge, typeIcon };
    
    if (type.includes("Login")) {
      typeBadge = "bg-green-100 text-green-700";
      typeIcon = <FaSignInAlt />;
    } else if (type.includes("Wishlist")) {
      typeBadge = "bg-pink-100 text-pink-700";
      typeIcon = <FaHeart />;
      if (type.includes("Removed")) typeBadge = "bg-red-100 text-red-700";
    } else if (type.includes("Enquiry") || type.includes("Inquired")) {
      typeBadge = "bg-indigo-100 text-indigo-700";
      typeIcon = <FaCommentDots />;
    } else if (type.includes("Profile")) {
      typeBadge = "bg-orange-100 text-orange-700";
      typeIcon = <FaUserEdit />;
    } else if (type.includes("College")) {
      typeBadge = "bg-blue-100 text-blue-700";
      typeIcon = <FaEye />;
    } else if (type.includes("Course")) {
      typeBadge = "bg-teal-100 text-teal-700";
      typeIcon = <FaEye />;
    }
    return { typeBadge, typeIcon };
  };

  const stats = data.stats || {};
  const statCardsData = [
    {
      title: "Total Activities",
      value: stats.totalActivities || 0,
      trend: "+18.5%",
      isUp: true,
      icon: <FaUsers className="text-indigo-500" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Logins",
      value: stats.logins || 0,
      trend: "+22.4%",
      isUp: true,
      icon: <FaSignInAlt className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "Wishlist Actions",
      value: stats.wishlistActions || 0,
      trend: "+16.7%",
      isUp: true,
      icon: <FaHeart className="text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "Enquiries Submitted",
      value: stats.enquiriesSubmitted || 0,
      trend: "+13.3%",
      isUp: true,
      icon: <FaCommentDots className="text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      title: "Profile Updates",
      value: stats.profileUpdates || 0,
      trend: "-4.3%",
      isUp: false,
      icon: <FaUserEdit className="text-pink-500" />,
      bg: "bg-pink-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Activity</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="cursor-pointer hover:text-gray-700" onClick={() => setActiveNav && setActiveNav("Dashboard")}>Home</span>
            <span className="text-gray-300">›</span>
            <span className="cursor-pointer hover:text-gray-700" onClick={() => setActiveNav && setActiveNav("Users")}>Users</span>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">User Activity</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 flex items-center gap-2 shadow-sm">
            <span>05 Jun 2026 - 12 Jun 2026</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCardsData.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`flex items-center gap-1 font-semibold ${
                  stat.isUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.isUp ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
                {stat.trend}
              </span>
              <span className="text-gray-400">vs last 7 days</span>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user name or email..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option>All Activities</option>
            <option>Login</option>
            <option>Wishlist</option>
            <option>Enquiry</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <select
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option>All Users</option>
            <option>Active Users</option>
            <option>Inactive Users</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition"
          />
          <span className="text-gray-400">-</span>
          <input
            type="date"
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={handleFilter} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
            <FaFilter /> Filter
          </button>
          <button onClick={handleReset} className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
            <FaUndo /> Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Activity Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 text-xs font-semibold">
              <tr>
                <th className="py-4 pl-6 pr-4">#</th>
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Activity Type</th>
                <th className="py-4 px-4">Details</th>
                <th className="py-4 px-4">IP Address</th>
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 pr-6 pl-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500">
                    Loading data...
                  </td>
                </tr>
              ) : data.logs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500">
                    No activity logs found.
                  </td>
                </tr>
              ) : (
                data.logs.map((log) => {
                  const { typeBadge, typeIcon } = getBadgeAndIcon(log.type);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition group">
                      <td className="py-3 pl-6 pr-4 text-gray-500 font-medium">
                        {log.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={log.name} />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {log.name}
                            </p>
                            <p className="text-gray-400 text-xs">{log.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${typeBadge}`}
                        >
                          {typeIcon}
                          {log.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{log.details}</td>
                      <td className="py-3 px-4 text-gray-500">{log.ip}</td>
                      <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="py-3 pr-6 pl-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition opacity-0 group-hover:opacity-100">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, data.pagination.total || 0)} of {data.pagination.total || 0} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition disabled:opacity-50"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100 transition">
              {page}
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 10 >= (data.pagination.total || 0)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition disabled:opacity-50"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
