import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API_BASE, { ASSETS_BASE } from "../../config/api";

const StarIcon = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-amber-400" : "text-slate-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HeartIcon = ({ filled, className = "" }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    className="w-12 h-12 text-indigo-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

const GraduationIcon = () => (
  <svg
    className="w-10 h-10 text-indigo-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
    />
  </svg>
);

function StatCard({ icon, value, label, sublabel, accent }) {
  return (
    <div
      className={`flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-800 leading-tight">
          {value}
        </p>
        {sublabel && <p className="text-xs text-slate-400">{sublabel}</p>}
      </div>
    </div>
  );
}

function CollegeCard({ college, onRemove }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(college.id), 350);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop";
    if (imagePath.startsWith("http")) return imagePath;
    return `${ASSETS_BASE}/${imagePath}`;
  };

  const stars = Array.from(
    { length: 5 },
    (_, i) => i < Math.floor(college.rating || 0),
  );
  const coursesCount = college.courses
    ? Array.isArray(college.courses)
      ? college.courses.length
      : Object.keys(college.courses).length
    : 0;

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex gap-0
        ${removing ? "opacity-0 scale-95 -translate-x-4" : "opacity-100 scale-100 translate-x-0"}`}
    >
      {/* Image */}
      <div className="relative w-52 shrink-0 overflow-hidden">
        <img
          src={getImageUrl(college.image)}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
        <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 transition-colors">
          <HeartIcon filled={true} className="text-rose-500 w-4 h-4" />
        </button>
        <span
          className={`absolute bottom-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700`}
        >
          Wishlisted
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center gap-6 px-6 py-5">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-800 mb-1 tracking-tight">
            {college.name}
          </h3>

          <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
            <MapPinIcon />
            <span>{college.location}</span>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
            {college.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {stars.map((filled, i) => (
                <StarIcon key={i} filled={filled} />
              ))}
              <span className="text-xs font-semibold text-slate-700 ml-1">
                {college.rating || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <BuildingIcon />
              <span>{college.type}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <BookIcon />
              <span>{coursesCount} Courses</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Link
            to={`/colleges/${college.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm shadow-indigo-200 whitespace-nowrap text-center"
          >
            View Details
          </Link>
          <Link
            to={`/colleges/${college.id}`}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors duration-200 whitespace-nowrap"
          >
            Explore Courses <ArrowIcon />
          </Link>
          <button
            onClick={handleRemove}
            className="flex items-center gap-1 text-rose-400 hover:text-rose-600 text-xs font-medium px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors duration-200"
          >
            <TrashIcon /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CollegeWishlist() {
  const [colleges, setColleges] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    token,
    toggleWishlist,
    clearWishlist: contextClearWishlist,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlistColleges = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_BASE}?r=site/api-get-wishlist-colleges`,
          {
            headers: { Authorization: token },
          },
        );
        const result = await response.json();
        if (result.status === "success") {
          setColleges(result.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist colleges:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlistColleges();
  }, [token]);

  const handleRemove = async (id) => {
    await toggleWishlist(id);
    setColleges((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearAll = async () => {
    await contextClearWishlist();
    setColleges([]);
    setShowClearConfirm(false);
  };

  const cities = [
    ...new Set(colleges.map((c) => c.location?.split(",")[0]).filter(Boolean)),
  ].length;
  const totalCourses = colleges.reduce((acc, c) => {
    const count = c.courses
      ? Array.isArray(c.courses)
        ? c.courses.length
        : Object.keys(c.courses).length
      : 0;
    return acc + count;
  }, 0);
  const avgRating = colleges.length
    ? (
        colleges.reduce((acc, c) => acc + (parseFloat(c.rating) || 0), 0) /
        colleges.length
      ).toFixed(1)
    : "—";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 font-sans">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-200 mt-1">
              <HeartIcon filled={true} className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                My Wishlist
              </h1>
              <p className="text-slate-400 text-sm">
                Colleges you've saved for later. Continue exploring and find the
                best match.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <ClipboardIcon />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            accent="bg-indigo-50"
            icon={
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                />
              </svg>
            }
            value={colleges.length}
            label="Total Colleges"
            sublabel="in your wishlist"
          />
          <StatCard
            accent="bg-emerald-50"
            icon={
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            value={cities}
            label="Cities Covered"
            sublabel="locations"
          />
          <StatCard
            accent="bg-amber-50"
            icon={
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            value={`${totalCourses}+`}
            label="Courses Available"
            sublabel="across colleges"
          />
          <StatCard
            accent="bg-violet-50"
            icon={<StarIcon filled={true} />}
            value={avgRating}
            label="Average Rating"
            sublabel="out of 5"
          />
        </div>

        {/* College List Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Your Saved Colleges
            </h2>
            <p className="text-sm text-slate-400">
              {colleges.length} college{colleges.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {colleges.length > 0 && (
            <div className="relative">
              {showClearConfirm ? (
                <div className="flex items-center gap-2 bg-white border border-rose-200 rounded-xl px-4 py-2 shadow-sm">
                  <span className="text-xs text-slate-500">Clear all?</span>
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-50"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-2 border border-rose-200 text-rose-500 hover:bg-rose-50 text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  <TrashIcon /> Clear Wishlist
                </button>
              )}
            </div>
          )}
        </div>

        {/* College Cards */}
        {colleges.length > 0 ? (
          <div className="flex flex-col gap-4 mb-8">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-20 flex flex-col items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <HeartIcon filled={false} className="text-indigo-300 w-9 h-9" />
            </div>
            <p className="text-xl font-bold text-slate-600">
              Your wishlist is empty
            </p>
            <p className="text-slate-400 text-sm">
              Start exploring colleges to add them here.
            </p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl px-8 py-6 flex items-center gap-6 shadow-lg shadow-indigo-200">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <GraduationIcon />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg">Still exploring?</p>
            <p className="text-indigo-200 text-sm">
              Discover more colleges and courses that match your preferences and
              career goals.
            </p>
          </div>
          <button className="bg-white text-indigo-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 shrink-0 shadow-sm">
            Explore More <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
