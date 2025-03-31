
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PengurusData = {
  id: number;
  name: string;
  position: string;
  department: string;
  image?: string;
  description: string;
};

const PENGURUS_DATA: PengurusData[] = [
  {
    id: 1,
    name: "David Simanjuntak",
    position: "Ketua",
    department: "Pengurus Inti",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Teknik Sipil angkatan 2020, memimpin PMK ITERA sejak 2022 dengan fokus pada pertumbuhan spiritual anggota."
  },
  {
    id: 2,
    name: "Maria Hutapea",
    position: "Wakil Ketua",
    department: "Pengurus Inti",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Arsitektur angkatan 2020, aktif dalam mengorganisir kegiatan PMK dan mengelola koordinasi antar divisi."
  },
  {
    id: 3,
    name: "Jonathan Silalahi",
    position: "Sekretaris",
    department: "Pengurus Inti",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Teknik Informatika angkatan 2021, bertanggung jawab atas administrasi dan dokumentasi persekutuan."
  },
  {
    id: 4,
    name: "Grace Simatupang",
    position: "Bendahara",
    department: "Pengurus Inti",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Akuntansi angkatan 2021, mengelola keuangan PMK ITERA dengan transparansi dan akuntabilitas."
  },
  {
    id: 5,
    name: "Samuel Pakpahan",
    position: "Koordinator",
    department: "Divisi Kerohanian",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Teknik Fisika angkatan 2020, mengkoordinasikan kegiatan ibadah dan pemuridan di PMK ITERA."
  },
  {
    id: 6,
    name: "Debora Hutabarat",
    position: "Koordinator",
    department: "Divisi Perlengkapan",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Teknik Lingkungan angkatan 2022, bertanggung jawab atas perlengkapan kegiatan PMK ITERA."
  },
  {
    id: 7,
    name: "Daniel Panjaitan",
    position: "Koordinator",
    department: "Divisi Acara",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Teknik Mesin angkatan 2021, kreatif dalam merancang dan mengelola berbagai acara PMK."
  },
  {
    id: 8,
    name: "Ruth Nainggolan",
    position: "Koordinator",
    department: "Divisi Publikasi",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Mahasiswa Desain Komunikasi Visual angkatan 2022, mengelola media sosial dan publikasi PMK ITERA."
  }
];

const Pengurus = () => {
  // Group pengurus by department
  const groupedPengurus = PENGURUS_DATA.reduce((acc, curr) => {
    if (!acc[curr.department]) {
      acc[curr.department] = [];
    }
    acc[curr.department].push(curr);
    return acc;
  }, {} as Record<string, PengurusData[]>);

  return (
    <MainLayout>
      <div className="bg-brown-100 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">
            Pengurus PMK ITERA
          </h1>
          <p className="text-center text-brown-600 mt-4 max-w-2xl mx-auto">
            Mengenal lebih dekat para pengurus yang melayani di Persekutuan Mahasiswa Kristen ITERA periode 2023-2024
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {Object.entries(groupedPengurus).map(([department, members]) => (
            <div key={department} className="mb-16">
              <SectionHeader 
                title={department} 
                subtitle={`Tim ${department} PMK ITERA`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map((pengurus) => (
                  <Card key={pengurus.id} className="border-brown-100 hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-32 w-32 mb-4">
                          <AvatarImage src={pengurus.image} alt={pengurus.name} />
                          <AvatarFallback className="bg-brown-200 text-brown-700 text-xl">
                            {pengurus.name.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-serif text-brown-800">{pengurus.name}</h3>
                        <p className="text-brown-700 font-medium">{pengurus.position}</p>
                        <p className="text-brown-500 text-sm mb-4">{pengurus.department}</p>
                        <p className="text-brown-600 text-sm">{pengurus.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Pengurus;
