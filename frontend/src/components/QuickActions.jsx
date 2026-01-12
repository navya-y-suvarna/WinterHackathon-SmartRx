import React, { useState } from 'react';
import { Upload, MapPin, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CameraScanner from './CameraScanner';
import Tesseract from 'tesseract.js';

const QuickActions = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const navigate = useNavigate();

    const handleCapture = async (imageData) => {
        setIsProcessing(true);
        try {

            // 1. Perform OCR directly on captured image (Preprocessing removed as it degraded performance)
            const result = await Tesseract.recognize(
                imageData,
                'eng',
                { logger: m => console.log(m) }
            );

            const text = result.data.text;
            console.log("OCR Result:", text);

            const cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

            // 3. Allow user to edit/confirm
            if (cleanText.length > 0) {
                const userText = prompt("We read the following. Please correct if needed:", cleanText);
                if (userText) {
                    navigate(`/search/${encodeURIComponent(userText)}`);
                }
            } else {
                alert("Could not read any text. Please try again with better lighting.");
            }
        } catch (err) {
            console.error("OCR Error:", err);
            alert("Failed to read prescription. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLocatePharmacy = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // Open Google Maps searching for pharmacies near the user's location
            const url = `https://www.google.com/maps/search/pharmacies/@${latitude},${longitude},15z`;
            window.open(url, '_blank');
        }, (error) => {
            console.error("Error getting location:", error);
            alert("Unable to retrieve your location. Please check browser permissions.");
            // Fallback to generic search if location fails
            window.open("https://www.google.com/maps/search/pharmacies/", '_blank');
        });
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[#66B668]/40 rounded-2xl shadow-[0_8px_32px_0_rgba(102,182,104,0.4)] p-6 transition-all duration-300 hover:shadow-[0_8px_48px_0_rgba(102,182,104,0.7)] hover:border-[#66B668]/60 hover:-translate-y-1">
            <h3 className="text-gray-800 font-semibold mb-4">Quick Actions</h3>
            <button
                onClick={() => setIsScannerOpen(true)}
                className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-[#4D2FB2]/5 transition-colors group"
            >
                <div className="bg-[#FEA2B6] p-2 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                    <Upload className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <p className="text-gray-800 font-medium">Upload Prescription</p>
                    <p className="text-gray-500 text-sm">Get medicines delivered</p>
                </div>
            </button>
            <button
                onClick={handleLocatePharmacy}
                className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-[#0E21A0]/5 transition-colors group mt-2"
            >
                <div className="bg-[#66B668] p-2 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <p className="text-gray-800 font-medium">Find Nearby Pharmacy</p>
                    <p className="text-gray-500 text-sm">Locate stores near you</p>
                </div>
            </button>

            <CameraScanner
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onCapture={handleCapture}
            />
        </div>
    );
};

export default QuickActions;
