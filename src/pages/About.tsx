import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Award, Globe, Heart, Shield, Clock, Star, CheckCircle, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () =>
    window.open('https://wa.me/9856664440?text=Hello, I would like to inquire about your travel services.', '_blank');

  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '10,000+' },
    { icon: Globe, label: 'Destinations', value: '150+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' },
  ];

  const values = [
    { icon: Heart, title: 'Passion for Travel', description: 'We live and breathe travel, bringing you experiences that create lifelong memories.' },
    { icon: Shield, title: 'Trust & Reliability', description: 'Your safety and satisfaction are our top priorities. We always deliver on our promises.' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance ensures your journey is smooth from start to finish.' },
    { icon: CheckCircle, title: 'Quality Assurance', description: 'Every detail is carefully planned to exceed your expectations and deliver excellence.' },
  ];

  const team = [
    {
      name: 'Riyaz Vasani',
      role: 'Managing Partner',
      experience: '30+ years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Passionate travel enthusiast with extensive experience in hospitality and tourism.',
    },
    {
      name: 'Sohail Rupani',
      role: 'Managing Partner',
      experience: '25+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b376?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Expert in travel operations and ticketing, ensuring seamless travel experiences.',
    },
    {
      name: 'Rizan Vasani',
      role: 'Senior Associate',
      experience: '2+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Specialist in corporate ticketing with deep knowledge of group travel management.',
    },
  ];

  const milestones = [
    { year: '2009', event: 'Founded Wisdom Tours and Travels in Mumbai' },
    { year: '2012', event: 'Expanded portfolio to international destinations' },
    { year: '2015', event: 'Launched online booking and visa services' },
    { year: '2018', event: 'Reached 5,000+ satisfied customers milestone' },
    { year: '2021', event: 'Introduced digital visa processing services' },
    { year: '2024', event: 'Celebrating 15 years of extraordinary journeys' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* ── HERO ── */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase">
                About Us
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                Travel with <br className="hidden lg:block" />
                <span className="gradient-text">Wisdom</span>
              </h1>
              <p className="text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
                For over 15 years, we've been crafting extraordinary journeys that connect people with the world's most beautiful destinations — one memory at a time.
              </p>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Santacruz (West), Mumbai — serving India & the world
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => navigate('/plan-trip')}
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-11 text-sm font-semibold gap-2"
                >
                  Plan Your Trip <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary rounded-xl px-6 h-11 text-sm font-semibold gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </Button>
              </div>
            </div>

            {/* Right: image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Wisdom Tours team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold font-serif text-slate-900 leading-none">10,000+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Happy Travelers</p>
                </div>
              </div>

              {/* Floating rating card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <p className="text-sm font-bold text-slate-900">4.9/5 Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 leading-none">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1.5 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl p-5 shadow-xl">
                <p className="text-white/70 text-[9px] uppercase tracking-widest font-bold mb-1">Founded</p>
                <p className="text-white text-3xl font-bold font-serif leading-none">2009</p>
                <p className="text-white/70 text-xs mt-1">Mumbai, India</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-4">
                  Our Story
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  From a small agency to <span className="gradient-text">India's trusted</span> travel partner
                </h2>
              </div>

              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  Founded in 2009 with a simple vision — to make travel accessible, memorable, and transformative for everyone. What started as a small travel agency has grown into one of India's most trusted travel partners.
                </p>
                <p>
                  Our journey began with a passionate team of travel enthusiasts who believed that travel is not just about visiting places, but about creating connections, understanding cultures, and building memories that last a lifetime.
                </p>
                <p>
                  Today, we've helped over 10,000 travelers explore 150+ destinations across the globe, from exotic international locations to hidden gems within India. Our commitment to excellence and personalized service has earned us the trust and loyalty of countless families.
                </p>
              </div>

              {/* Mini milestones */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {milestones.slice(0, 4).map((m, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 flex-shrink-0">{m.year}</span>
                    <p className="text-[11px] text-slate-600 leading-tight">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-4">
              What We Stand For
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">Our Values</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={i} className="group bg-[#F8FAFC] rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-primary/20">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-4">
              The People Behind
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">Meet Our Team</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">Dedicated professionals committed to making your travels exceptional</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold font-serif text-lg leading-tight">{member.name}</p>
                    <p className="text-white/80 text-xs font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2.5 py-1">
                      {member.experience}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-4">
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">15 Years of Excellence</h2>
            <p className="text-slate-500 text-sm mt-2">Key milestones that shaped who we are</p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>

                  {/* Dot */}
                  <div className="absolute left-[28px] sm:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md -translate-x-1/2 flex-shrink-0 z-10" />

                  {/* Year pill */}
                  <div className={`w-14 flex-shrink-0 sm:w-auto sm:flex-1 ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'} pl-12 sm:pl-0`}>
                    <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1">{m.year}</span>
                  </div>

                  {/* Event card */}
                  <div className={`flex-1 sm:flex-1 bg-[#F8FAFC] rounded-2xl border border-slate-100 p-4 ${i % 2 === 0 ? 'sm:ml-8' : 'sm:mr-8'} ml-8 sm:ml-0`}>
                    <p className="text-sm text-slate-700 font-medium">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="relative overflow-hidden bg-primary rounded-3xl p-10 sm:p-14">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            </div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-xl">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-3">Ready to go?</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                  Start your journey with us today
                </h3>
                <p className="text-white/60 text-sm mt-3 leading-relaxed">
                  Join thousands of satisfied travelers who have trusted us with their dreams. Let us create your perfect travel experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Button
                  onClick={() => navigate('/plan-trip')}
                  className="bg-white text-primary hover:bg-white/90 rounded-xl px-7 h-12 text-sm font-bold gap-2 shadow-lg"
                >
                  Plan Your Trip <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl px-7 h-12 text-sm font-semibold gap-2 text-red-600"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;