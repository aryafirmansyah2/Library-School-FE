"use client";
import InputField from "@/components/Form/InputField";
import InputFileField from "@/components/Form/InputFileField";
import TextAreaField from "@/components/Form/TextAreaField ";
import formattedStatus from "@/utils/formattedStatus";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  judulBuku: z.string().min(1, { message: "Judul buku wajib diisi" }),
  penerbit: z.string().min(1, { message: "Penerbit wajib diisi" }),
  penulis: z.string().min(1, { message: "Penulis wajib diisi" }),
  mataPelajaran: z.string().min(1, { message: "Mata pelajaran wajib diisi" }),
  kurikulum: z.string().min(1, { message: "Kurikulum wajib diisi" }),
  tingkatKelas: z.string().min(1, { message: "Tingkat kelas wajib diisi" }),
  tahunTerbit: z.string().min(1, { message: "Tahun terbit wajib diisi" }),
  jumlahHalaman: z
    .number()
    .min(1, { message: "Jumlah halaman wajib diisi" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Jumlah halaman harus berupa angka",
    }),
  stok: z
    .number()
    .min(1, { message: "Stok wajib diisi" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Stok harus berupa angka",
    }),
  deskripsi: z.string().min(1, { message: "Deskripsi wajib diisi" }),

  coverBuku: z
    .any()
    .refine((file) => file === null || file instanceof File, {
      message: "Cover buku harus berupa file gambar",
    })
    .optional(), // optional agar tidak divalidasi saat kosong
});

const ContentEditMataPelajaran = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    judulBuku: "",
    penerbit: "",
    penulis: "",
    mataPelajaran: "",
    kurikulum: "",
    tingkatKelas: "",
    tahunTerbit: "",
    jumlahHalaman: "",
    stok: "",
    deskripsi: "",
    coverBuku: null, // untuk file
  });

  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const fetchMataPelajaran = useCallback(async () => {
    try {
      const response = await request.get(`/buku-pelajaran/${id}`);
      const data = response.data;

      setFormData({
        judulBuku: data.judul || "",
        penerbit: data.penerbit || "",
        penulis: data.penulis || "",
        mataPelajaran: data.maPel || "",
        kurikulum: data.kurikulum?.trim() || "",
        tingkatKelas: data.tingkatKelas || "",
        tahunTerbit: data.tahunTerbit || "",
        jumlahHalaman: data.halaman || "",
        stok: data.jumlah || "",
        deskripsi: data.deskripsi || "",
        coverBuku: null, // karena ini file upload, biarkan null
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMataPelajaran();
  }, [fetchMataPelajaran]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidations([]);
    setLoading(true);
    toast.loading("Loading...");

    try {
      const validation = formSchema.safeParse({
        judulBuku: formData.judulBuku,
        penerbit: formData.penerbit,
        penulis: formData.penulis,
        mataPelajaran: formData.mataPelajaran,
        kurikulum: formData.kurikulum,
        tingkatKelas: formData.tingkatKelas,
        tahunTerbit: formData.tahunTerbit,
        jumlahHalaman: formData.jumlahHalaman,
        stok: formData.stok,
        deskripsi: formData.deskripsi,
        coverBuku: formData.coverBuku, // untuk file
      });

      if (!validation.success) {
        setValidations(
          validation.error.errors.map((error) => ({
            name: error.path[0],
            message: error.message,
          }))
        );
        toast.dismiss();
        toast.error("Invalid Input");
        setLoading(false);
        return;
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      setLoading(false);
      return;
    }

    request
      .putMultipart(`/buku-pelajaran/${id}`, {
        judul: formData.judulBuku,
        penerbit: formData.penerbit,
        penulis: formData.penulis,
        maPel: formData.mataPelajaran,
        kurikulum: formData.kurikulum,
        tingkatKelas: formData.tingkatKelas,
        tahunTerbit: formData.tahunTerbit,
        halaman: formData.jumlahHalaman,
        jumlah: formData.stok,
        deskripsi: formData.deskripsi,
        cover: formData.coverBuku, // untuk file
      })
      .then(function (response) {
        console.log("Success:", response.data);
        if (response.status === 200 || response.status === 201) {
          toast.dismiss();
          toast.success("Success Update");
          setTimeout(() => {
            router.push("/data-item/mata-pelajaran");
          }, 1000);
        } else {
          toast.dismiss();
          toast.error("Failed to update. Please try again.");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("Error:", error);
        const message =
          error?.response?.data?.errors?.message || error?.status == 404
            ? "Akun anda belum terdaftar"
            : "Unknown error";

        toast.dismiss();
        toast.error(formattedStatus(message));
        setLoading(false);
      });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-8 bg-white w-full p-10 rounded-xl border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold">Edit Buku Mata Pelajaran</h1>
          <p className="mt-4">Ini halaman update buku mata pelajaran.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <InputField
                    id="judulBuku"
                    name="judulBuku"
                    type="text"
                    label="Judul Buku"
                    value={formData.judulBuku}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan judul buku"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="penerbit"
                    name="penerbit"
                    type="text"
                    label="Penerbit"
                    value={formData.penerbit}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan nama penerbit"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="penulis"
                    name="penulis"
                    type="text"
                    label="Penulis"
                    value={formData.penulis}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan nama penulis"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="mataPelajaran"
                    name="mataPelajaran"
                    type="text"
                    label="Mata Pelajaran"
                    value={formData.mataPelajaran}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan mata pelajaran"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="kurikulum"
                    name="kurikulum"
                    type="text"
                    label="Kurikulum"
                    value={formData.kurikulum}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan kurikulum"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="tingkatKelas"
                    name="tingkatKelas"
                    type="text"
                    label="Tingkat Kelas"
                    value={formData.tingkatKelas}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan tingkat kelas"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="tahunTerbit"
                    name="tahunTerbit"
                    type="number"
                    label="Tahun Terbit"
                    value={formData.tahunTerbit}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Contoh: 2024"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="jumlahHalaman"
                    name="jumlahHalaman"
                    type="number"
                    label="Jumlah Halaman"
                    value={formData.jumlahHalaman}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Contoh: 200"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="stok"
                    name="stok"
                    type="number"
                    label="Stok Buku"
                    value={formData.stok}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan jumlah stok"
                  />
                </div>

                {/* Upload Cover */}
                <InputFileField
                  id="coverBuku"
                  name="coverBuku"
                  label="Cover Buku"
                  accept="image/*"
                  onChange={handleChange}
                  file={formData.coverBuku}
                />

                {/* Deskripsi */}
                <TextAreaField
                  id="deskripsi"
                  name="deskripsi"
                  label="Deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Tulis deskripsi buku di sini..."
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContentEditMataPelajaran;
