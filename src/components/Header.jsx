import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-md border-b border-border-subtle shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link to="/" className="flex items-center gap-2 text-primary font-headline-md tracking-tight hover:opacity-80 transition-opacity">
          <span className="font-extrabold text-on-surface tracking-tighter">OpenCurb</span>
          <span className="font-extrabold text-[#8ca3ba] tracking-tighter">Media</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className={`font-body-md transition-colors duration-300 ${location.pathname === '/' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>Solutions</Link>
          <Link to="/work" className={`font-body-md transition-colors duration-300 ${location.pathname === '/work' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>Work Showcase</Link>
          <Link to="/demo" className={`font-body-md transition-colors duration-300 ${location.pathname === '/demo' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>Iscon Gathiya Demo</Link>
          <Link to="/legal" className={`font-body-md transition-colors duration-300 ${location.pathname === '/legal' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>Legal</Link>
        </nav>
        
        <a href="#contact" className="hidden md:flex items-center justify-center bg-primary text-background px-6 py-2 rounded font-label-caps hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(201,169,110,0.3)] transition-all duration-300 transform hover:-translate-y-0.5">
          Get Started
        </a>
        
        <button className="md:hidden text-primary p-2 focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle Menu">
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-surface-container/95 backdrop-blur-xl border-l border-border-subtle z-40 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6 gap-6 shadow-2xl`}>
        <Link to="/" onClick={() => setMobileOpen(false)} className="text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Solutions</Link>
        <Link to="/work" onClick={() => setMobileOpen(false)} className="text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Work Showcase</Link>
        <Link to="/demo" onClick={() => setMobileOpen(false)} className="text-on-surface-variant font-body-md hover:text-primary transition-all py-2 border-b border-border-subtle/30">Iscon Gathiya Demo</Link>
        <Link to="/legal" onClick={() => setMobileOpen(false)} className="text-on-surface-variant font-body-md hover:text-primary transition-all py-2">Legal</Link>
      </div>
    </header>
  );
}
