
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./liceu/fatada_prezent.webp"
          alt="Alexandru Odobescu High School Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Formăm Minți Astăzi pentru
          <br />
          <span className="text-accent">Liderii de Mâine</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light animate-fade-in opacity-90">
          Liceul Alexandru Odobescu combină tradiția cu inovația,
          pregătind elevii pentru un viitor plin de posibilități
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
        <button>Explorează Viziunea Noastră
            <ArrowRight className="ml-2 h-5 w-5" /></button>
            
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
