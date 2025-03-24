
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const Hero = ({ title, subtitle, ctaText, ctaLink, image }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          className={`max-w-2xl text-white transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-medium mb-4">{title}</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">{subtitle}</p>
          <Link to={ctaLink}>
            <Button 
              size="lg" 
              className="rounded-full px-6 py-6 bg-white text-black hover:bg-gray-100 text-sm group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
