import { useState } from 'react';
import Select from 'react-select';
import airports from '../data/airports.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane, Loader2, X, Users, Briefcase } from 'lucide-react';
import axios from 'axios';

interface MultiCityLeg {
  from: { label: string; value: string } | null;
  to: { label: string; value: string } | null;
  departureDate: string;
}

interface FlightOffer {
  id: string;
  itineraries: Array<{
    duration: string;
    segments: Array<{
      carrierCode: string;
      number: string;
      departure: { iataCode: string; at: string };
      arrival: { iataCode: string; terminal?: string; at: string };
      duration: string;
    }>;
  }>;
  price: { total: string; currency: string };
  travelerPricings: Array<{
    fareDetailsBySegment: Array<{
      includedCheckedBags: { weight: number; weightUnit: string };
      cabin: string;
    }>;
  }>;
}

// Map carrier codes to airline names
const airlineMap: { [key: string]: string } = {
  AI: 'Air India',
  UK: 'Vistara',
  "6E": 'IndiGo',
  SG: 'SpiceJet',
  G8: 'GoAir',
  // Add more mappings as needed
};

const travelClasses = [
  { label: 'Economy', value: 'ECONOMY' },
  { label: 'Premium Economy', value: 'PREMIUM_ECONOMY' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'First', value: 'FIRST' },
];

