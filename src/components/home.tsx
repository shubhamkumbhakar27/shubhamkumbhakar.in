import React from 'react';
import { Code, Palette, Globe2, Terminal } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Namaste 🙏
            </h1>
            <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent'>I&apos;m <span className="text-orange-400">Shubham</span></h2>
            <p className="text-xl text-gray-300">
              A software engineer who breathes life into code, an artist who captures beauty on canvas, 
              and a proud Indian aiming to create an impact through technology and art.
            </p>
            <div className="flex gap-4">
              <a href="/projects">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
                View Projects
              </button>
              </a>
              <a href="/resume.pdf" target='_blank'>
              <button className="border-2 border-orange-500 text-orange-400 px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                Contact Me
              </button>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
                  <Terminal className="w-8 h-8 text-orange-400 mb-2" />
                  <h3 className="font-bold text-lg text-white">Software Engineer</h3>
                  <p className="text-gray-300">Building robust solutions with modern tech</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
                  <Globe2 className="w-8 h-8 text-rose-400 mb-2" />
                  <h3 className="font-bold text-lg text-white">Cultural Explorer</h3>
                  <p className="text-gray-300">Bridging traditions with innovation</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
                  <Palette className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="font-bold text-lg text-white">Artist</h3>
                  <p className="text-gray-300">Creating visual stories and experiences</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
                  <Code className="w-8 h-8 text-blue-400 mb-2" />
                  <h3 className="font-bold text-lg text-white">Problem Solver</h3>
                  <p className="text-gray-300">Turning challenges into opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Where Technology Meets Art</h2>
            <p className="text-gray-300 mt-2">Bringing creative solutions to technical challenges</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
              <div className="h-2 bg-orange-500 rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4 text-white">Technical Expertise</h3>
              <p className="text-gray-300">
                Proficient in modern web technologies, creating scalable and efficient solutions that power the digital world.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
              <div className="h-2 bg-rose-500 rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4 text-white">Artistic Vision</h3>
              <p className="text-gray-300">
                Blending traditional Indian art forms with contemporary design principles to create unique visual experiences.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-lg hover:bg-gray-800/70 transition">
              <div className="h-2 bg-purple-500 rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4 text-white">Creative Bridge</h3>
              <p className="text-gray-300">
                Aiming to reduce the gap between arts and technology, creating innovative solutions that inspire and engage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;