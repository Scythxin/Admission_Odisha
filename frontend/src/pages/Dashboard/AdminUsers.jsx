import { useState, useEffect } from "react";
import API_BASE from "../../config/api";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ChevronDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const ChevronLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const EyeIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EditIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const DotsIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="#94a3b8" stroke="none">
    <circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" />
  </svg>
);
const SearchIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const ResetIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.66" />
  </svg>
);
const CalendarIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const BellIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const MenuIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const ImportIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const PlusIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

// ── Nav icon SVGs by label ────────────────────────────────────────────────
const NavIcons = {
  Dashboard: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  Colleges: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  Courses: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  Counselling: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  Scholarships: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>,
  Notifications: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  Users: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  Enquiries: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  Reports: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  Settings: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
};

// ── Stat card icons ───────────────────────────────────────────────────────
const StatIcons = {
  Total: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Active: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  Inactive: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Blocked: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <line x1="18" y1="8" x2="23" y2="13" /><line x1="23" y1="8" x2="18" y2="13" />
    </svg>
  ),
  NewMonth: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────── ─────────────


const STATUS_STYLE = {
  Active: { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0" },
  Inactive: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  Blocked: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

const NAV = ["Dashboard", "Colleges", "Courses", "Counselling", "Scholarships", "Notifications", "Users", "Enquiries", "Reports", "Settings"];

// ── Main Component ────────────────────────────────────────────────────────
export default function AdminUsers({ setActiveNav }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [status, setStatus] = useState("All Status");
  const [gender, setGender] = useState("All Gender");
  const [activePage, setActivePage] = useState(1);

  const [users, setUsers] = useState([]);
  const [statsData, setStatsData] = useState({ total: 0, active: 0, inactive: 0, blocked: 0, newMonth: 0 });
  const [loading, setLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (pSearch = search, pCity = city, pStatus = status, pGender = gender, pPage = activePage, pPerPage = perPage) => {
    setLoading(true);
    try {
      const qSearch = encodeURIComponent(pSearch);
      const qCity = encodeURIComponent(pCity);
      const qStatus = encodeURIComponent(pStatus);
      const qGender = encodeURIComponent(pGender);

      const res = await fetch(`${API_BASE}?r=dashboard/get-users&search=${qSearch}&city=${qCity}&status=${qStatus}&gender=${qGender}&page=${pPage}&perPage=${pPerPage}`);
      const result = await res.json();

      if (result.status === 'success') {
        const d = result.data;
        const colors = ["#f472b6", "#60a5fa", "#a78bfa", "#34d399", "#fb923c", "#38bdf8"];

        const mappedUsers = (d.users || []).map(u => {
          const initial = u.name ? u.name.charAt(0).toUpperCase() : '?';
          const colorIdx = u.name ? u.name.charCodeAt(0) % colors.length : 0;
          return {
            ...u,
            initials: initial,
            avatarBg: colors[colorIdx]
          };
        });

        setUsers(mappedUsers);
        setStatsData(d.stats || { total: 0, active: 0, inactive: 0, blocked: 0, newMonth: 0 });
        setTotalEntries(d.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activePage, perPage]);

  const handleFilter = () => {
    setActivePage(1);
    fetchUsers(search, city, status, gender, 1, perPage);
  };

  const reset = () => {
    setSearch("");
    setCity("All Cities");
    setStatus("All Status");
    setGender("All Gender");
    setActivePage(1);
    fetchUsers("", "All Cities", "All Status", "All Gender", 1, perPage);
  };  // ── Stat Cards ──────────────────────────────────────────────────────
  const stats = [
    { label: "Total Users", value: statsData.total.toLocaleString(), change: "0%", up: true, iconKey: "Total", iconBg: "#eef2ff", valueColor: "#4f46e5" },
    { label: "Active Users", value: statsData.active.toLocaleString(), change: "0%", up: true, iconKey: "Active", iconBg: "#f0fdf4", valueColor: "#16a34a" },
    { label: "Inactive Users", value: statsData.inactive.toLocaleString(), change: "0%", up: false, iconKey: "Inactive", iconBg: "#fff7ed", valueColor: "#f97316" },
    { label: "Blocked Users", value: statsData.blocked.toLocaleString(), change: "0%", up: false, iconKey: "Blocked", iconBg: "#fef2f2", valueColor: "#ef4444" },
    { label: "New This Month", value: statsData.newMonth.toLocaleString(), change: "0%", up: true, iconKey: "NewMonth", iconBg: "#eff6ff", valueColor: "#3b82f6" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Page heading row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>Users</h1>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span onClick={() => setActiveNav && setActiveNav("Dashboard")} style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400, cursor: "pointer" }}>Home</span>
              <span style={{ color: "#cbd5e1", fontSize: 12 }}>›</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span onClick={() => setActiveNav && setActiveNav("Users")} style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400, cursor: "pointer" }}>Users</span>
              <span style={{ color: "#cbd5e1", fontSize: 12 }}>›</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 12, color: "#4f46e5", fontWeight: 500 }}>All Users</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", color: "#475569", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            <ImportIcon /> Import Users
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "none", borderRadius: 8, background: "#4f46e5", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <PlusIcon /> Add New User
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, margin: "18px 0 16px" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: "16px 16px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 40, height: 40, background: s.iconBg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              {StatIcons[s.iconKey]}
            </div>
            <div style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 2, fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.valueColor, lineHeight: 1.2, marginBottom: 5 }}>{s.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: s.up ? "#22c55e" : "#ef4444" }}>
                {s.up ? "▲" : "▼"} {s.change}
              </span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>vs last 30 days</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: "16px 16px", marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ flex: "1 1 180px", position: "relative" }}>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></div>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              style={{ width: "100%", paddingLeft: 32, paddingRight: 12, height: 36, border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, color: "#475569", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* City */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3, fontWeight: 500 }}>City</div>
            <div style={{ position: "relative" }}>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ height: 36, padding: "0 28px 0 10px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, color: "#475569", background: "#fff", outline: "none", appearance: "none", minWidth: 118, cursor: "pointer" }}>
                {["All Cities", "Bhadrak", "Cuttack", "Bhubaneswar", "Puri", "Berhampur", "Sambalpur", "Rourkela", "Balasore"].map(c => <option key={c}>{c}</option>)}
              </select>
              <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDown /></div>
            </div>
          </div>

          {/* Status */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3, fontWeight: 500 }}>Status</div>
            <div style={{ position: "relative" }}>
              <select value={status} onChange={e => setStatus(e.target.value)} style={{ height: 36, padding: "0 28px 0 10px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, color: "#475569", background: "#fff", outline: "none", appearance: "none", minWidth: 110, cursor: "pointer" }}>
                {["All Status", "Active", "Inactive", "Blocked"].map(s => <option key={s}>{s}</option>)}
              </select>
              <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDown /></div>
            </div>
          </div>

          {/* Gender */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3, fontWeight: 500 }}>Gender</div>
            <div style={{ position: "relative" }}>
              <select value={gender} onChange={e => setGender(e.target.value)} style={{ height: 36, padding: "0 28px 0 10px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, color: "#475569", background: "#fff", outline: "none", appearance: "none", minWidth: 110, cursor: "pointer" }}>
                {["All Gender", "Male", "Female"].map(g => <option key={g}>{g}</option>)}
              </select>
              <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDown /></div>
            </div>
          </div>

          {/* Date range */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3, fontWeight: 500 }}>Joined Date</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, height: 36, padding: "0 12px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", minWidth: 190 }}>
              <CalendarIcon />
              <span style={{ fontSize: 12, color: "#64748b" }}>01 May 2026 – 12 Jun 2026</span>
            </div>
          </div>

          {/* Buttons */}
          <button onClick={handleFilter} style={{ height: 36, display: "flex", alignItems: "center", gap: 6, padding: "0 16px", background: "#4f46e5", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <FilterIcon /> Filter
          </button>
          <button onClick={reset} style={{ height: 36, display: "flex", alignItems: "center", gap: 6, padding: "0 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#64748b", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            <ResetIcon /> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              {["#", "User", "Email", "Phone", "City", "Gender", "IP Address", "Status", "Joined On", "Last Login", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "#94a3b8", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} style={{ padding: "40px 14px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Loading users...</td></tr>
            ) : users.length > 0 ? users.map((u, i) => {
              const ss = STATUS_STYLE[u.status] || { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" };
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "11px 14px", color: "#94a3b8", fontSize: 13 }}>{u.id}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: u.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color: "white" }}>
                        {u.initials}
                      </div>
                      <span style={{ fontWeight: 500, color: "#1e293b", whiteSpace: "nowrap" }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5 }}>{u.email}</td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5 }}>{u.phone}</td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5 }}>{u.city}</td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5 }}>{u.gender}</td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5 }}>{u.ipAddress}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5, whiteSpace: "nowrap" }}>{u.joinedOn}</td>
                  <td style={{ padding: "11px 14px", color: "#64748b", fontSize: 12.5, whiteSpace: "nowrap" }}>{u.lastLogin}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => console.log('View user', u.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }} title="View"><EyeIcon /></button>
                      <button onClick={() => console.log('Edit user', u.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }} title="Edit"><EditIcon /></button>
                      <button onClick={() => console.log('More actions', u.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }} title="More"><DotsIcon /></button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan={10} style={{ padding: "40px 14px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>No users found.</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>Showing {totalEntries > 0 ? (activePage - 1) * perPage + 1 : 0} to {Math.min(activePage * perPage, totalEntries)} of {totalEntries.toLocaleString()} entries</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              disabled={activePage === 1}
              onClick={() => setActivePage(p => Math.max(1, p - 1))}
              style={{ width: 28, height: 28, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: activePage === 1 ? "not-allowed" : "pointer", opacity: activePage === 1 ? 0.4 : 1 }}>
              <ChevronLeft />
            </button>

            {Array.from({ length: Math.min(5, Math.ceil(totalEntries / perPage) || 1) }, (_, i) => {
              const totalPages = Math.ceil(totalEntries / perPage) || 1;
              let p = i + 1;
              if (totalPages > 5 && activePage > 3) {
                p = activePage - 2 + i;
                if (p > totalPages) p = totalPages - (4 - i);
              }
              return (
                <button key={p} onClick={() => setActivePage(p)} style={{ width: 28, height: 28, border: p === activePage ? "none" : "1px solid #e2e8f0", borderRadius: 6, background: p === activePage ? "#4f46e5" : "#fff", color: p === activePage ? "white" : "#64748b", fontSize: 12.5, fontWeight: p === activePage ? 600 : 400, cursor: "pointer" }}>
                  {p}
                </button>
              );
            })}

            {Math.ceil(totalEntries / perPage) > 5 && activePage < Math.ceil(totalEntries / perPage) - 2 && (
              <>
                <span style={{ fontSize: 12, color: "#94a3b8", padding: "0 2px" }}>...</span>
                <button onClick={() => setActivePage(Math.ceil(totalEntries / perPage))} style={{ minWidth: 28, height: 28, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", color: "#64748b", fontSize: 12, cursor: "pointer", padding: "0 4px" }}>{Math.ceil(totalEntries / perPage)}</button>
              </>
            )}

            <button
              disabled={activePage === (Math.ceil(totalEntries / perPage) || 1)}
              onClick={() => setActivePage(p => Math.min(Math.ceil(totalEntries / perPage) || 1, p + 1))}
              style={{ width: 28, height: 28, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: activePage === (Math.ceil(totalEntries / perPage) || 1) ? "not-allowed" : "pointer", opacity: activePage === (Math.ceil(totalEntries / perPage) || 1) ? 0.4 : 1 }}>
              <ChevronRight />
            </button>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setActivePage(1); }} style={{ height: 28, padding: "0 24px 0 8px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, color: "#64748b", background: "#fff", outline: "none", cursor: "pointer", marginLeft: 4 }}>
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}
