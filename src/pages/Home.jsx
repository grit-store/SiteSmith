import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState('custom');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'OpenCurb Media',
    'image': 'https://opencurbmedia.site/logo.jpeg',
    'url': 'https://opencurbmedia.site/',
    'telephone': '+91 8320050530',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': 'Gujarat',
      'addressCountry': 'IN'
    },
    'areaServed': ['Gujarat', 'India'],
    'description': 'OpenCurb Media is a premier web & mobile app development agency in Gujarat, India offering custom websites, apps, and software solutions.'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="OpenCurb Media | Web & App Development Agency in Gujarat, India"
        description="OpenCurb Media is a premier web & mobile app development agency in Gujarat, India. We build custom websites, applications, and digital infrastructure."
        canonicalUrl="/index.html"
        schemaData={homeSchema}
      />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-start px-margin-mobile md:px-margin-desktop py-20" id="hero">
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-start gap-8">
            <div className="text-primary font-code-sm text-xs tracking-widest uppercase font-semibold">
              OpenCurb Media &mdash; Web &amp; App Development Agency in Gujarat, India
            </div>

            <h1 className="font-display-lg text-[34px] sm:text-[42px] md:text-[76px] leading-[1.2] text-on-surface tracking-tight text-left max-w-4xl font-bold">
              Web &amp; App Development Agency in <span className="text-primary">Gujarat, India</span>
            </h1>
            <p className="font-headline-md text-xl sm:text-2xl text-primary font-medium mt-1">
              We are the foundation you need if you wish to grow.
            </p>

            <p className="font-body-lg text-body-lg text-on-surface-variant text-left max-w-2xl">
              OpenCurb Media builds high-performance websites, custom mobile apps, and robust software infrastructure for growing businesses under a simple retainer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-primary text-background px-8 py-4 rounded font-label-caps text-[14px] hover:bg-primary-fixed hover:shadow-[0_0_20px_rgba(201,169,110,0.4)] transition-all duration-300 transform hover:-translate-y-1 text-center font-semibold">
                Book a Consultation &rarr;
              </a>
              <a href="#pricing" className="bg-transparent text-on-surface px-8 py-4 rounded border border-border-subtle font-label-caps text-[14px] hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 text-center">
                View Packages
              </a>
            </div>
          </div>
        </section>

        {/* Retainer Solutions & Pricing */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16" id="pricing">
          <div className="mb-16 flex flex-col gap-4">
            <span className="font-code-sm text-primary text-xs tracking-widest uppercase font-semibold">Our retainer tiers</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Solutions &amp; Pricing</h2>
            <div className="h-0.5 w-16 bg-primary rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <div className="glass-panel rounded-xl flex flex-col p-8 gap-6 hover:-translate-y-2 transition-all duration-300">
              <div>
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Static Site</h3>
                <p className="font-body-md text-text-muted min-h-[3rem] mb-4">Fast, secure, and reliable static page deployments.</p>
              </div>
              <div className="text-primary font-display-lg text-4xl leading-tight mt-auto">
                ₹5,000<span className="font-body-md text-sm text-text-muted">/mo</span>
              </div>
              <ul className="flex flex-col font-body-md text-on-surface-variant gap-3 mb-6">
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Custom static frontend structure</li>
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Fully responsive mobile layouts</li>
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Automated SSL setup</li>
              </ul>
              <a href="#contact" onClick={() => setSelectedPlan('static')} className="w-full bg-surface-container-high border border-border-subtle text-on-surface py-3 rounded font-label-caps hover:border-primary hover:text-primary transition-all text-center">
                Select Package
              </a>
            </div>

            {/* Card 2 */}
            <div className="glass-panel rounded-xl flex flex-col p-8 gap-6 border-primary/40 relative hover:-translate-y-2 transition-all duration-300">
              <span className="absolute -top-3 right-6 bg-primary text-background text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              <div>
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Full Web Application</h3>
                <p className="font-body-md text-text-muted min-h-[3rem] mb-4">Dynamic web platforms with database backend &amp; custom APIs.</p>
              </div>
              <div className="text-primary font-display-lg text-4xl leading-tight mt-auto">
                ₹15,000<span className="font-body-md text-sm text-text-muted">/mo</span>
              </div>
              <ul className="flex flex-col font-body-md text-on-surface-variant gap-3 mb-6">
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Full-stack web application</li>
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Custom API &amp; Database integration</li>
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Continuous feature deployments</li>
              </ul>
              <a href="#contact" onClick={() => setSelectedPlan('webapp')} className="w-full bg-primary text-background py-3 rounded font-label-caps hover:bg-primary-fixed transition-all text-center font-semibold">
                Select Package
              </a>
            </div>

            {/* Card 3 */}
            <div className="glass-panel rounded-xl flex flex-col p-8 gap-6 hover:-translate-y-2 transition-all duration-300">
              <div>
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Custom Software Suite</h3>
                <p className="font-body-md text-text-muted min-h-[3rem] mb-4">Dedicated mobile apps, custom internal tools, and microservices.</p>
              </div>
              <div className="text-primary font-display-lg text-4xl leading-tight mt-auto">
                Custom Retainer
              </div>
              <ul className="flex flex-col font-body-md text-on-surface-variant gap-3 mb-6">
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Mobile apps (iOS &amp; Android)</li>
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Dedicated developer resources</li>
                <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Custom digital infrastructure</li>
              </ul>
              <a href="#contact" onClick={() => setSelectedPlan('custom')} className="w-full bg-surface-container-high border border-border-subtle text-on-surface py-3 rounded font-label-caps hover:border-primary hover:text-primary transition-all text-center">
                Request Quote
              </a>
            </div>
          </div>
        </section>

        {/* Contact Consultation Form */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16" id="contact">
          <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="font-headline-lg text-3xl text-on-surface mb-2 text-center">Start Your Project</h2>
            <p className="text-on-surface-variant text-center mb-8">
              Discuss your web, mobile app, or software goals with our team in Gujarat.
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-primary text-5xl mb-4">check_circle</span>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Message Sent Successfully!</h3>
                <p className="text-on-surface-variant mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="bg-primary text-background px-6 py-2 rounded font-label-caps">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Name</label>
                  <input type="text" name="name" required className="w-full bg-surface-container-low border border-border-subtle rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Your name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-surface-container-low border border-border-subtle rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary" placeholder="you@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Interested Package</label>
                  <select name="package" value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full bg-surface-container-low border border-border-subtle rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary">
                    <option value="static">Static Site (₹5,000/mo)</option>
                    <option value="webapp">Full Web Application (₹15,000/mo)</option>
                    <option value="custom">Custom Software &amp; Mobile Apps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Project Details</label>
                  <textarea name="message" rows="4" required className="w-full bg-surface-container-low border border-border-subtle rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Tell us about your web or mobile app requirements..."></textarea>
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-primary text-background py-4 rounded font-label-caps text-base font-semibold hover:bg-primary-fixed transition-all">
                  {submitting ? 'Sending Request...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
