import React, { useState, useEffect } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";
import {
    FaCode, FaCog, FaBolt, FaBuilding, FaHeartbeat, FaStethoscope,
    FaChartBar, FaBalanceScale, FaBrain, FaMicrochip, FaRobot,
    FaFlask, FaLeaf, FaGlobeAsia, FaPencilAlt, FaMusic, FaEdit, FaTrash,
    FaPlus, FaChevronLeft, FaChevronRight, FaCheck, FaSearch
} from "react-icons/fa";
import Pagination from "../../components/admin/Pagination";

/* ── ICONS ── */
const ICONS = [
    { key: "code", label: "Computer Science", icon: <FaCode /> },
    { key: "cog", label: "Mechanical", icon: <FaCog /> },
    { key: "bolt", label: "Electrical", icon: <FaBolt /> },
    { key: "building", label: "Civil", icon: <FaBuilding /> },
    { key: "brain", label: "AI & ML", icon: <FaBrain /> },
    { key: "microchip", label: "Electronics", icon: <FaMicrochip /> },
    { key: "robot", label: "Robotics", icon: <FaRobot /> },
    { key: "chart", label: "Data Science", icon: <FaChartBar /> },
    { key: "flask", label: "Research", icon: <FaFlask /> },
    { key: "leaf", label: "Environment", icon: <FaLeaf /> },
    { key: "globe", label: "International", icon: <FaGlobeAsia /> },
    { key: "music", label: "Performing Arts", icon: <FaMusic /> },
];

const PAGE_SIZE = 8;
const fieldColors = [
    "bg-indigo-100 text-indigo-700", 
    "bg-pink-100 text-pink-700", 
    "bg-yellow-100 text-yellow-700", 
    "bg-purple-100 text-purple-700", 
    "bg-green-100 text-green-700", 
    "bg-orange-100 text-orange-700"
];

const getFieldColor = (fieldId) => {
    return fieldColors[fieldId % fieldColors.length] || fieldColors[0];
};

/* ── ICON RENDERER ── */
const iconMap = Object.fromEntries(ICONS.map(i => [i.key, i.icon]));
const IconBubble = ({ iconKey, size = "sm" }) => {
    const sizeClass = size === "lg"
        ? "w-20 h-20 text-3xl"
        : "w-9 h-9 text-base";
    return (
        <div className={`${sizeClass} rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0`}>
            {iconMap[iconKey] || <FaCode />}
        </div>
    );
};

