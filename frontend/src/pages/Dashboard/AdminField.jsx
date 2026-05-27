import { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import {
  FaCog, FaHeartbeat, FaBriefcase, FaPalette,
  FaFlask, FaBalanceScale, FaPencilAlt, FaConciergeBell,
  FaDesktop, FaGraduationCap, FaQuestionCircle
} from "react-icons/fa";

function getIconAndColor(icon, index = 0) {
  const defaultColors = [
    "bg-violet-100 text-violet-600",
    "bg-emerald-100 text-emerald-600",
    "bg-orange-100 text-orange-600",
    "bg-pink-100 text-pink-600",
    "bg-blue-100 text-blue-600",
    "bg-indigo-100 text-indigo-600",
    "bg-rose-100 text-rose-600",
    "bg-amber-100 text-amber-600",
    "bg-teal-100 text-teal-600",
    "bg-sky-100 text-sky-600"
  ];
  
  let reactIcon = null;
  let colorClass = defaultColors[index % defaultColors.length];

  switch (icon) {
    case 'fa-cogs':
    case '⚙️':
      reactIcon = <FaCog />;
      colorClass = "bg-violet-100 text-violet-600";
      break;
    case 'fa-heartbeat':
    case '💊':
      reactIcon = <FaHeartbeat />;
      colorClass = "bg-emerald-100 text-emerald-600";
      break;
    case 'fa-briefcase':
    case '💼':
      reactIcon = <FaBriefcase />;
      colorClass = "bg-orange-100 text-orange-600";
      break;
    case 'fa-palette':
    case '🎨':
      reactIcon = <FaPalette />;
      colorClass = "bg-pink-100 text-pink-600";
      break;
    case 'fa-flask':
    case '🔬':
      reactIcon = <FaFlask />;
      colorClass = "bg-blue-100 text-blue-600";
      break;
    case 'fa-balance-scale':
    case '⚖️':
      reactIcon = <FaBalanceScale />;
      colorClass = "bg-indigo-100 text-indigo-600";
      break;
    case 'fa-pencil-alt':
    case '✏️':
      reactIcon = <FaPencilAlt />;
      colorClass = "bg-rose-100 text-rose-600";
      break;
    case 'fa-concierge-bell':
    case '🍽️':
      reactIcon = <FaConciergeBell />;
      colorClass = "bg-amber-100 text-amber-600";
      break;
    case 'fa-desktop':
      reactIcon = <FaDesktop />;
      colorClass = "bg-teal-100 text-teal-600";
      break;
    case 'fa-graduation-cap':
      reactIcon = <FaGraduationCap />;
      colorClass = "bg-indigo-100 text-indigo-600";
      break;
    default:
      reactIcon = icon ? <span>{icon}</span> : <FaQuestionCircle />;
  }

  return { icon: reactIcon, color: colorClass };
}


const icons = [
  {
    id: "engineering", label: "Engineering", color: "#6C63FF", bg: "#EEF0FF", iconCode: "fa-cogs",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "medical", label: "Medical", color: "#E91E8C", bg: "#FDEEF6", iconCode: "fa-heartbeat",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: "commerce", label: "Commerce", color: "#F57C00", bg: "#FFF3E0", iconCode: "fa-briefcase",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" />
        <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "science", label: "Science", color: "#0288D1", bg: "#E1F5FE", iconCode: "fa-flask",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v11l4 7H5l4-7V3z" />
        <path d="M9 9h6" />
      </svg>
    ),
  },
  {
    id: "law", label: "Law", color: "#43A047", bg: "#E8F5E9", iconCode: "fa-balance-scale",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 3v18" />
        <path d="M5 7l14 10M19 7L5 17" />
        <path d="M5 7l-2 4h4L5 7zM19 7l-2 4h4l-2-4z" fill="currentColor" stroke="none" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    id: "arts", label: "Arts", color: "#E53935", bg: "#FFEBEE", iconCode: "fa-palette",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 000 18c1.5 0 2.5-1.5 2.5-3 0-1-.5-2-1.5-2.5H17c1.1 0 2-.9 2-2 0-3.87-3.13-7-7-7" strokeLinecap="round" />
        <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="6.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "education", label: "Education", color: "#3949AB", bg: "#E8EAF6", iconCode: "fa-graduation-cap",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
  },
  {
    id: "agriculture", label: "Agriculture", color: "#2E7D32", bg: "#E8F5E9", iconCode: "fa-seedling",
    render: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 17 3 21 3c0 4-3 8-9 9M12 12C12 7 7 3 3 3c0 4 3 8 9 9" />
      </svg>
    ),
  },
];


