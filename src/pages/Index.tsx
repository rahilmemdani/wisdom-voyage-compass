
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PopularDestinations from '@/components/PopularDestinations';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <PopularDestinations />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default Index;
