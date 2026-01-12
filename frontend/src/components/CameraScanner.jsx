import React, { useRef, useState, useEffect } from 'react';
import { X, Camera, RefreshCw } from 'lucide-react';

const CameraScanner = ({ isOpen, onClose, onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => {
            stopCamera();
        };
    }, [isOpen]);

    const startCamera = async () => {
        try {
            setError(null);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Camera error:", err);
            setError("Unable to access camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert to data URL
            const imageData = canvas.toDataURL('image/png');
            onCapture(imageData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative bg-black rounded-2xl overflow-hidden w-full max-w-md mx-4 shadow-2xl border border-[#B153D7]/30">

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                    <h3 className="text-white font-semibold">Scan Prescription</h3>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Camera View */}
                <div className="relative aspect-[3/4] bg-gray-900 flex items-center justify-center overflow-hidden">
                    {error ? (
                        <div className="text-red-400 text-center p-4">
                            <p>{error}</p>
                            <button
                                onClick={startCamera}
                                className="mt-4 px-4 py-2 bg-[#4D2FB2] rounded-lg text-white text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Scanner Overlay Box */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                                <div className="relative w-full aspect-[3/4] max-h-[70%] border-2 border-[#B153D7] rounded-lg shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]">
                                    {/* Corner Accents */}
                                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#B153D7] rounded-tl-lg"></div>
                                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#B153D7] rounded-tr-lg"></div>
                                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#B153D7] rounded-bl-lg"></div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#B153D7] rounded-br-lg"></div>

                                    {/* Scanning Line Animation */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#B153D7]/50 shadow-[0_0_15px_rgba(177,83,215,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                            <p className="absolute bottom-20 left-0 right-0 text-center text-white/80 text-sm drop-shadow-md">
                                Align prescription within the frame
                            </p>
                        </>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>

                {/* Footer Controls */}
                <div className="p-6 bg-gray-900 flex justify-center items-center space-x-6">
                    {/* Capture Button */}
                    <button
                        onClick={handleCapture}
                        disabled={!!error}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-[#B153D7] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full group-active:scale-90 transition-transform"></div>
                        </div>
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default CameraScanner;
