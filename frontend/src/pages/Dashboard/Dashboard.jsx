import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../../config/api";
import AdminField from "./AdminField";
import AdminSpecializations from "./AdminSpecializations";
import {
  FaBook, FaLayerGroup, FaGraduationCap, FaUniversity,
  FaHome, FaList, FaUsers, FaClock, FaEnvelope,
  FaImage, FaQuestionCircle, FaCog, FaClipboardList,
  FaBars, FaBell, FaChevronDown, FaSearch, FaExternalLinkAlt,
  FaPlus, FaEye,
} from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const topFieldsColors = ["#6366f1", "#ec4899", "#22c55e", "#f97316", "#60a5fa"];
const userActivityColors = ["#6366f1", "#ec4899", "#f97316"];

const quickActions = [
  { icon: <FaBook />,        label: "Add Field",          color: "bg-indigo-100 text-indigo-600" },
  { icon: <FaLayerGroup />,  label: "Add Specialization", color: "bg-pink-100 text-pink-600" },
  { icon: <FaGraduationCap />, label: "Add Course",       color: "bg-green-100 text-green-600" },
  { icon: <FaUniversity />,  label: "Add College",        color: "bg-yellow-100 text-yellow-600" },
  { icon: <FaUsers />,       label: "Manage Users",       color: "bg-blue-100 text-blue-600" },
  { icon: <FaEnvelope />,    label: "View Enquiries",     color: "bg-purple-100 text-purple-600" },
  { icon: <FaImage />,       label: "Upload Banner",      color: "bg-orange-100 text-orange-600" },
  { icon: <FaCog />,         label: "Settings",           color: "bg-gray-100 text-gray-600" },
];

const navItems = [
  { label: "Dashboard", icon: <FaHome />, section: null },
  { label: "CONTENT MANAGEMENT", section: true },
  { label: "Fields",                    icon: <FaList /> },
  { label: "Specializations",           icon: <FaLayerGroup /> },
  { label: "Specialization Details",    icon: <FaClipboardList /> },
  { label: "Courses",                   icon: <FaGraduationCap /> },
  { label: "Colleges",                  icon: <FaUniversity /> },
  { label: "Course - College Mapping",  icon: <FaBook /> },
  { label: "USER MANAGEMENT", section: true },
  { label: "Users",         icon: <FaUsers /> },
  { label: "User Activity", icon: <FaClock /> },
  { label: "ENQUIRY & LEADS", section: true },
  { label: "Enquiries / Leads", icon: <FaEnvelope /> },
  { label: "OTHER", section: true },
  { label: "Banners",       icon: <FaImage /> },
  { label: "FAQ's",         icon: <FaQuestionCircle /> },
  { label: "Settings",      icon: <FaCog /> },
  { label: "Activity Logs", icon: <FaClipboardList /> },
];

/* ── STAT CARD ── */
const StatCard = ({ icon, label, value, sub, iconBg, lineColor }) => (
  <div className="bg-white rounded-2xl p-5 flex-1 min-w-0 border border-gray-100 shadow-sm flex flex-col gap-2">
    <div className="flex items-start justify-between">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${iconBg}`}>
        {icon}
      </div>
      <svg viewBox="0 0 80 32" className="w-20 h-8" fill="none">
        <polyline
          points="0,28 16,18 32,22 48,10 64,14 80,6"
          stroke={lineColor} strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-3xl font-bold text-gray-800 leading-none">{value}</p>
    <p className="text-xs text-gray-400">{sub}</p>
  </div>
);

/* ── USER AVATAR ── */
const Avatar = ({ name }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const colors = ["bg-indigo-200 text-indigo-700", "bg-pink-200 text-pink-700", "bg-green-200 text-green-700", "bg-orange-200 text-orange-700", "bg-blue-200 text-blue-700"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors[idx]}`}>
      {initials}
    </div>
  );
};

