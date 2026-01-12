import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import RotatingText from "../components/RotatingText";
import lottie from "lottie-web";
import ChatAssistant from "../components/ChatAssistant";

export default function Home({ onLogout, onNavigate }) {
  const navigate = useNavigate();
  const doctorAnimRef = useRef(null);
  const [showAssistantPreview, setShowAssistantPreview] = useState(false);

  useEffect(() => {
    if (!doctorAnimRef.current) return;
    const anim = lottie.loadAnimation({
      container: doctorAnimRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/doctor-animation.json",
    });
    return () => anim?.destroy();
  }, []);

  const goToAssistant = () => {
    // navigate to assistant page
    navigate('/assistant');
  };

  const pageBg = {
    backgroundImage:
      'linear-gradient(rgba(2,6,23,0.45), rgba(2,6,23,0.45)), url("/aura.jpeg"), url("/aura.svg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="min-h-screen" style={pageBg}>
      <Header hideLogo={false} onLogout={onLogout} onAssistantToggle={() => setShowAssistantPreview((s) => !s)} />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Title with rotating text */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center md:text-left">
            <span>Your </span>
            <RotatingText
              texts={[
                "intelligent",
                "smart",
                "advanced",
                "AI-powered",
              ]}
              splitBy="characters"
              staggerDuration={0.03}
              mainClassName="text-blue-700"
            />
            <span> medical assistant</span>
          </h1>

          {/* Search bar */}
          <div className="max-w-xl mx-auto md:mx-0 mb-12">
            <SearchBar />
          </div>

          <div className="md:flex md:items-start md:gap-10">
            <div className="md:flex-1">
              {/* Doctor animation and button - aligned right */}
              <div className="flex justify-end items-start">
                <div className="flex flex-col items-center gap-4">
                  <div ref={doctorAnimRef} className="w-[320px] h-[320px]" />
                  <button
                    onClick={goToAssistant}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                  >
                    Ask SmartRX
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Assistant preview */}
            <div className="mt-8 md:mt-0 md:w-[380px]">
              {showAssistantPreview ? (
                <ChatAssistant />
              ) : (
                <div className="hidden md:block">{/* placeholder when hidden on desktop */}</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
