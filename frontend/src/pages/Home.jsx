import { Link } from "react-router-dom";

export default function Home({ onLogout, onNavigate }) {
	return (
		<div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-white">
			<header className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">PharmaCare</h1>
				<div className="flex items-center gap-3">
					<button
						onClick={() => {
							onNavigate?.();
						}}
						className="px-3 py-1 bg-blue-600 text-white rounded"
					>
						Quick Action
					</button>
					<button
						onClick={() => onLogout?.()}
						className="px-3 py-1 bg-red-600 text-white rounded"
					>
						Logout
					</button>
				</div>
			</header>

			<main>
				<p className="mb-4 text-gray-700">Welcome to the SmartRX dashboard.</p>

				<nav className="space-x-3">
					<Link to="/assistant" className="text-blue-600 underline">
						Open Assistant
					</Link>
					<Link to="/search/paracetamol" className="text-blue-600 underline">
						Search example
					</Link>
				</nav>
			</main>
		</div>
	);
}
