import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className='fixed top-0 w-full z-50'>
        <Navbar />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
