import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FaUser, FaTimes } from "react-icons/fa";
import API_BASE from "../../config/api";

const MyProfileButton = ({ onClick, variant = "desktop" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("My Profile");
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    dob: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditForm({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        city: parsed.city || "",
        gender: parsed.gender || "",
        dob: parsed.dob || ""
      });
    }
  }, [isOpen]);

  const handleOpen = (e) => {
    setIsOpen(true);
    if (onClick) onClick(e);
  };

  const navItems = [
    ...(user?.is_admin === 1 ? [{ icon: "🏠", label: "Dashboard", path: "/dashboard" }] : []),
    { icon: "🏛", label: "Explore Colleges", path: "/colleges" },
    { icon: "📖", label: "Explore Courses", path: "/course" },
    { icon: "♡", label: "My Wishlist", path: "/wishlist" },
    { icon: "👤", label: "My Profile", path: "#" },
  ];

  // Dynamic profile completion calculations
  const checklist = [
    { done: !!user?.name, label: "Name Added" },
    { done: !!user?.email, label: "Email Added" },
    { done: !!user?.phone, label: "Phone Added" },
    { done: !!user?.city, label: "Location Added" },
    { done: !!user?.gender, label: "Gender Added" },
    { done: !!user?.dob, label: "DOB Added" },
    { done: !!user?.profile_photo, label: "Profile Photo Added" },
  ];

  const doneCount = checklist.filter((c) => c.done).length;
  const pct = Math.round((doneCount / checklist.length) * 100) || 20; // fallback to 20% if 0
  const r = 45;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const renderButton = () => {
    if (variant === "mobile") {
      return (
        <button
          onClick={handleOpen}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaUser className="text-sm text-gray-500" />
          My Profile
        </button>
      );
    }

    return (
      <button
        onClick={handleOpen}
        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
      >
        <FaUser className="text-xs text-gray-500" />
        My Profile
      </button>
    );
  };

  const handleNavClick = (item) => {
    if (item.label === "My Profile") {
      setActiveNav("My Profile");
      return;
    }
    setIsOpen(false);
    navigate(item.path);
  };

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}?r=auth/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccessMsg(data.message || "Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsEditing(false);
      } else {
        setErrorMsg(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred while updating the profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {renderButton()}

      {/* Profile Modal */}
      {isOpen && createPortal(
        <div style={{ fontFamily: "'Segoe UI', sans-serif" }} className="fixed inset-0 z-[1000] flex min-h-screen bg-gray-50 overflow-y-auto animate-fadeIn">
          
          {/* ── SIDEBAR ── */}
          <aside className="w-52 flex-shrink-0 flex flex-col" style={{ backgroundColor: "#1a2744", minHeight: "100vh" }}>
            {/* Logo */}
            <div className="flex items-center gap-2 px-4 py-5">
              <div style={{ backgroundColor: "#2563eb" }} className="w-9 h-9 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-black text-sm leading-tight">ADMISSION</div>
                <div className="font-black text-sm leading-tight" style={{ color: "#f97316" }}>ODISHA</div>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-0.5 mt-2 flex-1">
              {navItems.map((n) => {
                const isActive = activeNav === n.label;
                return (
                  <div
                    key={n.label}
                    onClick={() => handleNavClick(n)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer mx-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: isActive ? "#2563eb" : "transparent",
                      color: isActive ? "white" : "#94a3b8",
                    }}
                  >
                    <span className="text-base">{n.icon}</span>
                    <span className="text-sm font-medium">{n.label}</span>
                  </div>
                );
              })}
            </nav>

            {/* Help Box */}
            <div className="m-3 p-4 rounded-xl" style={{ backgroundColor: "#243156" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">🎧</span>
                <span className="text-white font-semibold text-sm">Need Help?</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#94a3b8" }}>
                Our admission experts are here to help you!
              </p>
              <a
                href="mailto:support@admissionodisha.in"
                className="w-full py-2 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1"
                style={{ backgroundColor: "#1e3a6e", border: "1px solid #334d7e" }}
              >
                🎧 Contact Support
              </a>
            </div>
          </aside>

          {/* ── MAIN AREA ── */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* ── TOPBAR ── */}
            <header className="flex items-center px-6 py-3 bg-white border-b border-gray-200 gap-4">
              <div className="flex-1"></div>

              <div className="ml-auto flex items-center gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                >
                  <FaTimes className="text-xs" /> Close Profile
                </button>
              </div>
            </header>

            {/* ── PAGE CONTENT ── */}
            <main className="flex-1 px-8 py-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setIsOpen(false)}>Home</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-600">My Profile</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
              <p className="text-sm text-gray-400 mb-6">Manage your personal information and account details.</p>

              {/* ── ROW 1: Profile Card + Personal Info ── */}
              <div className="flex flex-col lg:flex-row gap-5 mb-5">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center border border-gray-100 shadow-sm w-full lg:w-[280px] flex-shrink-0">
                  {/* Avatar */}
                  <div className="relative mb-3">
                    {user?.profile_photo ? (
                      <img
                        src={`http://localhost/backend/${user.profile_photo}`}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center font-bold text-3xl text-blue-700 shadow-md">
                        {user?.name
                          ? user.name.split(" ").map((word) => word.charAt(0)).join("").slice(0, 2).toUpperCase()
                          : "U"}
                      </div>
                    )}
                  </div>

                  <h2 className="font-bold text-gray-900 text-lg text-center">{user?.name || "User"}</h2>
                  <span
                    className="text-xs font-medium px-4 py-0.5 rounded-full mt-1 mb-5"
                    style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
                  >
                    {user?.is_admin === 1 ? "Administrator" : "Student"}
                  </span>

                  {/* Contact info */}
                  <div className="w-full space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 truncate">
                      <span className="text-gray-400">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                        </svg>
                      </span>
                      <span className="truncate">{user?.email || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="text-gray-400">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      </span>
                      {user?.phone || "Not Provided"}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="text-gray-400">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </span>
                      {user?.city || "Not Provided"}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-gray-900 text-base">Personal Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                      >
                        ✏️ Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setErrorMsg("");
                            setSuccessMsg("");
                            if (user) {
                              setEditForm({
                                name: user.name || "",
                                email: user.email || "",
                                phone: user.phone || "",
                                city: user.city || "",
                                gender: user.gender || "",
                                dob: user.dob || ""
                              });
                            }
                          }}
                          disabled={loading}
                          className="text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 flex items-center gap-1 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Success / Error Messages */}
                  {successMsg && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
                      <span>✅</span>
                      <span>{successMsg}</span>
                    </div>
                  )}
                  {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Rows */}
                  {[
                    {
                      icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
                      label: "Full Name", value: user?.name, badge: null, add: false,
                      input: <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                    },
                    {
                      icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
                      label: "Email Address", value: user?.email, badge: null, add: false,
                      input: <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                    },
                    {
                      icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
                      label: "Mobile Number", value: user?.phone || null, badge: user?.phone ? null : "notadded", add: !user?.phone,
                      input: <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                    },
                    {
                      icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                      label: "Location", value: user?.city || null, badge: user?.city ? "added" : "notadded", add: !user?.city,
                      input: <input type="text" value={editForm.city} onChange={(e) => setEditForm({...editForm, city: e.target.value})} className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                    },
                    {
                      icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/></svg>,
                      label: "Gender", value: user?.gender || null, badge: user?.gender ? "added" : "notadded", add: !user?.gender,
                      input: (
                        <select value={editForm.gender} onChange={(e) => setEditForm({...editForm, gender: e.target.value})} className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      )
                    },
                    {
                      icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                      label: "Date of Birth", value: user?.dob || null, badge: user?.dob ? "added" : "notadded", add: !user?.dob,
                      input: <input type="date" value={editForm.dob} onChange={(e) => setEditForm({...editForm, dob: e.target.value})} className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                    },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center py-4 border-b border-gray-100 last:border-0 min-h-[64px]">
                      <span className="mr-3 flex-shrink-0">{row.icon}</span>
                      <span className="text-sm text-gray-500 w-36 flex-shrink-0">{row.label}</span>
                      {isEditing ? (
                        <div className="flex-1 max-w-xs">{row.input}</div>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-gray-800 flex-1">{row.value || "-"}</span>
                          {row.badge === "notadded" && (
                            <span className="text-xs font-medium px-3 py-1 rounded-md mr-4 animate-pulse" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>
                              Not Added
                            </span>
                          )}
                          {row.badge === "added" && (
                            <span className="text-xs font-semibold px-3 py-1 rounded-md mr-4" style={{ backgroundColor: "#d1fae5", color: "#059669" }}>
                              Added
                            </span>
                          )}
                          {row.add && (
                            <button onClick={() => setIsEditing(true)} className="text-sm font-medium flex items-center gap-1 hover:underline" style={{ color: "#2563eb" }}>
                              + Add
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── ROW 2: Profile Completion + Quick Actions ── */}
              <div className="flex flex-col lg:flex-row gap-5">

                {/* Profile Completion */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-base mb-5">Profile Completion</h3>
                  <div className="flex items-center gap-6 mb-5">
                    {/* Circle */}
                    <div className="flex-shrink-0">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r={r} fill="none" stroke="#e2e8f0" strokeWidth="9"/>
                        <circle
                          cx="60" cy="60" r={r}
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="9"
                          strokeDasharray={circ}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                        />
                        <text x="60" y="55" textAnchor="middle" fill="#1e293b" fontSize="19" fontWeight="700">{pct}%</text>
                        <text x="60" y="73" textAnchor="middle" fill="#94a3b8" fontSize="10">Complete</text>
                      </svg>
                    </div>
                    {/* Checklist */}
                    <div className="flex flex-col gap-2.5">
                      {checklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          {item.done ? (
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#2563eb" }}>
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                              </svg>
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"/>
                          )}
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-base mb-5">Quick Actions</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      {
                        bg: "#fef2f2",
                        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
                        label: "My Wishlist", sub: "View your saved colleges", path: "/wishlist"
                      },
                      {
                        bg: "#eff6ff",
                        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
                        label: "Explore Colleges", sub: "Discover and compare colleges", path: "/colleges"
                      },
                      {
                        bg: "#f0fdf4",
                        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
                        label: "Contact Support", sub: "Get help from our experts", path: "/contact"
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(item.path);
                        }}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.sub}</p>
                          </div>
                        </div>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </main>
          </div>
        </div>,
        document.body
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default MyProfileButton;
