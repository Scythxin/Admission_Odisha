import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, X } from "lucide-react";
import API_BASE from "../config/api";

export default function GuidancePopup({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false);
  const [numbers, setNumbers] = useState({
    support_phone: "+919114422555",
    support_message: "+919114422555",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
      // Fetch settings from the backend
      const fetchSettings = async () => {
        try {
          const res = await fetch(`${API_BASE}?r=site/api-settings`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === "success" && data.data) {
              setNumbers({
                support_phone: data.data.support_phone || "+919114422555",
                support_message: data.data.support_message || "+919114422555",
              });
            }
          }
        } catch (e) {
          console.error("Failed to fetch settings, using fallbacks:", e);
        }
      };
      fetchSettings();
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isMobile = /Mobi|Android|iPhone|iPad|Windows Phone/i.test(navigator.userAgent);

  const cleanPhone = numbers.support_phone.replace(/\s+/g, "");
  const cleanMessage = numbers.support_message.replace(/\s+/g, "");

  const handleCall = (e) => {
    if (!isMobile) {
      e.preventDefault();
      alert(`Please call us at: ${numbers.support_phone}`);
    }
  };

  const handleChat = (e) => {
    if (!isMobile) {
      e.preventDefault();
      alert(`Please send message/chat to: ${numbers.support_message}`);
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(10, 10, 30, 0.6)",
        backdropFilter: "blur(8px)",
        transition: "opacity 0.3s ease",
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(135deg, #ffffff 0%, #fef9ff 100%)",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(108, 77, 246, 0.25), 0 8px 32px rgba(0, 0, 0, 0.15)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
          padding: "32px 24px 24px",
        }}
      >
        {/* Decorative Top Border Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #6C4DF6, #8B5CF6, #FF6B8A, #6C4DF6)",
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#F3F4F6",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6B7280",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E5E7EB";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F3F4F6";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "800",
              color: "#1e1b4b",
              background: "linear-gradient(135deg, #6C4DF6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Get Expert Guidance
          </h3>
          <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#64748b" }}>
            Choose how you would like to connect with us
          </p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Call Now */}
          <a
            href={isMobile ? `tel:${cleanPhone}` : "#"}
            onClick={handleCall}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: "linear-gradient(135deg, #6C4DF6 0%, #8B5CF6 100%)",
              padding: "16px 20px",
              borderRadius: "20px",
              color: "white",
              boxShadow: "0 10px 20px -5px rgba(108, 77, 246, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 14px 24px -5px rgba(108, 77, 246, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 20px -5px rgba(108, 77, 246, 0.4)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Phone size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ display: "block", fontSize: "16px", fontWeight: "700" }}>Call Now</span>
              <span style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)" }}>
                {isMobile ? "Directly dial our support center" : `Call us at ${numbers.support_phone}`}
              </span>
            </div>
          </a>

          {/* Chat Now */}
          <a
            href={isMobile ? `sms:${cleanMessage}` : "#"}
            onClick={handleChat}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: "white",
              border: "2px solid #E9E5FF",
              padding: "14px 18px",
              borderRadius: "20px",
              color: "#4F46E5",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.02)",
              transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "#6C4DF6";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(108, 77, 246, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#E9E5FF";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.02)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#F5F3FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6C4DF6",
              }}
            >
              <MessageSquare size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ display: "block", fontSize: "16px", fontWeight: "700", color: "#1e1b4b" }}>
                Chat Now
              </span>
              <span style={{ display: "block", fontSize: "12px", color: "#64748b" }}>
                {isMobile ? "Text us on your messaging app" : `Chat with us at ${numbers.support_message}`}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
