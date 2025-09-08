import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Users, Phone, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';


// --- TYPE DEFINITION ---
interface ApiResponse {
 passport_of: string;
 destination: string;
 capital: string;
 currency: string;
 pass_valid: string;
 phone_code: string;
 timezone: string;
 except_text: string;
 visa: string;
 color: string;
 stay_of: string;
 link: string;
 embassy: string;
 error: boolean;
 message?: string;
}


// --- DATA CONSTANTS ---
const countries: { [key: string]: string } = {
 "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "AS": "American Samoa", "AD": "Andorra", "AO": "Angola", "AI": "Anguilla", "AQ": "Antarctica", "AG": "Antigua and Barbuda", "AR": "Argentina", "AM": "Armenia", "AW": "Aruba", "AU": "Australia", "AT": "Austria", "AZ": "Azerbaijan", "BS": "Bahamas", "BH": "Bahrain", "BD": "Bangladesh", "BB": "Barbados", "BY": "Belarus", "BE": "Belgium", "BZ": "Belize", "BJ": "Benin", "BM": "Bermuda", "BT": "Bhutan", "BO": "Bolivia", "BA": "Bosnia and Herzegovina", "BW": "Botswana", "BR": "Brazil", "IO": "British Indian Ocean Territory", "BN": "Brunei Darussalam", "BG": "Bulgaria", "BF": "Burkina Faso", "BI": "Burundi", "KH": "Cambodia", "CM": "Cameroon", "CA": "Canada", "CV": "Cape Verde", "KY": "Cayman Islands", "CF": "Central African Republic", "TD": "Chad", "CL": "Chile", "CN": "China", "CX": "Christmas Island", "CC": "Cocos (Keeling) Islands", "CO": "Colombia", "KM": "Comoros", "CG": "Congo", "CD": "Congo, The Democratic Republic of the", "CK": "Cook Islands", "CR": "Costa Rica", "CI": "Cote D'Ivoire", "HR": "Croatia", "CU": "Cuba", "CY": "Cyprus", "CZ": "Czech Republic", "DK": "Denmark", "DJ": "Djibouti", "DM": "Dominica", "DO": "Dominican Republic", "EC": "Ecuador", "EG": "Egypt", "SV": "El Salvador", "GQ": "Equatorial Guinea", "ER": "Eritrea", "EE": "Estonia", "ET": "Ethiopia", "FK": "Falkland Islands (Malvinas)", "FO": "Faroe Islands", "FJ": "Fiji", "FI": "Finland", "FR": "France", "GF": "French Guiana", "PF": "French Polynesia", "GA": "Gabon", "GM": "Gambia", "GE": "Georgia", "DE": "Germany", "GH": "Ghana", "GI": "Gibraltar", "GR": "Greece", "GL": "Greenland", "GD": "Grenada", "GP": "Guadeloupe", "GU": "Guam", "GT": "Guatemala", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana", "HT": "Haiti", "VA": "Holy See (Vatican City State)", "HN": "Honduras", "HK": "Hong Kong", "HU": "Hungary", "IS": "Iceland", "IN": "India", "ID": "Indonesia", "IR": "Iran, Islamic Republic Of", "IQ": "Iraq", "IE": "Ireland", "IL": "Israel", "IT": "Italy", "JM": "Jamaica", "JP": "Japan", "JO": "Jordan", "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati", "KP": "Korea, Democratic People's Republic of", "KR": "Korea, Republic of", "KW": "Kuwait", "KG": "Kyrgyzstan", "LA": "Lao People's Democratic Republic", "LV": "Latvia", "LB": "Lebanon", "LS": "Lesotho", "LR": "Liberia", "LY": "Libyan Arab Jamahiriya", "LI": "Liechtenstein", "LT": "Lithuania", "LU": "Luxembourg", "MO": "Macao", "MK": "Macedonia, The Former Yugoslav Republic of", "MG": "Madagascar", "MW": "Malawi", "MY": "Malaysia", "MV": "Maldives", "ML": "Mali", "MT": "Malta", "MH": "Marshall Islands", "MQ": "Martinique", "MR": "Mauritania", "MU": "Mauritius", "MX": "Mexico", "FM": "Micronesia, Federated States of", "MD": "Moldova, Republic of", "MC": "Monaco", "MN": "Mongolia", "MS": "Montserrat", "MA": "Morocco", "MZ": "Mozambique", "MM": "Myanmar", "NA": "Namibia", "NR": "Nauru", "NP": "Nepal", "NL": "Netherlands", "AN": "Netherlands Antilles", "NC": "New Caledonia", "NZ": "New Zealand", "NI": "Nicaragua", "NE": "Niger", "NG": "Nigeria", "NU": "Niue", "NF": "Norfolk Island", "MP": "Northern Mariana Islands", "NO": "Norway", "OM": "Oman", "PK": "Pakistan", "PW": "Palau", "PS": "Palestinian Territory, Occupied", "PA": "Panama", "PG": "Papua New Guinea", "PY": "Paraguay", "PE": "Peru", "PH": "Philippines", "PL": "Poland", "PT": "Portugal", "PR": "Puerto Rico", "QA": "Qatar", "RE": "Reunion", "RO": "Romania", "RU": "Russian Federation", "RW": "Rwanda", "SH": "Saint Helena", "KN": "Saint Kitts and Nevis", "LC": "Saint Lucia", "PM": "Saint Pierre and Miquelon", "VC": "Saint Vincent and the Grenadines", "WS": "Samoa", "SM": "San Marino", "ST": "Sao Tome and Principe", "SA": "Saudi Arabia", "SN": "Senegal", "SC": "Seychelles", "SL": "Sierra Leone", "SG": "Singapore", "SK": "Slovakia", "SI": "Slovenia", "SB": "Solomon Islands", "SO": "Somalia", "ZA": "South Africa", "ES": "Spain", "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SZ": "Swaziland", "SE": "Sweden", "CH": "Switzerland", "SY": "Syrian Arab Republic", "TW": "Taiwan", "TJ": "Tajikistan", "TZ": "Tanzania, United Republic of", "TH": "Thailand", "TG": "Togo", "TK": "Tokelau", "TO": "Tonga", "TT": "Trinidad and Tobago", "TN": "Tunisia", "TR": "Turkey", "TM": "Turkmenistan", "TC": "Turks and Caicos Islands", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraine", "AE": "United Arab Emirates", "GB": "United Kingdom", "US": "United States", "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu", "VE": "Venezuela", "VN": "Viet Nam", "VG": "Virgin Islands, British", "VI": "Virgin Islands, U.S.", "WF": "Wallis and Futuna", "EH": "Western Sahara", "YE": "Yemen", "ZM": "Zambia", "ZW": "Zimbabwe"
};


