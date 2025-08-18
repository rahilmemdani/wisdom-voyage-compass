import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Globe, Clock, CreditCard, MapPin, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface VisaRequirement {
  passport_of: string;
  passport_code: string;
  destination: string;
  continent: string;
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
}

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'TR', name: 'Turkey' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
  { code: 'TH', name: 'Thailand' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'LK', name: 'Sri Lanka' },
].sort((a, b) => a.name.localeCompare(b.name));

const VisaChecker = () => {
  const [passportCountry, setPassportCountry] = useState<string>('');
  const [destinationCountry, setDestinationCountry] = useState<string>('');
  const [visaRequirement, setVisaRequirement] = useState<VisaRequirement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const getVisaColorVariant = (color: string) => {
    switch (color.toLowerCase()) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'red':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const checkVisaRequirement = async () => {
    if (!passportCountry || !destinationCountry) {
      setError('Please select both passport and destination countries');
      return;
    }

    setLoading(true);
    setError('');
    setVisaRequirement(null);

    try {
      const { data, error } = await supabase.functions.invoke('visa-requirement', {
        body: {
          passport: passportCountry,
          destination: destinationCountry,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error('Failed to fetch visa requirements');
      }

      setVisaRequirement(data);
    } catch (err) {
      console.error('Error checking visa requirement:', err);
      setError(err instanceof Error ? err.message : 'Failed to check visa requirements');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Visa Requirement Checker
          </CardTitle>
          <p className="text-muted-foreground">
            Check visa requirements between any two countries instantly
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Your Passport Country</label>
              <Select value={passportCountry} onValueChange={setPassportCountry}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select your passport country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Destination Country</label>
              <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select destination country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={checkVisaRequirement} 
            disabled={loading || !passportCountry || !destinationCountry}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking Requirements...
              </>
            ) : (
              'Check Visa Requirements'
            )}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {visaRequirement && (
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">
              Visa Requirement Result
            </CardTitle>
            <p className="text-muted-foreground">
              From {visaRequirement.passport_of} to {visaRequirement.destination}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <Badge 
                className={`text-lg px-6 py-2 font-semibold border ${getVisaColorVariant(visaRequirement.color)}`}
              >
                {visaRequirement.visa}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm text-primary">Maximum Stay</div>
                  <div className="text-muted-foreground">{visaRequirement.stay_of}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm text-primary">Capital</div>
                  <div className="text-muted-foreground">{visaRequirement.capital}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm text-primary">Currency</div>
                  <div className="text-muted-foreground">{visaRequirement.currency}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Passport Validity Required</h4>
                <p className="text-muted-foreground">{visaRequirement.pass_valid}</p>
              </div>

              {visaRequirement.except_text && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Notes</h4>
                  <p className="text-blue-700">{visaRequirement.except_text}</p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {visaRequirement.link && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(visaRequirement.link, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Online
                </Button>
              )}

              {visaRequirement.embassy && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(visaRequirement.embassy, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Embassy Information
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisaChecker;