"use client";
import Projection from "@/components/projection";
import React, { useState } from "react";

const Projections = () => {
  const [currentShape, setCurrentShape] = useState("donut");

  const handleChange = (e: any) => {
    e.preventDefault();
    setCurrentShape(e.target.value);
  };
  return (
    <>
      <div className="flex justify-end items-center h-20 p-8">
        <div className="w-40">
          <label
            htmlFor="dropdown"
            className="block text-gray-300 text-sm mb-2"
          >
            Choose a shape
          </label>
          <select
            id="dropdown"
            className="w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
            value={currentShape}
            onChange={handleChange}
          >
            <option value="donut">Donut</option>
            <option value="cube">Cube</option>
          </select>
        </div>
      </div>
      <div>
        <Projection shape={currentShape} />
      </div>
    </>
  );
};

export default Projections;
