import React from 'react';

const Header: React.FC = () => {
  const navigate = (hash: string) => window.location.hash = hash;

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex-shrink-0 text-white font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">🚩</span>
              <span>No-Code Red Flags</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); navigate('about'); }} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
