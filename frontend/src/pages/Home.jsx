import React from 'react';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoriesSection from "../components/CategoriesSection";
import QuickActions from "../components/QuickActions";
import AIAssistantWidget from "../components/AIAssistantWidget";
import TrendingFeed from "../components/TrendingFeed";
import logo from '../assets/logo2.png';
import RotatingText from "../components/RotatingText/RotatingText";

export default function Home({ onLogout, loading }) {
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#020617]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-blue-400 font-medium">Initializing SmartRx...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Header onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-6 pt-2 pb-8">
        <div className="flex flex-col items-center justify-center mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex flex-wrap items-center justify-center leading-tight">
            <span className="opacity-90">Your</span>
            <RotatingText
              texts={['intelligent', 'resourceful', 'proficient', 'perceptive', 'insightful', 'brilliant']}
              interval={2500}
            />
            <span className="opacity-90">medical assistant</span>
          </h1>
        </div>

        <SearchBar />
        <div className="mt-6 mb-8">
          <TrendingFeed />
        </div>

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
