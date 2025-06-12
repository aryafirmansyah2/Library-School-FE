"use client";
import InputField from "@/components/Form/InputField";
import formattedStatus from "@/utils/formattedStatus";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  namaDepan: z.string().min(3, "Nama Depan harus lebih dari 3 karakter."),
  namaBelakang: z.string().min(3, "Nama Belakang harus lebih dari 3 karakter."),
  kelas: z.string().min(3, "Kelas harus lebih dari 3 karakter."),
  noHp: z.string().regex(/^\+62\d+$/, "Phone number must start with +62"),
  email: z
    .string()
    .min(3, "email must be at least 3 characters long.")
    .refine((value) => {
      const isEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]+$/.test(value);
      return isEmail || isUsername;
    }, "Must be a valid email or username."),
});

const ContentEditAnggota = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaDepan: "",
    namaBelakang: "",
    kelas: "",
    noHp: "",
    email: "",
  });

  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await request.get(`/users/${id}`);
      const data = response.data;

      setFormData({
        namaDepan: data.namaDepan || "",
        namaBelakang: data.namaBelakang || "",
        kelas: data.kelas || "",
        noHp: data.noHp?.startsWith("+62")
          ? data.noHp.slice(3)
          : data.noHp || "",
        email: data.email || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidations([]);
    setLoading(true);
    toast.loading("Loading...");

    try {
      const validation = formSchema.safeParse({
        namaDepan: formData.namaDepan,
        namaBelakang: formData.namaBelakang,
        kelas: formData.kelas,
        noHp: "+62" + formData.noHp,
        email: formData.email,
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
      .put(`/users/${id}`, {
        namaDepan: formData.namaDepan,
        namaBelakang: formData.namaBelakang,
        kelas: formData.kelas,
        noHp: "+62" + formData.noHp,
        email: formData.email,
      })
      .then(function (response) {
        console.log("Success:", response.data);
        if (response.status === 200 || response.status === 201) {
          toast.dismiss();
          toast.success("Success Update");
          setTimeout(() => {
            router.push("/anggota");
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
          <h1 className="text-3xl font-bold">Edit Anggota</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <InputField
                    id="namaDepan"
                    name="namaDepan"
                    type="text"
                    label="Nama Depan"
                    value={formData.namaDepan}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan nama depan"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="namaBelakang"
                    name="namaBelakang"
                    type="text"
                    label="Nama Belakang"
                    value={formData.namaBelakang}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan nama belakang"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="kelas"
                    name="kelas"
                    type="text"
                    label="Kelas"
                    value={formData.kelas}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan nama kelas"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="noHp"
                    name="noHp"
                    type="tel"
                    label="No. Telepon"
                    value={formData.noHp}
                    onChange={handleChange}
                    validations={validations}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    validations={validations}
                  />
                </div>
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContentEditAnggota;
