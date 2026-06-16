import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaQuestion,
  FaCheckCircle,
  FaEyeSlash,
  FaFileAlt,
  FaSearch,
  FaChevronDown,
  FaRedoAlt,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

const categoryColors = {
  Admission: "bg-purple-100 text-purple-600",
  Documents: "bg-blue-100 text-blue-600",
  Fee: "bg-orange-100 text-orange-600",
  Application: "bg-green-100 text-green-600",
  Counselling: "bg-pink-100 text-pink-600",
  Account: "bg-rose-100 text-rose-600",
};

const AdminFaq = ({ setActiveNav }) => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalConfig, setModalConfig] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=dashboard/get-faqs`);
      const result = await response.json();
      if (result.status === "success") {
        setFaqs(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFaq = async (faqData) => {
    const url = modalConfig.mode === "add" 
      ? `${import.meta.env.VITE_API_BASE_URL}?r=dashboard/create-faq`
      : `${import.meta.env.VITE_API_BASE_URL}?r=dashboard/update-faq`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqData),
      });
      const result = await response.json();
      if (result.status === "success") {
        fetchFaqs(); // Refresh the list
      } else {
        alert(result.message || "Failed to save FAQ");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("An error occurred while saving.");
    }
    setModalConfig(null);
  };

  const handleDeleteFaq = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=dashboard/delete-faq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteModal.id }),
      });
      const result = await response.json();
      if (result.status === "success") {
        fetchFaqs();
      } else {
        alert(result.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("An error occurred while deleting.");
    }
    setDeleteModal(null);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faq.answer && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categoryFilter === "All Categories" || faq.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All Status" || faq.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <button
              onClick={() => setActiveNav("Dashboard")}
              className="hover:text-indigo-600 transition"
            >
              Dashboard
            </button>
            <span>&gt;</span>
            <span className="text-indigo-600 font-medium">FAQ Management</span>
          </div>
        </div>
        <button 
          onClick={() => setModalConfig({ mode: "add" })}
          className="flex items-center gap-2 bg-[#6366f1] hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-indigo-200"
        >
          <FaPlus />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-4 gap-5">
        {/* Total FAQs */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xl flex-shrink-0">
            <FaQuestion />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Total FAQs</p>
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">{faqs.length}</h3>
            <p className="text-xs text-gray-400">All time FAQs</p>
          </div>
        </div>
        {/* Active FAQs */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-xl flex-shrink-0">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Active FAQs</p>
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">{faqs.filter(f => f.status === 'Active').length}</h3>
            <p className="text-xs text-gray-400">Visible on website</p>
          </div>
        </div>
        {/* Inactive FAQs */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl flex-shrink-0">
            <FaEyeSlash />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Inactive FAQs</p>
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">{faqs.filter(f => f.status === 'Inactive').length}</h3>
            <p className="text-xs text-gray-400">Not visible on website</p>
          </div>
        </div>
        {/* Categories */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl flex-shrink-0">
            <FaFileAlt />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Categories</p>
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">
              {new Set(faqs.map(f => f.category)).size}
            </h3>
            <p className="text-xs text-gray-400">Total FAQ Categories</p>
          </div>
        </div>
      </div>

      {/* ── TABLE CONTAINER ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQ by question or answer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer min-w-[160px]"
            >
              <option>All Categories</option>
              <option>Admission</option>
              <option>Documents</option>
              <option>Fee</option>
              <option>Application</option>
              <option>Counselling</option>
              <option>Account</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer min-w-[140px]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All Categories");
              setStatusFilter("All Status");
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition ml-auto"
          >
            <FaRedoAlt className="text-gray-400" />
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl w-16">#</th>
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4 w-40">Category</th>
                <th className="px-6 py-4 w-32">Status</th>
                <th className="px-6 py-4 w-40">Last Updated</th>
                <th className="px-6 py-4 w-48 text-center rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFaqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{faq.id}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{faq.question}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-md ${
                        categoryColors[faq.category] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {faq.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-md ${
                        faq.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {faq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{faq.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center text-indigo-500 bg-indigo-50 border border-indigo-100 rounded-md hover:bg-indigo-500 hover:text-white transition-colors" title="View">
                        <FaEye className="text-[13px]" />
                      </button>
                      <button onClick={() => setModalConfig({ mode: "edit", faq })} className="w-8 h-8 flex items-center justify-center text-blue-500 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-500 hover:text-white transition-colors" title="Edit">
                        <FaEdit className="text-[13px]" />
                      </button>
                      <button onClick={() => setDeleteModal(faq)} className="w-8 h-8 flex items-center justify-center text-rose-500 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-500 hover:text-white transition-colors" title="Delete">
                        <FaTrashAlt className="text-[13px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 1 to {filteredFaqs.length} of {faqs.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white bg-indigo-500 rounded-md font-medium text-sm shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm">
              7
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalConfig && (
        <FaqModal
          mode={modalConfig.mode}
          faq={modalConfig.faq}
          onClose={() => setModalConfig(null)}
          onSave={handleSaveFaq}
        />
      )}
      {deleteModal && (
        <DeleteModal
          faq={deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={handleDeleteFaq}
        />
      )}
    </div>
  );
};

const FaqModal = ({ mode, faq, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    faq || { question: "", answer: "", category: "Admission", status: "Active" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">
            {mode === "add" ? "Add New FAQ" : "Edit FAQ"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <form id="faq-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="Enter FAQ question"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
                placeholder="Enter FAQ answer"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                >
                  <option value="Admission">Admission</option>
                  <option value="Documents">Documents</option>
                  <option value="Fee">Fee</option>
                  <option value="Application">Application</option>
                  <option value="Counselling">Counselling</option>
                  <option value="Account">Account</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="faq-form"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {mode === "add" ? "Add FAQ" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ faq, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-6">
      <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
        <FaTrashAlt />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Delete FAQ?</h3>
      <p className="text-gray-500 mb-6 text-sm">
        Are you sure you want to delete this FAQ? This action cannot be undone.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex-1"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-xl hover:bg-rose-600 transition-colors shadow-sm flex-1"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default AdminFaq;