/* ── CUSTOM DONUT LABEL ── */
const DonutLabel = ({ cx, cy, total, label }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
    <tspan x={cx} dy="-6" fontSize="11" fill="#6b7280">{label}</tspan>
    <tspan x={cx} dy="20" fontSize="18" fontWeight="700" fill="#1e2230">{total.toLocaleString()}</tspan>
  </text>
);

/* ── MAIN DASHBOARD ── */
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalFields: 0,
    totalSpecializations: 0,
    totalCourses: 0,
    totalColleges: 0,
    recentEnquiries: [],
    recentUsers: [],
    topFields: []
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetch(`${API_BASE}?r=dashboard/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const overviewData = [
    { day: "16 May", val: 400 },
    { day: "17 May", val: 850 },
    { day: "18 May", val: 750 },
    { day: "19 May", val: 950 },
    { day: "20 May", val: 1350 },
    { day: "21 May", val: 1100 },
    { day: "22 May", val: 1050 },
  ];

  const topFieldsData = (stats?.topFields || []).map((f, i) => ({
    ...f,
    color: topFieldsColors[i % topFieldsColors.length]
  }));

  const userActivityData = [
    { name: "New Users",       value: 45, color: "#6366f1" },
    { name: "Returning Users", value: 35, color: "#ec4899" },
    { name: "Inactive Users",  value: 20, color: "#f97316" },
  ];

  if (!stats) return <div className="p-10 text-center">Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className={`${sidebarOpen ? "w-56" : "w-0 overflow-hidden"} transition-all duration-300 bg-[#1a2356] flex flex-col flex-shrink-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-white">
            <FaGraduationCap />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-sm tracking-wide">ADMISSION</p>
            <p className="text-[#0ea5a4] font-bold text-sm -mt-0.5">ODISHA</p>
            <p className="text-white/40 text-[9px]">YOUR DREAM. OUR GUIDANCE.</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item, i) => {
            if (item.section) return (
              <p key={i} className="text-white/30 text-[10px] font-bold tracking-widest px-3 pt-4 pb-1 uppercase">{item.label}</p>
            );
            const isActive = item.active || activeNav === item.label;
            return (
              <button
                key={i}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all
                  ${isActive
                    ? "bg-[#6366f1] text-white shadow-lg shadow-indigo-900/30"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* View Website */}
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="w-full flex items-center justify-between gap-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition">
            <span>View Website</span>
            <FaExternalLinkAlt className="text-xs opacity-60" />
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── TOPBAR ── */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 transition">
              <FaBars className="text-lg" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">{activeNav}</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-400">
              <FaSearch className="text-xs" />
              <span>Search here...</span>
              <span className="ml-6 bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-mono">ctrl + /</span>
            </div>
            {/* Bell */}
            <div className="relative cursor-pointer">
              <FaBell className="text-gray-500 text-lg" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">8</span>
            </div>
            {/* User */}
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  {user?.name?.substring(0, 2).toUpperCase() || "AU"}
                </div>
                <div className="leading-tight hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
              </div>

              {userDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setUserDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400">Logged in as</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{user?.email}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs rotate-180" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {activeNav === "Dashboard" && (
            <>
              {/* STAT CARDS */}
              <div className="flex gap-5">
                <StatCard icon={<FaBook />}          iconBg="bg-indigo-500"  lineColor="#818cf8" label="Total Fields"          value={stats.totalFields}  sub="Active Fields" />
                <StatCard icon={<FaLayerGroup />}    iconBg="bg-pink-500"    lineColor="#f472b6" label="Total Specializations" value={stats.totalSpecializations}  sub="Active Specializations" />
                <StatCard icon={<FaGraduationCap />} iconBg="bg-green-500"   lineColor="#4ade80" label="Total Courses"         value={stats.totalCourses} sub="Active Courses" />
                <StatCard icon={<FaUniversity />}    iconBg="bg-yellow-500"  lineColor="#fbbf24" label="Total Colleges"        value={stats.totalColleges} sub="Active Colleges" />
              </div>

              {/* CHARTS ROW */}
              <div className="grid grid-cols-12 gap-5">
                {/* Line Chart */}
                <div className="col-span-6 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-800">Overview</h2>
                    <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
                      Last 7 Days <FaChevronDown className="text-xs" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={overviewData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                      <Line type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Fields Donut */}
                <div className="col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h2 className="font-bold text-gray-800 mb-3">Top Fields</h2>
                  <PieChart width={220} height={180}>
                    <Pie data={topFieldsData} cx={90} cy={85} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                      {topFieldsData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <DonutLabel cx={90} cy={85} total={12845} label="Total" />
                  </PieChart>
                  <div className="space-y-1 mt-1">
                    {topFieldsData.map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                          {f.name}
                        </div>
                        <span className="font-semibold">{f.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Activity Donut */}
                <div className="col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h2 className="font-bold text-gray-800 mb-3">User Activity</h2>
                  <PieChart width={220} height={180}>
                    <Pie data={userActivityData} cx={90} cy={85} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                      {userActivityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <DonutLabel cx={90} cy={85} total={12845} label="Total" />
                  </PieChart>
                  <div className="space-y-1 mt-1">
                    {userActivityData.map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                          {f.name}
                        </div>
                        <span className="font-semibold">{f.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TABLES ROW */}
              <div className="grid grid-cols-12 gap-5">
                {/* Recent Enquiries */}
                <div className="col-span-7 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-800">Recent Enquiries</h2>
                    <button className="text-sm text-indigo-600 border border-indigo-200 rounded-lg px-4 py-1.5 hover:bg-indigo-50 font-medium transition">View All</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs font-semibold border-b border-gray-100">
                        <th className="text-left pb-2 pr-3">Name</th>
                        <th className="text-left pb-2 pr-3">Email</th>
                        <th className="text-left pb-2 pr-3">Subject</th>
                        <th className="text-left pb-2 pr-3">Date</th>
                        <th className="text-left pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {stats?.recentEnquiries?.map((e, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition">
                          <td className="py-2.5 pr-3 font-medium text-gray-700 whitespace-nowrap">{e.name}</td>
                          <td className="py-2.5 pr-3 text-gray-400 text-xs">{e.email}</td>
                          <td className="py-2.5 pr-3 text-gray-600 whitespace-nowrap">{e.subject}</td>
                          <td className="py-2.5 pr-3 text-gray-400 text-xs whitespace-nowrap">{e.date}</td>
                          <td className="py-2.5">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${e.statusColor}`}>{e.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Recent Users */}
                <div className="col-span-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-800">Recent Users</h2>
                    <button className="text-sm text-indigo-600 border border-indigo-200 rounded-lg px-4 py-1.5 hover:bg-indigo-50 font-medium transition">View All</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs font-semibold border-b border-gray-100">
                        <th className="text-left pb-2 pr-3">Name</th>
                        <th className="text-left pb-2 pr-3">Joined On</th>
                        <th className="text-left pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {stats?.recentUsers?.map((u, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition">
                          <td className="py-2.5 pr-3">
                            <div className="flex items-center gap-2">
                              <Avatar name={u.name} />
                              <div className="min-w-0">
                                <p className="font-medium text-gray-700 truncate text-xs">{u.name}</p>
                                <p className="text-gray-400 text-[10px] truncate">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 pr-3 text-gray-400 text-xs whitespace-nowrap">{u.joined}</td>
                          <td className="py-2.5">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.statusColor}`}>{u.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-8 gap-4">
                  {quickActions.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (a.label === "Add Field") {
                          setActiveNav("Fields");
                        }
                      }}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition group-hover:scale-110 group-hover:shadow-md ${a.color}`}>
                        {a.icon}
                      </div>
                      <span className="text-xs text-gray-500 text-center font-medium leading-tight group-hover:text-gray-800 transition">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeNav === "Fields" && <AdminField />}
          {activeNav === "Specializations" && <AdminSpecializations />}

          {/* FOOTER */}
          <div className="flex items-center justify-between text-xs text-gray-400 py-2">
            <span>© 2025 Admission Odisha. All Rights Reserved.</span>
            <span>Made with ❤️ in Odisha</span>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;