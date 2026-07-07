import { useState, useEffect } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function AdminCourseCollegeMapping() {
  const [mappings, setMappings] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    college_id: "",
    course_id: "",
    specialization_id: "",
    total_seats: "",
    short_desc: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resMap, resCol, resCur, resSpec] = await Promise.all([
        fetchWithAuth(`${API_BASE}?r=dashboard/get-mappings`),
        fetchWithAuth(`${API_BASE}?r=site/api-colleges`),
        fetchWithAuth(`${API_BASE}?r=dashboard/get-courses`),
        fetchWithAuth(`${API_BASE}?r=dashboard/get-specializations`)
      ]);
      
      const jsonMap = await resMap.json();
      const jsonCol = await resCol.json();
      const jsonCur = await resCur.json();
      const jsonSpec = await resSpec.json();

      if (jsonMap.status === "success") setMappings(jsonMap.data || []);
      if (jsonCol.status === "success") setColleges(jsonCol.data || []);
      if (jsonCur.status === "success") setCourses(jsonCur.data || []);
      if (jsonSpec.status === "success") setSpecializations(jsonSpec.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      college_id: item.college_id,
      course_id: item.course_id,
      specialization_id: item.specialization_id || "",
      total_seats: item.total_seats || "",
      short_desc: item.short_desc || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this mapping?")) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-mapping`, {
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
    const endpoint = editingId ? "update-mapping" : "create-mapping";
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
    setForm({ college_id: "", course_id: "", specialization_id: "", total_seats: "", short_desc: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Course-College Mapping</h1>
          <p className="text-sm text-slate-500">Map which courses and specializations are offered by each college.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <FaPlus /> Add Mapping
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">College</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Specialization</th>
              <th className="px-4 py-3 font-medium">Seats</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
            ) : mappings.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center">No mappings found.</td></tr>
            ) : (
              mappings.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.college_name || "Unknown"}</td>
                  <td className="px-4 py-3">{item.course_name || "Unknown"}</td>
                  <td className="px-4 py-3">{item.specialization_name || "General"}</td>
                  <td className="px-4 py-3">{item.total_seats || "N/A"}</td>
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
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">{editingId ? "Edit" : "Add"} Mapping</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">College</label>
                <select
                  value={form.college_id}
                  onChange={e => setForm({ ...form, college_id: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select College...</option>
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Course</label>
                <select
                  value={form.course_id}
                  onChange={e => setForm({ ...form, course_id: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select Course...</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Specialization (Optional)</label>
                <select
                  value={form.specialization_id}
                  onChange={e => setForm({ ...form, specialization_id: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">None (General)</option>
                  {specializations.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Total Seats</label>
                <input
                  type="number"
                  value={form.total_seats}
                  onChange={e => setForm({ ...form, total_seats: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Short Description</label>
                <textarea
                  value={form.short_desc}
                  onChange={e => setForm({ ...form, short_desc: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                />
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
