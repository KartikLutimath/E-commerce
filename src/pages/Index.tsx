
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { featuredProducts, isLoading } = useProducts();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero 
        title="Elegance in Simplicity"
        subtitle="Discover our collection of premium, minimalist products designed for modern living."
        ctaText="Shop Collection"
        ctaLink="/products"
        image="https://images.unsplash.com/photo-1491897554428-130a60dd4757?auto=format&fit=crop&w=1500&q=80"
      />

      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div 
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Featured Products</h2>
            <p className="text-muted-foreground">
              Crafted with attention to detail, our featured collection embodies the perfect 
              balance of form and function.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="relative aspect-[4/5] rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <ProductGrid products={featuredProducts} columns={4} />
          )}

          <div className="mt-16 text-center">
            <Link to="/products">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-6 border-black hover:bg-black hover:text-white transition-colors group"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div 
              className={`transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1603251578711-3290ca1a0187?auto=format&fit=crop&w=800&q=80" 
                alt="Craftsmanship" 
                className="rounded-xl shadow-xl"
              />
            </div>
            <div 
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <h3 className="text-sm font-medium uppercase tracking-wider mb-2">Our Philosophy</h3>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Craftsmanship meets innovation</h2>
              <p className="text-gray-600 mb-8">
                We believe that great design should be both beautiful and functional. Our products 
                are created with a focus on simplicity, quality materials, and thoughtful details 
                that enhance everyday life.
              </p>
              <Link to="/about">
                <Button 
                  variant="ghost" 
                  className="rounded-full px-6 group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Categories</h2>
            <p className="text-muted-foreground">
              Explore our thoughtfully curated collections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Link 
              to="/products?category=home" 
              className="relative aspect-square overflow-hidden rounded-xl hover-scale group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80" 
                alt="Home" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-medium mb-2">Home</h3>
                <p className="text-white/80 mb-4">Elevate your living space</p>
                <span className="inline-flex items-center text-sm">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
            
            <Link 
              to="/products?category=electronics" 
              className="relative aspect-square overflow-hidden rounded-xl hover-scale group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" 
                alt="Electronics" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-medium mb-2">Electronics</h3>
                <p className="text-white/80 mb-4">Smart technology, simplified</p>
                <span className="inline-flex items-center text-sm">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
            
            <Link 
              to="/products?category=accessories" 
              className="relative aspect-square overflow-hidden rounded-xl hover-scale group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1623998021661-498d926a7e35?auto=format&fit=crop&w=800&q=80" 
                alt="Accessories" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-medium mb-2">Accessories</h3>
                <p className="text-white/80 mb-4">Complete your look</p>
                <span className="inline-flex items-center text-sm">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Join Our Community</h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter for exclusive offers, new product launches, 
              and design inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <Button
                className="sm:flex-shrink-0 rounded-full bg-white text-black hover:bg-gray-200"
                type="submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
