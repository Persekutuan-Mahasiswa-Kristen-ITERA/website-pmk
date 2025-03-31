
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CrudTable } from '@/components/admin/CrudTable';
import { useToast } from '@/hooks/use-toast';

interface Dokumentasi {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: string;
  gambar: string;
}

const DokumentasiAdmin = () => {
  const { toast } = useToast();
  const [dokumentasi, setDokumentasi] = useState<Dokumentasi[]>([
    {
      id: '1',
      judul: 'Retreat PMK ITERA 2023',
      deskripsi: 'Dokumentasi kegiatan retreat tahunan PMK ITERA yang diadakan di Bogor pada Juli 2023.',
      tanggal: '2023-07-28',
      kategori: 'Retreat',
      gambar: 'https://images.unsplash.com/photo-1495602787267-96ab76127c2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '2',
      judul: 'Ibadah Natal PMK ITERA 2022',
      deskripsi: 'Dokumentasi Ibadah Natal PMK ITERA yang diadakan pada Desember 2022.',
      tanggal: '2022-12-23',
      kategori: 'Ibadah',
      gambar: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
  ]);

  const handleAdd = (data: Partial<Dokumentasi>) => {
    const newDokumentasi = {
      ...data,
      id: Date.now().toString(),
    } as Dokumentasi;
    
    setDokumentasi([...dokumentasi, newDokumentasi]);
    toast({
      title: "Berhasil menambahkan dokumentasi",
      description: `Dokumentasi "${data.judul}" telah ditambahkan`,
    });
  };

  const handleEdit = (id: string, data: Partial<Dokumentasi>) => {
    setDokumentasi(
      dokumentasi.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    toast({
      title: "Berhasil mengubah dokumentasi",
      description: `Dokumentasi "${data.judul}" telah diperbarui`,
    });
  };

  const handleDelete = (id: string) => {
    setDokumentasi(dokumentasi.filter((item) => item.id !== id));
    toast({
      title: "Berhasil menghapus dokumentasi",
      description: "Dokumentasi telah dihapus",
    });
  };

  const fields = [
    { name: 'judul', label: 'Judul', type: 'text' as const },
    { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' as const },
    { name: 'tanggal', label: 'Tanggal', type: 'date' as const },
    { name: 'kategori', label: 'Kategori', type: 'text' as const },
    { name: 'gambar', label: 'Gambar', type: 'image' as const },
  ];

  return (
    <AdminLayout>
      <CrudTable
        title="Dokumentasi"
        data={dokumentasi}
        fields={fields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
      />
    </AdminLayout>
  );
};

export default DokumentasiAdmin;
