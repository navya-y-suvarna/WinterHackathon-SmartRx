import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import lottie from "lottie-web";

export default function LoadingScreen() {
  const lottieRef = useRef(null);

  useEffect(() => {
    // Prevent background scroll while overlay is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Small delay to ensure the node is in the DOM
    const timer = setTimeout(() => {
      if (!lottieRef.current) return;
      try {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/animations/capsule.json",
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet", // center within container
          },
        });
      } catch (error) {
        console.error("Animation error:", error);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        background: "#FFFFFF", // Restore original white background
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "screenFadeIn 0.5s ease-out",
      }}
    >
      <div
        ref={lottieRef}
        style={{
          width: 250,
          height: 250,
          filter: "drop-shadow(0 0 40px rgba(37, 99, 235, 0.3))",
          animation: "glowPulse 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes screenFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(37, 99, 235, 0.2)); 
          }
          50% { 
            transform: scale(1.05);
            filter: drop-shadow(0 0 40px rgba(16, 185, 129, 0.3)); 
          }
        }
      `}</style>
    </div>,
    document.body
  );
}



