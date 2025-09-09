import React from 'react';

const Footer: React.FC = () => {
  const navigate = (hash: string) => window.location.hash = hash;

  return (
    <footer className="bg-slate-900/50 mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); navigate('privacy'); }} className="text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#tos" onClick={(e) => { e.preventDefault(); navigate('tos'); }} className="text-sm hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} No-Code Red Flags. All rights reserved.</p>
        <p className="text-xs mt-2">Built for entrepreneurs, by Hiranmay Roy.</p>
      </div>
    </footer>
  );
};

export default Footer;
