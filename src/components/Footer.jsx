import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-border-subtle py-12 px-margin-mobile md:px-margin-desktop mt-auto">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-headline-md tracking-tight">
            <span className="font-extrabold text-on-surface">OpenCurb</span>&nbsp;
            <span className="font-extrabold text-[#8ca3ba]">Media</span>
          </div>
          <p className="text-text-muted font-body-md text-sm">
            Web &amp; Mobile App Development Agency in Gujarat, India.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/work" className="hover:text-primary transition-colors">Work</Link>
          <Link to="/demo" className="hover:text-primary transition-colors">Demo</Link>
          <Link to="/legal" className="hover:text-primary transition-colors">Legal</Link>
        </div>

        <div className="text-text-muted font-body-md text-xs">
          &copy; {new Date().getFullYear()} OpenCurb Media. All rights reserved. Phone: +91 8320050530
        </div>
      </div>
    </footer>
  );
}
