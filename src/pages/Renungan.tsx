
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

type RenunganData = {
  id: number;
  title: string;
  verse: string;
  preview: string;
  content: string;
  date: string;
  author: string;
  category: string;
};

const RENUNGAN_DATA: RenunganData[] = [
  {
    id: 1,
    title: 'Kasih yang Tidak Berkesudahan',
    verse: 'Yeremia 31:3',
    preview: 'TUHAN menampakkan diri dari jauh kepada umat-Nya: "Aku mengasihi engkau dengan kasih yang kekal, sebab itu Aku melanjutkan kasih setia-Ku kepadamu."',
    content: 'Dalam perikop ini, kita diingatkan bahwa kasih Allah kepada kita adalah kasih yang kekal...',
    date: '5 Juli 2023',
    author: 'Pdt. Samuel Wijaya',
    category: 'Kasih'
  },
  {
    id: 2,
    title: 'Bertumbuh dalam Pengenalan akan Kristus',
    verse: '2 Petrus 3:18',
    preview: 'Tetapi bertumbuhlah dalam kasih karunia dan dalam pengenalan akan Tuhan dan Juruselamat kita, Yesus Kristus. Bagi-Nya kemuliaan, sekarang dan sampai selama-lamanya.',
    content: 'Petrus mengakhiri suratnya dengan nasihat agar kita terus bertumbuh dalam kasih karunia...',
    date: '3 Juli 2023',
    author: 'Pdt. Maria Handoko',
    category: 'Pertumbuhan'
  },
  {
    id: 3,
    title: 'Menghadapi Tantangan dengan Iman',
    verse: 'Yakobus 1:2-4',
    preview: 'Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan.',
    content: 'Yakobus memberikan perspektif yang berbeda tentang pencobaan yang kita hadapi...',
    date: '1 Juli 2023',
    author: 'Ev. Daniel Susanto',
    category: 'Iman'
  },
  {
    id: 4,
    title: 'Hidup dalam Pengharapan',
    verse: 'Roma 15:13',
    preview: 'Semoga Allah, sumber pengharapan, memenuhi kamu dengan segala sukacita dan damai sejahtera dalam iman kamu, supaya oleh kekuatan Roh Kudus kamu berlimpah-limpah dalam pengharapan.',
    content: 'Pengharapan Kristen bukanlah sekadar optimisme manusiawi...',
    date: '28 Juni 2023',
    author: 'Pdt. Thomas Sibarani',
    category: 'Pengharapan'
  },
  {
    id: 5,
    title: 'Menjadi Garam dan Terang Dunia',
    verse: 'Matius 5:13-16',
    preview: '"Kamu adalah garam dunia. Jika garam itu menjadi tawar, dengan apakah ia diasinkan? Tidak ada lagi gunanya selain dibuang dan diinjak orang."',
    content: 'Yesus menggunakan dua metafora kuat untuk menggambarkan peran kita sebagai pengikut-Nya...',
    date: '25 Juni 2023',
    author: 'Pdt. Sarah Hutapea',
    category: 'Kesaksian'
  },
  {
    id: 6,
    title: 'Sukacita dalam Penderitaan',
    verse: 'Filipi 1:29',
    preview: 'Sebab kepada kamu dikaruniakan bukan saja untuk percaya kepada Kristus, melainkan juga untuk menderita untuk Dia.',
    content: 'Paulus mengingatkan bahwa menderita karena Kristus adalah suatu hak istimewa...',
    date: '22 Juni 2023',
    author: 'Ev. Daniel Susanto',
    category: 'Sukacita'
  }
];

const CATEGORIES = [
  'Semua',
  'Kasih',
  'Pertumbuhan',
  'Iman',
  'Pengharapan',
  'Kesaksian',
  'Sukacita'
];

const RenunganPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRenungan = RENUNGAN_DATA.filter(renungan => {
    const matchesCategory = selectedCategory === 'Semua' || renungan.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      renungan.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      renungan.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      renungan.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="bg-brown-100 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">
            Renungan
          </h1>
          <p className="text-center text-brown-600 mt-4 max-w-2xl mx-auto">
            Penguatan iman melalui perenungan firman Tuhan sehari-hari
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
                <Input 
                  placeholder="Cari renungan..." 
                  className="pl-10 border-brown-200 focus:border-brown-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Tabs defaultValue="Semua" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="w-full h-auto flex flex-wrap bg-brown-50 p-1">
                  {CATEGORIES.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="flex-grow data-[state=active]:bg-white data-[state=active]:text-brown-800"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRenungan.map(renungan => (
              <Card key={renungan.id} className="border-brown-100 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-5 w-5 text-brown-400 mr-2" />
                    <span className="text-sm text-brown-500">{renungan.verse}</span>
                  </div>
                  <h3 className="text-xl font-serif text-brown-800 mb-2">{renungan.title}</h3>
                  <div className="text-sm text-brown-600 mb-4">
                    "{renungan.preview}"
                  </div>
                  <div className="flex justify-between items-center text-sm text-brown-500 mt-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{renungan.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{renungan.date}</span>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="w-full justify-between mt-4 text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0"
                  >
                    <Link to={`/renungan/${renungan.id}`} className="flex items-center w-full pt-3 pb-1">
                      <span>Baca Selengkapnya</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRenungan.length === 0 && (
            <div className="text-center py-16">
              <p className="text-brown-600">Tidak ada renungan yang sesuai dengan kriteria pencarian.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default RenunganPage;
