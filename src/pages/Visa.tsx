import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Users, Phone, MessageCircle, ArrowRight, Globe, Shield, Zap, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// --- TYPES ---
interface VisaResult {
  passport: { name: string; code: string };
  destination: { name: string; code: string };
  dur: number | null;
  category: { name: string; code: string };
  last_updated: string;
}

// --- COUNTRY DATA ---
const countries: Record<string, string> = {
  "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "AD": "Andorra", "AO": "Angola",
  "AG": "Antigua and Barbuda", "AR": "Argentina", "AM": "Armenia", "AU": "Australia",
  "AT": "Austria", "AZ": "Azerbaijan", "BS": "Bahamas", "BH": "Bahrain", "BD": "Bangladesh",
  "BB": "Barbados", "BY": "Belarus", "BE": "Belgium", "BZ": "Belize", "BJ": "Benin",
  "BT": "Bhutan", "BO": "Bolivia", "BA": "Bosnia and Herzegovina", "BW": "Botswana",
  "BR": "Brazil", "BN": "Brunei", "BG": "Bulgaria", "BF": "Burkina Faso", "BI": "Burundi",
  "KH": "Cambodia", "CM": "Cameroon", "CA": "Canada", "CV": "Cape Verde", "CF": "Central African Republic",
  "TD": "Chad", "CL": "Chile", "CN": "China", "CO": "Colombia", "KM": "Comoros",
  "CG": "Congo", "CD": "DR Congo", "CR": "Costa Rica", "CI": "Cote D'Ivoire", "HR": "Croatia",
  "CU": "Cuba", "CY": "Cyprus", "CZ": "Czech Republic", "DK": "Denmark", "DJ": "Djibouti",
  "DM": "Dominica", "DO": "Dominican Republic", "EC": "Ecuador", "EG": "Egypt",
  "SV": "El Salvador", "GQ": "Equatorial Guinea", "ER": "Eritrea", "EE": "Estonia",
  "ET": "Ethiopia", "FJ": "Fiji", "FI": "Finland", "FR": "France", "GA": "Gabon",
  "GM": "Gambia", "GE": "Georgia", "DE": "Germany", "GH": "Ghana", "GR": "Greece",
  "GD": "Grenada", "GT": "Guatemala", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana",
  "HT": "Haiti", "HN": "Honduras", "HK": "Hong Kong", "HU": "Hungary", "IS": "Iceland",
  "IN": "India", "ID": "Indonesia", "IR": "Iran", "IQ": "Iraq", "IE": "Ireland",
  "IL": "Israel", "IT": "Italy", "JM": "Jamaica", "JP": "Japan", "JO": "Jordan",
  "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati", "KP": "North Korea", "KR": "South Korea",
  "KW": "Kuwait", "KG": "Kyrgyzstan", "LA": "Laos", "LV": "Latvia", "LB": "Lebanon",
  "LS": "Lesotho", "LR": "Liberia", "LY": "Libya", "LI": "Liechtenstein", "LT": "Lithuania",
  "LU": "Luxembourg", "MO": "Macao", "MG": "Madagascar", "MW": "Malawi", "MY": "Malaysia",
  "MV": "Maldives", "ML": "Mali", "MT": "Malta", "MH": "Marshall Islands", "MR": "Mauritania",
  "MU": "Mauritius", "MX": "Mexico", "FM": "Micronesia", "MD": "Moldova", "MC": "Monaco",
  "MN": "Mongolia", "MA": "Morocco", "MZ": "Mozambique", "MM": "Myanmar", "NA": "Namibia",
  "NR": "Nauru", "NP": "Nepal", "NL": "Netherlands", "NZ": "New Zealand", "NI": "Nicaragua",
  "NE": "Niger", "NG": "Nigeria", "NO": "Norway", "OM": "Oman", "PK": "Pakistan",
  "PW": "Palau", "PS": "Palestine", "PA": "Panama", "PG": "Papua New Guinea", "PY": "Paraguay",
  "PE": "Peru", "PH": "Philippines", "PL": "Poland", "PT": "Portugal", "QA": "Qatar",
  "RO": "Romania", "RU": "Russia", "RW": "Rwanda", "KN": "Saint Kitts and Nevis",
  "LC": "Saint Lucia", "VC": "Saint Vincent and the Grenadines", "WS": "Samoa",
  "SM": "San Marino", "ST": "Sao Tome and Principe", "SA": "Saudi Arabia", "SN": "Senegal",
  "SC": "Seychelles", "SL": "Sierra Leone", "SG": "Singapore", "SK": "Slovakia",
  "SI": "Slovenia", "SB": "Solomon Islands", "SO": "Somalia", "ZA": "South Africa",
  "ES": "Spain", "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SZ": "Swaziland",
  "SE": "Sweden", "CH": "Switzerland", "SY": "Syria", "TW": "Taiwan", "TJ": "Tajikistan",
  "TZ": "Tanzania", "TH": "Thailand", "TG": "Togo", "TO": "Tonga", "TT": "Trinidad and Tobago",
  "TN": "Tunisia", "TR": "Turkey", "TM": "Turkmenistan", "TV": "Tuvalu", "UG": "Uganda",
  "UA": "Ukraine", "AE": "United Arab Emirates", "GB": "United Kingdom", "US": "United States",
  "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu", "VE": "Venezuela", "VN": "Vietnam",
  "YE": "Yemen", "ZM": "Zambia", "ZW": "Zimbabwe"
};

