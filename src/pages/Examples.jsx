import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function Examples() {
  const examplesSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'OpenCurb Media Showcase & Work Examples',
    'url': 'https://opencurbmedia.site/examples.html',
    'description': 'Live production client projects and digital infrastructure built by OpenCurb Media in Gujarat, India.',
    'publisher': {
      '@type': 'Organization',
      'name': 'OpenCurb Media',
      'logo': 'https://opencurbmedia.site/logo.jpeg'
    }
  };

  return (
    <>
      <SEOHead
        title="OpenCurb Media | Client Projects & Work Examples in Gujarat"
        description="Explore live client work, web applications, and digital infrastructure projects built by OpenCurb Media in Gujarat, India."
        canonicalUrl="/examples.html"
        schemaData={examplesSchema}
      />

      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code-sm text-primary text-xs tracking-widest uppercase font-semibold">Portfolio &amp; Case Studies</span>
          <h1 className="font-display-lg text-4xl sm:text-5xl text-on-surface mt-2 mb-4 font-bold">
            Client Projects in Production
          </h1>
          <p className="text-on-surface-variant font-body-lg">
            Explore live production web apps, digital interfaces, and custom software systems built for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Showcase Item 1: Iscon Gathiya */}
          <div className="glass-panel rounded-2xl overflow-hidden flex flex-col border border-border-subtle group hover:border-primary/50 transition-all duration-300">
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-primary text-xs font-code-sm uppercase tracking-widest mb-2 font-semibold">Interactive Digital Menu</span>
              <h2 className="text-2xl font-bold text-on-surface mb-3">Iscon Gathiya (Junagadh)</h2>
              <p className="text-on-surface-variant font-body-md mb-6">
                An immersive glassmorphic digital restaurant menu featuring category filtering, live plate management, and dish customization for authentic Gujarati cuisine.
              </p>
              <div className="mt-auto pt-4 border-t border-border-subtle/50 flex justify-between items-center">
                <Link to="/demo" className="text-primary font-label-caps hover:underline flex items-center gap-1 font-semibold">
                  Launch Live Demo &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Showcase Item 2: Digital Infrastructure Agency */}
          <div className="glass-panel rounded-2xl overflow-hidden flex flex-col border border-border-subtle group hover:border-primary/50 transition-all duration-300">
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-primary text-xs font-code-sm uppercase tracking-widest mb-2 font-semibold">Retainer Infrastructure Platform</span>
              <h2 className="text-2xl font-bold text-on-surface mb-3">OpenCurb Media Platform</h2>
              <p className="text-on-surface-variant font-body-md mb-6">
                High-performance web architecture featuring smooth particle canvas physics, reactive retainer packages, and automated Web3Forms integration.
              </p>
              <div className="mt-auto pt-4 border-t border-border-subtle/50 flex justify-between items-center">
                <Link to="/" className="text-primary font-label-caps hover:underline flex items-center gap-1 font-semibold">
                  View Homepage Architecture &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
