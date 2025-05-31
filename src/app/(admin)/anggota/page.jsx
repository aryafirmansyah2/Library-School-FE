"use client";
import InputField from "@/components/Form/InputField";
import TableDefault from "@/components/Table/TableDefault";
import request from "@/utils/request";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";

const columns = [
  { header: "Nama Depan", accessor: "namaDepan" },
  { header: "Nama Belakang", accessor: "namaBelakang" },
  { header: "Email", accessor: "email" },
  { header: "No. Telpon", accessor: "noHp" },
  { header: "Kelas", accessor: "kelas" },
];

const AnggotaPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dataAnggota, seDataAnggota] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await request.get(`/users`);
      seDataAnggota(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (rowData) => {
    router.push(`/anggota/${rowData.id}`);
  };

  const handleDelete = async (rowData) => {
    // const confirmed = confirm(
    //   `Apakah Anda yakin ingin menghapus buku "${rowData.judul}"?`
    // );
    // if (!confirmed) return;

    try {
      await request.delete(`/users/${rowData.id}`);
      // alert("Buku berhasil dihapus.");
      fetchUsers(); // Refresh data
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
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
      <div className="max-w-80">
        <InputField
          id={"searchAnggota"}
          name={"searchAnggota"}
          type={"text"}
          value={search}
          iconLeft={<IoIosSearch className="text-gray-500" />}
          placeholder={"Cari Anggota"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TableDefault
        columns={columns}
        data={dataAnggota}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AnggotaPage;
