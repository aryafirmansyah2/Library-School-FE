"use client";
import InputField from "@/components/Form/InputField";
import TableDefault from "@/components/Table/TableDefault";
import DeleteToastConfirm from "@/components/toasts/DeleteToastConfirm";
import request from "@/utils/request";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";

const columns = [
  { header: "Judul", accessor: "judul" },
  { header: "Penulis", accessor: "penulis" },
  { header: "Penerbit", accessor: "penerbit" },
  { header: "Tahun", accessor: "tahunTerbit" },
  { header: "Stok", accessor: "jumlah" },
];

const MataPelajaranPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dataMataPelajaran, setDataMataPelajaran] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMataPelajaran = useCallback(async () => {
    try {
      const response = await request.get(`/buku-pelajaran`);
      setDataMataPelajaran(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMataPelajaran();
  }, [fetchMataPelajaran]);

  const handleEdit = (rowData) => {
    router.push(`/data-item/mata-pelajaran/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    toast(
      (t) => (
        <DeleteToastConfirm
          t={t}
          itemName={rowData.judul}
          onConfirm={async () => {
            await request.delete(`/buku-pelajaran/${rowData.id}`);
            fetchMataPelajaran();
          }}
        />
      ),
      {
        duration: 8000,
        position: "top-center",
      }
    );
  };

  const handleSearch = async (keyword) => {
    setLoading(true); // optional: aktifkan loading saat mencari
    try {
      const response = await request.get(`/buku-pelajaran?keyword=${keyword}`);
      setDataMataPelajaran(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(dataMataPelajaran);

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-8 bg-white w-full p-10 rounded-xl border border-gray-200 ">
        <div className="">
          <h1 className="text-3xl font-bold">Koleksi Mata Pelajaran</h1>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // mencegah reload halaman
              handleSearch(search);
            }}
            className="max-w-80 w-full"
          >
            <InputField
              id={"searchMataPelajaran"}
              name={"searchMataPelajaran"}
              type={"text"}
              value={search}
              iconLeft={<IoIosSearch className="text-gray-500" />}
              placeholder={"Cari Mata Pelajaran"}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="hidden">
              search
            </button>
          </form>
          <Link
            href={"/data-item/mata-pelajaran/create"}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Tambah
          </Link>
        </div>
        <TableDefault
          columns={columns}
          data={dataMataPelajaran}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default MataPelajaranPage;
