import React from 'react';
import { Heart, Mail, Github, Linkedin, XIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg">
                <img
                  src="/image/logo.png"
                  alt="Logo"
                  className="w-11 h-11 rounded-full object-cover shadow-md"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#8938EA] to-[#4555EA] bg-clip-text text-transparent">
                TagMyIdea
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Discover and share amazing project ideas with the developer community. 
              Turn your creativity into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 hover:text-[#4555EA] transition-colors text-sm">
                Home
              </a>
              <a href="/create" className="block text-gray-600 hover:text-[#4555EA] transition-colors text-sm">
                Create Project
              </a>
              <a href="/profile" className="block text-gray-600 hover:text-[#4555EA] transition-colors text-sm">
                Profile
              </a>
              <a href="/user-list" className="block text-gray-600 hover:text-[#4555EA] transition-colors text-sm">
                Community
              </a>
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Developer</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#8938EA]/5 to-[#4555EA]/5 rounded-lg border border-[#4555EA]/10">
                <div className="w-10 h-10 bg-gradient-to-r from-[#8938EA] to-[#4555EA] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">SJ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Shashank Joshi</p>
                  <p className="text-gray-600 text-xs">Backend Engineer</p>
                </div>
              </div>
              
              <a 
                href="mailto:joshishashank2003@gmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-[#4555EA] transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">joshishashank2003@gmail.com</span>
              </a>
              
              <div className="flex items-center space-x-3">
                <a 
                  href="https://github.com/Shashank12-03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-[#4555EA] hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/shashank-joshi-3664b2226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-[#4555EA] hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://x.com/Shashank_0312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-[#4555EA] hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <XIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by a passionate backend engineer</span>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} TagMyIdea. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;