const countryCodes = Object.fromEntries(Object.entries(countries).map(([code, name]) => [name, code]));


// --- API SIMULATION ---
export const fetchVisaRequirements = async (
 passportCode: string,
 destinationCode: string
): Promise<ApiResponse> => {
 console.log(`Fetching visa for Passport: ${passportCode}, Destination: ${destinationCode}`);


 const SUPABASE_FUNCTION_URL = 'https://fnqgouwdzgryyyorgvte.supabase.co/functions/v1/visa-requirement';
 const SUPABASE_KEY = 'YOUR_SUPABASE_KEY_HERE'; // replace with your actual Bearer token


 const response = await fetch(SUPABASE_FUNCTION_URL, {
   method: 'POST',
   headers: {
     'Authorization': `Bearer ${SUPABASE_KEY}`,
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     passport: passportCode.toUpperCase(),
     destination: destinationCode.toUpperCase(),
   }),
 });


 if (!response.ok) {
   throw new Error(`API Error: ${response.status} ${response.statusText}`);
 }


 const data: ApiResponse = await response.json();
 if (data.error) {
   throw new Error('API returned an error');
 }


 return data;
};


// --- HELPER COMPONENT for results ---
const DetailItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => {
 const icons: { [key: string]: JSX.Element } = {
   calendar: <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
   building: <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
   phone: <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>,
   cash: <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>,
   clock: <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
 };
 return (
   <div className="flex items-center space-x-3">
     {icons[icon]}
     <div>
       <p className="text-sm text-gray-500">{label}</p>
       <p className="font-semibold">{value || 'N/A'}</p>
     </div>
   </div>
 );
};




