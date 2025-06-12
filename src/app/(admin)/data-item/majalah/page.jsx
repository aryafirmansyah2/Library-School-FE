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

const MajalahPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dataMajalah, setDataMajalah] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMajalah = useCallback(async () => {
    try {
      const response = await request.get(`/majalah`);
      setDataMajalah(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMajalah();
  }, [fetchMajalah]);

  const handleEdit = (rowData) => {
    router.push(`/data-item/majalah/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    toast(
      (t) => (
        <DeleteToastConfirm
          t={t}
          itemName={rowData.judul}
          onConfirm={async () => {
            await request.delete(`/majalah/${rowData.id}`);
            fetchMajalah();
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
      const response = await request.get(`/jurnal?keyword=${keyword}`);
      setDataMajalah(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div div className="flex flex-col gap-8">
        <div className="">
          <h1 className="text-3xl font-bold">
            Selamat Datang di Digital Library!
          </h1>
          <p className="mt-4 max-w-[476px]">
            Silahkan melihat koleksi buku, majalah, dan jurnal milik kami dan
            kalian bisa pinjam{" "}
          </p>
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
            href={"/data-item/majalah/create"}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Tambah
          </Link>
        </div>
        <TableDefault
          columns={columns}
          data={dataMajalah}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default MajalahPage;
