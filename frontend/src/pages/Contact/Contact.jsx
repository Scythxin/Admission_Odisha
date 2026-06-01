import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import contact from "../../assets/images/contact.png";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaArrowRight,
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaCheckCircle,
  FaGraduationCap,
  FaChartLine,
  FaExclamationTriangle,
  FaClipboardList,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const words = [
    t("contactWordHelp"),
    t("contactWordGuide"),
    t("contactWordSupport"),
    t("contactWordAssist")
  ];

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=site/api-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          body: form.message, // Map frontend message to backend body
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSubmitSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        alert(data.message || t("contactErrSomethingWrong"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("contactErrFailedConnect"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: t("faq1Q"),
      a: t("faq1A"),
      icon: <FaGraduationCap className="text-indigo-600" />
    },
    {
      q: t("faq2Q"),
      a: t("faq2A"),
      icon: <FaExclamationTriangle className="text-orange-600" />
    },
    {
      q: t("faq3Q"),
      a: t("faq3A"),
      icon: <FaChartLine className="text-green-600" />
    },
    {
      q: t("faq4Q"),
      a: t("faq4A"),
      icon: <FaClipboardList className="text-purple-600" />
    },
  ];

  const infoCards = [
    { icon: <FaPhone className="text-2xl" style={{ transform: "scaleX(-1)" }} />, title: t("contactCardCall"), text: "+91 1234567890", sub: t("contactCardCallSub"), bg: "bg-blue-500" },
    { icon: <FaEnvelope className="text-2xl" />, title: t("contactCardEmail"), text: "support@admissionodisha.in", sub: t("contactCardEmailSub"), bg: "bg-purple-500" },
    { icon: <FaMapMarkerAlt className="text-2xl" />, title: t("contactCardVisit"), text: t("contactCardVisitText"), sub: t("contactCardVisitSub"), bg: "bg-pink-500" },
    { icon: <FaClock className="text-2xl" />, title: t("contactCardSupport"), text: t("contactCardSupportText"), sub: t("contactCardSupportSub"), bg: "bg-green-500" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb & Hero Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">


          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                {t("contactHeroTitle")} <br />
                <span className="text-indigo-600 min-w-[200px] inline-block">
                  {displayText}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                {t("contactHeroDesc")}
              </p>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src={contact}
                alt="Students"
                className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
              <div className={`${item.bg} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-800 text-base">{item.title}</h4>
              <p className="text-gray-600 text-sm font-medium mt-1">{item.text}</p>
              <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Form & Contact Info */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("contactFormTitle")}</h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("contactFormNameLabel")}</label>
                    <input
                      name="name"
                      value={form.name}
                      placeholder={t("contactFormNamePlaceholder")}
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("contactFormEmailLabel")}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      placeholder={t("contactFormEmailPlaceholder")}
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("contactFormSubjectLabel")}</label>
                    <input
                      name="subject"
                      value={form.subject}
                      placeholder={t("contactFormSubjectPlaceholder")}
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("contactFormMessageLabel")}</label>
                    <textarea
                      name="message"
                      value={form.message}
                      placeholder={t("contactFormMessagePlaceholder")}
                      className="w-full border border-gray-300 p-3 rounded-xl h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? t("contactFormSendingButton") : <><FaPaperPlane /> {t("contactFormSendButton")}</>}
                  </button>

                  {submitSuccess && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-xl flex items-center gap-2 animate-bounce">
                      <FaCheckCircle /> {t("contactFormSuccessMessage")}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Get In Touch Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6">{t("contactSidebarGetInTouch")}</h3>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaMapMarkerAlt className="text-white/80" />
                    <p className="font-semibold">{t("contactSidebarHeadOffice")}</p>
                  </div>
                  <p className="text-sm text-white/80 pl-8">
                    Admission Odisha<br />
                    {t("contactCardVisitText")} - 751001
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaPhone className="text-white/80" style={{ transform: "scaleX(-1)" }} />
                    <p className="font-semibold">{t("contactSidebarPhone")}</p>
                  </div>
                  <p className="text-sm text-white/80 pl-8">+91 1234567890</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaEnvelope className="text-white/80" />
                    <p className="font-semibold">{t("contactSidebarEmail")}</p>
                  </div>
                  <p className="text-sm text-white/80 pl-8">support@admissionodisha.in</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <FaFacebook className="text-white/80" />
                    <p className="font-semibold">{t("contactSidebarFollowUs")}</p>
                  </div>
                  <div className="flex gap-3 pl-8">
                    <a href="/" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition hover:scale-110">
                      <FaFacebook size={16} />
                    </a>
                    <a href="/" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition hover:scale-110">
                      <FaInstagram size={16} />
                    </a>
                    <a href="/" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition hover:scale-110">
                      <FaLinkedinIn size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Started Card */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl shadow-xl p-6 text-white text-center">
              <div className="mb-3">
                <FaGraduationCap className="text-4xl mx-auto" />
              </div>
              <h4 className="text-xl font-bold mb-2">{t("contactSidebarCtaTitle")}</h4>
              <p className="text-sm text-white/90 mb-4">
                {t("contactSidebarCtaDesc")}
              </p>
              <Link to="/register">
                <button className="bg-white text-teal-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 w-full">
                  {t("contactSidebarCtaButton")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - FAQ Content */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {t("contactFaqTitle1")} <span className="text-indigo-600">{t("contactFaqTitle2")}</span>
                </h2>
                <p className="text-gray-500">{t("contactFaqSub")}</p>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="mt-0.5">{faq.icon}</div>
                        <span className="font-semibold text-gray-800 text-sm md:text-base pr-4 flex-1">
                          {faq.q}
                        </span>
                      </div>
                      <FaChevronDown
                        className={`text-indigo-600 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"
                        }`}
                    >
                      <p className="px-4 pb-4 text-gray-600 text-sm leading-relaxed pl-11">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/help-center">
                  <button className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    {t("contactFaqViewAll")} <FaArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Simple Image */}
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 md:p-8 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop"
                alt="Students discussing and learning together"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Map Section - Smaller */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-56 md:h-64 bg-gray-200 relative">
            <iframe
              title="Admission Odisha Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29960.27893319226!2d85.79767945!3d20.2960592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Contact;