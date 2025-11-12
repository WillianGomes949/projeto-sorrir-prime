// src/components/global/Layout.tsx

import { Outlet } from 'react-router-dom'; // 1. Importe o Outlet
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}