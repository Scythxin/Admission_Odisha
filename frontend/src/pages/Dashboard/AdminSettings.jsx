import { useState, useEffect } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function AdminSettings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    setting_key: "",
    setting_value: "",
    status: "Active"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/get-settings`);
      const json = await res.json();
      if (json.status === "success") setSettings(json.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      setting_key: item.setting_key,
      setting_value: item.setting_value || "",
      status: item.is_status == 1 ? "Active" : "Inactive"
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this setting?")) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-setting`, {
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
    const endpoint = editingId ? "update-setting" : "create-setting";
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
    setForm({ setting_key: "", setting_value: "", status: "Active" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
          <p className="text-sm text-slate-500">Manage global configuration keys and values.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <FaPlus /> Add Setting
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Key</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
            ) : settings.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center">No settings found.</td></tr>
            ) : (
              settings.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.setting_key}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={item.setting_value}>{item.setting_value || "-"}</td>
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
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">{editingId ? "Edit" : "Add"} Setting</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Setting Key</label>
                <input
                  type="text"
                  value={form.setting_key}
                  onChange={e => setForm({ ...form, setting_key: e.target.value })}
                  required
                  placeholder="e.g. contact_email"
                  className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Setting Value</label>
                <textarea
                  value={form.setting_value}
                  onChange={e => setForm({ ...form, setting_value: e.target.value })}
                  rows={4}
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
