
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import Pengurus from "./pages/Pengurus";
import RenunganPage from "./pages/Renungan";
import ArtikelPage from "./pages/Artikel";
import ArtikelDetail from "./pages/ArtikelDetail";
import Persembahan from "./pages/Persembahan";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import PengurusAdmin from "./pages/admin/PengurusAdmin";
import RenunganAdmin from "./pages/admin/RenunganAdmin";
import ArtikelAdmin from "./pages/admin/ArtikelAdmin";
import DokumentasiAdmin from "./pages/admin/DokumentasiAdmin";
import PersembahanAdmin from "./pages/admin/PersembahanAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/pengurus" element={<Pengurus />} />
        <Route path="/renungan" element={<RenunganPage />} />
        <Route path="/artikel" element={<ArtikelPage />} />
        <Route path="/artikel/:slug" element={<ArtikelDetail />} />
        <Route path="/persembahan" element={<Persembahan />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/pengurus" element={<PengurusAdmin />} />
        <Route path="/admin/renungan" element={<RenunganAdmin />} />
        <Route path="/admin/artikel" element={<ArtikelAdmin />} />
        <Route path="/admin/dokumentasi" element={<DokumentasiAdmin />} />
        <Route path="/admin/persembahan" element={<PersembahanAdmin />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
