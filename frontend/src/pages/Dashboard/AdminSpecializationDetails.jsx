import { useState, useEffect } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Pagination from "../../components/admin/Pagination";

export default function AdminSpecializationDetails() {
  const [details, setDetails] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [form, setForm] = useState({
    specialization_id: "",
    intro: "",
    eligibility: "",
    status: "Active"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/get-specialization-details`);
      const json = await res.json();
      if (json.status === "success") setDetails(json.data || []);
      
      const resSpec = await fetchWithAuth(`${API_BASE}?r=dashboard/get-specializations`);
      const jsonSpec = await resSpec.json();
      if (jsonSpec.status === "success") setSpecializations(jsonSpec.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      specialization_id: item.specialization_id,
      intro: item.intro || "",
      eligibility: item.eligibility || "",
      status: item.is_status == 1 ? "Active" : "Inactive"
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this specialization detail?")) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-specialization-detail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json.status === "success") fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editingId ? "update-specialization-detail" : "create-specialization-detail";
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId })
      });
      const json = await res.json();
      if (json.status === "success") {
        setShowModal(false);
        fetchData();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ specialization_id: "", intro: "", eligibility: "", status: "Active" });
  };

  const filteredDetails = details.filter((item) =>
    (item.specialization_name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredDetails.length / rowsPerPage), 1);
  const paginatedDetails = filteredDetails.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Specialization Details</h1>
          <p className="text-sm text-slate-500">Manage detailed descriptions and eligibility criteria.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <FaPlus /> Add Detail
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search by specialization..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Specialization</th>
              <th className="px-4 py-3 font-medium">Intro</th>
              <th className="px-4 py-3 font-medium">Eligibility</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
            ) : paginatedDetails.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center">No details found.</td></tr>
            ) : (
              paginatedDetails.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.specialization_name || "Unknown"}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={item.intro}>{item.intro || "-"}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={item.eligibility}>{item.eligibility || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${item.is_status == 1 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                      {item.is_status == 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(item)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"><FaEdit /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash /></button>
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
          totalItems={filteredDetails.length}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">{editingId ? "Edit" : "Add"} Specialization Detail</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Specialization</label>
                <select
                  value={form.specialization_id}
                  onChange={e => setForm({ ...form, specialization_id: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select Specialization...</option>
                  {specializations.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Intro</label>
                <textarea
                  value={form.intro}
                  onChange={e => setForm({ ...form, intro: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Eligibility</label>
                <textarea
                  value={form.eligibility}
                  onChange={e => setForm({ ...form, eligibility: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-100">Cancel</button>
                <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
