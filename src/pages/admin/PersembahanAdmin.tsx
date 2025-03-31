
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CrudTable } from '@/components/admin/CrudTable';
import { useToast } from '@/hooks/use-toast';

interface Persembahan {
  id: string;
  nama: string;
  email: string;
  jumlah: string;
  metode: string;
  tanggal: string;
  keterangan: string;
  status: string;
}

const PersembahanAdmin = () => {
  const { toast } = useToast();
  const [persembahan, setPersembahan] = useState<Persembahan[]>([
    {
      id: '1',
      nama: 'John Doe',
      email: 'john@example.com',
      jumlah: '200000',
      metode: 'Transfer Bank',
      tanggal: '2023-08-05',
      keterangan: 'Persembahan bulanan',
      status: 'Berhasil',
    },
    {
      id: '2',
      nama: 'Jane Smith',
      email: 'jane@example.com',
      jumlah: '150000',
      metode: 'E-Wallet',
      tanggal: '2023-08-12',
      keterangan: 'Persembahan syukur',
      status: 'Berhasil',
    },
  ]);

  const handleAdd = (data: Partial<Persembahan>) => {
    const newPersembahan = {
      ...data,
      id: Date.now().toString(),
    } as Persembahan;
    
    setPersembahan([...persembahan, newPersembahan]);
    toast({
      title: "Berhasil menambahkan data persembahan",
      description: `Persembahan dari ${data.nama} telah ditambahkan`,
    });
  };

  const handleEdit = (id: string, data: Partial<Persembahan>) => {
    setPersembahan(
      persembahan.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    toast({
      title: "Berhasil mengubah data persembahan",
      description: `Data persembahan dari ${data.nama} telah diperbarui`,
    });
  };

  const handleDelete = (id: string) => {
    setPersembahan(persembahan.filter((item) => item.id !== id));
    toast({
      title: "Berhasil menghapus data persembahan",
      description: "Data persembahan telah dihapus",
    });
  };

  const fields = [
    { name: 'nama', label: 'Nama', type: 'text' as const },
    { name: 'email', label: 'Email', type: 'text' as const },
    { name: 'jumlah', label: 'Jumlah', type: 'number' as const },
    { 
      name: 'metode', 
      label: 'Metode', 
      type: 'select' as const,
      options: [
        { value: 'Transfer Bank', label: 'Transfer Bank' },
        { value: 'E-Wallet', label: 'E-Wallet' },
        { value: 'Tunai', label: 'Tunai' },
      ] 
    },
    { name: 'tanggal', label: 'Tanggal', type: 'date' as const },
    { name: 'keterangan', label: 'Keterangan', type: 'textarea' as const },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: 'Berhasil', label: 'Berhasil' },
        { value: 'Menunggu', label: 'Menunggu' },
        { value: 'Gagal', label: 'Gagal' },
      ] 
    },
  ];

  return (
    <AdminLayout>
      <CrudTable
        title="Persembahan"
        data={persembahan}
        fields={fields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
      />
    </AdminLayout>
  );
};

export default PersembahanAdmin;
