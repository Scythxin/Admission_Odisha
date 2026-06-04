import { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ROW_OPTIONS = [5, 10, 15, 20];

function parseCourses(courses) {
  if (!courses) return [];
  if (Array.isArray(courses)) return courses;

  try {
    const parsed = JSON.parse(courses);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusBadgeClass(status) {
  return status === "Active"
    ? "bg-emerald-50 text-emerald-700"
    : "bg-red-50 text-red-700";
}

function getPaginationItems(page, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page, "...", totalPages];
}

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [university, setUniversity] = useState("All");
  const [status, setStatus] = useState("All");
  const [appliedUniversity, setAppliedUniversity] = useState("All");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = colleges.filter((college) => {
      const matchesSearch =
        query === "" ||
        [college.name, college.description, college.location].some((field) =>
          field?.toString().toLowerCase().includes(query),
        );

      const matchesUniversity =
        appliedUniversity === "All" ||
        college.description === appliedUniversity;

      const matchesStatus =
        appliedStatus === "All" || college.status === appliedStatus;

      return matchesSearch && matchesUniversity && matchesStatus;
    });

    setFilteredData(filtered);
    setPage(1);
  }, [colleges, searchQuery, appliedUniversity, appliedStatus]);

  async function fetchColleges() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}?r=site/api-colleges`);
      if (!response.ok) {
        throw new Error(`Failed to fetch colleges (${response.status})`);
      }

      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.message || "Failed to fetch colleges");
      }

      const list = Array.isArray(result.data) ? result.data : [];

      const normalized = list.map((item) => {
        const courses = parseCourses(item.courses);
        return {
          ...item,
          courses,
          status: Number(item.is_status) === 1 ? "Active" : "Inactive",
          description: item.description || "-",
          location: item.location || "-",
          type: item.type || "-",
          created_at: item.created_at || "-",
        };
      });

      const universities = Array.from(
        new Set(normalized.map((item) => item.description || "-")),
      ).filter((item) => item !== "-");

      setColleges(normalized);
      setFilteredData(normalized);
      setAvailableUniversities(universities);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError.message || "Unable to load colleges.");
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    setAppliedUniversity(university);
    setAppliedStatus(status);
  }

  function resetFilters() {
    setSearchQuery("");
    setUniversity("All");
    setStatus("All");
    setAppliedUniversity("All");
    setAppliedStatus("All");
  }

  const totalPages = Math.max(Math.ceil(filteredData.length / rowsPerPage), 1);
  const currentPage = Math.min(page, totalPages);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const totalColleges = colleges.length;
  const activeColleges = colleges.filter(
    (item) => item.status === "Active",
  ).length;
  const inactiveColleges = colleges.filter(
    (item) => item.status === "Inactive",
  ).length;
  const totalUniversities = new Set(
    colleges.map((item) => item.type?.trim() || "Unknown"),
  ).size;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-500">
            Dashboard &gt; Colleges
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Colleges</h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition"
        >
          + Add College
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <span className="text-lg font-bold">T</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Colleges</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {totalColleges}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <span className="text-lg font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Active Colleges
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {activeColleges}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <span className="text-lg font-bold">I</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Inactive Colleges
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {inactiveColleges}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <span className="text-lg font-bold">U</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Universities
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {totalUniversities}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr_1fr_0.85fr] xl:items-end">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Search
            </label>
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, university or location"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Select University
            </label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
            >
              <option value="All">All</option>
              {availableUniversities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Select Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button
              onClick={applyFilters}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition"
            >
              Filter
            </button>
            <button
              onClick={resetFilters}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  #
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  College Name
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  University
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  Location
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  Type
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  Courses
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  Added On
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Loading colleges...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-5 py-12 text-center text-red-500"
                  >
                    Error: {error}
                  </td>
                </tr>
              ) : displayedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-5 py-12 text-center text-slate-400"
                  >
                    No colleges found.
                  </td>
                </tr>
              ) : (
                displayedData.map((college) => (
                  <tr
                    key={college.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-slate-600">{college.id}</td>
                    <td className="px-5 py-4 text-slate-900 font-semibold max-w-sm truncate">
                      {college.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600 max-w-xs truncate">
                      {college.description}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {college.location}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{college.type}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(college.status)}`}
                      >
                        {college.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {Array.isArray(college.courses)
                        ? college.courses.length
                        : 0}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(college.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="View"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Edit"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            Showing{" "}
            {displayedData.length === 0
              ? 0
              : (currentPage - 1) * rowsPerPage + 1}{" "}
            to {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} colleges
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
              >
                {ROW_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100"
              >
                Previous
              </button>
              {getPaginationItems(currentPage, totalPages).map(
                (item, index) => (
                  <button
                    key={`${item}-${index}`}
                    type="button"
                    onClick={() => typeof item === "number" && setPage(item)}
                    disabled={item === "..."}
                    className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl border px-3 text-sm transition ${
                      item === currentPage
                        ? "border-blue-600 bg-blue-600 text-white"
                        : item === "..."
                          ? "cursor-default border-transparent text-slate-400"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
