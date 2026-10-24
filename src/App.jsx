import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Menu from './components/Menu';
import CustomCakes from './components/CustomCakes';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MarqueeBanner from './components/MarqueeBanner';
import StickyMobileActions from './components/StickyMobileActions';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll for nav links
    const handleNavClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId && targetId.length > 1) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <div className="App min-h-screen bg-[#FAF8F5] text-[#1F1511] antialiased selection:bg-[#E8590C]/20 selection:text-[#E8590C]">
      <Header />
      <main>
        <Hero />
        <MarqueeBanner />
        <Categories />
        <Menu />
        <CustomCakes />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <StickyMobileActions />
    </div>
  );
}

export default App;