/* ── MODAL ── */
const SpecModal = ({ mode, spec, fields, onClose, onSave }) => {
    const defaultField = fields.length > 0 ? fields[0].id : "";
    const [fieldId, setFieldId] = useState(spec?.field_id || defaultField);
    const [name, setName] = useState(spec?.name || "");
    const [description, setDescription] = useState(spec?.description || "");
    const [selectedIcon, setIcon] = useState(spec?.icon || "code");
    const [status, setStatus] = useState(spec?.status || "Active");
    const [fieldOpen, setFieldOpen] = useState(false);

    const selectedField = fields.find(f => f.id == fieldId);

    const handleSave = () => {
        if (!name.trim() || !fieldId) return;
        onSave({
            name: name.trim(),
            field_id: fieldId,
            description: description.trim(),
            icon: selectedIcon,
            status: status,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        {mode === "add" ? "Add New Specialization" : "Edit Specialization"}
                    </h2>
                    <button onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition text-lg font-bold">
                        ✕
                    </button>
                </div>

                <div className="flex gap-6 p-7 flex-col md:flex-row">
                    {/* LEFT FORM */}
                    <div className="flex-1 flex flex-col gap-5">
                        {/* Field dropdown */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Field <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setFieldOpen(o => !o)}
                                    className="w-full flex items-center justify-between gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                                >
                                    <span className="flex items-center gap-2 text-indigo-600">
                                        <FaGlobeAsia className="text-gray-400" />
                                        <span className="text-gray-700 font-medium">{selectedField ? selectedField.name : "Select a field"}</span>
                                    </span>
                                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${fieldOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {fieldOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden max-h-48 overflow-y-auto">
                                        {fields.map(f => (
                                            <button key={f.id} type="button"
                                                onClick={() => { setFieldId(f.id); setFieldOpen(false); }}
                                                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-indigo-50 transition text-left ${fieldId == f.id ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700"}`}>
                                                <FaGlobeAsia className="text-indigo-400" />
                                                {f.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Specialization Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="e.g., Computer Science Engineering"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Short Description
                            </label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="e.g., Learn coding, algorithms, data structures and more."
                                rows={3}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition resize-none"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Icon picker */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Icon <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
                                {ICONS.map(ic => (
                                    <button key={ic.key} type="button"
                                        onClick={() => setIcon(ic.key)}
                                        className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition text-xs font-medium
                      ${selectedIcon === ic.key
                                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                                : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50"}`}>
                                        {selectedIcon === ic.key && (
                                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                                <FaCheck className="text-white text-[8px]" />
                                            </span>
                                        )}
                                        <span className="text-xl">{ic.icon}</span>
                                        <span className="leading-tight text-center">{ic.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="w-full md:w-56 flex-shrink-0">
                        <div className="sticky top-0">
                            <p className="text-sm font-semibold text-gray-700 mb-1">Preview</p>
                            <div className="border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 bg-gray-50/50 min-h-48">
                                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl mt-2">
                                    {iconMap[selectedIcon] || <FaCode />}
                                </div>
                                <p className="font-bold text-gray-800 text-base leading-snug">
                                    {name || <span className="text-gray-300 font-normal text-sm">Specialization Name</span>}
                                </p>
                                <p className="text-sm text-gray-500 leading-snug">
                                    {description || <span className="text-gray-300 text-xs">Short description will appear here.</span>}
                                </p>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getFieldColor(fieldId || 0)} mt-2`}>
                                    {selectedField ? selectedField.name : "Field"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-7 pb-7 pt-2 border-t border-gray-100">
                    <button onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button onClick={handleSave}
                        disabled={!name.trim() || !fieldId}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-sm font-semibold transition shadow-sm shadow-indigo-200">
                        {mode === "add" ? "Save Specialization" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── CONFIRM DELETE MODAL ── */
const DeleteModal = ({ spec, onClose, onConfirm }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 flex flex-col gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-xl mx-auto">
                <FaTrash />
            </div>
            <div className="text-center">
                <h3 className="font-bold text-gray-800 text-lg">Delete Specialization</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete <strong>{spec.name}</strong>? This action cannot be undone.
                </p>
            </div>
            <div className="flex gap-3">
                <button onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                    Cancel
                </button>
                <button onClick={() => { onConfirm(spec.id); onClose(); }}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition">
                    Delete
                </button>
            </div>
        </div>
    </div>
);

/* ── MAIN COMPONENT ── */
const AdminSpecializations = () => {
    const [specs, setSpecs] = useState([]);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const [modalConfig, setModalConfig] = useState(null); // { mode: 'add' | 'edit', spec?: obj }
    const [deleteTarget, setDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSpecs = specs.filter((item) =>
        (item.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.max(Math.ceil(filteredSpecs.length / rowsPerPage), 1);
    const paged = filteredSpecs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [specsRes, fieldsRes] = await Promise.all([
                fetchWithAuth(`${API_BASE}?r=dashboard/get-specializations`),
                fetchWithAuth(`${API_BASE}?r=dashboard/get-fields`)
            ]);
            
            if (!specsRes.ok || !fieldsRes.ok) throw new Error("Failed to fetch data");
            
            const specsData = await specsRes.json();
            const fieldsData = await fieldsRes.json();
            
            if (specsData.status === "success" && fieldsData.status === "success") {
                setSpecs(specsData.data);
                setFields(fieldsData.data);
            } else {
                throw new Error(specsData.message || fieldsData.message || "Error fetching data");
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (payload) => {
        try {
            const url = modalConfig.mode === "add" 
                ? `${API_BASE}?r=dashboard/create-specialization` 
                : `${API_BASE}?r=dashboard/update-specialization`;
                
            if (modalConfig.mode === "edit") {
                payload.id = modalConfig.spec.id;
            }

            const res = await fetchWithAuth(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save specialization");
            const result = await res.json();
            if (result.status === "success") {
                fetchData();
            } else {
                throw new Error(result.message || "Failed to save specialization");
            }
            setModalConfig(null);
        } catch (err) {
            console.error(err);
            alert(err.message || "Error saving specialization");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-specialization`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Failed to delete specialization");
            const result = await res.json();
            if (result.status === "success") {
                fetchData();
            } else {
                throw new Error(result.message || "Failed to delete specialization");
            }
            setDelete(null);
        } catch (err) {
            console.error(err);
            alert(err.message || "Error deleting specialization");
        }
    };

    return (
        <div className="flex-1 min-h-0">
            {/* Page header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Specializations</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Manage all specializations shown on the website.</p>
                </div>
                <button
                    onClick={() => setModalConfig({ mode: "add" })}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-200 transition">
                    <FaPlus className="text-xs" />
                    Add New Specialization
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative w-full sm:w-72">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                        placeholder="Search specializations..."
                        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase tracking-wide bg-gray-50/50">
                            <th className="text-left px-6 py-4 w-10">#</th>
                            <th className="text-left px-4 py-4 w-14">Icon</th>
                            <th className="text-left px-4 py-4">Specialization Name</th>
                            <th className="text-left px-4 py-4">Field</th>
                            <th className="text-left px-4 py-4">Short Description</th>
                            <th className="text-left px-4 py-4 w-24">Status</th>
                            <th className="text-left px-4 py-4 w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                        Loading specializations...
                                    </div>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-red-500 font-medium">
                                    Error: {error}
                                </td>
                            </tr>
                        ) : paged.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-400">
                                    No specializations found.
                                </td>
                            </tr>
                        ) : (
                            paged.map((spec, i) => (
                                <tr key={spec.id} className="hover:bg-gray-50/60 transition">
                                    <td className="px-6 py-4 text-gray-400 font-medium">
                                        {(page - 1) * PAGE_SIZE + i + 1}
                                    </td>
                                    <td className="px-4 py-4">
                                        <IconBubble iconKey={spec.icon} />
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">
                                        {spec.name}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getFieldColor(spec.field_id)}`}>
                                            {spec.field_name || "Unknown Field"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-gray-500 max-w-xs">
                                        {spec.description || "-"}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full
                                            ${spec.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-500"}`}>
                                            {spec.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setModalConfig({ mode: "edit", spec })}
                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-indigo-400 hover:bg-indigo-50 hover:border-indigo-300 transition">
                                                <FaEdit className="text-xs" />
                                            </button>
                                            <button
                                                onClick={() => setDelete(spec)}
                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition">
                                                <FaTrash className="text-xs" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <Pagination 
                    currentPage={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalItems={filteredSpecs.length}
                />
            </div>

            {/* Modals */}
            {modalConfig && (
                <SpecModal 
                    mode={modalConfig.mode}
                    spec={modalConfig.spec}
                    fields={fields}
                    onClose={() => setModalConfig(null)} 
                    onSave={handleSave} 
                />
            )}
            {deleteTarget && (
                <DeleteModal 
                    spec={deleteTarget} 
                    onClose={() => setDelete(null)} 
                    onConfirm={handleDelete} 
                />
            )}
        </div>
    );
};

export default AdminSpecializations;