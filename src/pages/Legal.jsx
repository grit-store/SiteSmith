import React from 'react';
import SEOHead from '../components/SEOHead';

export default function Legal() {
  const legalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'OpenCurb Media',
    'url': 'https://opencurbmedia.site/',
    'logo': 'https://opencurbmedia.site/logo.jpeg',
    'telephone': '+91 8320050530',
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': 'Gujarat',
      'addressCountry': 'IN'
    }
  };

  return (
    <>
      <SEOHead
        title="Privacy Policy & Terms of Service | OpenCurb Media Gujarat"
        description="Privacy Policy and Terms of Service for OpenCurb Media web & app development agency in Gujarat, India. Review our retainer terms and privacy practices."
        canonicalUrl="/legal.html"
        schemaData={legalSchema}
      />

      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-code-sm text-primary text-xs uppercase tracking-widest font-semibold">Governance &amp; Terms</span>
          <h1 className="font-display-lg text-4xl text-on-surface font-bold mt-2 mb-4">
            Legal Documentation
          </h1>
          <p className="text-on-surface-variant font-body-md">
            Terms of Service and Privacy Policy for OpenCurb Media digital services agency in Gujarat, India.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8 md:p-12 space-y-8 text-on-surface-variant font-body-md border border-border-subtle">
          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">1. Retainer Terms</h2>
            <p>
              OpenCurb Media provides web creation, mobile application development, and digital software infrastructure services under a monthly subscription retainer model. Retainer slots are billed at the beginning of each billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">2. Intellectual Property</h2>
            <p>
              Upon full payment of active retainers, clients retain full ownership of all custom domain assets, brand graphics, and specific client codebase implementations developed by OpenCurb Media.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">3. Privacy &amp; Data Protection</h2>
            <p>
              We collect contact information submitted through our project consultation form solely for communicating regarding digital services. We do not sell or distribute client data to third parties.
            </p>
          </section>

          <section className="pt-6 border-t border-border-subtle">
            <h3 className="text-lg font-bold text-on-surface mb-1">Contact Legal</h3>
            <p className="text-sm">For inquiries regarding legal documentation, please contact OpenCurb Media at +91 8320050530.</p>
          </section>
        </div>
      </main>
    </>
  );
}
