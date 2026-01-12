import React from 'react';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoriesSection from "../components/CategoriesSection";
import QuickActions from "../components/QuickActions";
import AIAssistantWidget from "../components/AIAssistantWidget";

export default function Home({ onLogout }) {
  return (
    <div className="min-h-screen bg-transparent">
      <Header onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CategoriesSection />
            <QuickActions />
          </div>

          <div>
            <AIAssistantWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
