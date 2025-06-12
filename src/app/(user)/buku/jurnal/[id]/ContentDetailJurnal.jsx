"use client";
import InputField from "@/components/Form/InputField";
import { pathImage } from "@/utils/pathImage";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

const ContentDetailJurnal = ({ id }) => {
  const router = useRouter();
  const [jumlah, setJumlah] = useState("");
  const [dataJurnal, setDataJurnal] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJurnal = useCallback(async () => {
    try {
      const response = await request.get(`/jurnal/${id}`);
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

  const handleAddToCart = (jurnal) => {
    toast.dismiss();
    toast.loading("Loading...");

    if (!jumlah || jumlah <= 0) {
      toast.dismiss();
      toast.error("Masukkan jumlah pinjam yang valid.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex((item) => item.id === jurnal.id);

    if (existingIndex !== -1) {
      cart[existingIndex].jumlah += parseInt(jumlah);

      if (!cart[existingIndex].kategori) {
        cart[existingIndex].kategori = "jurnal";
      }
    } else {
      cart.push({
        id: jurnal.id,
        judul: jurnal.judul,
        penulis: jurnal.penulis,
        cover: jurnal.cover,
        jumlah: parseInt(jumlah),
        kategori: "jurnal",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.dismiss();
    toast.success("Buku berhasil ditambahkan ke keranjang!");
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="bg-white w-full p-10 rounded-xl border border-gray-200 flex flex-col gap-8">
        <div className="flex gap-8 ">
          <div className="flex flex-col gap-8 w-full">
            {/* KONTEN KIRI */}
            <div className="">
              <h1 className="text-3xl font-bold">{dataJurnal?.judul}</h1>
              <h2 className="text-2xl text-gray-500 mt-4 max-w-[476px]">
                {dataJurnal?.penulis} | Buku Majalah
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-12 p-6 bg-white rounded-lg border border-gray-200 text-sm">
              {/* Kolom Kiri */}
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Penerbit
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.penerbit || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Penulis
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.penulis || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Tanggal publikasi
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.tahunTerbit || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Bidang
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.bidang || "-"}
                  </span>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Edisi
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    Kelas {dataJurnal?.edisi || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Frekuensi Terbit
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.frekuensiTerbit || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Volume
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.volume || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-base font-normal mb-1 sm:mb-0 text-gray-500">
                    Jumlah halaman
                  </span>
                  <span className="mr-1">:</span>
                  <span className="text-base font-medium text-gray-900">
                    {dataJurnal?.halaman || "-"} Halaman
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* GAMBAR */}
          <div className="relative h-auto w-[400px] aspect-[3/4]">
            <img
              src={pathImage(dataJurnal?.cover)}
              alt="card-image"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
        <div>
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            Deskripsi
          </h6>
          <p className="text-slate-600 leading-normal font-light">
            {dataJurnal?.deskripsi}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // mencegah reload halaman
            handleAddToCart(dataJurnal);
          }}
          className=" w-full"
        >
          <InputField
            id={"jumlah"}
            name={"jumlah"}
            type={"number"}
            value={jumlah}
            label={"Jumlah Pinjam"}
            placeholder={"Masukan jumlah"}
            required
            onChange={(e) => setJumlah(e.target.value)}
          />
          <button type="submit" className="hidden">
            search
          </button>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-3"
            >
              Add to Cart <FiShoppingCart />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContentDetailJurnal;
