import { useState, useEffect } from "react";
import { useEnquiry } from "../context/EnquiryContext";

// ── Thank You Success Modal ───────────────────────────────────────────────────
const EnquirySuccessModal = ({ open, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) setTimeout(() => setVisible(true), 10);
    else setVisible(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 999999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        background: "rgba(10,10,30,0.55)", backdropFilter: "blur(6px)",
        transition: "opacity 0.3s ease", opacity: visible ? 1 : 0,
      }}
    >
      <div style={{
        position: "relative", width: "100%", maxWidth: 440,
        background: "white", borderRadius: 28, overflow: "hidden",
        boxShadow: "0 32px 80px rgba(108,77,246,0.18), 0 8px 32px rgba(0,0,0,0.12)",
        transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(28px)",
        transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
        opacity: visible ? 1 : 0,
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14, zIndex: 10,
          width: 30, height: 30, borderRadius: "50%",
          background: "#F3F4F6", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Top gradient section */}
        <div style={{
          background: "linear-gradient(160deg, #FFF5F7 0%, #F5F3FF 100%)",
          padding: "40px 24px 24px",
          display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative",
        }}>
          {/* Floating decorative emojis */}
          <span style={{ position: "absolute", top: 20, left: 24, fontSize: 18, animation: "floatUp 2s ease-in-out infinite" }}>💗</span>
          <span style={{ position: "absolute", top: 30, right: 28, fontSize: 13, animation: "floatUp 2.5s ease-in-out infinite 0.5s" }}>✨</span>
          <span style={{ position: "absolute", bottom: 30, left: 20, fontSize: 11, animation: "floatUp 3s ease-in-out infinite 1s" }}>⭐</span>

          {/* Envelope */}
          <div style={{
            width: 140, height: 140, borderRadius: "50%", marginBottom: 12,
            background: "radial-gradient(circle, #FFD6DE 0%, #FFF0F3 65%, transparent 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="110" height="95" viewBox="0 0 110 95" fill="none">
              <rect x="12" y="38" width="86" height="52" rx="7" fill="#FFB3C6"/>
              <path d="M12 38 L55 14 L98 38" fill="#FF8FAB"/>
              <path d="M12 38 L55 58 L98 38" fill="#FFCCD8"/>
              <rect x="26" y="10" width="58" height="68" rx="5" fill="white" opacity="0.97"/>
              <circle cx="55" cy="36" r="17" fill="#FFE4EC"/>
              <path d="M48 33 Q49.5 30.5 51 33" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M59 33 Q60.5 30.5 62 33" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M49 40 Q55 46 61 40" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <circle cx="46" cy="42" r="4" fill="#FFB3C6" opacity="0.5"/>
              <circle cx="64" cy="42" r="4" fill="#FFB3C6" opacity="0.5"/>
              <path d="M52 21 C52 18.5 55 17 55 20 C55 17 58 18.5 58 21 C58 23.5 55 26 55 26 C55 26 52 23.5 52 21Z" fill="#FF6B8A"/>
              <g transform="translate(80, 5) rotate(-25)">
                <path d="M0 0 L22 9 L0 18 L5 9 Z" fill="#FF8FAB"/>
                <path d="M0 18 L5 9 L22 9" fill="#FF6B8A" opacity="0.5"/>
              </g>
              <g transform="translate(6, 72)">
                <path d="M8 18 C8 18 8 5 8 0" stroke="#C5CEFF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 12 C4 8 0 10 1 14 C2 18 8 16 8 12Z" fill="#C5CEFF" opacity="0.7"/>
                <path d="M8 7 C12 3 16 5 15 9 C14 13 8 11 8 7Z" fill="#A0AAEE" opacity="0.6"/>
              </g>
              <g transform="translate(88, 72)">
                <path d="M8 18 C8 18 8 5 8 0" stroke="#FFB3C6" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 12 C12 8 16 10 15 14 C14 18 8 16 8 12Z" fill="#FFB3C6" opacity="0.7"/>
                <path d="M8 7 C4 3 0 5 1 9 C2 13 8 11 8 7Z" fill="#FF8FAB" opacity="0.6"/>
              </g>
              <text x="4" y="26" fontSize="11">✨</text>
              <text x="88" y="62" fontSize="9">💕</text>
            </svg>
          </div>

          <h2 style={{ margin: "0 0 4px", fontSize: 30, fontWeight: 800, color: "#1a1a3e", fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>
            Thank You! 💖
          </h2>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#FF6B8A" }}>
            Your enquiry has been received.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg, transparent, #FFB3C6)" }}/>
            <span style={{ fontSize: 12 }}>💗</span>
            <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg, #FFB3C6, transparent)" }}/>
          </div>
        </div>

        {/* Bottom white section */}
        <div style={{ padding: "22px 28px 20px", background: "white" }}>
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 14,
            borderRadius: 16, padding: "16px 18px", marginBottom: 18,
            background: "linear-gradient(135deg, #F5F3FF 0%, #FFF5F7 100%)",
            border: "1px solid #E8E4FF",
          }}>
            <span style={{ fontSize: 36, flexShrink: 0, lineHeight: 1 }}>⭐</span>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 800, color: "#1a1a3e" }}>Dream it. Believe it. Achieve it.</p>
              <p style={{ margin: 0, fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
                We'll connect with you soon and help you take the next step towards your dreams. ✨
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "#9CA3AF" }}>❤️ Keep learning, keep growing.</p>
            <p style={{ margin: 0, fontSize: 14, color: "#6B7280" }}>
              <strong style={{ color: "#6C4DF6" }}>Admission Odisha</strong> is with you always! 🌟
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 8 }}>
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
              <path d="M16 42 L16 18" stroke="#C5CEFF" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 30 C10 24 4 26 6 32 C8 38 16 35 16 30Z" fill="#C5CEFF" opacity="0.65"/>
              <path d="M16 23 C22 17 28 19 26 25 C24 31 16 28 16 23Z" fill="#A0AAEE" opacity="0.55"/>
            </svg>
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
              <path d="M13 22 C13 22 1 14 1 7 C1 3.5 4 1 7 1 C10 1 13 4 13 4 C13 4 16 1 19 1 C22 1 25 3.5 25 7 C25 14 13 22 13 22Z" stroke="#C5CEFF" strokeWidth="1.8" fill="none"/>
            </svg>
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
              <path d="M16 42 L16 18" stroke="#FFB3C6" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 30 C22 24 28 26 26 32 C24 38 16 35 16 30Z" fill="#FFB3C6" opacity="0.65"/>
              <path d="M16 23 C10 17 4 19 6 25 C8 31 16 28 16 23Z" fill="#FF8FAB" opacity="0.55"/>
            </svg>
          </div>
        </div>

        <div style={{ height: 20, background: "linear-gradient(135deg, #F5F3FF 0%, #FFF5F7 100%)", borderRadius: "0 0 28px 28px" }}/>

        <style>{`
          @keyframes floatUp {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </div>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const fields = [
  {
    id: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: "phone", label: "Phone Number", placeholder: "Enter your mobile number", type: "tel",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
      </svg>
    ),
  },
  {
    id: "courses", label: "Interested Course(s)", placeholder: "e.g. B.Tech, MBA, BCA", type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: "colleges", label: "Preferred College(s)", placeholder: "e.g. KIIT, Silicon, ITER", type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    id: "location", label: "Preferred Location", placeholder: "e.g. Bhubaneswar, Cuttack", type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function EnquiryFloating() {
  const { isOpen, openEnquiry, closeEnquiry } = useEnquiry();
  const [submitted, setSubmitted] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", courses: "", colleges: "", location: "" });
  const [guidance, setGuidance] = useState("yes");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setForm(prev => ({
          ...prev,
          fullName: user.name || user.full_name || user.fullName || prev.fullName,
          phone: user.phone || user.mobile || user.phone_number || prev.phone,
        }));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const resetForm = () => {
    const userStr = localStorage.getItem("user");
    let autofillName = "", autofillPhone = "";
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        autofillName = user.name || user.full_name || user.fullName || "";
        autofillPhone = user.phone || user.mobile || user.phone_number || "";
      } catch (e) {}
    }
    setForm({ fullName: autofillName, phone: autofillPhone, courses: "", colleges: "", location: "" });
    setGuidance("yes");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=site/api-submit-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guidance }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setSubmitted(false);
        closeEnquiry();         // close the enquiry form
        setSuccessOpen(true);   // show thank you modal
        resetForm();
      } else {
        console.error("Submission failed:", result.message);
        setSubmitted(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(false);
    }
  };

  return (
    <>
      {/* Floating Side Tab */}
      <div style={{ position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 9999 }}>
        <button
          onClick={openEnquiry}
          className="enquiry-floating-btn"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            background: "linear-gradient(180deg, #6C4DF6, #8B5CF6)",
            color: "white",
            fontWeight: "700",
            fontSize: "14px",
            padding: "20px 12px",
            borderRadius: "12px 0 0 12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "-4px 0 20px rgba(108,77,246,0.4)",
            letterSpacing: "1px",
          }}
        >
          Enquiry Now
        </button>
      </div>

      <style>{`
        @keyframes pulse-gentle {
          0% { transform: rotate(180deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(180deg) scale(1); }
        }
        .enquiry-floating-btn {
          animation: pulse-gentle 2.5s infinite ease-in-out;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease !important;
        }
        .enquiry-floating-btn:hover {
          animation: none !important;
          transform: rotate(180deg) scale(1.1) !important;
          background: linear-gradient(180deg, #5B45C4, #7C3AED) !important;
          box-shadow: -6px 0 25px rgba(108,77,246,0.6) !important;
        }
      `}</style>

      {/* Enquiry Form Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => e.target === e.currentTarget && closeEnquiry()}
        >
          <div style={{
            background: "white", borderRadius: "24px",
            width: "100%", maxWidth: "400px",
            padding: "32px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            maxHeight: "92vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#1e1b4b" }}>Enquiry Now</h2>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>Fill in your details to get started.</p>
              </div>
              <button onClick={closeEnquiry} style={{ background: "#f1f5f9", border: "none", padding: "8px", borderRadius: "12px", cursor: "pointer", color: "#64748b" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {fields.map(field => (
                <div key={field.id}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>{field.label}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                      {field.icon}
                    </span>
                    <input
                      required
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id]}
                      onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                      style={{
                        width: "100%", padding: "12px 12px 12px 40px",
                        borderRadius: "12px", border: "2px solid #f1f5f9",
                        fontSize: "14px", outline: "none",
                        transition: "all 0.2s", boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Need Guidance */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "8px" }}>
                  Need Guidance? <span style={{ color: "red" }}>*</span>
                </label>
                <div style={{ display: "flex", gap: "24px" }}>
                  {["yes", "no"].map((opt) => (
                    <div key={opt} onClick={() => setGuidance(opt)} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        border: `2px solid ${guidance === opt ? "#6366f1" : "#cbd5e1"}`,
                        background: guidance === opt ? "#6366f1" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {guidance === opt && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white" }} />}
                      </div>
                      <span style={{ fontSize: "14px", color: "#334155", textTransform: "capitalize" }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                style={{
                  marginTop: "8px", padding: "14px", borderRadius: "14px",
                  border: "none",
                  background: submitted ? "#10b981" : "#6366f1",
                  color: "white", fontWeight: "700", fontSize: "16px",
                  cursor: submitted ? "default" : "pointer",
                  boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
                }}
              >
                {submitted ? "✓ Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Success Modal */}
      <EnquirySuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}