function Modal({ mode, field, onClose, onSave }) {
  const [fieldName, setFieldName] = useState(field?.name || "");
  const [description, setDescription] = useState(field?.description || "");
  const [status, setStatus] = useState(field?.status || "Active");
  
  const defaultIcon = field?.icon ? (icons.find(i => i.iconCode === field.icon)?.id || "engineering") : "engineering";
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon);
  const [saved, setSaved] = useState(false);

  const selected = icons.find((i) => i.id === selectedIcon);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { 
      setSaved(false); 
      onSave({ name: fieldName, description, status, icon: selected?.iconCode || "fa-cogs" }); 
    }, 800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(30,27,75,0.3)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative", zIndex: 10, background: "white",
          borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
          width: "100%", maxWidth: 760, overflow: "hidden",
          animation: "fadeUp .22s cubic-bezier(.22,1,.36,1) both",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px 20px", borderBottom: "1px solid #f0f0f5" }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.3px" }}>
            {mode === "add" ? "Add New Field" : "Edit Field"}
          </h2>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.color = "#374151"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", borderBottom: "1px solid #f0f0f5" }}>

          {/* Left: Form */}
          <div style={{ flex: 1, padding: "24px 32px", borderRight: "1px solid #f0f0f5", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Field Name */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#1f2937", marginBottom: 6 }}>
                Field Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text" value={fieldName} onChange={e => setFieldName(e.target.value)}
                placeholder="e.g., Engineering & Technology"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#f9fafb", fontSize: 13, color: "#111827", outline: "none", boxSizing: "border-box" }}
                onFocus={e => { e.target.style.border = "1.5px solid #5B4EFF"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(91,78,255,0.08)"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
              />
              <p style={{ margin: "6px 0 0", fontSize: 11, color: "#9ca3af" }}>Enter the name of the field.</p>
            </div>

            {/* Short Description */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#1f2937", marginBottom: 6 }}>
                Short Description <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                rows={3} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="e.g., Build the future with innovation and technology."
                style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#f9fafb", fontSize: 13, color: "#111827", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => { e.target.style.border = "1.5px solid #5B4EFF"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(91,78,255,0.08)"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
              />
              <p style={{ margin: "6px 0 0", fontSize: 11, color: "#9ca3af" }}>Enter a short description for this field.</p>
            </div>
            
            {/* Status */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#1f2937", marginBottom: 6 }}>
                Status <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                value={status} onChange={e => setStatus(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#f9fafb", fontSize: 13, color: "#111827", outline: "none", boxSizing: "border-box" }}
                onFocus={e => { e.target.style.border = "1.5px solid #5B4EFF"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(91,78,255,0.08)"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            {/* Icon Grid */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>
                Select Icon <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {icons.map(icon => (
                  <button
                    key={icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                    style={{
                      position: "relative", display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 8, padding: "12px 8px",
                      borderRadius: 12, cursor: "pointer",
                      border: selectedIcon === icon.id ? "2px solid #5B4EFF" : "2px solid #f0f0f5",
                      background: selectedIcon === icon.id ? "#F0EEFF" : "#fafafa",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { if (selectedIcon !== icon.id) { e.currentTarget.style.borderColor = "#c4bcff"; e.currentTarget.style.background = "#f7f6ff"; } }}
                    onMouseLeave={e => { if (selectedIcon !== icon.id) { e.currentTarget.style.borderColor = "#f0f0f5"; e.currentTarget.style.background = "#fafafa"; } }}
                  >
                    {selectedIcon === icon.id && (
                      <span style={{
                        position: "absolute", top: -8, right: -8,
                        width: 20, height: 20, borderRadius: "50%",
                        background: "#5B4EFF", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(91,78,255,0.4)",
                      }}>
                        <svg viewBox="0 0 20 20" fill="white" width="11" height="11">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                    <span style={{
                      width: 44, height: 44, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: icon.bg, color: icon.color,
                    }}>
                      {icon.render(26)}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#4b5563", textAlign: "center" }}>
                      {icon.label}
                    </span>
                  </button>
                ))}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "#9ca3af" }}>Choose an icon to represent this field.</p>
            </div>
          </div>

          {/* Right: Preview */}
          <div style={{ width: 260, flexShrink: 0, padding: "24px 28px", background: "#FAFBFF" }}>
            <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#1f2937" }}>Preview</p>
            <p style={{ margin: "0 0 20px", fontSize: 11, color: "#9ca3af" }}>This is how the field will appear on the website.</p>

            <div style={{
              background: "white", borderRadius: 16, padding: "24px 16px",
              border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              minHeight: 200, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", gap: 12,
            }}>
              {/* Preview icon with pop animation on change */}
              <div
                key={selectedIcon}
                style={{
                  width: 80, height: 80, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: selected?.bg || "#EEF0FF",
                  color: selected?.color || "#6C63FF",
                  animation: "popIn .22s cubic-bezier(.34,1.56,.64,1) both",
                }}
              >
                {selected?.render(40)}
              </div>

              <div>
                <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>
                  {fieldName || "Engineering & Technology"}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                  {description || "Build the future with innovation and technology."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, padding: "18px 32px", background: "white" }}>
          <button
            onClick={onClose}
            style={{ padding: "10px 24px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", color: "#4b5563", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#d1d5db"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 28px", borderRadius: 12, minWidth: 110,
              border: "none", background: saved ? "#22c55e" : "#5B4EFF",
              color: "white", fontSize: 13, fontWeight: 600,
              cursor: "pointer", boxShadow: "0 2px 8px rgba(91,78,255,0.3)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (!saved) e.currentTarget.style.background = "#4A3EE8"; }}
            onMouseLeave={e => { if (!saved) e.currentTarget.style.background = "#5B4EFF"; }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {saved ? "✓ Saved!" : (mode === "add" ? "Save Field" : "Save Changes")}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function AdminField() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', field? }
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 8;
  const totalPages = Math.ceil(fields.length / perPage);
  const paginated = fields.slice((page - 1) * perPage, page * perPage);

  async function fetchFields() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}?r=dashboard/get-fields`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const result = await res.json();
      if (result.status === "success") {
        setFields(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch fields.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFields();
  }, []);

  async function handleSave({ name, description, status, icon }) {
    try {
      if (modal.mode === "add") {
        const res = await fetch(`${API_BASE}?r=dashboard/create-field`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            status,
            icon: icon || "fa-cogs",
          }),
        });

        if (!res.ok) throw new Error("Failed to create field");
        const result = await res.json();
        if (result.status === "success") {
          fetchFields();
        } else {
          throw new Error(result.message || "Failed to create field");
        }
      } else {
        const res = await fetch(`${API_BASE}?r=dashboard/update-field`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: modal.field.id,
            name,
            description,
            status,
            icon: icon || modal.field.icon,
          }),
        });

        if (!res.ok) throw new Error("Failed to update field");
        const result = await res.json();
        if (result.status === "success") {
          fetchFields();
        } else {
          throw new Error(result.message || "Failed to update field");
        }
      }
      setModal(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error saving field");
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_BASE}?r=dashboard/delete-field`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete field");
      const result = await res.json();
      if (result.status === "success") {
        fetchFields();
      } else {
        throw new Error(result.message || "Failed to delete field");
      }
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error deleting field");
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fields</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all fields shown on the website.</p>
        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-indigo-200"
        >
          <span className="text-base leading-none">+</span> Add New Field
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 w-10">#</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3.5 w-14">Icon</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3.5">Field Name</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3.5">Short Description</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3.5 w-24">Status</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3.5 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading fields...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-red-500 font-medium">
                  Error: {error}
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No fields found.
                </td>
              </tr>
            ) : (
              paginated.map((field, idx) => {
                const { icon, color } = getIconAndColor(field.icon, idx);
                return (
                  <tr key={field.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4 text-gray-400 font-medium">{(page - 1) * perPage + idx + 1}</td>
                    <td className="px-4 py-4">
                      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-xl`}>
                        {icon}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-800">{field.name}</td>
                    <td className="px-4 py-4 text-gray-500 max-w-xs">{field.description}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        field.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {field.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                        {field.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModal({ mode: "edit", field })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteId(field.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/40">
          <p className="text-xs text-gray-400">
            Showing {fields.length === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, fields.length)} of {fields.length} fields
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition-colors text-xs"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                  page === n
                    ? "bg-indigo-600 text-white"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition-colors text-xs"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <Modal
          mode={modal.mode}
          field={modal.field}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-base font-bold text-gray-800 mb-1">Delete Field?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}