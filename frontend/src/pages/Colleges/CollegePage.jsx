import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Heart,
  School,
  CheckCircle,
  GraduationCap,
  Filter,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import API_BASE, { ASSETS_BASE } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

// Import your images
import kiit from "/src/assets/images/colleges/kiit.jpg";
import vssut from "/src/assets/images/colleges/vssut.jpg";
import utkal from "/src/assets/images/colleges/utkal.jpg";
import soa from "/src/assets/images/colleges/soa.jpg";
import nit from "/src/assets/images/colleges/nit.jpg";
import templeImg from "/src/assets/images/temple.png";

const CustomSelect = ({ value, options, onChange, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative w-full h-full flex items-center" ref={selectRef}>
      <div
        className="w-full px-3 py-2 text-gray-600 bg-transparent text-sm cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate pr-2">{selectedOption?.labelKey ? t(selectedOption.labelKey) : selectedOption?.label}</span>
        <ChevronDown size={16} className={`transform transition-transform text-gray-400 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-[110%] left-0 min-w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-[60] max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-b-0 border-gray-100 ${
                value === option.value ? 'bg-[#4F46E5]/5 text-[#4F46E5] font-medium' : 'text-gray-700'
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.labelKey ? t(option.labelKey) : option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CollegePage = () => {
  const { t } = useTranslation();
  const [allColleges, setAllColleges] = useState([]);
  const [visibleColleges, setVisibleColleges] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("popularity");
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const collegeSectionRef = useRef(null);
  const initialFilterLoadRef = useRef(true);

  const { wishlist, toggleWishlist } = useContext(AuthContext);

  const words = [
    t("collegeWordColleges"),
    t("collegeWordUniversities"),
    t("collegeWordInstitutions"),
    t("collegeWordDreamColleges"),
  ];

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: token } : {};
        const response = await fetch(`${API_BASE}?r=site/api-colleges`, { headers });
        const result = await response.json();
        if (result.status === "success") {
          const colleges = Array.isArray(result.data) ? result.data : [];
          setAllColleges(colleges);
          setVisibleColleges(colleges.length);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColleges();
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopNum % words.length] || "";
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, words]);

  useEffect(() => {
    if (initialFilterLoadRef.current) {
      initialFilterLoadRef.current = false;
      return;
    }
    setVisibleColleges(8);
  }, [searchQuery, selectedDistrict, selectedType, selectedCategory, sortBy]);

  const filteredColleges = allColleges.filter((college) => {
    const matchName =
      !searchQuery ||
      (college.name &&
        college.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchDistrict =
      selectedDistrict === "All Districts" ||
      (college.location && college.location.includes(selectedDistrict));
    const matchType =
      selectedType === "All Types" ||
      (college.type && college.type.includes(selectedType));
    const matchCategory =
      selectedCategory === "All Categories" ||
      (college.category ? college.category.includes(selectedCategory) : true);

    return matchName && matchDistrict && matchType && matchCategory;
  });

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === "rating") {
      return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    } else if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    }
    return 0; // Default to popularity (initial order)
  });

  const displayedColleges = sortedColleges.slice(0, visibleColleges);
  const hasMore = visibleColleges < sortedColleges.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleColleges((prev) => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  const stats = [
    {
      label: t("aboutStatsTrusted"),
      sub: t("aboutStatsColleges"),
      icon: <School size={28} />,
      color: "text-[#5B3DF5]",
      bg: "bg-[#5B3DF5]/10",
    },
    {
      label: t("collegeStatsAcrossVarious"),
      sub: t("collegeStatsDistricts"),
      icon: <MapPin size={28} />,
      color: "text-[#14B8A6]",
      bg: "bg-[#14B8A6]/10",
    },
    {
      label: t("aboutStatsDiverse"),
      sub: t("aboutStatsCourses"),
      icon: <GraduationCap size={28} />,
      color: "text-[#F59E0B]",
      bg: "bg-[#F59E0B]/10",
    },
    {
      label: t("collegeStatsTrustedPlatform"),
      sub: t("collegeStatsPlatform"),
      icon: <CheckCircle size={28} />,
      color: "text-[#3B82F6]",
      bg: "bg-[#3B82F6]/10",
    },
  ];

  const districts = [
    { value: "All Districts", labelKey: "districts.all" },
    { value: "Bhubaneswar", labelKey: "districts.bhubaneswar" },
    { value: "Cuttack", labelKey: "districts.cuttack" },
    { value: "Sambalpur", labelKey: "districts.sambalpur" },
    { value: "Rourkela", labelKey: "districts.rourkela" },
    { value: "Berhampur", labelKey: "districts.berhampur" },
    { value: "Puri", labelKey: "districts.puri" },
    { value: "Balasore", labelKey: "districts.balasore" },
    { value: "Baripada", labelKey: "districts.baripada" },
    { value: "Jharsuguda", labelKey: "districts.jharsuguda" },
  ];

  const collegeTypes = [
    { value: "All Types", labelKey: "types.all" },
    { value: "Government", labelKey: "types.government" },
    { value: "Private", labelKey: "types.private" },
    { value: "Deemed University", labelKey: "types.deemed" },
    { value: "Institute of National Importance", labelKey: "types.importance" },
    { value: "Autonomous", labelKey: "types.autonomous" },
    { value: "State University", labelKey: "types.state" },
  ];

  const categories = [
    { value: "All Categories", labelKey: "categories.all" },
    { value: "Engineering", labelKey: "categories.engineering" },
    { value: "Medical", labelKey: "categories.medical" },
    { value: "Management", labelKey: "categories.management" },
    { value: "Law", labelKey: "categories.law" },
    { value: "Pharmacy", labelKey: "categories.pharmacy" },
    { value: "Science", labelKey: "categories.science" },
    { value: "Arts", labelKey: "categories.arts" },
    { value: "Commerce", labelKey: "categories.commerce" },
  ];

  const handleGetStarted = () => {
    window.location.href = "/register";
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return kiit;
    if (imagePath.startsWith("http")) return imagePath;
    return `${ASSETS_BASE}/${imagePath}`;
  };

  return (
    <div className="bg-[#F8F8FC] min-h-screen font-sans pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600 transition">
              {t("home")}
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-indigo-600 font-medium">{t("college")}</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION - Left Animation + Right Image */}
      <section className="bg-white pt-12 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Animated Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#071B52] leading-tight mb-4">
                {t("collegeHeroTitle")} <br />
                <span className="text-indigo-600">
                  {displayText}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
              <p className="text-[#5E6282] text-base md:text-lg mb-8">
                {t("collegeHeroDesc")}
              </p>

              {/* Search Box - Fixed */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md mb-5">
                <div className="flex flex-col md:flex-row">
                  <div className="relative flex items-center w-full md:w-[40%] px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                    <Search className="text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder={t("collegeSearchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                      className="w-full px-3 py-2 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-sm"
                    />
                    {showSuggestions && searchQuery && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto custom-scrollbar">
                        {allColleges
                          .filter((c) =>
                            c.name
                              ?.toLowerCase()
                              .includes(searchQuery.toLowerCase()),
                          )
                          .slice(0, 8)
                          .map((college) => (
                            <div
                              key={college.id}
                              onClick={() => {
                                setSearchQuery(college.name);
                                setShowSuggestions(false);
                                // Scroll to filter/college section
                                setTimeout(() => {
                                  collegeSectionRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }, 50);
                              }}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0 border-gray-100 flex items-center gap-2"
                            >
                              <Search
                                size={14}
                                className="text-gray-400 flex-shrink-0"
                              />
                              <span className="font-medium truncate">
                                {college.name}
                              </span>
                            </div>
                          ))}
                        {allColleges.filter((c) =>
                          c.name
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        ).length === 0 && (
                          <div className="px-4 py-3 text-xs text-gray-400 text-center">
                            {t("collegeNoCollegesFound")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-[20%] border-b md:border-b-0 md:border-r border-gray-200 relative">
                    <CustomSelect
                      value={selectedDistrict}
                      onChange={setSelectedDistrict}
                      options={districts}
                      t={t}
                    />
                  </div>

                  <div className="w-full md:w-[20%] border-b md:border-b-0 md:border-r border-gray-200 relative">
                    <CustomSelect
                      value={selectedType}
                      onChange={setSelectedType}
                      options={collegeTypes}
                      t={t}
                    />
                  </div>

                  <div className="w-full md:w-[20%] relative">
                    <CustomSelect
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      options={categories}
                      t={t}
                    />
                  </div>
                </div>

                <button
                  onClick={() =>
                    collegeSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="w-full bg-[#4F46E5] text-white py-3 rounded-b-2xl font-semibold hover:bg-[#4338CA] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  <span>{t("collegeSearchButton")}</span>
                </button>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  {t("collegePopularLabel")}
                </span>
                {[
                  "Engineering",
                  "Medical",
                  "Management",
                  "Law",
                  "Pharmacy",
                ].map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      setSelectedCategory(tag);
                      setTimeout(() => {
                        collegeSectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }, 50);
                    }}
                    className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 cursor-pointer hover:bg-[#4F46E5]/10 hover:text-[#4F46E5] transition-colors duration-300"
                  >
                    {t(`categories.${tag.toLowerCase()}`)} {t("college")}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side - Image (No square box) */}
            <div className="hidden md:flex justify-center">
              <img
                src={templeImg}
                alt="Education in Odisha"
                className="w-full max-w-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 hover:border-[#4F46E5]/20 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div
                className={`${s.bg} w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center ${s.color} mb-4`}
              >
                {s.icon}
              </div>
              <p className="text-xl md:text-xl font-bold text-[#071B52] leading-none">
                {s.label}
              </p>
              <p className="text-sm md:text-base text-gray-500 font-semibold mt-1">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER BAR */}
      <section
        ref={collegeSectionRef}
        className="max-w-[1280px] mx-auto mt-8 px-4 sm:px-6 scroll-mt-28"
      >
        <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              {t("collegeFilterBy")}
            </span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedType("All Types")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${selectedType === "All Types" ? "bg-[#4F46E5]/10 text-[#4F46E5]" : "bg-gray-100 text-gray-600 hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]"}`}
              >
                {t("types.all")}
              </button>
              <button
                onClick={() => setSelectedType("Government")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${selectedType === "Government" ? "bg-[#4F46E5]/10 text-[#4F46E5]" : "bg-gray-100 text-gray-600 hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]"}`}
              >
                {t("types.government")}
              </button>
              <button
                onClick={() => setSelectedType("Private")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${selectedType === "Private" ? "bg-[#4F46E5]/10 text-[#4F46E5]" : "bg-gray-100 text-gray-600 hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]"}`}
              >
                {t("types.private")}
              </button>
              <button
                onClick={() => setSelectedType("Deemed University")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${selectedType === "Deemed University" ? "bg-[#4F46E5]/10 text-[#4F46E5]" : "bg-gray-100 text-gray-600 hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]"}`}
              >
                {t("types.deemed")}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{t("collegeSortBy")}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent text-[#4F46E5] font-medium outline-none cursor-pointer"
            >
              <option value="popularity">{t("collegeSortPopularity")}</option>
              <option value="rating">{t("collegeSortRating")}</option>
              <option value="name">{t("collegeSortName")}</option>
            </select>
          </div>
        </div>
      </section>

      {/* COLLEGE GRID */}
      <section className="max-w-[1280px] mx-auto py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {displayedColleges.map((college, i) => (
            <Link
              key={i}
              to={`/colleges/${college.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#4F46E5]/20 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl block"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(college.image)}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#4F46E5] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  {college.type}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(college.id);
                  }}
                  aria-label={
                    wishlist?.includes(parseInt(college.id, 10))
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                    wishlist?.includes(parseInt(college.id, 10))
                      ? "bg-red-50 text-red-500"
                      : "bg-white/90 text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={16}
                    className={
                      wishlist?.includes(parseInt(college.id, 10))
                        ? "fill-current"
                        : ""
                    }
                  />
                </button>
                <div className="absolute bottom-3 right-3 bg-white/95 px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[#071B52] font-bold text-xs">
                    {college.rating}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#071B52] text-lg mb-1 line-clamp-1 group-hover:text-[#4F46E5] transition-colors">
                  {college.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin size={12} />
                  <span>{college.location}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {college.description}
                </p>
                <div className="block w-full py-2.5 text-center text-sm font-medium rounded-xl border border-[#4F46E5] text-[#4F46E5] bg-white hover:bg-[#4F46E5] hover:text-white transition-all duration-300">
                  {t("viewDetails")}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="group inline-flex items-center gap-2 bg-white border-2 border-[#4F46E5] text-[#4F46E5] px-8 md:px-10 py-3.5 rounded-xl font-semibold hover:bg-[#4F46E5] hover:text-white transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("collegeLoadingText")}</span>
                </>
              ) : (
                <>
                  <span>{t("collegeLoadMoreButton")}</span>
                  <ChevronDown
                    size={18}
                    className="group-hover:translate-y-1 transition-transform duration-300"
                  />
                </>
              )}
            </button>
            <p className="text-xs text-gray-400 mt-3">
              {t("collegeShowingStatus", {
                displayed: displayedColleges.length,
                total: filteredColleges.length,
              })}
            </p>
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-4 md:gap-6">
            <div className="hidden md:block bg-white/20 p-4 rounded-2xl">
              <GraduationCap size={48} className="text-white" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t("collegeCtaTitle")}
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                {t("collegeCtaDesc")}
              </p>
            </div>
          </div>
          <button
            onClick={handleGetStarted}
            className="relative z-10 mt-6 md:mt-0 bg-white text-[#4F46E5] px-8 md:px-10 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            {t("collegeCtaButton")}
            <ArrowRight size={18} />
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>
      </section>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default CollegePage;
