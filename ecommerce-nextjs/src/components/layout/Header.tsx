'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, StatusMessage } from '@/types';

interface HeaderProps {
  namaToko?: string;
  userData?: User | null;
  statusMessage?: StatusMessage | null;
}

export default function Header({ 
  namaToko = "Toko Online", 
  userData = null,
  statusMessage = null 
}: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    }
    if (statusMessage) {
      setShowStatus(true);
    }
  }, [userData, statusMessage]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sukses':
        return "https://storage3.bukaolshop.com/other_image/check-circle-svgrepo-com.svg";
      case 'info':
      case 'warning':
        return "https://storage3.bukaolshop.com/other_image/warning-circle-svgrepo-com.svg";
      default:
        return "https://storage3.bukaolshop.com/other_image/warning-circle-svgrepo-com.svg";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'sukses':
        return "alert-success";
      case 'info':
        return "alert-info";
      case 'warning':
        return "alert-warning";
      default:
        return "alert-info";
    }
  };

  return (
    <>
      <header className="bg-success bg-gradient">
        <section>
          <div className="container">
            <div className="pt-8 pb-5">
              <div className="row d-flex align-items-center">
                {/* Logo */}
                <div className="col-12 col-md-2 col-sm-12 py-3">
                  <Link href="/" className="text-decoration-none text-white">
                    <h3 className="navbar-brand m-0 text-2xl">{namaToko}</h3>
                  </Link>
                </div>

                {/* Search Bar */}
                <div className="col-12 col-md-7 py-3">
                  <form action="/search" className="search" method="GET">
                    <div className="input-group w-100">
                      <input 
                        type="search" 
                        className="form-control" 
                        id="form-cari" 
                        maxLength={150} 
                        name="q" 
                        placeholder="Cari produk..."
                      />
                      <button 
                        className="btn rounded-end" 
                        type="submit" 
                        style={{backgroundColor: '#ffffffcf', border: '1px solid #ced4da'}}
                      >
                        <i className="fa fa-search text-success"></i>
                      </button>
                    </div>
                  </form>
                </div>

                {/* User Section */}
                <div className="col-7 col-md-3 order-1 order-md-0 py-3">
                  <div className="d-flex flex-row justify-content-evenly mb-3" id="user-data">
                    <div className="d-flex flex-column ms-4 ps-3">
                      <small className="text-white">Selamat Datang!</small>
                      {!isLoggedIn && (
                        <div className="d-flex gap-2">
                          <Link href="/akun/login" className="btn btn-sm btn-outline-primary border border-white text-white">
                            Login
                          </Link>
                          <span className="text-white">|</span>
                          <Link href="/akun/daftar" className="btn btn-sm btn-outline-primary border border-white text-white">
                            Daftar
                          </Link>
                        </div>
                      )}
                      {isLoggedIn && (
                        <b className="text-white">{userData?.nama_user}</b>
                      )}
                    </div>
                    {isLoggedIn && (
                      <div className="d-flex flex-row flex-fill justify-content-evenly align-items-center">
                        <Link href="/akun/profil">
                          <i className="fa fa-user text-white text-2xl"></i>
                        </Link>
                        <Link href="/akun/cart" className="position-relative">
                          <i className="fa fa-shopping-cart text-white text-2xl"></i>
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {userData?.total_cart || 0}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="col">
                  <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                      <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mt-4 mt-md-0">
                          <li className="nav-item">
                            <Link className="nav-link" href="/" id="nav_home">Home</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="/kategori" id="nav_kategori">Kategori</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="/pages/voucher" id="nav_voucher">Promo & Voucher</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="/pages/informasi" id="nav_informasi">Informasi</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="/pages/kontak" id="nav_kontak">Kontak</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="container" id="pesan_status">
            {showStatus && statusMessage && (
              <div className={`alert ${getStatusClass(statusMessage.status)} d-flex alert-dismissible fade show pb-4`} role="alert">
                <svg width="50" height="50">
                  <image xlinkHref={getStatusIcon(statusMessage.status)} width="50" height="50"/>
                </svg>
                <div className="d-flex flex-column ms-2">
                  <strong>{statusMessage.judul}</strong>
                  {statusMessage.pesan}
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowStatus(false)}
                  aria-label="Close"
                ></button>
              </div>
            )}
          </div>
        </section>
      </header>
    </>
  );
}