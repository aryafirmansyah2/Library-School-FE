"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

import Cookies from "js-cookie";
import { pathImage } from "@/utils/pathImage";
import request from "@/utils/request";

export default function RiwayatPeminjamanPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRiwayat = useCallback(async () => {
    try {
      const userId = Cookies.get("idUser");
      if (!userId) return;

      const response = await request.get(`/riwayat-peminjaman/user/${userId}`);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal memuat data riwayat:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRiwayat();
  }, [fetchRiwayat]);

  return (
    <div className="bg-white w-full p-10 rounded-xl border border-gray-200">
      <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">
        Riwayat Peminjaman
      </h2>

      <div className="grid grid-cols-10 pb-9">
        <div className="col-span-10 lg:col-span-4">
          <p className="font-medium text-lg leading-8 text-indigo-600">Buku</p>
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

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada riwayat peminjaman.
        </p>
      ) : (
        orders.map((order) => (
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
        ))
      )}
    </div>
  );
}
