"use client";
import React, { useState } from 'react';
import { Eye, Brain, Waves, ArrowRight, Play } from 'lucide-react';
import { CubeIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const router = useRouter();

  const projects = [

    {
      title: "Perspective Projections",
      description: "An interactive visualization tool demonstrating 3D perspective projections, helping users understand spatial geometry and visual transformations.",
      icon: <CubeIcon className="w-8 h-8" />,
      tags: ["Mathematics", "Next.js"],
      color: "from-purple-500 to-pink-500",
      route: "/projections",
      status: "Available"
    },
    {
      title: "Motion Illusions",
      description: "Explore fascinating visual effects and optical illusions created through synchronized movement and clever positioning.",
      icon: <Brain className="w-8 h-8" />,
      tags: ["Animation", "Next.js"],
      color: "from-orange-500 to-rose-500",
      route: "/illusions/balls",
      status: "Available"
    }
  ];

  const handleProjectClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-300">
            Exploring the intersection of technology, art, and innovation
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`bg-gradient-to-r ${project.color} p-3 rounded-lg shadow-lg`}>
                    {project.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 border border-gray-600/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-3 mt-auto">
                  <button
                    onClick={() => handleProjectClick(project.route)}
                    className={`w-full bg-gradient-to-r ${project.color} hover:shadow-lg hover:shadow-orange-500/25 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold transform hover:scale-105`}
                  >
                    <Play className="w-5 h-5" />
                    Launch Project
                  </button>


                </div>

                {/* Hover Effect */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-rose-500/10 rounded-xl pointer-events-none transition-opacity duration-300" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg">
            More exciting projects coming soon! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;