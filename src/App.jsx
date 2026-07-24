import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BgCanvas from './components/BgCanvas';
import Home from './pages/Home';
import Examples from './pages/Examples';
import Demo from './pages/Demo';
import Legal from './pages/Legal';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0C0A] text-[#F0ECE4] relative font-body-md">
      <BgCanvas />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Examples />} />
        <Route path="/examples.html" element={<Examples />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo.html" element={<Demo />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/legal.html" element={<Legal />} />
      </Routes>
      <Footer />
    </div>
  );
}
