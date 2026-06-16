import { useMemo, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaRedo,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaCommentDots,
  FaStar,
  FaRegTimesCircle,
} from "react-icons/fa";

const feedbackStats = [
  {
    label: "Total Feedback",
    value: 251,
    accent: "bg-slate-100 text-slate-700",
  },
  {
    label: "Positive Feedback",
    value: 168,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Negative Feedback",
    value: 32,
    accent: "bg-rose-100 text-rose-700",
  },
  {
    label: "Average Rating",
    value: "4.6",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    label: "Pending Reviews",
    value: 18,
    accent: "bg-sky-100 text-sky-700",
  },
];

const feedbackRows = [
  {
    id: "FB-101",
    userName: "Amit Kumar",
    userType: "Student",
    rating: 5,
    message: "Excellent navigation and quick access to course details.",
    suggestion: "Add a filter for scholarship deadlines.",
    date: "12 Jun 2026",
    status: "New",
  },
  {
    id: "FB-102",
    userName: "Riya Das",
    userType: "Parent",
    rating: 4,
    message: "Very helpful dashboard, but the college search could be faster.",
    suggestion: "Provide a saved search option.",
    date: "10 Jun 2026",
    status: "Reviewed",
  },
  {
    id: "FB-103",
    userName: "Suresh Patel",
    userType: "Counsellor",
    rating: 3,
    message: "Good overall experience but reports are hard to export.",
    suggestion: "Allow CSV export from each table.",
    date: "08 Jun 2026",
    status: "Pending",
  },
  {
    id: "FB-104",
    userName: "Nisha Mohanty",
    userType: "Student",
    rating: 2,
    message: "The mobile layout is not very friendly on smaller screens.",
    suggestion: "Improve responsive behavior for tablets.",
    date: "06 Jun 2026",
    status: "Resolved",
  },
];

const ratingOptions = [
  "All Ratings",
  "5 Stars",
  "4 Stars",
  "3 Stars",
  "2 Stars",
  "1 Star",
];
const statusOptions = ["All Status", "New", "Reviewed", "Pending", "Resolved"];
const dateOptions = ["Any Date", "Last 7 Days", "Last 30 Days", "This Month"];

const statusStyles = {
  New: "bg-blue-100 text-blue-700",
  Reviewed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Resolved: "bg-slate-100 text-slate-700",
};

const getStars = (count) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={index < count ? "text-amber-400" : "text-slate-300"}
    >
      <FaStar className="inline-block" />
    </span>
  ));
};

export default function AdminFeedback({ setActiveNav }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("Any Date");

  const filteredFeedback = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return feedbackRows.filter((item) => {
      const matchesSearch =
        normalizedSearch === "" ||
        item.id.toLowerCase().includes(normalizedSearch) ||
        item.userName.toLowerCase().includes(normalizedSearch) ||
        item.message.toLowerCase().includes(normalizedSearch) ||
        item.suggestion.toLowerCase().includes(normalizedSearch);

      const matchesRating =
        ratingFilter === "All Ratings" ||
        `${item.rating} Stars` === ratingFilter;

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      const matchesDate =
        dateFilter === "Any Date" ||
        (dateFilter === "Last 7 Days" &&
          ["12 Jun 2026", "10 Jun 2026"].includes(item.date)) ||
        (dateFilter === "Last 30 Days" &&
          ["12 Jun 2026", "10 Jun 2026", "08 Jun 2026", "06 Jun 2026"].includes(
            item.date,
          )) ||
        (dateFilter === "This Month" && item.date.endsWith("2026"));

      return matchesSearch && matchesRating && matchesStatus && matchesDate;
    });
  }, [searchQuery, ratingFilter, statusFilter, dateFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setRatingFilter("All Ratings");
    setStatusFilter("All Status");
    setDateFilter("Any Date");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">
            Dashboard &gt; Website Feedback
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Website Feedback Management
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition"
          onClick={() => setActiveNav && setActiveNav("Dashboard")}
        >
          <FaCommentDots className="mr-2" /> Back to Dashboard
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {feedbackStats.map((item) => (
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
        <div className="grid gap-4 xl:grid-cols-[1.9fr_1fr_1fr_1fr_0.9fr] xl:items-end">
          <div>
            <label htmlFor="feedbackSearch" className="sr-only">
              Search Feedback
            </label>
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="feedbackSearch"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search feedback by user, message or suggestion..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ratingFilter" className="sr-only">
              Filter by Rating
            </label>
            <select
              id="ratingFilter"
              value={ratingFilter}
              onChange={(event) => setRatingFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {ratingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="statusFilter" className="sr-only">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateFilter" className="sr-only">
              Filter by Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {dateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <FaRedo className="text-xs" /> Reset
          </button>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm overflow-x-auto">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Showing {filteredFeedback.length} feedback entries
            </p>
          </div>
        </div>

        {filteredFeedback.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-16 text-center text-slate-500">
            <div className="mb-4 flex items-center justify-center text-4xl text-slate-400">
              <FaRegTimesCircle />
            </div>
            <p className="text-lg font-semibold text-slate-800">
              No feedback found
            </p>
            <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
              Adjust your search or filters to find feedback entries. Feedback
              management will display once users submit feedback through the
              website.
            </p>
          </div>
        ) : (
          <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
            <thead>
              <tr>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  ID
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  User Name
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  User Type
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Rating
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Feedback Message
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Suggestion
                </th>
                <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Submission Date
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
              {filteredFeedback.map((item) => (
                <tr
                  key={item.id}
                  className="group transition hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-slate-700">
                    {item.id}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700">
                    {item.userName}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-500">
                    {item.userType}
                  </td>
                  <td className="py-4 pr-4 text-sm text-amber-600">
                    {getStars(item.rating)}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700 max-w-xl">
                    {item.message}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-500 max-w-xl">
                    {item.suggestion}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-500">
                    {item.date}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-500">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                      >
                        <FaCheckCircle /> Mark Reviewed
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        <FaTimesCircle /> Resolve
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
                      >
                        <FaRedo /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
