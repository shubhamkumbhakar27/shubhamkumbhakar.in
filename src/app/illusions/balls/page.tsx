"use client";
import React, { useEffect, useRef, useState } from "react";

const BallsIllusion = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const animationTimeRef = useRef(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const size = Math.min(window.innerWidth * 0.8, 600);
        canvas.width = size;
        canvas.height = size;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size * 0.35;
        const numBalls = 12;
        const ballRadius = 8;

        // Create balls with different colors - rainbow spectrum
        const colors = [
            '#ff0000', // Red
            '#ff8000', // Orange
            '#ffff00', // Yellow
            '#80ff00', // Yellow-Green
            '#00ff00', // Green
            '#00ff80', // Green-Cyan
            '#00ffff', // Cyan
            '#0080ff', // Cyan-Blue
            '#0000ff', // Blue
            '#8000ff', // Blue-Purple
            '#ff00ff', // Magenta
            '#ff0080', // Pink
        ];

        const balls = Array.from({ length: numBalls }, (_, i) => ({
            angle: (i * 2 * Math.PI) / numBalls,
            color: colors[i % colors.length],
            speed: 0.02
        }));

        const drawFrame = () => {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, size, size);

            // Draw radial lines from center
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 1;
            balls.forEach(ball => {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const lineEndX = centerX + Math.cos(ball.angle) * radius;
                const lineEndY = centerY + Math.sin(ball.angle) * radius;
                ctx.lineTo(lineEndX, lineEndY);
                ctx.stroke();
            });

            // Calculate and draw balls
            balls.forEach(ball => {
                // Each ball moves along its radial line
                // The distance from center oscillates to create the circular illusion
                const distance = radius * 0.3 + radius * 0.4 * Math.sin(animationTimeRef.current + ball.angle * 2);

                const x = centerX + Math.cos(ball.angle) * distance;
                const y = centerY + Math.sin(ball.angle) * distance;

                ctx.fillStyle = ball.color;
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
                ctx.fill();
            });
        };

        const animate = () => {
            drawFrame();

            if (isPlaying) {
                animationTimeRef.current += 0.03;
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        // Always draw the initial frame
        drawFrame();

        if (isPlaying) {
            animate();
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying]);

    const toggleAnimation = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold mb-4">Circular Motion Illusion</h1>
            </div>

            <div className="relative">
                <canvas
                    ref={canvasRef}
                    className="border border-gray-600 rounded-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            </div>

            <div className="mt-6">
                <button
                    onClick={toggleAnimation}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>


        </div>
    );
};

export default BallsIllusion;