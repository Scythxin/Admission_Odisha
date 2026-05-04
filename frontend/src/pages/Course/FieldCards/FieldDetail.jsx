import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE from "../../../config/api";
import {
  FaArrowLeft, FaArrowRight, FaInfoCircle, FaHeadset,
  FaSpinner, FaCog, FaHeartbeat, FaBriefcase, FaPalette,
  FaFlask, FaBalanceScale, FaPencilAlt, FaConciergeBell,
  FaDesktop, FaGraduationCap, FaThLarge,
  FaBuilding, FaBolt, FaMicrochip, FaPlane, FaBrain, FaCode,
  FaDna, FaRobot, FaLeaf, FaIndustry, FaShieldAlt,
  FaChartBar, FaNetworkWired, FaDatabase
} from "react-icons/fa";
import engImg from "../../../assets/images/engandtechimg.png";
import after12Img from "../../../assets/images/after12img.png";

/* ── FIELD CONFIG MAP ── */
// Maps field name → { slug, image, fieldIcon, color palette for cards }
const FIELD_CONFIG = {
  "Engineering & Technology": {
    slug: "engineering",
    image: engImg,
    fieldIcon: <FaThLarge />,
    subtitle: "Choose your area of interest",
    description: "Explore various specializations in Engineering & Technology and find the right path for your future.",
    backPath: "/field",
  },
  "Medical & Health": {
    slug: "medical",
    image: after12Img,
    fieldIcon: <FaHeartbeat />,
    subtitle: "Choose your healthcare path",
    description: "Explore specializations in Medical & Health Sciences to find the right path for your future.",
    backPath: "/field",
  },
  "Commerce & Management": {
    slug: "commerce",
    image: after12Img,
    fieldIcon: <FaBriefcase />,
    subtitle: "Choose your business path",
    description: "Discover specializations in Commerce & Management and launch your business career.",
    backPath: "/field",
  },
  "Arts & Humanities": {
    slug: "arts",
    image: after12Img,
    fieldIcon: <FaPalette />,
    subtitle: "Choose your creative path",
    description: "Explore Arts & Humanities specializations and find the field that resonates with your passion.",
    backPath: "/field",
  },
  "Science": {
    slug: "science",
    image: after12Img,
    fieldIcon: <FaFlask />,
    subtitle: "Choose your science specialization",
    description: "Discover the wide world of Science and pursue a specialization that drives your curiosity.",
    backPath: "/field",
  },
  "Law": {
    slug: "law",
    image: after12Img,
    fieldIcon: <FaBalanceScale />,
    subtitle: "Choose your legal path",
    description: "Explore Law specializations and build a career upholding justice and rights.",
    backPath: "/field",
  },
  "Design": {
    slug: "design",
    image: after12Img,
    fieldIcon: <FaPencilAlt />,
    subtitle: "Choose your design specialization",
    description: "Discover Design specializations and turn your creativity into a fulfilling career.",
    backPath: "/field",
  },
  "Hospitality": {
    slug: "hospitality",
    image: after12Img,
    fieldIcon: <FaConciergeBell />,
    subtitle: "Choose your hospitality path",
    description: "Explore Hospitality specializations and build a global career in service and tourism.",
    backPath: "/field",
  },
  "IT & Computer": {
    slug: "it-computer",
    image: after12Img,
    fieldIcon: <FaDesktop />,
    subtitle: "Choose your IT specialization",
    description: "Explore IT & Computer specializations and shape the digital world of tomorrow.",
    backPath: "/field",
  },
  "Education": {
    slug: "education",
    image: after12Img,
    fieldIcon: <FaGraduationCap />,
    subtitle: "Choose your teaching path",
    description: "Discover Education specializations and inspire the next generation of learners.",
    backPath: "/field",
  },
};

