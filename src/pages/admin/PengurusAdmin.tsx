
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CrudTable } from '@/components/admin/CrudTable';
import { useToast } from '@/hooks/use-toast';

interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  angkatan: string;
  foto: string;
  deskripsi: string;
}

const PengurusAdmin = () => {
  const { toast } = useToast();
  const [pengurus, setPengurus] = useState<Pengurus[]>([
    {
      id: '1',
      nama: 'John Doe',
      jabatan: 'Ketua',
      angkatan: '2020',
      foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      deskripsi: 'Ketua PMK ITERA periode 2023-2024',
    },
    {
      id: '2',
      nama: 'Jane Smith',
      jabatan: 'Wakil Ketua',
      angkatan: '2021',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      deskripsi: 'Wakil Ketua PMK ITERA periode 2023-2024',
    },
  ]);

  const handleAdd = (data: Partial<Pengurus>) => {
    const newPengurus = {
      ...data,
      id: Date.now().toString(),
    } as Pengurus;
    
    setPengurus([...pengurus, newPengurus]);
    toast({
      title: "Berhasil menambahkan data",
      description: `${data.nama} telah ditambahkan sebagai pengurus`,
    });
  };

  const handleEdit = (id: string, data: Partial<Pengurus>) => {
    setPengurus(
      pengurus.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    toast({
      title: "Berhasil mengubah data",
      description: `Data ${data.nama} telah diperbarui`,
    });
  };

  const handleDelete = (id: string) => {
    setPengurus(pengurus.filter((item) => item.id !== id));
    toast({
      title: "Berhasil menghapus data",
      description: "Data pengurus telah dihapus",
    });
  };

  const fields = [
    { name: 'nama', label: 'Nama', type: 'text' as const },
    { name: 'jabatan', label: 'Jabatan', type: 'text' as const },
    { name: 'angkatan', label: 'Angkatan', type: 'text' as const },
    { name: 'foto', label: 'Foto', type: 'image' as const },
    { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' as const },
  ];

  return (
    <AdminLayout>
      <CrudTable
        title="Pengurus"
        data={pengurus}
        fields={fields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
      />
    </AdminLayout>
  );
};

export default PengurusAdmin;
