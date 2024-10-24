"use client";
import { getCubeMatrix, getDonutMatrix } from "@/utils/projections";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Projection = ({ shape }: { shape: string }) => {
  const [angles, setAngles] = useState({ A: 0, B: 0 });
  const [matrixSize, setMatrixSize] = useState<number>(70);
  const [currentInterval, setCurrentInterval] = useState<any>(null);

  const calculateMatrix = useCallback(
    function (A: number, B: number, matrixSize: number) {
      switch (shape) {
        case "donut":
          return getDonutMatrix(A, B, matrixSize);
        default:
          return getCubeMatrix(A, B, A, matrixSize);
      }
    },
    [shape]
  );

  const matrix = useMemo(
    () => calculateMatrix(angles.A, angles.B, matrixSize),
    [angles.A, angles.B, matrixSize, calculateMatrix]
  );

  useEffect(() => {
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 40;
    const screenHeight =
      typeof window !== "undefined" ? window.innerHeight : 40;
    setMatrixSize(
      Math.max(Math.floor(Math.min(screenWidth, screenHeight) / 20), 30)
    );

    const interval = setInterval(() => {
      setAngles(({ A, B }) => ({ A: A + 0.05, B: B + 0.05 }));
    }, 40);

    setCurrentInterval(interval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col border border-gray-500 items-center overflow-hidden max-w-3xl m-auto"
      onClick={() => (currentInterval ? clearInterval(currentInterval) : null)}
    >
      {matrix &&
        matrix.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => (
              <div key={j}>
                <p className="text-center text-white/60 h-4 w-4 text-xs">
                  {cell}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Projection;
