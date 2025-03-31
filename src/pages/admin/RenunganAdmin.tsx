
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CrudTable } from '@/components/admin/CrudTable';
import { useToast } from '@/hooks/use-toast';

interface Renungan {
  id: string;
  judul: string;
  ayat: string;
  isi: string;
  tanggal: string;
  penulis: string;
  gambar: string;
}

const RenunganAdmin = () => {
  const { toast } = useToast();
  const [renungan, setRenungan] = useState<Renungan[]>([
    {
      id: '1',
      judul: 'Kasih yang Tak Berkesudahan',
      ayat: 'Yeremia 31:3',
      isi: 'Tuhan telah menampakkan diri dari jauh kepadaku: "Aku mengasihi engkau dengan kasih yang kekal, sebab itu Aku melanjutkan kasih setia-Ku kepadamu."',
      tanggal: '2023-07-15',
      penulis: 'Pdt. John Doe',
      gambar: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '2',
      judul: 'Iman yang Teguh',
      ayat: 'Ibrani 11:1',
      isi: 'Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.',
      tanggal: '2023-08-20',
      penulis: 'Pdt. Jane Smith',
      gambar: 'https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    },
  ]);

  const handleAdd = (data: Partial<Renungan>) => {
    const newRenungan = {
      ...data,
      id: Date.now().toString(),
    } as Renungan;
    
    setRenungan([...renungan, newRenungan]);
    toast({
      title: "Berhasil menambahkan renungan",
      description: `Renungan "${data.judul}" telah ditambahkan`,
    });
  };

  const handleEdit = (id: string, data: Partial<Renungan>) => {
    setRenungan(
      renungan.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    toast({
      title: "Berhasil mengubah renungan",
      description: `Renungan "${data.judul}" telah diperbarui`,
    });
  };

  const handleDelete = (id: string) => {
    setRenungan(renungan.filter((item) => item.id !== id));
    toast({
      title: "Berhasil menghapus renungan",
      description: "Renungan telah dihapus",
    });
  };

  const fields = [
    { name: 'judul', label: 'Judul', type: 'text' as const },
    { name: 'ayat', label: 'Ayat', type: 'text' as const },
    { name: 'isi', label: 'Isi', type: 'textarea' as const },
    { name: 'tanggal', label: 'Tanggal', type: 'date' as const },
    { name: 'penulis', label: 'Penulis', type: 'text' as const },
    { name: 'gambar', label: 'Gambar', type: 'image' as const },
  ];

  return (
    <AdminLayout>
      <CrudTable
        title="Renungan"
        data={renungan}
        fields={fields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
      />
    </AdminLayout>
  );
};

export default RenunganAdmin;