const Flights = () => {
  const [tripType, setTripType] = useState<'round-trip' | 'one-way' | 'multi-city'>('round-trip');
  const [from, setFrom] = useState<{ label: string; value: string } | null>(null);
  const [to, setTo] = useState<{ label: string; value: string } | null>(null);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState<number>(1);
  const [travelClass, setTravelClass] = useState<string>('ECONOMY');
  const [multiCityLegs, setMultiCityLegs] = useState<MultiCityLeg[]>([
    { from: null, to: null, departureDate: '' },
  ]);
  const [results, setResults] = useState<FlightOffer[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getAmadeusToken = async () => {
    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: import.meta.env.VITE_AMADEUS_API_KEY,
          client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return response.data.access_token;
    } catch (err) {
      throw new Error('Failed to authenticate with Amadeus API');
    }
  };

  const handleSearch = async () => {
    setError('');
    setLoading(true);

    try {
      const token = await getAmadeusToken();
      const headers = { Authorization: `Bearer ${token}` };

      if (tripType === 'multi-city') {
        if (multiCityLegs.some(leg => !leg.from || !leg.to || !leg.departureDate)) {
          setError('Please fill in all fields for multi-city legs.');
          setLoading(false);
          return;
        }
        if (adults < 1 || adults > 4) {
          setError('Please select 1 to 4 adult passengers.');
          setLoading(false);
          return;
        }
        if (!travelClasses.some(cls => cls.value === travelClass)) {
          setError('Please select a valid travel class.');
          setLoading(false);
          return;
        }

        const multiCityResults: FlightOffer[] = [];
        for (const leg of multiCityLegs) {
          const params = {
            originLocationCode: leg.from!.value,
            destinationLocationCode: leg.to!.value,
            departureDate: leg.departureDate,
            adults,
            travelClass,
            nonStop: false,
            currencyCode: 'INR',
            max: 2,
          };
          const res = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            headers,
            params,
          });
          multiCityResults.push(...(res.data.data || []));
        }
        setResults(multiCityResults);
      } else {
        if (!from || !to || !departureDate) {
          setError('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        if (tripType === 'round-trip' && !returnDate) {
          setError('Please select a return date for round-trip.');
          setLoading(false);
          return;
        }
        if (adults < 1 || adults > 4) {
          setError('Please select 1 to 4 adult passengers.');
          setLoading(false);
          return;
        }
        if (!travelClasses.some(cls => cls.value === travelClass)) {
          setError('Please select a valid travel class.');
          setLoading(false);
          return;
        }

        const params: any = {
          originLocationCode: from.value,
          destinationLocationCode: to.value,
          departureDate: departureDate,
          adults,
          travelClass,
          nonStop: false,
          currencyCode: 'INR',
          max: 5,
        };
        if (tripType === 'round-trip') params.returnDate = returnDate;

        const res = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
          headers,
          params,
        });
        setResults(res.data.data || []);
      }
    } catch (err) {
      setError('Failed to fetch flight data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMultiCityLeg = () => {
    setMultiCityLegs([...multiCityLegs, { from: null, to: null, departureDate: '' }]);
  };

  const removeMultiCityLeg = (index: number) => {
    if (multiCityLegs.length > 1) {
      setMultiCityLegs(multiCityLegs.filter((_, i) => i !== index));
    }
  };

  const updateMultiCityLeg = (index: number, field: keyof MultiCityLeg, value: any) => {
    setMultiCityLegs(prev =>
      prev.map((leg, i) => (i === index ? { ...leg, [field]: value } : leg))
    );
  };

  const formatDuration = (duration: string) => {
    if (!duration) return '';
    const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1];
    const minutes = match[2] || '0';
    return `${hours}h ${minutes.padStart(2, '0')}m`;
  };

  const resetForm = () => {
    setFrom(null);
    setTo(null);
    setDepartureDate('');
    setReturnDate('');
    setAdults(1);
    setTravelClass('ECONOMY');
    setMultiCityLegs([{ from: null, to: null, departureDate: '' }]);
    setResults([]);
    setError('');
  };

  const handleTabChange = (value: string) => {
    resetForm();
    setTripType(value as 'round-trip' | 'one-way' | 'multi-city');
  };

  const renderFlightInputs = (isMultiCity: boolean = false, index: number | null = null) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">
            {isMultiCity ? `From (Leg ${index! + 1})` : 'From'}
          </Label>
          <Select
            options={airports}
            value={isMultiCity ? multiCityLegs[index!].from : from}
            onChange={isMultiCity ? (val) => updateMultiCityLeg(index!, 'from', val) : setFrom}
            placeholder="Select departure airport"
            getOptionLabel={(e) => `${e.label} (${e.value})`}
            className="border border-gray-200 rounded-md shadow-sm"
            classNamePrefix="select"
            styles={{
              control: (base) => ({
                ...base,
                height: '3rem',
                borderColor: '#e5e7eb',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                '&:hover': { borderColor: '#2563eb' },
              }),
              menu: (base) => ({
                ...base,
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }),
            }}
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">
            {isMultiCity ? `To (Leg ${index! + 1})` : 'To'}
          </Label>
          <Select
            options={airports}
            value={isMultiCity ? multiCityLegs[index!].to : to}
            onChange={isMultiCity ? (val) => updateMultiCityLeg(index!, 'to', val) : setTo}
            placeholder="Select destination airport"
            getOptionLabel={(e) => `${e.label} (${e.value})`}
            className="border border-gray-200 rounded-md shadow-sm"
            classNamePrefix="select"
            styles={{
              control: (base) => ({
                ...base,
                height: '3rem',
                borderColor: '#e5e7eb',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                '&:hover': { borderColor: '#2563eb' },
              }),
              menu: (base) => ({
                ...base,
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }),
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">
            {isMultiCity ? `Departure Date (Leg ${index! + 1})` : 'Departure Date'}
          </Label>
          <input
            type="date"
            className="w-full h-12 px-4 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
            value={isMultiCity ? multiCityLegs[index!].departureDate : departureDate}
            onChange={(e) =>
              isMultiCity
                ? updateMultiCityLeg(index!, 'departureDate', e.target.value)
                : setDepartureDate(e.target.value)
            }
          />
        </div>
        {!isMultiCity && tripType === 'round-trip' && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Return Date</Label>
            <input
              type="date"
              className="w-full h-12 px-4 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}
        <div>
          <Label className="text-sm font-medium text-gray-700">Passengers</Label>
          <div className="relative">
            <select
              className="w-full h-12 px-4 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 appearance-none bg-white"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>
                  {num} Adult{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Class</Label>
          <div className="relative">
            <select
              className="w-full h-12 px-4 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 appearance-none bg-white"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              {travelClasses.map(cls => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
            <Briefcase className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
      {isMultiCity && multiCityLegs.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 flex items-center"
          onClick={() => removeMultiCityLeg(index!)}
        >
          <X className="w-4 h-4 mr-1" /> Remove Leg
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <section className="py-8 sm:py-12 container mx-auto px-4 sm:px-6">
        <Card className="shadow-md border-none rounded-xl max-w-4xl mx-auto bg-white transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-2xl sm:text-3xl font-serif text-primary">
              Search Flights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6">
            {error && (
              <div className="text-red-500 text-center text-sm font-medium animate-fade-in">
                {error}
              </div>
            )}
            <Tabs
              value={tripType}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 rounded-lg bg-gray-100 p-1 mb-6">
                <TabsTrigger
                  value="round-trip"
                  className="rounded-md text-gray-700 font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Round Trip
                </TabsTrigger>
                <TabsTrigger
                  value="one-way"
                  className="rounded-md text-gray-700 font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
                >
                  One Way
                </TabsTrigger>
                <TabsTrigger
                  value="multi-city"
                  className="rounded-md text-gray-700 font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Multi City
                </TabsTrigger>
              </TabsList>
              <TabsContent value="round-trip" className="animate-fade-in">
                {renderFlightInputs()}
              </TabsContent>
              <TabsContent value="one-way" className="animate-fade-in">
                {renderFlightInputs()}
              </TabsContent>
              <TabsContent value="multi-city" className="animate-fade-in">
                {multiCityLegs.map((_, index) => (
                  <div key={index} className="space-y-4 mb-6 border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-700">Leg {index + 1}</h3>
                    </div>
                    {renderFlightInputs(true, index)}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary hover:bg-blue-50 transition-colors duration-200"
                  onClick={addMultiCityLeg}
                >
                  + Add Another Leg
                </Button>
              </TabsContent>
            </Tabs>
            <Button
              size="lg"
              className="w-full flex items-center justify-center bg-primary hover:bg-primary text-white rounded-md h-12 font-medium disabled:bg-primary disabled:cursor-not-allowed transition-all duration-200"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Plane className="w-5 h-5 mr-2" />
                  Search Flights
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 animate-fade-in">
            {results.map((f, i) => {
              const totalPrice = parseFloat(f.price?.total || '0');
              const perPassengerPrice = adults > 0 ? totalPrice / adults : totalPrice;
              const firstSegment = f.itineraries?.[0]?.segments?.[0];
              const cabin = f.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || travelClass;
              const airlineName = firstSegment ? airlineMap[firstSegment.carrierCode] || firstSegment.carrierCode : '';
              return (
                <Card
                  key={i}
                  className="shadow-sm border-gray-200 rounded-lg bg-white hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    {f.itineraries?.map((itinerary, idx) => {
                      const firstSegment = itinerary.segments?.[0];
                      const lastSegment = itinerary.segments?.slice(-1)?.[0];
                      if (!firstSegment || !lastSegment) return null;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                              {airlineName} ({firstSegment.carrierCode}) {firstSegment.number}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {idx === 0 ? 'Outbound' : 'Return'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {firstSegment.departure?.iataCode} → {lastSegment.arrival?.iataCode}
                            {lastSegment.arrival?.terminal && ` (Terminal ${lastSegment.arrival.terminal})`}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {new Date(firstSegment.departure?.at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })} –{' '}
                            {new Date(lastSegment.arrival?.at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })} | {formatDuration(itinerary.duration)}
                          </p>
                        </div>
                      );
                    })}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-primary">
                          ₹{totalPrice.toLocaleString('en-IN')} <span className="text-sm font-normal">Total</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Baggage:{' '}
                          {f.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.includedCheckedBags?.weight || 0} kg
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">Class: {travelClasses.find(cls => cls.value === cabin)?.label || cabin}</p>
                      {adults > 1 && (
                        <p className="text-sm text-gray-600">
                          ₹{perPassengerPrice.toLocaleString('en-IN')} per passenger ({adults} adults)
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary text-white rounded-md h-10 text-sm font-medium transition-colors duration-200"
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Flights;