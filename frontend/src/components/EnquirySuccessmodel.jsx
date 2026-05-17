import { useState, useEffect } from "react";

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
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "rgba(10,10,30,0.55)", backdropFilter: "blur(6px)" }}
    >
      <div
        className={`relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${visible ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-8 opacity-0"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Top gradient section */}
        <div className="relative flex flex-col items-center pt-10 pb-6 px-6"
          style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #F5F3FF 100%)" }}>

          <span className="absolute top-6 left-8 text-xl" style={{ animation: "floatAnim 2s ease-in-out infinite" }}>💗</span>
          <span className="absolute top-12 right-10 text-sm" style={{ animation: "floatAnim 2.5s ease-in-out infinite 0.5s" }}>✨</span>
          <span className="absolute bottom-10 left-6 text-xs" style={{ animation: "floatAnim 3s ease-in-out infinite 1s" }}>⭐</span>

          {/* Envelope illustration */}
          <div className="relative mb-4">
            <div className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{ background: "radial-gradient(circle, #FFD6DE 0%, #FFF0F3 65%, transparent 100%)" }}>
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
          </div>

          <h2 className="text-3xl font-extrabold text-center mb-1" style={{ color: "#1a1a3e", fontFamily: "Georgia, serif" }}>
            Thank You! 💖
          </h2>
          <p className="text-base font-semibold text-center" style={{ color: "#FF6B8A" }}>
            Your enquiry has been received.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-10 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #FFB3C6)" }}/>
            <span className="text-xs">💗</span>
            <div className="w-10 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, #FFB3C6, transparent)" }}/>
          </div>
        </div>

        {/* Bottom white section */}
        <div className="px-7 pt-5 pb-4 bg-white">
          <div className="flex items-start gap-4 rounded-2xl p-4 mb-5"
            style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #FFF5F7 100%)", border: "1px solid #E8E4FF" }}>
            <span className="text-4xl flex-shrink-0 leading-none">⭐</span>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: "#1a1a3e" }}>Dream it. Believe it. Achieve it.</p>
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                We'll connect with you soon and help you take the next step towards your dreams. ✨
              </p>
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>❤️ Keep learning, keep growing.</p>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              <strong style={{ color: "#6C4DF6" }}>Admission Odisha</strong> is with you always! 🌟
            </p>
          </div>

          <div className="flex justify-between items-end pt-2">
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
              <path d="M16 42 L16 18" stroke="#C5CEFF" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 30 C10 24 4 26 6 32 C8 38 16 35 16 30Z" fill="#C5CEFF" opacity="0.65"/>
              <path d="M16 23 C22 17 28 19 26 25 C24 31 16 28 16 23Z" fill="#A0AAEE" opacity="0.55"/>
            </svg>
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
              <path d="M13 22 C13 22 1 14 1 7 C1 3.5 4 1 7 1 C10 1 13 4 13 4 C13 4 16 1 19 1 C22 1 25 3.5 25 7 C25 14 13 22 13 22Z"
                stroke="#C5CEFF" strokeWidth="1.8" fill="none"/>
            </svg>
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
              <path d="M16 42 L16 18" stroke="#FFB3C6" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 30 C22 24 28 26 26 32 C24 38 16 35 16 30Z" fill="#FFB3C6" opacity="0.65"/>
              <path d="M16 23 C10 17 4 19 6 25 C8 31 16 28 16 23Z" fill="#FF8FAB" opacity="0.55"/>
            </svg>
          </div>
        </div>

        <div className="h-5 rounded-b-3xl" style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #FFF5F7 100%)" }}/>

        <style>{`
          @keyframes floatAnim {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export { EnquirySuccessModal };

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-sm">Click to preview the success modal</p>
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"
      >
        ✈ Submit Enquiry
      </button>
      <EnquirySuccessModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
