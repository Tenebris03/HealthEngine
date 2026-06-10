import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
