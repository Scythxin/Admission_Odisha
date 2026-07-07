import { useState, useEffect } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

export default function AdminCourseDetails() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  
  const [form, setForm] = useState({
    slug: "",
    category: "",
    short_name: "",
    full_name: "",
    rating: "",
    reviews_count: "",
    badge: "",
    short_description: "",
    about_description: "",
    fees_range: "",
    career_opportunities: "",
    eligibility: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/get-course-details`);
      const json = await res.json();
      if (json.status === "success") setDetails(json.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    
    // Convert JSON to string for textarea, safely
    let career = "";
    let eligibility = "";
    try { career = typeof item.career_opportunities === 'string' ? JSON.parse(item.career_opportunities || "[]").join("\n") : (item.career_opportunities || []).join("\n"); } catch(e) { career = item.career_opportunities; }
    try { eligibility = typeof item.eligibility === 'string' ? JSON.parse(item.eligibility || "[]").join("\n") : (item.eligibility || []).join("\n"); } catch(e) { eligibility = item.eligibility; }
    
    setForm({
      slug: item.slug || "",
      category: item.category || "",
      short_name: item.short_name || "",
      full_name: item.full_name || "",
      rating: item.rating || "",
      reviews_count: item.reviews_count || "",
      badge: item.badge || "",
      short_description: item.short_description || "",
      about_description: item.about_description || "",
      fees_range: item.fees_range || "",
      career_opportunities: career,
      eligibility: eligibility
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course detail?")) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-course-detail`, {
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
    const endpoint = editingId ? "update-course-detail" : "create-course-detail";
    
    // Parse multiline string to array for JSON fields
    const payload = {
        ...form,
        id: editingId,
        career_opportunities: form.career_opportunities.split('\n').filter(Boolean),
        eligibility: form.eligibility.split('\n').filter(Boolean)
    };

    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
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
    setForm({ 
        slug: "", category: "", short_name: "", full_name: "", rating: "", 
        reviews_count: "", badge: "", short_description: "", about_description: "", 
        fees_range: "", career_opportunities: "", eligibility: "" 
    });
  };

  const filteredDetails = details.filter(d => 
    (d.slug || "").toLowerCase().includes(search.toLowerCase()) || 
    (d.full_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Course Details</h1>
          <p className="text-sm text-slate-500">Manage rich content for individual courses like syllabus, career ops, etc.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <FaPlus /> Add Course Detail
        </button>
      </div>

      <div className="flex items-center bg-white rounded-xl border border-slate-200 px-3 py-2 w-full max-w-sm">
        <FaSearch className="text-slate-400 mr-2" />
        <input 
            type="text" 
            placeholder="Search by slug or full name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
            ) : filteredDetails.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center">No details found.</td></tr>
            ) : (
              filteredDetails.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.slug}</td>
                  <td className="px-4 py-3">{item.full_name || item.short_name || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700">
                      {item.category || "General"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.rating ? `${item.rating} (${item.reviews_count} reviews)` : "-"}</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl my-8">
            <h2 className="mb-4 text-xl font-bold text-slate-800">{editingId ? "Edit" : "Add"} Course Detail</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Slug *</label>
                    <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. btech-computer-science" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                    <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Engineering" />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Short Name</label>
                    <input type="text" value={form.short_name} onChange={e => setForm({ ...form, short_name: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. B.Tech CS" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                    <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Bachelor of Technology in Computer Science" />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Rating</label>
                    <input type="number" step="0.1" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="0.0 - 5.0" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Reviews Count</label>
                    <input type="number" value={form.reviews_count} onChange={e => setForm({ ...form, reviews_count: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="Total reviews" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Badge</label>
                    <input type="text" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Top Rated" />
                  </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Fees Range</label>
                <input type="text" value={form.fees_range} onChange={e => setForm({ ...form, fees_range: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. ₹50,000 - ₹2,00,000 per year" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Short Description</label>
                <textarea value={form.short_description} onChange={e => setForm({ ...form, short_description: e.target.value })} rows={2}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">About Description</label>
                <textarea value={form.about_description} onChange={e => setForm({ ...form, about_description: e.target.value })} rows={4}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Career Opportunities (One per line)</label>
                    <textarea value={form.career_opportunities} onChange={e => setForm({ ...form, career_opportunities: e.target.value })} rows={4}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="Software Engineer&#10;Data Scientist" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Eligibility (One per line)</label>
                    <textarea value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} rows={4}
                        className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500" placeholder="10+2 with 60%&#10;Physics and Math required" />
                  </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-100 text-slate-700">Cancel</button>
                <button type="submit" className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
