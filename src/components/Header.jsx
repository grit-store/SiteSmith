import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/${id}`;
      return;
    }
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const targetPos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-md border-b border-border-subtle shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link to="/" className="flex items-center gap-2 text-primary font-headline-md tracking-tight hover:opacity-80 transition-opacity">
          <span className="font-extrabold text-on-surface tracking-tighter">OpenCurb</span>
          <span className="font-extrabold text-[#8ca3ba] tracking-tighter">Media</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          <button onClick={() => scrollToSection('#pricing')} className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-300">Solutions</button>
          <button onClick={() => scrollToSection('#work')} className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-300">Work</button>
          <button onClick={() => scrollToSection('#infrastructure')} className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-300">Why OpenCurb Media</button>
          <button onClick={() => scrollToSection('#process')} className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-300">Process</button>
          <button onClick={() => scrollToSection('#contact')} className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-300">Contact</button>
        </nav>
        
        <button onClick={() => scrollToSection('#contact')} className="hidden md:flex items-center justify-center bg-primary text-background px-6 py-2 rounded font-label-caps hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(201,169,110,0.3)] transition-all duration-300 transform hover:-translate-y-0.5">
          Get Started
        </button>
        
        <button className="md:hidden text-primary p-2 focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle Menu">
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-surface-container/95 backdrop-blur-xl border-l border-border-subtle z-40 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6 gap-6 shadow-2xl`}>
        <button onClick={() => scrollToSection('#pricing')} className="text-left text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Solutions</button>
        <button onClick={() => scrollToSection('#work')} className="text-left text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Work</button>
        <button onClick={() => scrollToSection('#infrastructure')} className="text-left text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Why OpenCurb Media</button>
        <button onClick={() => scrollToSection('#process')} className="text-left text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Process</button>
        <button onClick={() => scrollToSection('#contact')} className="text-left text-on-surface-variant font-body-md hover:text-primary transition-all py-2">Contact</button>
      </div>
    </header>
  );
}
