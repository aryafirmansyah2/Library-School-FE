"use client";

import React, { useCallback, useEffect, useState } from "react";
import request from "@/utils/request";
import InputField from "@/components/Form/InputField";
import { IoIosSearch } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import ToastConfirmReturnBook from "@/components/toasts/ToastConfirmReturnBook";

const columns = [
  { header: "Nama", accessor: "nama" },
  { header: "Buku", accessor: "buku" },
  { header: "Tgl Peminjaman", accessor: "tglPinjam" },
  { header: "Tgl Pengembalian", accessor: "tglKembali" },
  { header: "Status", accessor: "status" },
  { header: "Aksi", accessor: "aksi" },
];

const RiwayatPeminjamanPage = () => {
  const [search, setSearch] = useState("");
  const [dataPeminjaman, setDataPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRiwayatPeminjaman = useCallback(async () => {
    try {
      const response = await request.get("/riwayat-peminjaman");
      const formattedData = response.data.map((item) => ({
        id: item.id,
        nama: `${item.user.namaDepan} ${item.user.namaBelakang}`,
        buku: item.buku.judul,
        tglPinjam: item.tanggalPeminjaman,
        tglKembali: item.tanggalPengembalian,
        status: item.sudahDikembalikan,
      }));
      setDataPeminjaman(formattedData);
    } catch (error) {
      console.error("Gagal fetch data riwayat peminjaman:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRiwayatPeminjaman();
  }, [fetchRiwayatPeminjaman]);

  const handleKembalikan = (id, bookTitle) => {
    toast(
      (t) => (
        <ToastConfirmReturnBook
          t={t}
          itemName={bookTitle}
          onConfirm={async () => {
            await request.put(`/riwayat-peminjaman/kembalikan/${id}`);
            fetchRiwayatPeminjaman();
          }}
        />
      ),
      {
        duration: 8000,
        position: "top-center",
      }
    );
  };

  const filteredData = dataPeminjaman.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">
            Selamat Datang di Digital Library!
          </h1>
          <p className="mt-4 max-w-[476px]">
            Silahkan melihat koleksi buku, majalah, dan jurnal milik kami dan
            kalian bisa pinjam
          </p>
        </div>
        {/* 
        <div className="max-w-80">
          <InputField
            id="searchAnggota"
            name="searchAnggota"
            type="text"
            value={search}
            iconLeft={<IoIosSearch className="text-gray-500" />}
            placeholder="Cari Anggota"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}

        <div className="relative overflow-x-auto border border-gray-200 sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-6 text-gray-500"
                  >
                    Tidak ada data yang tersedia.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {row.nama}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {row.buku}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {row.tglPinjam}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {row.tglKembali}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {row.status ? (
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
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      <button
                        onClick={() => handleKembalikan(row.id, row.buku)}
                        disabled={row.status}
                        className={`px-4 py-1 rounded transition font-medium ${
                          row.status
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        Kembalikan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RiwayatPeminjamanPage;
