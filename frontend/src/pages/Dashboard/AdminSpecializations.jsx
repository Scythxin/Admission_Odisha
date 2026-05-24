import React, { useState } from "react";
import {
    FaCode, FaCog, FaBolt, FaBuilding, FaHeartbeat, FaStethoscope,
    FaChartBar, FaBalanceScale, FaBrain, FaMicrochip, FaRobot,
    FaFlask, FaLeaf, FaGlobeAsia, FaPencilAlt, FaMusic, FaEdit, FaTrash,
    FaPlus, FaChevronLeft, FaChevronRight, FaCheck,
} from "react-icons/fa";

/* ── DUMMY DATA ── */
const FIELDS = [
    { id: 1, name: "Engineering & Technology", icon: <FaCog /> },
    { id: 2, name: "Medical & Health", icon: <FaHeartbeat /> },
    { id: 3, name: "Commerce & Management", icon: <FaChartBar /> },
    { id: 4, name: "Law", icon: <FaBalanceScale /> },
    { id: 5, name: "Arts & Humanities", icon: <FaPencilAlt /> },
    { id: 6, name: "Science", icon: <FaFlask /> },
];

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

const INITIAL_SPECS = [
    { id: 1, name: "Computer Science Engineering", field: "Engineering & Technology", fieldColor: "bg-indigo-100 text-indigo-700", desc: "Learn coding, algorithms, data structures and more.", icon: "code", status: "Active" },
    { id: 2, name: "Mechanical Engineering", field: "Engineering & Technology", fieldColor: "bg-indigo-100 text-indigo-700", desc: "Design, build and innovate mechanical systems.", icon: "cog", status: "Active" },
    { id: 3, name: "Electrical Engineering", field: "Engineering & Technology", fieldColor: "bg-indigo-100 text-indigo-700", desc: "Study electric systems, power and electronics.", icon: "bolt", status: "Active" },
    { id: 4, name: "Civil Engineering", field: "Engineering & Technology", fieldColor: "bg-indigo-100 text-indigo-700", desc: "Build infrastructure and shape the world.", icon: "building", status: "Active" },
    { id: 5, name: "Cardiology", field: "Medical & Health", fieldColor: "bg-pink-100 text-pink-700", desc: "Study heart, blood vessels and cardiovascular diseases.", icon: "flask", status: "Active" },
    { id: 6, name: "General Medicine", field: "Medical & Health", fieldColor: "bg-pink-100 text-pink-700", desc: "Comprehensive study of health and diseases.", icon: "flask", status: "Active" },
    { id: 7, name: "Business Administration", field: "Commerce & Management", fieldColor: "bg-yellow-100 text-yellow-700", desc: "Learn business strategies and management skills.", icon: "chart", status: "Active" },
    { id: 8, name: "Corporate Law", field: "Law", fieldColor: "bg-purple-100 text-purple-700", desc: "Understand corporate laws and legal frameworks.", icon: "robot", status: "Active" },
    { id: 9, name: "Data Science", field: "Engineering & Technology", fieldColor: "bg-indigo-100 text-indigo-700", desc: "Analyse data, build models and derive insights.", icon: "chart", status: "Active" },
    { id: 10, name: "Artificial Intelligence", field: "Engineering & Technology", fieldColor: "bg-indigo-100 text-indigo-700", desc: "Build intelligent systems and neural networks.", icon: "brain", status: "Active" },
    { id: 11, name: "Environmental Science", field: "Science", fieldColor: "bg-green-100 text-green-700", desc: "Study ecosystems, climate and sustainability.", icon: "leaf", status: "Inactive" },
    { id: 12, name: "International Relations", field: "Arts & Humanities", fieldColor: "bg-orange-100 text-orange-700", desc: "Explore global politics and diplomacy.", icon: "globe", status: "Active" },
    ...Array.from({ length: 12 }, (_, i) => ({
        id: 13 + i,
        name: `Specialization ${13 + i}`,
        field: FIELDS[(i) % FIELDS.length].name,
        fieldColor: ["bg-indigo-100 text-indigo-700", "bg-pink-100 text-pink-700", "bg-yellow-100 text-yellow-700", "bg-purple-100 text-purple-700", "bg-green-100 text-green-700", "bg-orange-100 text-orange-700"][(i) % 6],
        desc: "Short description for this specialization.",
        icon: ICONS[(i) % ICONS.length].key,
        status: i % 4 === 0 ? "Inactive" : "Active",
    })),
];

