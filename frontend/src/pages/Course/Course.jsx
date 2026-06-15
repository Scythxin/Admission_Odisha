import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, Laptop, BookOpen, FlaskConical, Briefcase, Pill, Palette, Settings, Users, ShieldCheck, Headphones, TrendingUp, Zap, ChevronRight } from "lucide-react";
import {
  FaCog, FaHeartbeat, FaBriefcase, FaPalette,
  FaFlask, FaBalanceScale, FaPencilAlt, FaConciergeBell,
  FaDesktop, FaGraduationCap, FaCode, FaStethoscope,
  FaChartBar, FaUserNurse, FaPills, FaTools
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEnquiry } from "../../context/EnquiryContext";

// Import your image
import heroImage from "/src/assets/images/course.png";

const iconMap = { GraduationCap, Briefcase, FlaskConical, Laptop, Pill, Settings, BookOpen, Palette };

// ─── Most Demanding Courses data ───────────────────────────────────────────────
const mostDemandedCourses = [
  {
    name: "B.Tech",
    fullName: "Bachelor of Technology",

    colleges: "120+ Colleges",
    icon: <FaCode />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    exploreBorder: "border-purple-500",
    exploreText: "text-purple-600",
    exploreHover: "hover:bg-purple-600",
    slug: "btech",
  },
  {
    name: "MBA",
    fullName: "Master of Business Administration",
    colleges: "80+ Colleges",
    icon: <FaBriefcase />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    exploreBorder: "border-green-500",
    exploreText: "text-green-600",
    exploreHover: "hover:bg-green-600",
    slug: "mba",
  },
  {
    name: "MBBS",
    fullName: "Bachelor of Medicine & Surgery",
    colleges: "40+ Colleges",
    icon: <FaStethoscope />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    exploreBorder: "border-pink-500",
    exploreText: "text-pink-600",
    exploreHover: "hover:bg-pink-600",
    slug: "mbbs",
  },
  {
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    colleges: "100+ Colleges",
    icon: <FaDesktop />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    exploreBorder: "border-blue-500",
    exploreText: "text-blue-600",
    exploreHover: "hover:bg-blue-600",
    slug: "bca",
  },
  {
    name: "MCA",
    fullName: "Master of Computer Applications",
    colleges: "60+ Colleges",
    icon: <FaChartBar />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    exploreBorder: "border-amber-500",
    exploreText: "text-amber-600",
    exploreHover: "hover:bg-amber-600",
    slug: "mca",
  },
  {
    name: "B.Sc Nursing",
    fullName: "Bachelor of Science in Nursing",
    colleges: "50+ Colleges",
    icon: <FaUserNurse />,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    exploreBorder: "border-teal-500",
    exploreText: "text-teal-600",
    exploreHover: "hover:bg-teal-600",
    slug: "bscnursing",
  },
  {
    name: "B.Pharm",
    fullName: "Bachelor of Pharmacy",
    colleges: "70+ Colleges",
    icon: <FaPills />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    exploreBorder: "border-purple-500",
    exploreText: "text-purple-600",
    exploreHover: "hover:bg-purple-600",
    slug: "bpharm",
  },
  {
    name: "Diploma",
    fullName: "Diploma Engineering",
    colleges: "150+ Colleges",
    icon: <FaTools />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    exploreBorder: "border-amber-500",
    exploreText: "text-amber-500",
    exploreHover: "hover:bg-amber-500",
    slug: "diploma",
  },
];
const Course = () => {
  const { t } = useTranslation();
  const { openGuidance } = useEnquiry();
  const [animatedText, setAnimatedText] = useState("");
  const fullText = t("courseHeroTitle");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDegree, setSelectedDegree] = useState("All Degrees");
  const [selectedStream, setSelectedStream] = useState("All Streams");
  const courseSectionRef = useRef(null);

  const popularCourses = [
    { t: "B.Tech",  sub: t("btechSubtitle"),    dur: t("duration4Years"), s: t("fieldEngineeringName").replace("\n", " "),   category: "Engineering", degree: "Bachelor's Degree", stream: "Technology", ic: "GraduationCap", c: "text-indigo-600",  bg: "bg-indigo-50"  },
    { t: "MBA",     sub: t("mbaSubtitle"), dur: t("duration2Years"), s: t("fieldCommerceName").replace("\n", " "),            category: "Management",  degree: "Master's Degree",   stream: "Commerce",    ic: "Briefcase",     c: "text-teal-600",   bg: "bg-teal-50"    },
    { t: "B.Sc",    sub: t("bscSubtitle"),       dur: t("duration3Years"), s: t("fieldScienceName"),               category: "Science",     degree: "Bachelor's Degree", stream: "Science",     ic: "FlaskConical",  c: "text-amber-600",  bg: "bg-amber-50"   },
    { t: "BCA",     sub: t("bcaSubtitle"), dur: t("duration3Years"), s: t("fieldITComputerName").replace("\n", " "), category: "Engineering", degree: "Bachelor's Degree", stream: "Technology",  ic: "Laptop",        c: "text-pink-600",   bg: "bg-pink-50"    },
    { t: "B.Pharm", sub: t("bpharmSubtitle"),      dur: t("duration4Years"), s: t("categories.pharmacy"),              category: "Pharmacy",    degree: "Bachelor's Degree", stream: "Science",     ic: "Pill",          c: "text-blue-600",   bg: "bg-blue-50"    },
    { t: "Diploma", sub: t("diplomaSubtitle"),       dur: t("duration3Years"), s: t("fieldEngineeringName").replace("\n", " "),      category: "Engineering", degree: "Diploma",           stream: "Technology",  ic: "Settings",      c: "text-amber-600",  bg: "bg-amber-50"   },
    { t: "B.Ed",    sub: t("bedSubtitle", "Bachelor of Education"),     dur: t("duration2Years"), s: t("fieldEducationName"),             category: "Education",   degree: "Bachelor's Degree", stream: "Arts",        ic: "BookOpen",      c: "text-emerald-600",bg: "bg-emerald-50" },
    { t: "BA",      sub: t("baSubtitle", "Bachelor of Arts"),          dur: t("duration3Years"), s: t("fieldArtsName").replace("\n", " "),     category: "Arts",        degree: "Bachelor's Degree", stream: "Arts",        ic: "Palette",       c: "text-purple-600", bg: "bg-purple-50"  },
  ];

  const fields = [
    { icon: <FaCog />, color: "bg-[#F3E8FF] text-[#6D28D9]", name: t("fieldEngineeringName"), desc: t("fieldEngineeringDesc"), link: "/field/engineering" },
    { icon: <FaHeartbeat />, color: "bg-[#CCFBF1] text-[#0D9488]", name: t("fieldMedicalName"), desc: t("fieldMedicalDesc"), link: "/field/medical" },
    { icon: <FaBriefcase />, color: "bg-[#FFEDD5] text-[#EA580C]", name: t("fieldCommerceName"), desc: t("fieldCommerceDesc"), link: "/field/commerce" },
    { icon: <FaPalette />, color: "bg-[#FCE7F3] text-[#DB2777]", name: t("fieldArtsName"), desc: t("fieldArtsDesc"), link: "/field/arts" },
    { icon: <FaFlask />, color: "bg-[#DBEAFE] text-[#2563EB]", name: t("fieldScienceName"), desc: t("fieldScienceDesc"), link: "/field/science" },
    { icon: <FaBalanceScale />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: t("fieldLawName"), desc: t("fieldLawDesc"), link: "/field/law" },
    { icon: <FaPencilAlt />, color: "bg-[#FCE7F3] text-[#DB2777]", name: t("fieldDesignName"), desc: t("fieldDesignDesc"), link: "/field/design" },
    { icon: <FaConciergeBell />, color: "bg-[#FEF3C7] text-[#D97706]", name: t("fieldHospitalityName"), desc: t("fieldHospitalityDesc"), link: "/field/hospitality" },
    { icon: <FaDesktop />, color: "bg-[#CCFBF1] text-[#0D9488]", name: t("fieldITComputerName"), desc: t("fieldITComputerDesc"), link: "/field/it-computer" },
    { icon: <FaGraduationCap />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: t("fieldEducationName"), desc: t("fieldEducationDesc"), link: "/field/education" },
  ];

  const whyChooseUs = [
    { t: t("courseWhyChooseWideRange"),      d: t("courseWhyChooseWideRangeDesc"),  ic: <BookOpen size={20} />,    c: "text-indigo-600",  bg: "bg-indigo-50"  },
    { t: t("courseWhyChooseTopColleges"),    d: t("courseWhyChooseTopCollegesDesc"),           ic: <Users size={20} />,       c: "text-teal-600",    bg: "bg-teal-50"    },
    { t: t("courseWhyChooseTrusted"),    d: t("courseWhyChooseTrustedDesc"),     ic: <ShieldCheck size={20} />, c: "text-amber-600",   bg: "bg-amber-50"   },
    { t: t("courseWhyChooseExpertGuidance"), d: t("courseWhyChooseExpertGuidanceDesc"),        ic: <Headphones size={20} />,  c: "text-blue-600",    bg: "bg-blue-50"    },
  ];

  const categories = [
    { value: "All Categories", labelKey: "categories.all" },
    { value: "Engineering", labelKey: "categories.engineering" },
    { value: "Management", labelKey: "categories.management" },
    { value: "Medical", labelKey: "categories.medical" },
    { value: "Pharmacy", labelKey: "categories.pharmacy" },
    { value: "Law", labelKey: "categories.law" },
    { value: "Arts", labelKey: "categories.arts" },
    { value: "Science", labelKey: "categories.science" },
    { value: "Education", labelKey: "categories.education" }
  ];

  const degrees = [
    { value: "All Degrees", labelKey: "degrees.all" },
    { value: "Bachelor's Degree", labelKey: "degrees.bachelor" },
    { value: "Master's Degree", labelKey: "degrees.master" },
    { value: "Diploma", labelKey: "degrees.diploma" },
    { value: "Certificate", labelKey: "degrees.certificate" }
  ];

  const streams = [
    { value: "All Streams", labelKey: "streams.all" },
    { value: "Science", labelKey: "streams.science" },
    { value: "Commerce", labelKey: "streams.commerce" },
    { value: "Arts", labelKey: "streams.arts" },
    { value: "Technology", labelKey: "streams.technology" }
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setAnimatedText(fullText.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  const filteredCourses = popularCourses.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch   = !q || c.t.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q);
    const matchCategory = selectedCategory === "All Categories" || c.category === selectedCategory;
    const matchDegree   = selectedDegree   === "All Degrees"    || c.degree    === selectedDegree;
    const matchStream   = selectedStream   === "All Streams"    || c.stream    === selectedStream;
    return matchSearch && matchCategory && matchDegree && matchStream;
  });

  const handleSearch = () => courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const desktopFields = fields.slice(0, 6);
  const mobileFields = fields.slice(0, 4);
  const mobilePopularCourses = popularCourses.slice(0, 4);

  return (
    <div className="bg-[#F8F8FC] min-h-screen font-sans pb-16">

      {/* HERO */}
      <section className="bg-white pt-10 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-[#071B52]">
                <span className="text-indigo-600">{animatedText}</span>
                <span className="animate-pulse text-indigo-400">|</span>
              </h1>
              <p className="text-gray-500 text-base mt-4 max-w-lg">
                {t("courseHeroDesc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link to="/colleges">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    {t("exploreColleges")} <TrendingUp size={16} />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                    {t("contactUs")} <Headphones size={16} />
                  </button>
                </Link>
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative flex justify-center">
              <img
                src={heroImage}
                alt="Students"
                className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-2">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-visible">
          <div className="flex flex-col md:flex-row">

            {/* Text search with suggestions */}
            <div className="relative flex items-center w-full md:w-[40%] px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-gray-400 flex-shrink-0" size={18} />
              <input
                type="text"
                placeholder={t("courseSearchPlaceholder")}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="w-full px-3 py-2 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-sm"
              />
              {showSuggestions && searchQuery && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-56 overflow-y-auto">
                  {popularCourses.filter(c =>
                    c.t.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.sub.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, 8).map((course, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => { setSearchQuery(course.t); setShowSuggestions(false); setTimeout(() => courseSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }}
                      className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0 border-gray-100 flex items-center gap-2"
                    >
                      <Search size={13} className="text-gray-400 flex-shrink-0" />
                      <span className="font-semibold">{course.t}</span>
                      <span className="text-gray-400 text-xs truncate">— {course.sub}</span>
                    </div>
                  ))}
                  {popularCourses.filter(c =>
                    c.t.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.sub.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="px-4 py-3 text-xs text-gray-400 text-center">{t("courseNoCoursesFound")}</div>
                  )}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="w-full md:w-[20%] border-b md:border-b-0 md:border-r border-gray-200">
              <div className="px-4 py-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("courseCategoryLabel")}</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  {categories.map(o => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                </select>
              </div>
            </div>

            {/* Degree */}
            <div className="w-full md:w-[20%] border-b md:border-b-0 md:border-r border-gray-200">
              <div className="px-4 py-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("courseDegreeLabel")}</label>
                <select value={selectedDegree} onChange={e => setSelectedDegree(e.target.value)}
                  className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  {degrees.map(o => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                </select>
              </div>
            </div>

            {/* Stream */}
            <div className="w-full md:w-[20%]">
              <div className="px-4 py-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("courseStreamLabel")}</label>
                <select value={selectedStream} onChange={e => setSelectedStream(e.target.value)}
                  className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  {streams.map(o => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button onClick={handleSearch}
            className="w-full bg-indigo-600 text-white py-3 rounded-b-2xl font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
            <Search size={17} /> {t("courseSearchButton")}
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          <span className="text-xs text-gray-400 font-medium self-center">{t("collegePopularLabel")}</span>
          {["B.Tech","MBA","B.Sc","BCA","B.Pharm","Diploma","M.Tech","LLB"].map(tag => (
            <span key={tag}
              onMouseDown={() => { setSearchQuery(tag); setTimeout(() => courseSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }}
              className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* STREAMS - Mobile: 4 cards, Desktop: 6 cards */}
      <section className="max-w-[1280px] mx-auto py-14 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold text-[#071B52]">{t("courseBrowseStreamTitle")}</h2>
            <p className="text-gray-400 text-xs mt-1">{t("courseBrowseStreamDesc")}</p>
          </div>
          <Link to="/field">
            <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
              {t("courseViewAll")} <ChevronRight size={15} />
            </button>
          </Link>
        </div>
        
        {/* Mobile View (4 cards) */}
        <div className="grid grid-cols-2 sm:hidden gap-3">
          {mobileFields.map((f, i) => (
            <Link key={i} to={f.link || "#"} className="block">
              <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center items-center">
                <div className={`${f.color} w-11 h-11 mx-auto mb-2 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-xl`}>
                  {f.icon}
                </div>
                <h4 className="font-bold text-[11px] text-[#071B52] leading-tight whitespace-pre-line">
                  {f.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop View (6 cards) */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {desktopFields.map((f, i) => (
            <Link key={i} to={f.link || "#"} className="block">
              <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center items-center">
                <div className={`${f.color} w-11 h-11 mx-auto mb-2 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-xl`}>
                  {f.icon}
                </div>
                <h4 className="font-bold text-[11px] text-[#071B52] leading-tight whitespace-pre-line">
                  {f.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MOST DEMANDED COURSES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold text-[#071B52]">Most Demanded Courses</h2>
            <p className="text-gray-400 text-xs mt-1">
              High-interest programs students are exploring right now
            </p>
          </div>
          <Link to="/courses">
            <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
              {t("courseViewAll")} <ChevronRight size={15} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mostDemandedCourses.map((course) => (
            <Link
              key={course.slug}
              to={`/course-detail/${course.slug}`}
              className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`${course.iconBg} ${course.iconColor} w-12 h-12 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {course.icon}
                </div>
                <span className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {course.colleges}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-[#071B52]">{course.name}</h4>
                <p className="text-xs text-gray-400 mt-1 min-h-8">{course.fullName}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`text-xs font-bold ${course.exploreText}`}>Explore</span>
                <span className={`${course.exploreText} group-hover:translate-x-1 transition-transform duration-200`}>
                  <ChevronRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section ref={courseSectionRef} className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 scroll-mt-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold text-[#071B52]">{t("popularCourses")}</h2>
            <p className="text-gray-400 text-xs mt-1">
              {t("popularCoursesDesc")}
            </p>
          </div>
          <Link to="/courses">
            <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
              {t("courseViewAll")} <ChevronRight size={15} />
            </button>
          </Link>
        </div>

        {/* Mobile View - 4 courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:hidden">
          {mobilePopularCourses.map((c, i) => {
            const Icon = iconMap[c.ic];
            const slug = c.t.toLowerCase().replace(/\./g, "");
            return (
              <Link key={i} to={`/course-detail/${slug}`} className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
                <div className={`${c.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <span className={c.c}><Icon size={22} /></span>
                </div>
                <h4 className="text-lg font-bold text-[#071B52]">{c.t}</h4>
                <p className="text-xs text-gray-400 mb-3">{c.sub}</p>
                <div className="space-y-1.5 mb-4">
                  <p className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">{c.dur} {t("courseProgramLabel", "Program")}</p>
                  <p className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">{c.s}</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{t("aboutStatsColleges")}</span>
                  <span className="text-indigo-600 font-bold text-xs flex items-center gap-1">{t("courseDetailsLabel", "Details")} <ChevronRight size={13} /></span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Desktop/Tablet View - All filtered courses */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">
              <Search size={38} className="mx-auto mb-3 opacity-25" />
              <p className="text-sm font-medium">{t("courseNoMatchesFound", "No courses match your search.")}</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); setSelectedDegree("All Degrees"); setSelectedStream("All Streams"); }}
                className="mt-3 text-xs text-indigo-600 underline">
                {t("courseClearFilters", "Clear filters")}
              </button>
            </div>
          ) : (
            filteredCourses.map((c, i) => {
              const Icon = iconMap[c.ic];
              const slug = c.t.toLowerCase().replace(/\./g, "");
              return (
                <Link key={i} to={`/course-detail/${slug}`} className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
                  <div className={`${c.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <span className={c.c}><Icon size={22} /></span>
                  </div>
                  <h4 className="text-lg font-bold text-[#071B52]">{c.t}</h4>
                  <p className="text-xs text-gray-400 mb-3">{c.sub}</p>
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">{c.dur} {t("courseProgramLabel", "Program")}</p>
                    <p className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">{c.s}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{t("aboutStatsColleges")}</span>
                    <span className="text-indigo-600 font-bold text-xs flex items-center gap-1">{t("courseDetailsLabel", "Details")} <ChevronRight size={13} /></span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#071B52]">{t("whyChooseUs")}</h2>
          <p className="text-gray-400 text-xs mt-1">{t("courseWhyChooseUsDesc", "We make your course selection journey easier")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseUs.map((w, i) => (
            <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center hover:-translate-y-1 transition-all duration-300">
              <div className={`${w.bg} ${w.c} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {w.ic}
              </div>
              <h5 className="font-bold text-[#071B52] mb-1">{w.t}</h5>
              <p className="text-xs text-gray-400">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 text-center md:text-left mb-5 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-1">{t("courseCtaTitle", "Finding the right course?")}</h2>
            <p className="text-white/75 text-sm">{t("courseCtaDesc", "Get personalized guidance from our expert counselors.")}</p>
          </div>
          <button onClick={openGuidance} className="relative z-10 bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
            {t("courseCtaButton", "Get Free Guidance")} <Zap size={16} />
          </button>
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
};

export default Course;
