import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeroSection from './components/HeroSection';
import ChildBenefitsSection from './components/ChildBenefitsSection';
import ServicesSection from './components/ServicesSection';
import CompaniesSection from './components/CompaniesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';

const queryClient = new QueryClient();

// Homepage component
function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <ServicesSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover transform rotate-180"
        />
      </div>
      
      <ChildBenefitsSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CompaniesSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover transform rotate-180"
        />
      </div>
      
      <ContactSection />
      <Footer />
    </div>
  );
}

// Create routes
const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanel,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
