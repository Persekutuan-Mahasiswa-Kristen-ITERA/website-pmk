
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative bg-brown-100 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3072&h=2048&q=80')",
            filter: "brightness(0.4)" 
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Persekutuan Mahasiswa Kristen ITERA
          </h1>
          <p className="mt-6 text-xl text-gray-200">
            Bertumbuh bersama dalam kasih Kristus di tengah kehidupan perkuliahan
          </p>
          <div className="bible-verse mt-8 border-white/30 text-white/90">
            "Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka."
            <span className="block mt-1 text-sm">— Matius 18:20</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              asChild
              className="bg-brown-700 hover:bg-brown-800 text-white shadow-lg"
              size="lg"
            >
              <Link to="/profil">Tentang Kami</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 shadow-lg"
              size="lg"
            >
              <Link to="/persembahan">Persembahan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
