import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="relative w-[720px]">
        {/* 🔍 Search icon */}
        <Search className="absolute left-[26px] top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />

        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) {
              navigate(`/search/${q}`);
            }
          }}
          placeholder="Search medicines, symptoms, guidance..."
          className="
            w-full
            h-[62px]
            pl-[72px]          /* ✅ KEY FIX — text starts AFTER icon */
            pr-8
            rounded-full
            border-2
            text-lg
            placeholder:text-xl
            shadow-lg
            outline-none
            transition
            focus:ring-2 focus:ring-blue-500
          "
        />
      </div>
    </div>
  );
}
