
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/home/Hero';
import { UpcomingEvents } from '@/components/home/UpcomingEvents';
import { About } from '@/components/home/About';
import { RecentDevotions } from '@/components/home/RecentDevotions';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToAction } from '@/components/home/CallToAction';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <UpcomingEvents />
      <About />
      <RecentDevotions />
      <Testimonials />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
