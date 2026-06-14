import { useMemo, useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSync,
} from "react-icons/fa";

const scholarshipStats = [
  {
    label: "Total Scholarships",
    value: 125,
    accent: "bg-slate-100 text-slate-700",
  },
  {
    label: "Active Scholarships",
    value: 98,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Upcoming Deadlines",
    value: 15,
    accent: "bg-orange-100 text-orange-700",
  },
  {
    label: "Expired Scholarships",
    value: 12,
    accent: "bg-rose-100 text-rose-700",
  },
  {
    label: "Total Categories",
    value: 8,
    accent: "bg-sky-100 text-sky-700",
  },
];

const scholarshipRows = [
  {
    id: 1,
    name: "Mukhyamantri Merit Scholarship",
    provider: "Govt. of Odisha",
    category: "Merit Based",
    amount: "₹20,000",
    deadline: "30 Jun 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Post Matric Scholarship",
    provider: "Govt. of India",
    category: "SC / ST",
    amount: "₹10,000",
    deadline: "15 Jul 2025",
    status: "Active",
  },
  {
    id: 3,
    name: "Central Sector Scholarship",
    provider: "Ministry of Education",
    category: "Merit Based",
    amount: "₹12,000",
    deadline: "31 Aug 2025",
    status: "Active",
  },
  {
    id: 4,
    name: "OBC Scholarship",
    provider: "Govt. of Odisha",
    category: "OBC",
    amount: "₹9,000",
    deadline: "10 Jul 2025",
    status: "Active",
  },
  {
    id: 5,
    name: "Women Education Scholarship",
    provider: "Govt. of Odisha",
    category: "Girls",
    amount: "₹15,000",
    deadline: "20 Jul 2025",
    status: "Active",
  },
  {
    id: 6,
    name: "Minority Scholarship",
    provider: "Govt. of India",
    category: "Minority",
    amount: "₹18,000",
    deadline: "05 Jul 2025",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Industry Sponsored Scholarship",
    provider: "Tata Trusts",
    category: "Merit Based",
    amount: "₹25,000",
    deadline: "25 Aug 2025",
    status: "Active",
  },
  {
    id: 8,
    name: "Skill Development Scholarship",
    provider: "Govt. of India",
    category: "Merit Based",
    amount: "₹18,500",
    deadline: "05 Sep 2025",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Rural Girls Scholarship",
    provider: "State Education Board",
    category: "Girls",
    amount: "₹14,000",
    deadline: "12 Jul 2025",
    status: "Active",
  },
  {
    id: 10,
    name: "Higher Education Grant",
    provider: "Ministry of Education",
    category: "Merit Based",
    amount: "₹22,000",
    deadline: "18 Aug 2025",
    status: "Inactive",
  },
];

const categoryOptions = [
  "All Categories",
  "Merit Based",
  "SC / ST",
  "OBC",
  "Girls",
  "Minority",
];

const statusOptions = ["All Status", "Active", "Inactive"];

const providerOptions = [
  "All Providers",
  "Govt. of Odisha",
  "Govt. of India",
  "Ministry of Education",
  "Tata Trusts",
  "State Education Board",
];

const badgeStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-rose-100 text-rose-700",
};

export default function AdminScholarships({ setActiveNav }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [provider, setProvider] = useState("All Providers");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredScholarships = useMemo(() => {
    return scholarshipRows.filter((item) => {
      const normalizedSearch = searchQuery.trim().toLowerCase();
      const searchMatch =
        normalizedSearch === "" ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.provider.toLowerCase().includes(normalizedSearch);

      const categoryMatch =
        category === "All Categories" || item.category === category;
      const statusMatch = status === "All Status" || item.status === status;
      const providerMatch =
        provider === "All Providers" || item.provider === provider;

      return searchMatch && categoryMatch && statusMatch && providerMatch;
    });
  }, [searchQuery, category, status, provider]);

  const rowsPerPage = 7;
  const totalPages = Math.max(
    Math.ceil(filteredScholarships.length / rowsPerPage),
    1,
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("All Categories");
    setStatus("All Status");
    setProvider("All Providers");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-500">
            Dashboard &gt; Scholarship Management
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Scholarship Management
          </h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition"
        >
          <FaPlus className="mr-2" /> Add Scholarship
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {scholarshipStats.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accent}`}
            >
              <span className="text-lg font-semibold">
                {item.label.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr_1fr_0.95fr] xl:items-end">
          <div>
            <label htmlFor="scholarshipSearch" className="sr-only">
              Search scholarships
            </label>
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="scholarshipSearch"
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search scholarship by name, provider..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="categoryFilter" className="sr-only">
              Category filter
            </label>
            <select
              id="categoryFilter"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="statusFilter" className="sr-only">
              Status filter
            </label>
            <select
              id="statusFilter"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="providerFilter" className="sr-only">
              Provider filter
            </label>
            <select
              id="providerFilter"
              value={provider}
              onChange={(event) => {
                setProvider(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {providerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <FaSync /> Reset
          </button>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm overflow-x-auto">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Showing {visibleScholarships.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(
                startIndex + visibleScholarships.length,
                filteredScholarships.length,
              )}{" "}
              of {filteredScholarships.length} entries
            </p>
          </div>
        </div>

        {visibleScholarships.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            No scholarships match the current filters.
          </div>
        ) : (
          <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
            <thead>
              <tr>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  #
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Scholarship Name
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Provider
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Category
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Amount
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Deadline
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Status
                </th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleScholarships.map((item) => (
                <tr
                  key={item.id}
                  className="group transition hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-slate-700">
                    {item.id}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700">
                    {item.name}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-500">
                    {item.provider}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-sm font-semibold text-slate-700">
                    {item.amount}
                  </td>
                  <td className="py-4 pr-4 text-sm text-orange-600">
                    {item.deadline}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                        aria-label="View scholarship"
                      >
                        <FaEye />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                        aria-label="Edit scholarship"
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                        aria-label="Delete scholarship"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`inline-flex h-10 min-w-[38px] items-center justify-center rounded-2xl border px-4 text-sm transition ${
                    currentPage === page
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
