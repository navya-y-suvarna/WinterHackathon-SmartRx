import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="
        fixed top-6 left-6
        flex items-center gap-2
        px-4 py-2
        bg-white
        rounded-lg
        shadow-md
        text-gray-700
        font-medium
        hover:bg-gray-100
        transition
        z-50
      "
    >
      ← Back
    </button>
  );
}
