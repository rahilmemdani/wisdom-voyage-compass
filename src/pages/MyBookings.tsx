import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface Booking {
  bookingId: string;
  email: string;
}

interface FlightOrder {
  id: string;
  flightOffers: Array<{
    itineraries: Array<{
      segments: Array<{
        carrierCode: string;
        number: string;
        departure: { iataCode: string; at: string };
        arrival: { iataCode: string; terminal?: string; at: string };
        duration: string;
      }>;
      duration: string;
    }>;
    price: { total: string; currency: string };
  }>;
  travelers: Array<{
    id: string;
    name: { firstName: string; lastName: string };
    contact: { emailAddress: string };
  }>;
}

const airlineMap: { [key: string]: string } = {
  AI: 'Air India',
  UK: 'Vistara',
  '6E': 'IndiGo',
  SG: 'SpiceJet',
  G8: 'GoAir',
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<FlightOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ title: string; description: string; open: boolean; variant?: 'default' | 'destructive' }>({
    title: '',
    description: '',
    open: false,
  });

  useEffect(() => {
    // Load bookings from local storage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    console.log("storedBookings", storedBookings)
    setBookings(storedBookings);
  }, []);

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

  const fetchFlightOrder = async (orderId: string) => {
    try {
      const token = await getAmadeusToken();
      const response = await axios.get(`https://test.api.amadeus.com/v1/booking/flight-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.errors?.[0]?.detail || 'Failed to fetch booking details.');
    }
  };

  const handleViewBooking = async (bookingId: string) => {
    // Validate bookingId
    if (!bookingId || typeof bookingId !== 'string') {
      setError('Invalid booking ID.');
      setToast({
        title: 'Error',
        description: 'Invalid booking ID. Please try again.',
        open: true,
        variant: 'destructive',
      });
      return;
    }

    setError('');
    setLoading(true);
    setSelectedBooking(null);

    try {
      const flightOrderData = await fetchFlightOrder(bookingId); // Use the bookingId parameter
      setSelectedBooking(flightOrderData);
      setToast({
        title: 'Booking Details Loaded',
        description: 'Booking details retrieved successfully.',
        open: true,
        variant: 'default',
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch booking details. Please try again.';
      setError(errorMessage);
      setToast({
        title: 'Error',
        description: errorMessage,
        open: true,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return '';
    const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1];
    const minutes = match[2] || '0';
    return `${hours}h ${minutes.padStart(2, '0')}m`;
  };

  const getStopsInfo = (segments: FlightOrder['flightOffers'][0]['itineraries'][0]['segments']) => {
    const stops = segments.length - 1;
    return stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`;
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <section className="py-8 sm:py-12 container mx-auto px-4 sm:px-6">
          <Button
            variant="outline"
            className="mb-6 flex items-center gap-2 text-primary"
            onClick={() => navigate('/flights')}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Flights
          </Button>

          <Card className="max-w-4xl mx-auto border-gray-200 rounded-lg bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-primary">My Bookings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="text-red-500 text-center text-sm font-medium">{error}</div>
              )}

              {bookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found.</p>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Your Bookings</h3>
                  <ul className="space-y-2">
                    {bookings.map((booking, index) => (
                      <li key={index} className="border-b border-gray-200 pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Booking ID: {booking.bookingId}</p>
                            <p className="text-xs text-gray-600">Email: {booking.email}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewBooking(booking.bookingId)}
                            disabled={loading}
                          >
                            {loading ? 'Loading...' : 'View Details'}
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedBooking && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Booking Details</h3>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-800">Booking ID: {selectedBooking.id}</p>
                    <p className="text-sm text-gray-600">
                      Traveler: {selectedBooking.travelers[0].name.firstName} {selectedBooking.travelers[0].name.lastName}
                    </p>
                    <p className="text-sm text-gray-600">Email: {selectedBooking.travelers[0].contact.emailAddress}</p>
                  </div>

                  {selectedBooking.flightOffers.map((offer, index) => {
                    const outboundItinerary = offer.itineraries[0];
                    const returnItinerary = offer.itineraries[1] || null;
                    const outboundFirstSegment = outboundItinerary.segments[0];
                    const outboundLastSegment = outboundItinerary.segments.slice(-1)[0];
                    const returnFirstSegment = returnItinerary?.segments[0];
                    const returnLastSegment = returnItinerary?.segments.slice(-1)[0];
                    const airlineName = airlineMap[outboundFirstSegment.carrierCode] || outboundFirstSegment.carrierCode;
                    const outboundStops = getStopsInfo(outboundItinerary.segments);
                    const returnStops = returnItinerary ? getStopsInfo(returnItinerary.segments) : null;

                    return (
                      <div key={index} className="border-t border-gray-200 pt-4">
                        <p className="font-semibold text-gray-800 text-sm">
                          {airlineName} ({outboundFirstSegment.carrierCode}) {outboundFirstSegment.number}
                        </p>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-800 text-sm">
                              {new Date(outboundFirstSegment.departure.at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                            <span className="text-gray-500 text-sm">→</span>
                            <p className="font-medium text-gray-800 text-sm">
                              {new Date(outboundLastSegment.arrival.at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600">
                            {outboundFirstSegment.departure.iataCode} → {outboundLastSegment.arrival.iataCode}
                            {outboundLastSegment.arrival?.terminal && ` (Terminal ${outboundLastSegment.arrival.terminal})`}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatDuration(outboundItinerary.duration)} • {outboundStops}
                          </p>

                          {returnItinerary && returnFirstSegment && returnLastSegment && (
                            <>
                              <div className="flex items-center gap-2 mt-2">
                                <p className="font-medium text-gray-800 text-sm">
                                  {new Date(returnFirstSegment.departure.at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                                <span className="text-gray-500 text-sm">→</span>
                                <p className="font-medium text-gray-800 text-sm">
                                  {new Date(returnLastSegment.arrival.at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                              <p className="text-xs text-gray-600">
                                {returnFirstSegment.departure.iataCode} → {returnLastSegment.arrival.iataCode}
                                {returnLastSegment.arrival?.terminal && ` (Terminal ${returnLastSegment.arrival.terminal})`}
                              </p>
                              <p className="text-xs text-gray-600">
                                {formatDuration(returnItinerary.duration)} • {returnStops}
                              </p>
                            </>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-2">
                          Total Price: ₹{parseFloat(offer.price.total).toLocaleString('en-IN')}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
        <Footer />
      </div>

      <Toast
        open={toast.open}
        onOpenChange={(open) => setToast({ ...toast, open })}
        className={`border rounded-md shadow-lg p-4 ${
          toast.variant === 'destructive' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-start gap-3">
          {toast.variant === 'destructive' ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
          <div className="flex-1">
            <ToastTitle className={`text-sm font-medium ${toast.variant === 'destructive' ? 'text-red-800' : 'text-gray-800'}`}>
              {toast.title}
            </ToastTitle>
            <ToastDescription className={`text-xs ${toast.variant === 'destructive' ? 'text-red-600' : 'text-gray-600'}`}>
              {toast.description}
            </ToastDescription>
          </div>
          <ToastClose />
        </div>
      </Toast>
      <ToastViewport className="fixed bottom-0 right-0 p-4 w-full max-w-sm" />
    </ToastProvider>
  );
};

export default MyBookings;