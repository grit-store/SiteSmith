import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';

export default function Demo() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [plate, setPlate] = useState([]);

  const menuItems = [
    { id: 1, name: 'Special Junagadh Gathiya', category: 'gathiya', price: 120, desc: 'Fresh, warm, crispy Gathiya served with spicy fried green chillies and raw papaya sambharo.', tag: 'Bestseller' },
    { id: 2, name: 'Crispy Nylon Fafda', category: 'fafda', price: 140, desc: 'Light, crunchy Fafda spiced with ajwain seeds, served with authentic kadhi chutney.', tag: 'Popular' },
    { id: 3, name: 'Hot Saffron Jalebi', category: 'sweets', price: 160, desc: 'Pure desi ghee golden Jalebi dipped in aromatic saffron cardamom syrup.', tag: 'Sweet Special' },
    { id: 4, name: 'Vanela Gathiya', category: 'gathiya', price: 110, desc: 'Soft and peppered hand-rolled Gathiya served piping hot.', tag: 'Traditional' },
    { id: 5, name: 'Special Masala Chai', category: 'beverages', price: 30, desc: 'Simmered ginger, cardamom, and tea spices brew.', tag: 'Hot' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToPlate = (item) => {
    setPlate(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const totalPrice = plate.reduce((sum, item) => sum + item.price * item.qty, 0);

  const demoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    'name': 'Iscon Gathiya (Junagadh)',
    'image': 'https://opencurbmedia.site/logo.jpeg',
    'url': 'https://opencurbmedia.site/demo.html',
    'servesCuisine': ['Gujarati', 'Indian', 'Snacks'],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Junagadh',
      'addressRegion': 'Gujarat',
      'addressCountry': 'IN'
    },
    'description': 'Authentic Junagadh Gathiya, Fafda, and Jalebi interactive digital menu solution built by OpenCurb Media.'
  };

  return (
    <>
      <SEOHead
        title="ISCON GATHIYA | Interactive Digital Restaurant Menu Demo"
        description="Experience authentic Junagadh Gathiya, Fafda, and Jalebi at Iscon Gathiya. Interactive digital QR menu solution built by OpenCurb Media."
        canonicalUrl="/demo.html"
        schemaData={demoSchema}
      />

      <main className="flex-grow pt-28 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header Branding */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-code-sm uppercase text-xs tracking-widest font-semibold">Live Production Demo</span>
          <h1 className="font-display-lg text-4xl sm:text-5xl text-on-surface font-bold mt-2">
            Crispy, Warm, and Authentically Indian
          </h1>
          <p className="text-on-surface-variant font-body-md mt-2">
            Iscon Gathiya Junagadh Wala &mdash; Digital QR Menu System by OpenCurb Media.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['all', 'gathiya', 'fafda', 'sweets', 'beverages'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-label-caps capitalize transition-all ${activeCategory === cat ? 'bg-primary text-background font-bold shadow-md' : 'bg-surface-container border border-border-subtle text-on-surface-variant hover:border-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="glass-panel rounded-xl p-6 flex flex-col justify-between border border-border-subtle hover:border-primary/50 transition-all">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-xl font-bold text-on-surface">{item.name}</h3>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">{item.tag}</span>
                  </div>
                  <p className="text-text-muted text-sm mb-4">{item.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border-subtle/50">
                  <span className="text-primary font-bold text-xl">₹{item.price}</span>
                  <button onClick={() => addToPlate(item)} className="bg-primary/20 text-primary border border-primary/40 px-4 py-1.5 rounded text-xs font-label-caps hover:bg-primary hover:text-background transition-colors font-bold">
                    + Add to Plate
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Active Plate / Order Summary */}
          <div className="glass-panel rounded-2xl p-6 h-fit border border-primary/30">
            <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              My Selection
            </h2>

            {plate.length === 0 ? (
              <p className="text-text-muted text-sm py-8 text-center">Your plate is currently empty. Click "+ Add to Plate" to order items.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {plate.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm text-on-surface border-b border-border-subtle/50 pb-2">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-text-muted">₹{item.price} &times; {item.qty}</div>
                    </div>
                    <span className="font-bold text-primary">₹{item.price * item.qty}</span>
                  </div>
                ))}

                <div className="pt-4 border-t border-border-subtle flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>

                <button onClick={() => alert('Order Placed! Thank you for testing the Iscon Gathiya demo.')} className="w-full bg-primary text-background py-3 rounded font-label-caps font-bold hover:bg-primary-fixed transition-colors mt-2">
                  Confirm Order &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
