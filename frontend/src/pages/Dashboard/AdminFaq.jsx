import React, { useState } from "react";
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
} from "react-icons/fa";

const faqsData = [
  {
    id: 1,
    question: "How can I apply for admission?",
    category: "Admission",
    status: "Active",
    lastUpdated: "20 May 2024",
  },
  {
    id: 2,
    question: "What documents are required for application?",
    category: "Documents",
    status: "Active",
    lastUpdated: "18 May 2024",
  },
  {
    id: 3,
    question: "Is there any application fee?",
    category: "Fee",
    status: "Active",
    lastUpdated: "15 May 2024",
  },
  {
    id: 4,
    question: "How can I check my application status?",
    category: "Application",
    status: "Active",
    lastUpdated: "12 May 2024",
  },
  {
    id: 5,
    question: "What is the last date to apply?",
    category: "Admission",
    status: "Inactive",
    lastUpdated: "10 May 2024",
  },
  {
    id: 6,
    question: "Can I edit my application after submission?",
    category: "Application",
    status: "Active",
    lastUpdated: "08 May 2024",
  },
  {
    id: 7,
    question: "How will I get updates about counselling?",
    category: "Counselling",
    status: "Active",
    lastUpdated: "05 May 2024",
  },
  {
    id: 8,
    question: "What if I forget my login password?",
    category: "Account",
    status: "Inactive",
    lastUpdated: "01 May 2024",
  },
];

const categoryColors = {
  Admission: "bg-purple-100 text-purple-600",
  Documents: "bg-blue-100 text-blue-600",
  Fee: "bg-orange-100 text-orange-600",
  Application: "bg-green-100 text-green-600",
  Counselling: "bg-pink-100 text-pink-600",
  Account: "bg-rose-100 text-rose-600",
};

const AdminFaq = ({ setActiveNav }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

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
        <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-indigo-200">
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
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">56</h3>
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
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">48</h3>
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
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">8</h3>
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
            <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1">7</h3>
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
              {faqsData.map((faq) => (
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
                      <button className="w-8 h-8 flex items-center justify-center text-blue-500 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-500 hover:text-white transition-colors" title="Edit">
                        <FaEdit className="text-[13px]" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-rose-500 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-500 hover:text-white transition-colors" title="Delete">
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
            Showing 1 to 8 of 56 entries
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
    </div>
  );
};

export default AdminFaq;
