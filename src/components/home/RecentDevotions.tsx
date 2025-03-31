
import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';

// Sample devotions data
const DEVOTIONS = [
  {
    id: 1,
    title: 'Kasih yang Tidak Berkesudahan',
    verse: 'Yeremia 31:3',
    preview: 'TUHAN menampakkan diri dari jauh kepada umat-Nya: "Aku mengasihi engkau dengan kasih yang kekal, sebab itu Aku melanjutkan kasih setia-Ku kepadamu."',
    content: 'Dalam perikop ini, kita diingatkan bahwa kasih Allah kepada kita adalah kasih yang kekal...',
    date: '5 Juli 2023',
    author: 'Pdt. Samuel Wijaya'
  },
  {
    id: 2,
    title: 'Bertumbuh dalam Pengenalan akan Kristus',
    verse: '2 Petrus 3:18',
    preview: 'Tetapi bertumbuhlah dalam kasih karunia dan dalam pengenalan akan Tuhan dan Juruselamat kita, Yesus Kristus. Bagi-Nya kemuliaan, sekarang dan sampai selama-lamanya.',
    content: 'Petrus mengakhiri suratnya dengan nasihat agar kita terus bertumbuh dalam kasih karunia...',
    date: '3 Juli 2023',
    author: 'Pdt. Maria Handoko'
  },
  {
    id: 3,
    title: 'Menghadapi Tantangan dengan Iman',
    verse: 'Yakobus 1:2-4',
    preview: 'Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan.',
    content: 'Yakobus memberikan perspektif yang berbeda tentang pencobaan yang kita hadapi...',
    date: '1 Juli 2023',
    author: 'Ev. Daniel Susanto'
  }
];

export const RecentDevotions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Renungan Terbaru" 
          subtitle="Penguatan iman melalui perenungan firman Tuhan"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEVOTIONS.map((devotion) => (
            <Card key={devotion.id} className="border-brown-100 transition-all duration-300 hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-5 w-5 text-brown-400 mr-2" />
                  <span className="text-sm text-brown-500">{devotion.verse}</span>
                </div>
                <h3 className="text-xl font-serif text-brown-800 mb-2">{devotion.title}</h3>
                <div className="bible-verse text-sm">
                  "{devotion.preview}"
                </div>
                <div className="flex justify-between items-center text-sm text-brown-500 mt-4">
                  <span>{devotion.author}</span>
                  <span>{devotion.date}</span>
                </div>
                <Button 
                  asChild 
                  variant="ghost" 
                  className="w-full justify-between mt-4 text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0"
                >
                  <Link to={`/renungan/${devotion.id}`} className="flex items-center w-full pt-3 pb-1">
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-brown-300 text-brown-700 hover:bg-brown-50">
            <Link to="/renungan">Lihat Semua Renungan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
