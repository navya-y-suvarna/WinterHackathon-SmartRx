import { useParams, useNavigate } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="px-10 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 font-medium"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-2xl font-bold mb-4">
          Detailed Information (ID: {id})
        </h1>

        <p className="text-gray-700 leading-relaxed">
          This page shows detailed medical or informational content related
          to the selected search result.
        </p>

        <p className="text-gray-700 leading-relaxed mt-4">
          You can later connect this page to:
        </p>

        <ul className="list-disc ml-6 mt-3 text-gray-700">
          <li>Medicine usage</li>
          <li>Dosage details</li>
          <li>Side effects</li>
          <li>AI-generated medical guidance</li>
        </ul>
      </div>
    </div>
  );
}
