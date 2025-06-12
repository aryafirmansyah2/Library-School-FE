"use client";
import CardBook from "@/components/Card/CardBook";
import InputField from "@/components/Form/InputField";
import { pathImage } from "@/utils/pathImage";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const JurnalPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dataJurnal, setDataJurnal] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJurnal = useCallback(async () => {
    try {
      const response = await request.get(`/jurnal`);
      setDataJurnal(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJurnal();
  }, [fetchJurnal]);

  const handleSearch = async (keyword) => {
    setLoading(true); // optional: aktifkan loading saat mencari
    try {
      const response = await request.get(`/jurnal?keyword=${keyword}`);
      setDataJurnal(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white w-full p-10 rounded-xl border border-gray-200 ">
      <div className="">
        <h1 className="text-3xl font-bold">
          Selamat Datang di Digital Library!
        </h1>
        <p className="mt-4 max-w-[476px]">
          Silahkan melihat koleksi buku, majalah, dan jurnal milik kami yang
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
            placeholder={"Cari Jurnal"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="hidden">
            search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center text-slate-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {dataJurnal?.map((item, index) => (
            <CardBook
              key={index}
              title={item?.judul}
              description={item?.deskripsi}
              image={pathImage(item?.cover)}
              href={`/buku/jurnal/${item?.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JurnalPage;
