
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  FileText, 
  ImageIcon, 
  CreditCard 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DashboardCard = ({ 
  title, 
  count, 
  icon: Icon, 
  href 
}: { 
  title: string; 
  count: number; 
  icon: React.ElementType; 
  href: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{count}</div>
      <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
        <Link to={href}>Lihat {title}</Link>
      </Button>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // In a real app, this data would come from an API
  const stats = [
    { title: 'Pengurus', count: 12, icon: Users, href: '/admin/pengurus' },
    { title: 'Renungan', count: 24, icon: BookOpen, href: '/admin/renungan' },
    { title: 'Artikel', count: 18, icon: FileText, href: '/admin/artikel' },
    { title: 'Dokumentasi', count: 45, icon: ImageIcon, href: '/admin/dokumentasi' },
    { title: 'Persembahan', count: 32, icon: CreditCard, href: '/admin/persembahan' }
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brown-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Selamat datang di panel admin PMK ITERA.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <DashboardCard 
            key={stat.title} 
            title={stat.title} 
            count={stat.count} 
            icon={stat.icon} 
            href={stat.href} 
          />
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
