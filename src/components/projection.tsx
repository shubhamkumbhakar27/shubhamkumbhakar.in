"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const pi = 3.14;
const luminance = ".,-~:;=!*#$@";
const R1 = 1;
const R2 = 2;
const K2 = 5;

const Projection = ({ shape }: { shape: string }) => {
  const [angles, setAngles] = useState({ A: 0, B: 0 });
  const [matrixSize, setMatrixSize] = useState<number>(70);

  const calculateMatrix = useCallback(function (
    A: number,
    B: number,
    matrixSize: number
  ) {
    const K1 = (matrixSize * K2 * 3) / (8 * (R1 + R2));
    const matrix = [...Array(matrixSize)].map(() =>
      [...Array(matrixSize)].map(() => " ")
    );
    const zBuffer = [...Array(matrixSize)].map(() =>
      [...Array(matrixSize)].map(() => 0)
    );

    const cosA = Math.cos(A);
    const sinA = Math.sin(A);
    const cosB = Math.cos(B);
    const sinB = Math.sin(B);

    for (let theta = 0; theta < 2 * pi; theta += 0.05) {
      const sintheta = Math.sin(theta);
      const costheta = Math.cos(theta);
      for (let phi = 0; phi < 2 * pi; phi += 0.05) {
        const cosphi = Math.cos(phi);
        const sinphi = Math.sin(phi);

        const circlex = R2 + R1 * costheta;
        const circley = R1 * sintheta;

        const x =
          circlex * (cosB * cosphi + sinA * sinB * sinphi) -
          circley * cosA * sinB;
        const y =
          circlex * (sinB * cosphi - sinA * cosB * sinphi) +
          circley * cosA * cosB;
        const z = K2 + cosA * circlex * sinphi + circley * sinA;
        const ooz = 1 / z;

        const xp = Math.floor(matrixSize / 2 + K1 * ooz * x);
        const yp = Math.floor(matrixSize / 2 - K1 * ooz * y);

        let L =
          cosphi * costheta * sinB -
          cosA * costheta * sinphi -
          sinA * sintheta +
          cosB * (cosA * sintheta - costheta * sinA * sinphi);
        L = (L + 1.5) * 4;
        if (L > 0) {
          if (ooz > zBuffer[yp][xp]) {
            zBuffer[yp][xp] = ooz;
            const luminanceIndex = Math.floor(L);
            matrix[yp][xp] = luminance.charAt(luminanceIndex);
          }
        }
      }
    }
    return matrix;
  },
  []);

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
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
      <div className="flex flex-col border items-center overflow-hidden">
        {matrix.map((row, i) => (
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
    </div>
  );
};

export default Projection;
