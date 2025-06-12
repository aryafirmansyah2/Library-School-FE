import React from "react";

const BerandaPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di Digital Library
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Temukan, pesan, dan pinjam buku favoritmu dengan mudah dari mana saja.
          Dapatkan akses ke ribuan koleksi buku, jurnal, dan majalah.
        </p>
        <a
          href="/buku/mata-pelajaran"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-blue-700 transition"
        >
          Jelajahi Koleksi Buku
        </a>
      </div>
    </div>
  );
};

export default BerandaPage;
