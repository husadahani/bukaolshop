import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Toko Online - Belanja Online Terpercaya",
  description: "Toko online terpercaya dengan berbagai produk berkualitas dan pelayanan terbaik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-bs-theme="light">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <Header 
          namaToko="Toko Online"
        />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer namaToko="Toko Online" />
      </body>
    </html>
  );
}