const countryCodes = Object.fromEntries(Object.entries(countries).map(([code, name]) => [name, code]));

// --- VISA CATEGORY CONFIG ---
const categoryConfig: Record<string, { label: string; color: string; bg: string; border: string; desc: string }> = {
  VF: { label: 'Visa Free', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'No visa required for entry' },
  VOA: { label: 'Visa on Arrival', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', desc: 'Obtain visa upon arrival at the airport' },
  EV: { label: 'eVisa Required', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Apply for electronic visa before travel' },
  VR: { label: 'Visa Required', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', desc: 'Must obtain visa from embassy before travel' },
  NA: { label: 'Not Admitted', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', desc: 'Entry not permitted with this passport' },
};

const Visa = () => {
  const [passportInput, setPassportInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [result, setResult] = useState<VisaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countryOptions = useMemo(() =>
    Object.values(countries).sort().map(name => <option key={name} value={name} />),
    []
  );

  const handleCheck = async () => {
    setError(null);
    setResult(null);

    const passportName = passportInput.trim();
    const destName = destinationInput.trim();

    if (!passportName || !destName) {
      setError('Please select both passport and destination countries.');
      return;
    }

    const passportCode = countryCodes[passportName];
    const destCode = countryCodes[destName];

    if (!passportCode) { setError(`"${passportName}" is not a valid country.`); return; }
    if (!destCode) { setError(`"${destName}" is not a valid country.`); return; }
    if (passportCode === destCode) { setError('Passport and destination cannot be the same.'); return; }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://rough-sun-2523.fly.dev/${passportCode.toLowerCase()}/${destCode.toLowerCase()}`
      );
      if (!res.ok) throw new Error('API error');
      const data: VisaResult = await res.json();
      setResult(data);
    } catch {
      setError('Failed to fetch visa requirements. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () =>
    window.open('https://wa.me/9856664440?text=Hello, I would like to inquire about visa services.', '_blank');

  const handlePhoneClick = () =>
    window.open('tel:+919856664440', '_self');

  const cat = result ? (categoryConfig[result.category.code] ?? categoryConfig['VR']) : null;

  const visaProcess = [
    { step: 1, title: 'Consultation', description: 'Free consultation to understand your travel requirements and visa type.', icon: Users },
    { step: 2, title: 'Documentation', description: 'Guidance on required documents and assistance with form filling.', icon: FileText },
    { step: 3, title: 'Application', description: 'Submit your application with proper documentation and fees.', icon: CheckCircle },
    { step: 4, title: 'Processing', description: 'Track your application status with live updates throughout.', icon: Clock },
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
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-5">
              Visa Services
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight mb-5">
              Visa Made <span className="gradient-text">Effortless</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mb-8">
              Check visa requirements instantly for any passport–destination pair, then let our experts handle the rest.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" /> 199 passports covered
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" /> Instant results
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" /> Expert assistance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISA CHECKER ── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Checker card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 sticky top-24">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Check Visa Requirements</h2>
                <p className="text-slate-500 text-sm mt-1">Instantly see what you need before you travel.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    🛂 Passport Country
                  </label>
                  <input
                    list="countries-list"
                    value={passportInput}
                    onChange={e => setPassportInput(e.target.value)}
                    placeholder="e.g. India"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    ✈️ Destination Country
                  </label>
                  <input
                    list="countries-list"
                    value={destinationInput}
                    onChange={e => setDestinationInput(e.target.value)}
                    placeholder="e.g. United Arab Emirates"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                <datalist id="countries-list">{countryOptions}</datalist>

                <Button
                  onClick={handleCheck}
                  disabled={isLoading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm gap-2 transition-all shadow-lg shadow-primary/20"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Check Requirements
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Result */}
              {result && cat && (
                <div className={`mt-6 rounded-2xl border ${cat.border} ${cat.bg} p-5 space-y-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        {result.passport.name} → {result.destination.name}
                      </p>
                      <h3 className={`text-lg font-bold font-serif mt-0.5 ${cat.color}`}>
                        {cat.label}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
                    </div>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${cat.bg} border ${cat.border} flex items-center justify-center`}>
                      <span className="text-xl">
                        {result.category.code === 'VF' ? '✅' :
                          result.category.code === 'VOA' ? '🛬' :
                            result.category.code === 'EV' ? '💻' :
                              result.category.code === 'VR' ? '📋' : '🚫'}
                      </span>
                    </div>
                  </div>

                  {result.dur && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Stay up to {result.dur} days
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200/60 flex gap-2">
                    <Button
                      onClick={handleWhatsAppClick}
                      className="flex-1 h-9 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-semibold gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Get Help
                    </Button>
                    <Link to="/plan-trip" className="flex-1">
                      <Button variant="outline" className="w-full h-9 rounded-xl text-xs font-semibold border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary gap-1.5">
                        Plan Trip
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center">
                    Last updated: {new Date(result.last_updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            {/* Right side: process + info */}
            <div className="lg:col-span-7 space-y-8">

              {/* Process steps */}
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] tracking-widest uppercase mb-3">
                    How It Works
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Our Visa Application Process</h2>
                  <p className="text-slate-500 text-sm mt-1">Simple, transparent, and efficient in 4 easy steps.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {visaProcess.map((p) => (
                    <div key={p.step} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Step {p.step}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category legend */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Visa Category Guide</h3>
                <div className="space-y-2.5">
                  {Object.entries(categoryConfig).map(([code, cfg]) => (
                    <div key={code} className={`flex items-center gap-3 p-3 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                      <span className="text-base">
                        {code === 'VF' ? '✅' : code === 'VOA' ? '🛬' : code === 'EV' ? '💻' : code === 'VR' ? '📋' : '🚫'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold ${cfg.color}`}>{cfg.label}</p>
                        <p className="text-[10px] text-slate-500 leading-tight">{cfg.desc}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${cfg.border} ${cfg.color} ${cfg.bg}`}>{code}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="relative overflow-hidden bg-primary rounded-3xl p-7 sm:p-8">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                </div>
                <div className="relative">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Expert Help</p>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">Need visa assistance?</h3>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">
                    Our visa experts guide you through every document, form, and embassy requirement.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handlePhoneClick}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      +91 98566 64440
                    </button>
                    <button
                      onClick={handleWhatsAppClick}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp Us
                    </button>
                    <Link to="/plan-trip">
                      <button className="flex items-center gap-2 bg-white text-primary hover:bg-white/90 rounded-xl px-4 py-2.5 text-xs font-bold transition-all">
                        Free Consultation
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visa;