import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

export default function LoadingOverlay() {
  const lottieRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/capsule.json",
    });
    return () => anim?.destroy();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div
        ref={lottieRef}
        className="w-64 h-64"
        aria-label="Loading animation"
      />
    </div>
  );
}
