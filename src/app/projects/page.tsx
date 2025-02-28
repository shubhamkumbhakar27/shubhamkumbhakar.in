"use client";
import React, { useState } from 'react';
import { Code, Eye, Brain, Grid3X3, ExternalLink, Github } from 'lucide-react';
import { CubeIcon } from '@heroicons/react/24/solid';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState<any>(null);

  const projects = [
    {
      title: "Perspective Projections",
      description: "An interactive visualization tool demonstrating 3D perspective projections, helping users understand spatial geometry and visual transformations.",
      icon: <CubeIcon className="w-8 h-8" />,
      tags: ["WebGL", "Three.js", "Mathematics"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Tic Tac Toe",
      description: "A modern take on the classic game featuring AI opponent, multiplayer mode, and beautiful animations.",
      icon: <Grid3X3 className="w-8 h-8" />,
      tags: ["React", "Game Dev", "AI"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Generative AI App",
      description: "An innovative application leveraging latest AI models for creative content generation and text analysis.",
      icon: <Brain className="w-8 h-8" />,
      tags: ["AI/ML", "API Integration", "NLP"],
      color: "from-orange-500 to-rose-500"
    },
    {
      title: "Code Analyzer",
      description: "Advanced tool for analyzing and optimizing code performance with real-time suggestions.",
      icon: <Code className="w-8 h-8" />,
      tags: ["Python", "Static Analysis", "Performance"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >x
              
              <div className="relative bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className={`bg-gradient-to-r ${project.color} p-3 rounded-lg`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <Github className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Project Button */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
            <Code className="w-5 h-5" />
            View More Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;