// Maps DB specialization name → icon + color for display
const SPEC_ICON_MAP = {
  "Computer Science Engineering": { icon: <FaDesktop />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "Civil Engineering":            { icon: <FaBuilding />, color: "bg-[#DCFCE7] text-[#16A34A]" },
  "Mechanical Engineering":       { icon: <FaCog />, color: "bg-[#FEF9C3] text-[#D97706]" },
  "Electrical Engineering":       { icon: <FaBolt />, color: "bg-[#FEF3C7] text-[#D97706]" },
  "Electronics & Communication":  { icon: <FaMicrochip />, color: "bg-[#EDE9FE] text-[#4F46E5]" },
  "Aerospace Engineering":        { icon: <FaPlane />, color: "bg-[#DBEAFE] text-[#2563EB]" },
  "AI & Data Science":            { icon: <FaBrain />, color: "bg-[#FCE7F3] text-[#DB2777]" },
  "Information Technology":       { icon: <FaCode />, color: "bg-[#CCFBF1] text-[#0D9488]" },
  "Biotechnology Engineering":    { icon: <FaDna />, color: "bg-[#DCFCE7] text-[#15803D]" },
  "Robotics Engineering":         { icon: <FaRobot />, color: "bg-[#CCFBF1] text-[#0F766E]" },
  "Environmental Engineering":    { icon: <FaLeaf />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "Petroleum Engineering":        { icon: <FaIndustry />, color: "bg-[#FEE2E2] text-[#DC2626]" },
  "Cyber Security":               { icon: <FaShieldAlt />, color: "bg-[#CCFBF1] text-[#0D9488]" },
  "Industrial Engineering":       { icon: <FaChartBar />, color: "bg-[#FEF3C7] text-[#D97706]" },
  "Cloud Computing":              { icon: <FaNetworkWired />, color: "bg-[#E0F2FE] text-[#0284C7]" },
  "Data Engineering":             { icon: <FaDatabase />, color: "bg-[#FCE7F3] text-[#E11D48]" },
  "MBBS":                         { icon: <FaHeartbeat />, color: "bg-[#CCFBF1] text-[#0D9488]" },
  "BDS":                          { icon: <FaHeartbeat />, color: "bg-[#DBEAFE] text-[#2563EB]" },
  "B.Sc Nursing":                 { icon: <FaHeartbeat />, color: "bg-[#FCE7F3] text-[#DB2777]" },
  "Pharmacy (B.Pharm)":           { icon: <FaFlask />, color: "bg-[#DCFCE7] text-[#15803D]" },
  "BBA":                          { icon: <FaBriefcase />, color: "bg-[#FFEDD5] text-[#EA580C]" },
  "MBA":                          { icon: <FaBriefcase />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "CA (Chartered Accountancy)":   { icon: <FaChartBar />, color: "bg-[#FEF3C7] text-[#D97706]" },
  "B.A. English":                 { icon: <FaPencilAlt />, color: "bg-[#FCE7F3] text-[#DB2777]" },
  "B.A. History":                 { icon: <FaBalanceScale />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "B.A. Psychology":              { icon: <FaBrain />, color: "bg-[#CCFBF1] text-[#0D9488]" },
  "B.Sc Physics":                 { icon: <FaFlask />, color: "bg-[#DBEAFE] text-[#2563EB]" },
  "B.Sc Chemistry":               { icon: <FaFlask />, color: "bg-[#DCFCE7] text-[#15803D]" },
  "B.Sc Mathematics":             { icon: <FaChartBar />, color: "bg-[#FEF9C3] text-[#D97706]" },
  "LLB":                          { icon: <FaBalanceScale />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "Integrated BA LLB":            { icon: <FaBalanceScale />, color: "bg-[#FEF3C7] text-[#D97706]" },
  "B.Des Fashion":                { icon: <FaPalette />, color: "bg-[#FCE7F3] text-[#DB2777]" },
  "B.Des Interior":               { icon: <FaPalette />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "Hotel Management":             { icon: <FaConciergeBell />, color: "bg-[#FEF3C7] text-[#D97706]" },
  "Tourism & Travel":             { icon: <FaPlane />, color: "bg-[#DBEAFE] text-[#2563EB]" },
  "BCA":                          { icon: <FaDesktop />, color: "bg-[#CCFBF1] text-[#0D9488]" },
  "MCA":                          { icon: <FaCode />, color: "bg-[#EDE9FE] text-[#4F46E5]" },
  "Cyber Security (IT)":          { icon: <FaShieldAlt />, color: "bg-[#CCFBF1] text-[#0D9488]" },
  "B.Ed":                         { icon: <FaGraduationCap />, color: "bg-[#EDE9FE] text-[#6D28D9]" },
  "D.El.Ed":                      { icon: <FaGraduationCap />, color: "bg-[#DCFCE7] text-[#15803D]" },
};

// Converts a specialization name to a URL slug
const toSlug = (name) =>
  name.toLowerCase().replace(/[&]/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ── CARD ── */
const SpecCard = ({ icon, color, name, desc, link }) => {
  const content = (
    <div className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative h-full">
      <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl ${color}`}>
        {icon}
      </div>
      <h3 className="text-[17px] font-bold text-[#071B52] leading-snug mt-2">{name}</h3>
      <p className="text-[13px] text-gray-500 leading-relaxed flex-1 mb-4">{desc}</p>
      <div className="absolute bottom-5 right-5 text-[#4F46E5] text-sm opacity-70 group-hover:opacity-100 transition-opacity">
        <FaArrowRight />
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="block h-full">{content}</Link>
  ) : (
    content
  );
};

/* ── MAIN ── */
const FieldDetail = () => {
  const { fieldSlug } = useParams();
  const [fieldData, setFieldData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reverse-map slug → field name
  const fieldName = Object.keys(FIELD_CONFIG).find(
    (key) => FIELD_CONFIG[key].slug === fieldSlug
  );
  const config = FIELD_CONFIG[fieldName] || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!fieldName) {
      setError("Field not found.");
      setLoading(false);
      return;
    }

    const fetchField = async () => {
      try {
        const encodedName = encodeURIComponent(fieldName);
        const res = await fetch(
          `${API_BASE}?r=site/api-field-detail&field=${encodedName}`
        );
        if (!res.ok) {
          const text = await res.text();
          setError(`Server error ${res.status}: ${text.substring(0, 200)}`);
          return;
        }
        const data = await res.json();
        if (data.status === "success") {
          setFieldData(data.data);
        } else {
          setError(data.message || "Failed to load field data.");
        }
      } catch (err) {
        setError(`Fetch error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [fieldName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FaSpinner className="animate-spin text-4xl text-[#4F46E5]" />
      </div>
    );
  }

  if (error || !fieldData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-red-500 font-semibold">{error || "No data found."}</p>
      </div>
    );
  }

  const { field, specializations } = fieldData;

  return (
    <div className="bg-white min-h-screen font-poppins text-gray-800 pb-12">
      <div className="max-w-[1200px] mx-auto">

        {/* BACK */}
        <div className="px-6 md:px-8 lg:px-12 pt-8">
          <Link
            to={config.backPath || "/field"}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#4F46E5] hover:gap-3 transition-all"
          >
            <FaArrowLeft /> Back to Fields
          </Link>
        </div>

        {/* HERO */}
        <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 lg:px-12 py-8 md:py-12 bg-white relative overflow-hidden">
          <div className="max-w-xl z-10 flex-1">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-[#EBE4FF] rounded-2xl flex items-center justify-center shrink-0 text-2xl text-[#4F46E5]">
                {config.fieldIcon || <FaThLarge />}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#071B52] mb-2 tracking-tight">
                  {field.name}
                </h1>
                <p className="text-gray-500 text-[15px] md:text-base">{config.subtitle}</p>
              </div>
            </div>
            <p className="text-[15px] md:text-base text-gray-500 leading-relaxed max-w-[400px]">
              {config.description}
            </p>
          </div>

          <div className="relative w-full md:w-[500px] flex justify-center items-center mt-12 md:mt-0 z-10 flex-1">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-[#F3EEFF] opacity-80 -z-10"></div>
            <img
              src={config.image || after12Img}
              alt={field.name}
              className="w-full max-w-[380px] md:max-w-[480px] object-contain relative z-10 mix-blend-multiply"
            />
          </div>
        </section>

        {/* INFO BAR */}
        <div className="mx-6 md:mx-8 lg:mx-12 mb-10 bg-[#F8F6FF] rounded-xl px-6 py-4 flex items-center gap-3">
          <FaInfoCircle className="text-[#4F46E5] text-lg shrink-0" />
          <span className="text-gray-600 text-[15px]">
            Select a specialization to view courses, eligibility, top colleges and career opportunities.
          </span>
        </div>

        {/* SPECIALIZATIONS GRID */}
        <section className="px-6 md:px-8 lg:px-12 pb-10">
          {specializations.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No specializations found for this field.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {specializations.map((spec, i) => {
                const iconData = SPEC_ICON_MAP[spec.name] || {
                  icon: <FaThLarge />,
                  color: "bg-[#EDE9FE] text-[#4F46E5]",
                };
                const slug = toSlug(spec.name);
                return (
                  <SpecCard
                    key={i}
                    icon={iconData.icon}
                    color={iconData.color}
                    name={spec.name}
                    desc={spec.short_desc}
                    link={`/course/${slug}`}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mx-6 md:mx-8 lg:mx-12 mt-4 mb-20 bg-[#F8F6FF] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-6 flex-1 text-center md:text-left flex-col md:flex-row">
            <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] bg-[#EBE4FF] rounded-full flex items-center justify-center shrink-0 text-2xl md:text-3xl text-[#4F46E5]">
              <FaHeadset />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#071B52] mb-1.5">
                Not sure which specialization is right for you?
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                Get expert guidance and discover the best path for your future.
              </p>
            </div>
          </div>
          <button className="bg-[#3B28CC] hover:bg-[#2A1B99] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold flex items-center gap-2 transition-colors whitespace-nowrap mt-4 md:mt-0">
            Get Guidance <FaArrowRight />
          </button>
        </section>

      </div>
    </div>
  );
};

export default FieldDetail;
