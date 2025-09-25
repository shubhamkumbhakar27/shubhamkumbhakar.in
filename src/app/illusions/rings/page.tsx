"use client";
import React, { useState } from "react";

const RingsIllusion = () => {
    const [ringCount, setRingCount] = useState(20);
    const [isPaused, setIsPaused] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const generateRings = () => {
        const rings = [];
        // Calculate the size needed for the largest ring
        const maxRadius = 30 + (ringCount - 1) * 8;
        const strokeWidth = 6;
        const containerSize = (maxRadius + strokeWidth) * 2 + 40; // Add padding

        for (let i = 0; i < ringCount; i++) {
            const radius = 30 + i * 8; // Closer spacing
            const speed = 0.5 + i * 0.1;
            const circumference = 2 * Math.PI * radius;
            const gapDegrees = 30 + i * 3; // Increasing gap size in degrees
            const gapLength = (gapDegrees / 360) * circumference; // Convert to circumference units
            const strokeLength = circumference - gapLength; // Length of the visible stroke
            const strokeWidth = 6; // Thicker borders
            // Offset to position gap at top center (12 o'clock)
            const dashOffset = strokeLength / 2;

            rings.push(
                <svg
                    key={`${i}-${resetKey}`}
                    className="absolute"
                    width={radius * 2 + strokeWidth}
                    height={radius * 2 + strokeWidth}
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: `rotate ${20 / speed}s linear infinite`,
                        animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                >
                    <circle
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        fill="none"
                        stroke="white"
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${strokeLength} ${gapLength}`}
                        strokeDashoffset={dashOffset}
                        opacity={0.9 - (i * 0.015)}
                    />
                </svg>
            );
        }
        return { rings, containerSize };
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
            <div className="mb-8 flex items-center gap-6">
                <div>
                    <label htmlFor="ringCount" className="text-white text-lg mr-4">
                        Number of Rings:
                    </label>
                    <select
                        id="ringCount"
                        value={ringCount}
                        onChange={(e) => setRingCount(Number(e.target.value))}
                        className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                    {isPaused ? 'Play' : 'Pause'}
                </button>

                <button
                    onClick={() => {
                        setResetKey(prev => prev + 1);
                        setIsPaused(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
                >
                    Reset
                </button>
            </div>

            <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                    width: `min(90vw, ${generateRings().containerSize}px)`,
                    height: `min(70vh, ${generateRings().containerSize}px)`,
                }}
            >
                {generateRings().rings}
            </div>

            <style jsx>{`
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

export default RingsIllusion;