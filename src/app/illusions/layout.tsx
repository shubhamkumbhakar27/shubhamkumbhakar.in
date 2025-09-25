"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function IllusionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIllusion, setSelectedIllusion] = useState("");

  const illusions = [
    { value: "", label: "Select an illusion...", path: "/illusions" },
    { value: "rings", label: "Rings", path: "/illusions/rings" },
    { value: "balls", label: "Circular Motion Balls", path: "/illusions/balls" },
  ];

  // Update selected illusion based on current path
  useEffect(() => {
    const currentIllusion = illusions.find(illusion => illusion.path === pathname);
    if (currentIllusion) {
      setSelectedIllusion(currentIllusion.value);
    }
  }, [pathname]);

  const handleIllusionChange = (value: string) => {
    setSelectedIllusion(value);
    const illusion = illusions.find(i => i.value === value);
    if (illusion) {
      router.push(illusion.path);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation button to projections at top left */}
      <div className="mt-2 absolute top-4 left-4 z-10">
        <button
          onClick={() => router.push('/projections')}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          3D Projections
        </button>
      </div>

      {/* Navigation dropdown at top right */}
      <div className="mt-2 absolute top-4 right-4 z-10">
        <select
          value={selectedIllusion}
          onChange={(e) => handleIllusionChange(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 text-sm min-w-48"
        >
          {illusions.map((illusion) => (
            <option key={illusion.value} value={illusion.value}>
              {illusion.label}
            </option>
          ))}
        </select>
      </div>

      {children}
    </div>
  );
}
