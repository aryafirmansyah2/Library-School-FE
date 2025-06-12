import { pathImage } from "@/utils/pathImage";
import Image from "next/image";
import React from "react";

const orders = [
  {
    id: 1,
    buku: {
      id: 3,
      judul: "Aktif dan Kreatif Belajar Fisika",
      penulis: "Wawan Purnama",
      penerbit: "Grafindo",
      tahunTerbit: "2013",
      deskripsi:
        "Buku Pelajaran tentan fisika untuk Sekolah Menengah Atas/Madrasah Aliyah kelas XI Peminatan Matematika dan Ilmu-Ilmu Alam",
      cover: "/uploads/jurnal/1748858245819_decor1.png",
      halaman: 105,
      jumlah: 9,
      available: true,
      edisi: "test",
      frekuensiTerbit: "test",
      bidang: "test",
      volume: "test",
    },
    user: {
      id: 1,
      namaDepan: "Arya",
      namaBelakang: "Firmansyah",
      kelas: "12-MIPA-A",
      noHp: "012345678910",
      email: "arya123@gmail.com",
      password: "$2a$10$FlRquhhMQbY8NNXlqzeMOeV/ulAv3hj2Usz9c/.EPhopDv8SevXvi",
      role: "USER",
    },
    tanggalPeminjaman: "2025-06-12",
    tanggalPengembalian: "2025-06-19",
    sudahDikembalikan: false,
  },
  {
    id: 2,
    buku: {
      id: 1,
      judul: "Aktif dan Kreatif Belajar Fisika",
      penulis: "Wawan Purnama",
      penerbit: "Grafindo",
      tahunTerbit: "2013",
      deskripsi:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n",
      cover: "/uploads/buku_pelajaran/1748853606659_decor1.png",
      halaman: 105,
      jumlah: 9,
      available: true,
      maPel: "Fisika",
      tingkatKelas: "11",
      kurikulum: "Kurikulum 2013",
    },
    user: {
      id: 1,
      namaDepan: "Arya",
      namaBelakang: "Firmansyah",
      kelas: "12-MIPA-A",
      noHp: "012345678910",
      email: "arya123@gmail.com",
      password: "$2a$10$FlRquhhMQbY8NNXlqzeMOeV/ulAv3hj2Usz9c/.EPhopDv8SevXvi",
      role: "USER",
    },
    tanggalPeminjaman: "2025-06-12",
    tanggalPengembalian: "2025-06-19",
    sudahDikembalikan: false,
  },
];

export default function RiwayatPeminjamanPage() {
  return (
    <>
      <div className="bg-white w-full p-10 rounded-xl border border-gray-200">
        <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">
          Order History
        </h2>
        <div className="grid grid-cols-10 pb-9">
          <div className="col-span-10 lg:col-span-4">
            <p className="font-medium text-lg leading-8 text-indigo-600">
              Buku
            </p>
          </div>
          <div className="col-span-2 max-lg:hidden">
            <p className="font-medium text-lg leading-8 text-gray-600 text-center">
              Tanggal Pinjam
            </p>
          </div>
          <div className="col-span-2 max-lg:hidden">
            <p className="font-medium text-lg leading-8 text-gray-500 text-center">
              Tanggal Kembali
            </p>
          </div>
          <div className="col-span-2 max-lg:hidden">
            <p className="font-medium text-lg leading-8 text-gray-500 text-center">
              Status
            </p>
          </div>
        </div>

        {orders.map((order) => (
          <div
            key={order.id}
            className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-10 mb-7 cursor-pointer transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto"
          >
            <div className="col-span-8 sm:col-span-4 lg:col-span-1 sm:row-span-4 lg:row-span-1">
              <Image
                src={pathImage(order.buku.cover)}
                alt={order.buku.judul}
                width={80}
                height={100}
                className="max-lg:w-auto max-sm:mx-auto rounded-xl object-cover"
              />
            </div>
            <div className="col-span-8 sm:col-span-4 lg:col-span-3 flex h-full justify-center pl-4 flex-col max-lg:items-center">
              <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1 whitespace-nowrap">
                {order.buku.judul}
              </h5>
              <p className="font-normal text-base leading-7 text-gray-600 max-md:text-center">
                {order.buku.penulis} - {order.buku.penerbit} (
                {order.buku.tahunTerbit})
              </p>
            </div>
            <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
              <p className="font-semibold text-xl leading-8 text-black text-center">
                {new Date(order.tanggalPeminjaman).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
              <p className="font-semibold text-xl leading-8 text-black text-center">
                {new Date(order.tanggalPengembalian).toLocaleDateString(
                  "id-ID"
                )}
              </p>
            </div>
            <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
              {order.sudahDikembalikan ? (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  <span className="w-3 h-3 me-1 bg-blue-500 rounded-full"></span>
                  Sudah Dikembalikan
                </span>
              ) : (
                <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                  <span className="w-3 h-3 me-1 bg-yellow-500 rounded-full"></span>
                  Belum Dikembalikan
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
