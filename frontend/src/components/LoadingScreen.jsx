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
        width: "100vw",
        height: "100vh",
        background: "#ffffff",
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div ref={lottieRef} style={{ width: 200, height: 200 }} />
    </div>,
    document.body
  );
}



