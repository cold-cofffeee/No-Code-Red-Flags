import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import TosPage from './components/TosPage';
import SharePage from './components/SharePage';

const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (hash.startsWith('#share=')) {
      return <SharePage />;
    }
    
    switch (hash) {
      case '#about':
        return <AboutPage />;
      case '#contact':
        return <ContactPage />;
      case '#privacy':
        return <PrivacyPage />;
      case '#tos':
        return <TosPage />;
      case '#home':
      default:
        return <HomePage />;
    }
  };

  const isSharePage = hash.startsWith('#share=');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 blur-3xl animate-gradient-x"></div>
      <div className="relative z-10 flex flex-col flex-grow">
        {!isSharePage && <Header />}
        <main className={`flex-grow container mx-auto px-4 sm:px-6 lg:px-8 ${isSharePage ? 'py-12' : 'py-8'}`}>
          {renderPage()}
        </main>
        {!isSharePage && <Footer />}
      </div>
    </div>
  );
};

export default App;
