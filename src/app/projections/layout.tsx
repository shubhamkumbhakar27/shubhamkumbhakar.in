"use client";
import { useRouter } from "next/navigation";

export default function ProjectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation button to illusions at top left */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => router.push('/illusions/balls')}
          className="mt-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Motion Illusions
        </button>
      </div>

      {children}
    </div>
  );
}
