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


function Modal({ mode, field, onClose, onSave }) {
  const [name, setName] = useState(field?.name || "");
  const [description, setDescription] = useState(field?.description || "");
  const [status, setStatus] = useState(field?.status || "Active");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">{mode === "add" ? "Add New Field" : "Edit Field"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Field Name</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Engineering & Technology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Short Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button
            onClick={() => onSave({ name, description, status })}
            className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            {mode === "add" ? "Add Field" : "Save Changes"}
          </button>
        </div>
      </div>
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

  async function handleSave({ name, description, status }) {
    try {
      if (modal.mode === "add") {
        const icons = [
          "fa-cogs", "fa-book", "fa-globe", "fa-bullseye",
          "fa-lightbulb", "fa-wrench", "fa-seedling", "fa-trophy",
          "fa-graduation-cap", "fa-desktop"
        ];
        const newIcon = icons[fields.length % icons.length];

        const res = await fetch(`${API_BASE}?r=dashboard/create-field`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            status,
            icon: newIcon,
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