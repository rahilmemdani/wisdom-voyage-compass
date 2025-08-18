import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Combobox } from '@headlessui/react';

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

// Replace with your full country list
const countries: { [key: string]: string } = {
  "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "TR": "Turkey", "AE": "United Arab Emirates", "US": "United States"
};

const countryNames = Object.values(countries);
const countryCodes = Object.fromEntries(Object.entries(countries).map(([code, name]) => [name, code]));

const VisaChecker = () => {
  const [passportInput, setPassportInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredCountries = (query: string) =>
    countryNames.filter(name => name.toLowerCase().includes(query.toLowerCase()));

  const handleCheckClick = async () => {
    setError(null);
    setApiResponse(null);

    if (!passportInput || !destinationInput) {
      setError('Please select both passport and destination countries.');
      return;
    }

    const passportCode = countryCodes[passportInput];
    const destinationCode = countryCodes[destinationInput];

    if (!passportCode || !destinationCode) {
      setError('Please select valid countries from the list.');
      return;
    }

    if (passportCode === destinationCode) {
      setError('Passport and destination countries cannot be the same.');
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API call
      const data: ApiResponse = await fetchVisaRequirements(passportCode, destinationCode);
      if (data.error) setError(data.message || 'API returned an error.');
      else setApiResponse(data);
    } catch {
      setError('Failed to fetch visa information.');
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeClasses = (color: string) => {
    const base = 'mt-3 sm:mt-0 text-sm font-bold px-4 py-2 rounded-full';
    switch (color.toLowerCase()) {
      case 'red': return `${base} bg-red-100 text-red-800`;
      case 'green': return `${base} bg-green-100 text-green-800`;
      case 'yellow': return `${base} bg-yellow-100 text-yellow-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  return (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Passport Of</label>
              <Combobox value={passportInput} onChange={setPassportInput}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full px-4 py-3 bg-white border-2 border-red-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-300 shadow-sm hover:shadow-md"
                    placeholder="e.g., Turkey"
                    onChange={(e) => setPassportInput(e.target.value)}
                  />
                  <Combobox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto rounded-lg z-50 border border-gray-200">
                    {filteredCountries(passportInput).map((name) => (
                      <Combobox.Option
                        key={name}
                        value={name}
                        className={({ active }) => `cursor-pointer select-none px-4 py-2 ${active ? 'bg-red-100 text-red-900' : 'text-gray-900'}`}
                      >
                        {name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* Destination Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <Combobox value={destinationInput} onChange={setDestinationInput}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full px-4 py-3 bg-white border-2 border-red-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-300 shadow-sm hover:shadow-md"
                    placeholder="e.g., United Arab Emirates"
                    onChange={(e) => setDestinationInput(e.target.value)}
                  />
                  <Combobox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto rounded-lg z-50 border border-gray-200">
                    {filteredCountries(destinationInput).map((name) => (
                      <Combobox.Option
                        key={name}
                        value={name}
                        className={({ active }) => `cursor-pointer select-none px-4 py-2 ${active ? 'bg-red-100 text-red-900' : 'text-gray-900'}`}
                      >
                        {name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* Check Button */}
            <Button
              onClick={handleCheckClick}
              disabled={isLoading}
              className="md:col-span-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {isLoading ? 'Checking...' : 'Check Requirements'}
            </Button>
          </div>

          {/* Errors / Loading */}
          {error && <div className="mt-6 p-3 rounded-lg bg-red-100 text-red-800 text-center">{error}</div>}
          {isLoading && <div className="mt-6 text-center">Loading...</div>}

          {/* API Response */}
          {apiResponse && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{apiResponse.destination}</h2>
                  <p className="text-gray-500">Visa requirements for <span className="font-semibold">{apiResponse.passport_of}</span> citizens</p>
                </div>
                <div className={getBadgeClasses(apiResponse.color)}>
                  <span>{apiResponse.visa}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Dummy API function for demo
const fetchVisaRequirements = async (passport: string, destination: string): Promise<ApiResponse> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        passport_of: passport,
        destination,
        capital: 'Demo City',
        currency: 'USD',
        pass_valid: '6 months',
        phone_code: '+1',
        timezone: 'GMT+0',
        except_text: '',
        visa: 'Visa Free',
        color: 'green',
        stay_of: '90 days',
        link: '#',
        embassy: '#',
        error: false,
      });
    }, 1000)
  );
};

export default VisaChecker;