const Visa = () => {
 // State and logic from VisaCheckerApp
 const [passportInput, setPassportInput] = useState<string>('');
 const [destinationInput, setDestinationInput] = useState<string>('');
 const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);


 const countryOptions = useMemo(() => {
   return Object.values(countries).map(name => <option key={name} value={name} />);
 }, []);


 const handleCheckClick = async () => {
   setError(null);
   setApiResponse(null);
   const passportName = passportInput.trim();
   const destinationName = destinationInput.trim();


   if (!passportName || !destinationName) {
     setError('Please select both passport and destination countries.');
     return;
   }
   const passportCode = countryCodes[passportName];
   const destinationCode = countryCodes[destinationName];
   if (!passportCode) {
     setError(`"${passportName}" is not a valid country. Please select from the list.`);
     return;
   }
   if (!destinationCode) {
     setError(`"${destinationName}" is not a valid country. Please select from the list.`);
     return;
   }
   if (passportCode === destinationCode) {
     setError('Passport and destination countries cannot be the same.');
     return;
   }


   setIsLoading(true);
   try {
     const data = await fetchVisaRequirements(passportCode, destinationCode);
     if (data.error) {
       setError(data.message || 'An unknown error occurred.');
     } else {
       setApiResponse(data);
     }
   } catch (err) {
     setError('Failed to retrieve visa information. Please try again.');
   } finally {
     setIsLoading(false);
   }
 };


 const getBadgeClasses = (color: string) => {
   const baseClasses = 'mt-3 sm:mt-0 text-sm font-bold px-4 py-2 rounded-full';
   switch (color.toLowerCase()) {
     case 'red': return `${baseClasses} bg-red-100 text-red-800`;
     case 'green': return `${baseClasses} bg-green-100 text-green-800`;
     case 'yellow': return `${baseClasses} bg-yellow-100 text-yellow-800`;
     default: return `${baseClasses} bg-gray-100 text-gray-800`;
   }
 };


 const visaProcess = [
   { step: 1, title: 'Consultation', description: 'Free consultation to understand your travel requirements and visa type', icon: Users },
   { step: 2, title: 'Documentation', description: 'Guidance on required documents and assistance with form filling', icon: FileText },
   { step: 3, title: 'Application', description: 'Submit your application with proper documentation and fees', icon: CheckCircle },
   { step: 4, title: 'Processing', description: 'Track your application status and provide updates throughout', icon: Clock },
 ];


 const handleWhatsAppClick = () => {
   window.open('https://wa.me/1234567890?text=Hello, I would like to inquire about visa services.', '_blank');
 };


 return (
   <div className="min-h-screen">
     <Header />


     {/* Hero Section */}
     <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80">
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-20" />
       <div className="relative z-10 container mx-auto px-4 text-center text-white">
         <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Visa Services Made Simple</h1>
         <p className="text-xl mb-8 max-w-2xl mx-auto">Professional visa assistance and documentation support for hassle-free international travel</p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">Start Application</Button>
           <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary">Free Consultation</Button>
         </div>
       </div>
     </section>


     {/* Integrated Visa Checker Section */}
     <section className="py-16">
       <div className="container mx-auto px-4">
         <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200">
           <div className="text-center mb-8">
             <h2 className="text-3xl font-serif font-bold text-primary mb-4">Check Visa Requirements Instantly</h2>
             <p className="text-lg text-muted-foreground">Enter your passport and destination to see the visa rules.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
             {/* Passport Input */}
             <div>
               <label htmlFor="passport-input" className="block text-sm font-medium text-gray-700 mb-1">
                 Passport Of
               </label>
               <input
                 list="countries"
                 id="passport-input"
                 value={passportInput}
                 onChange={(e) => setPassportInput(e.target.value)}
                 placeholder="e.g., Türkiye"
                 className="w-full px-4 py-3 bg-white border-2 border-red-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-300 shadow-sm hover:shadow-md"
               />
             </div>


             {/* Destination Input */}
             <div>
               <label htmlFor="destination-input" className="block text-sm font-medium text-gray-700 mb-1">
                 Destination
               </label>
               <input
                 list="countries"
                 id="destination-input"
                 value={destinationInput}
                 onChange={(e) => setDestinationInput(e.target.value)}
                 placeholder="e.g., United Arab Emirates"
                 className="w-full px-4 py-3 bg-white border-2 border-red-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-300 shadow-sm hover:shadow-md"
               />
             </div>


             {/* Country Options for Autocomplete */}
             <datalist id="countries">{countryOptions}</datalist>


             {/* Check Button */}
             <Button
               onClick={handleCheckClick}
               disabled={isLoading}
               className="md:col-span-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
             >
               {isLoading ? 'Checking...' : 'Check Requirements'}
             </Button>
           </div>


           <div className="mt-6 text-center">
             {isLoading && (
               <div className="p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center">
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Checking visa requirements...
               </div>
             )}
             {error && <div className="p-3 rounded-lg bg-red-100 text-red-800">{error}</div>}
           </div>
           {apiResponse && (
             <div className="mt-8">
               <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-[fadeIn_0.5s_ease-in-out]">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
                   <div>
                     <h2 className="text-2xl font-bold text-gray-900">{apiResponse.destination}</h2>
                     <p className="text-gray-500">Visa requirements for <span className="font-semibold">{apiResponse.passport_of}</span> citizens</p>
                   </div>
                   <div className={getBadgeClasses(apiResponse.color)}>
                     <span>{apiResponse.visa}</span>
                   </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                   <DetailItem icon="calendar" label="Passport Validity" value={apiResponse.pass_valid} />
                   <DetailItem icon="building" label="Capital City" value={apiResponse.capital} />
                   <DetailItem icon="phone" label="Phone Code" value={apiResponse.phone_code} />
                   <DetailItem icon="cash" label="Currency" value={apiResponse.currency} />
                   <DetailItem icon="clock" label="Timezone" value={apiResponse.timezone} />
                   {apiResponse.stay_of && <DetailItem icon="calendar" label="Max Stay" value={apiResponse.stay_of} />}
                 </div>
                 {apiResponse.except_text && (
                   <div className="mt-6 pt-4 border-t border-gray-200">
                     <h3 className="font-semibold text-gray-800">Important Notes</h3>
                     <p className="text-sm text-gray-600 mt-2">{apiResponse.except_text}</p>
                   </div>
                 )}
                 <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                   <a href={apiResponse.link} target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 hover:underline">Official Visa Link &rarr;</a>
                   <a href={apiResponse.embassy} target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 hover:underline">Find Embassy &rarr;</a>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </section>


     {/* Visa Process */}
     <section className="py-16 bg-muted/30">
       <div className="container mx-auto px-4">
         <div className="text-center mb-12">
           <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Visa Application Process</h2>
           <p className="text-lg text-muted-foreground">Simple, transparent, and efficient visa processing in 4 easy steps</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {visaProcess.map((process) => (
             <Card key={process.step} className="text-center bg-white shadow-lg">
               <CardContent className="p-8">
                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                   <process.icon className="w-8 h-8 text-white" />
                 </div>
                 <div className="text-2xl font-bold text-accent mb-2">Step {process.step}</div>
                 <h3 className="text-lg font-semibold text-primary mb-3">{process.title}</h3>
                 <p className="text-sm text-muted-foreground">{process.description}</p>
               </CardContent>
             </Card>
           ))}
         </div>
       </div>
     </section>


     {/* Contact Section */}
     <section className="py-16">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto">
           <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
             <CardContent className="p-8">
               <div className="text-center mb-8">
                 <h3 className="text-2xl font-serif font-bold text-primary mb-4">Need Help with Your Visa Application?</h3>
                 <p className="text-muted-foreground">Our visa experts are here to guide you through every step of the process</p>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                 <Card className="bg-white">
                   <CardContent className="p-6 text-center">
                     <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                     <h4 className="font-semibold text-primary mb-2">Call Us</h4>
                     <p className="text-muted-foreground mb-4">Speak with our visa experts</p>
                     <Button variant="outline" className="w-full">+91 98765 43210</Button>
                   </CardContent>
                 </Card>
                 <Card className="bg-white">
                   <CardContent className="p-6 text-center">
                     <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                     <h4 className="font-semibold text-primary mb-2">WhatsApp</h4>
                     <p className="text-muted-foreground mb-4">Quick assistance via WhatsApp</p>
                     <Button variant="outline" className="w-full" onClick={handleWhatsAppClick}>Chat Now</Button>
                   </CardContent>
                 </Card>
               </div>
               <div className="text-center mt-8">
                <Link to="/plan-trip">
                 <Button size="lg" className="bg-primary hover:bg-primary/90">Schedule Free Consultation</Button>
                 </Link>
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
     </section>


     <Footer />
   </div>
 );
};


export default Visa;