const PAGE_SIZE = 8;

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
const AddSpecializationModal = ({ onClose, onSave }) => {
    const [fieldId, setFieldId] = useState(1);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedIcon, setIcon] = useState("code");
    const [fieldOpen, setFieldOpen] = useState(false);

    const selectedField = FIELDS.find(f => f.id === fieldId);

    const fieldColorMap = {
        1: "bg-indigo-100 text-indigo-700",
        2: "bg-pink-100 text-pink-700",
        3: "bg-yellow-100 text-yellow-700",
        4: "bg-purple-100 text-purple-700",
        5: "bg-orange-100 text-orange-700",
        6: "bg-green-100 text-green-700",
    };

    const handleSave = () => {
        if (!name.trim()) return;
        onSave({
            name: name.trim(),
            field: selectedField.name,
            fieldColor: fieldColorMap[fieldId] || "bg-gray-100 text-gray-700",
            desc: desc.trim() || "No description provided.",
            icon: selectedIcon,
            status: "Active",
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Add New Specialization</h2>
                    <button onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition text-lg font-bold">
                        ✕
                    </button>
                </div>

                <div className="flex gap-6 p-7">
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
                                        {selectedField?.icon}
                                        <span className="text-gray-700 font-medium">{selectedField?.name}</span>
                                    </span>
                                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${fieldOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {fieldOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                                        {FIELDS.map(f => (
                                            <button key={f.id} type="button"
                                                onClick={() => { setFieldId(f.id); setFieldOpen(false); }}
                                                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-indigo-50 transition text-left ${fieldId === f.id ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700"}`}>
                                                <span className="text-indigo-500">{f.icon}</span>
                                                {f.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Select the field this specialization belongs to.</p>
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
                            <p className="text-xs text-gray-400 mt-1">Enter the name of the specialization.</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                placeholder="e.g., Learn coding, algorithms, data structures and more."
                                rows={3}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition resize-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">Enter a short description for this specialization.</p>
                        </div>

                        {/* Icon picker */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Icon <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-4 gap-2">
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
                            <p className="text-xs text-gray-400 mt-2">Choose an icon to represent this specialization.</p>
                        </div>
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="w-56 flex-shrink-0">
                        <div className="sticky top-0">
                            <p className="text-sm font-semibold text-gray-700 mb-1">Preview</p>
                            <p className="text-xs text-gray-400 mb-3">This is how the specialization will appear.</p>
                            <div className="border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 bg-gray-50/50 min-h-48">
                                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl mt-2">
                                    {iconMap[selectedIcon] || <FaCode />}
                                </div>
                                <p className="font-bold text-gray-800 text-base leading-snug">
                                    {name || <span className="text-gray-300 font-normal text-sm">Specialization Name</span>}
                                </p>
                                <p className="text-sm text-gray-500 leading-snug">
                                    {desc || <span className="text-gray-300 text-xs">Short description will appear here.</span>}
                                </p>
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
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition shadow-sm shadow-indigo-200">
                        Save Specialization
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
    const [specs, setSpecs] = useState(INITIAL_SPECS);
    const [page, setPage] = useState(1);
    const [showAdd, setShowAdd] = useState(false);
    const [deleteTarget, setDelete] = useState(null);

    const totalPages = Math.ceil(specs.length / PAGE_SIZE);
    const paged = specs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleSave = (newSpec) => {
        setSpecs(prev => [...prev, { id: Date.now(), ...newSpec }]);
    };

    const handleDelete = (id) => {
        setSpecs(prev => prev.filter(s => s.id !== id));
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
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-200 transition">
                    <FaPlus className="text-xs" />
                    Add New Specialization
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase tracking-wide">
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
                        {paged.map((spec, i) => (
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
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${spec.fieldColor}`}>
                                        {spec.field}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-gray-500 max-w-xs">
                                    {spec.desc}
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
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, specs.length)} of {specs.length} specializations
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
                            <FaChevronLeft className="text-xs" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => setPage(p)}
                                className={`w-8 h-8 rounded-lg text-sm font-semibold transition
                  ${page === p
                                        ? "bg-indigo-600 text-white border border-indigo-600"
                                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showAdd && <AddSpecializationModal onClose={() => setShowAdd(false)} onSave={handleSave} />}
            {deleteTarget && <DeleteModal spec={deleteTarget} onClose={() => setDelete(null)} onConfirm={handleDelete} />}
        </div>
    );
};

export default AdminSpecializations;