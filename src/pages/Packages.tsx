import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, MapPin, Calendar, Users, ArrowRight, Compass, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const navigate = useNavigate();

  const handleWhatsAppClick = () =>
    window.open('https://wa.me/9856664440?text=Hello, I would like to inquire about your travel services.', '_blank');

  const domesticPackages = [
    {
      name: 'Golden Triangle Tour',
      location: 'Delhi, Agra, Jaipur',
      duration: '6 Days / 5 Nights',
      price: '₹35,000',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Taj Mahal Visit', 'Red Fort', 'Hawa Mahal', 'Local Cuisine'],
      groupSize: '2–15 people',
      tag: 'Most Popular',
    },
    {
      name: 'Kerala Backwaters',
      location: 'Kochi, Alleppey, Munnar',
      duration: '5 Days / 4 Nights',
      price: '₹28,000',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Houseboat Stay', 'Tea Plantations', 'Spice Gardens', 'Ayurvedic Spa'],
      groupSize: '2–12 people',
      tag: 'Serene',
    },
    {
      name: 'Goa Beach Paradise',
      location: 'North & South Goa',
      duration: '4 Days / 3 Nights',
      price: '₹22,000',
      rating: 4.6,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Beach Activities', 'Water Sports', 'Local Markets', 'Sunset Cruise'],
      groupSize: '2–20 people',
      tag: 'Beach Vibes',
    },
    {
      name: 'Himachal Hill Stations',
      location: 'Shimla, Manali, Dharamshala',
      duration: '7 Days / 6 Nights',
      price: '₹32,000',
      rating: 4.9,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Mountain Views', 'Adventure Sports', 'Local Culture', 'Photography'],
      groupSize: '2–10 people',
      tag: 'Adventure',
    },
  ];

  const internationalPackages = [
    {
      name: 'Swiss Alps Adventure',
      location: 'Zurich, Interlaken, Jungfraujoch',
      duration: '8 Days / 7 Nights',
      price: '₹1,85,000',
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Alpine Railways', 'Snow Activities', 'Lake Cruises', 'Mountain Hiking'],
      groupSize: '2–8 people',
      tag: 'Luxury',
    },
    {
      name: 'Iceland Nature Tour',
      location: 'Reykjavik, Blue Lagoon, Golden Circle',
      duration: '6 Days / 5 Nights',
      price: '₹1,95,000',
      rating: 4.8,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Northern Lights', 'Geysers', 'Waterfalls', 'Glacier Walks'],
      groupSize: '2–12 people',
      tag: 'Arctic Magic',
    },
    {
      name: 'Nepal Himalayan Trek',
      location: 'Kathmandu, Pokhara, Everest Base Camp',
      duration: '12 Days / 11 Nights',
      price: '₹95,000',
      rating: 4.9,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Everest Views', 'Sherpa Culture', 'Mountain Lodges', 'Photography'],
      groupSize: '4–12 people',
      tag: 'Trekking',
    },
    {
      name: 'Bali Tropical Escape',
      location: 'Ubud, Seminyak, Nusa Penida',
      duration: '7 Days / 6 Nights',
      price: '₹75,000',
      rating: 4.7,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Temple Visits', 'Beach Clubs', 'Rice Terraces', 'Volcano Tours'],
      groupSize: '2–15 people',
      tag: 'Tropical',
    },
  ];

  const packages = activeTab === 'domestic' ? domesticPackages : internationalPackages;

  const PackageCard = ({ pkg }: { pkg: typeof domesticPackages[0] }) => (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 border border-slate-100 transition-all duration-500 flex flex-col">

      {/* Image */}
      <div className="relative h-52 sm:h-56 overflow-hidden flex-shrink-0">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-full">
            {pkg.tag}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-[11px] font-bold text-slate-800">{pkg.rating}</span>
        </div>

        {/* Price overlaid on bottom of image */}
        <div className="absolute bottom-3 left-4">
          <p className="text-white text-xl font-bold font-serif leading-none">{pkg.price}</p>
          <p className="text-white/70 text-[10px] font-medium">per person</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">

        {/* Title + location */}
        <div>
          <h3 className="text-base font-serif font-bold text-slate-900 leading-tight">{pkg.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
            <p className="text-slate-500 text-xs">{pkg.location}</p>
          </div>
        </div>

        {/* Duration + group */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Calendar className="w-3.5 h-3.5 text-primary/60" />
            {pkg.duration}
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Users className="w-3.5 h-3.5 text-primary/60" />
            {pkg.groupSize}
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {pkg.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary/40 flex-shrink-0" />
              <span className="text-[11px] text-slate-500">{h}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-1 mt-auto flex items-center justify-between border-t border-slate-100">
          <span className="text-[10px] text-slate-400">{pkg.reviews} reviews</span>
          <Button
            onClick={() => navigate('/plan-trip', { state: { selectedPackage: pkg.name } })}
            className="h-8 px-4 text-xs rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5 font-semibold"
          >
            Book Now
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 bg-white border-b border-slate-100 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-4">
              Curated Experiences
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight mb-4">
              Travel <span className="gradient-text">Packages</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              Handcrafted itineraries for every kind of traveler — from serene backwaters to alpine adventures.
            </p>
          </div>

          {/* Tab switcher in hero */}
          <div className="flex items-center gap-2 mt-10">
            {[
              { id: 'domestic', label: 'Domestic', icon: Compass },
              { id: 'international', label: 'International', icon: Globe },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'domestic' | 'international')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-primary/30 hover:text-primary'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Section label */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {activeTab === 'domestic' ? 'Domestic' : 'International'} Tours
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'domestic'
                  ? 'Explore the incredible diversity and beauty of India'
                  : 'Experience the wonders of the world with our curated tours'}
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-white border border-slate-200 rounded-full px-3 py-1.5">
              {packages.length} packages
            </span>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))}
          </div>

          {/* Custom package CTA */}
          <div className="mt-16 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Can't find what you're looking for?
              </h3>
              <p className="text-slate-500 text-sm mt-1.5 max-w-md">
                Let our travel experts craft a fully custom itinerary tailored to your dates, budget, and dream destinations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button
                onClick={() => navigate('/plan-trip')}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-11 text-sm font-semibold gap-2"
              >
                Plan Custom Trip
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                variant="outline"
                className="border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary rounded-xl px-6 h-11 text-sm font-semibold"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;