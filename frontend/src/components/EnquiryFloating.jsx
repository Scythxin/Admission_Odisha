import { useState, useEffect } from "react";
import { useEnquiry } from "../context/EnquiryContext";

const fields = [
  {
    id: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter your mobile number",
    type: "tel",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
      </svg>
    ),
  },
  {
    id: "courses",
    label: "Interested Course(s)",
    placeholder: "e.g. B.Tech, MBA, BCA",
    type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: "colleges",
    label: "Preferred College(s)",
    placeholder: "e.g. KIIT, Silicon, ITER",
    type: "text",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    id: "location",
    label: "Preferred Location",
    placeholder: "e.g. Bhubaneswar, Cuttack",
    type: "text",
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
          phone: user.phone || user.mobile || user.phone_number || prev.phone
        }));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=site/api-submit-enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          guidance,
        }),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setTimeout(() => {
          setSubmitted(false);
          closeEnquiry();
          setForm(prev => {
            const userStr = localStorage.getItem("user");
            let autofillName = "";
            let autofillPhone = "";
            if (userStr) {
              try {
                const user = JSON.parse(userStr);
                autofillName = user.name || user.full_name || user.fullName || "";
                autofillPhone = user.phone || user.mobile || user.phone_number || "";
              } catch (e) {}
            }
            return { fullName: autofillName, phone: autofillPhone, courses: "", colleges: "", location: "" };
          });
          setGuidance("yes");
        }, 2000);
      } else {
        console.error('Submission failed:', result.message);
        setSubmitted(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitted(false);
    }
  };

  return (
    <>

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={openEnquiry}
          className="enquiry-floating-btn"
          style={{
            position: "fixed",
            right: "-5.5em",
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            color: "white",
            padding: "14px 28px",
            borderRadius: "16px 16px 0 0",
            fontWeight: "800",
            fontSize: "14px",
            letterSpacing: "1.5px",
            cursor: "pointer",
            zIndex: 9998,
            boxShadow: "0 -8px 25px rgba(99, 102, 241, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            outline: "none",
            textTransform: "uppercase"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.right = "-5em";
            e.currentTarget.style.boxShadow = "0 -12px 30px rgba(99, 102, 241, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.right = "-5.5em";
            e.currentTarget.style.boxShadow = "0 -8px 25px rgba(99, 102, 241, 0.4)";
          }}
        >
            
          Enquiry Now
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => e.target === e.currentTarget && closeEnquiry()}
        >
          <div style={{
            background: "white",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "400px",
            padding: "32px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
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
                        width: "100%",
                        padding: "12px 12px 12px 40px",
                        borderRadius: "12px",
                        border: "2px solid #f1f5f9",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.2s",
                        boxSizing: "border-box"
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
                    <div
                      key={opt}
                      onClick={() => setGuidance(opt)}
                      style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                    >
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
                  marginTop: "8px",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "none",
                  background: submitted ? "#10b981" : "#6366f1",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: submitted ? "default" : "pointer",
                  boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
                }}
              >
                {submitted ? "✓ Submitted Successfully" : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-gentle {
          0% { transform: translateY(-50%) rotate(-90deg) scale(1); }
          50% { transform: translateY(-50%) rotate(-90deg) scale(1.05); }
          100% { transform: translateY(-50%) rotate(-90deg) scale(1); }
        }
        .enquiry-floating-btn {
          animation: pulse-gentle 3s infinite ease-in-out;
        }
        .enquiry-floating-btn:hover {
          animation: none;
        }
      `}</style>
    </>
  );
}
