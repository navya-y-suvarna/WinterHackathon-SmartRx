import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "../components/Header";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(query);

  useEffect(() => {
  setSearchText(query);
}, [query]);


  // Mock results
  const results = [
    {
      id: 1,
      title: "Paracetamol",
      description: "Used to reduce fever and relieve mild to moderate pain.",
      image: "https://placehold.co/100x100"
    },
    {
      id: 2,
      title: "Cold & Flu",
      description: "Symptoms, precautions and treatment guidance.",
      image: "https://placehold.co/100x100"
    },
    {
      id: 3,
      title: "Headache Relief",
      description: "Causes, remedies and recommended medicines.",
      image: "https://placehold.co/100x100"
    }
  ];

  return (
    <>
      {/* Header with Mic + Menu */}
      <Header hideLogo />

      <div className="px-10 py-8">
        {/* 🔍 Search Bar (same as SearchBar.js) */}
        <div className="flex justify-center mb-10">
          <div className="relative w-[720px]">
            {/* 🔍 Search icon */}
            <Search
              className="
                absolute
                left-[26px]
                top-1/2
                -translate-y-1/2
                w-6 h-6
                text-gray-500
                pointer-events-none
              "
            />

            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/search/${searchText}`)
              }
              placeholder="Search medicines, symptoms, guidance..."
              className="
                w-full
                h-[52px]
                pl-[72px]          /* text starts after icon */
                pr-6
                rounded-full
                border-2
                text-base
                placeholder:text-lg
                shadow
                outline-none
                transition
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          Results for: <span className="text-blue-600">{query}</span>
        </h2>

        {/* Results */}
        <div className="space-y-6">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/details/${item.id}`)}
              className="flex gap-6 p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg font-bold text-blue-700">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
