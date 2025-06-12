"use client";
import { pathImage } from "@/utils/pathImage";
import request from "@/utils/request";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const KeranjangPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  const handleRemove = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.jumlah, 0);
  };

  const kategoriList = [
    { label: "Mata Pelajaran", key: "mataPelajaran" },
    { label: "Jurnal", key: "jurnal" },
    { label: "Majalah", key: "majalah" },
  ];

  const handlePeminjaman = async () => {
    if (cartItems.length === 0) {
      toast.error("Keranjang masih kosong");
      return;
    }

    const userId = Cookies.get("idUser"); // bisa diubah sesuai autentikasi yang Anda miliki
    const bukuList = cartItems.map((item) => ({
      bukuId: item.id,
      jumlah: item.jumlah,
    }));

    toast.loading("Mengirim permintaan...");

    try {
      const response = await request.post("/riwayat-peminjaman", {
        userId,
        bukuList,
      });

      if (response.status === 200 || response.status === 201) {
        toast.dismiss();
        toast.success("Peminjaman berhasil");

        // Kosongkan keranjang setelah berhasil
        setCartItems([]);
        localStorage.removeItem("cart");
      } else {
        toast.dismiss();
        toast.error("Gagal melakukan peminjaman");
      }
    } catch (error) {
      toast.dismiss();
      const message =
        error?.response?.data?.errors?.message ||
        "Terjadi kesalahan saat melakukan peminjaman";
      toast.error(message);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="bg-white w-full p-10 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Keranjang kosong.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1 w-32">
                          <div className="aspect-[14/16] w-full overflow-hidden rounded-md bg-gray-100">
                            <img
                              className="h-full w-full object-cover"
                              src={pathImage(item?.cover)}
                              alt={item.judul}
                            />
                          </div>
                        </a>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p className="text-base font-medium text-gray-900">
                            {item.judul}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.penulis}
                          </p>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            >
                              ❌ Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="text-sm text-gray-900">
                          x{item.jumlah}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>
              <div className="space-y-4">
                {kategoriList.map(({ label, key }, idx) => {
                  const jumlah = cartItems
                    .filter((item) => item.kategori === key)
                    .reduce((acc, item) => acc + item.jumlah, 0);

                  return (
                    <dl
                      key={idx}
                      className="flex items-center justify-between gap-4"
                    >
                      <dt className="text-base font-normal text-gray-500">
                        {label}
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {jumlah}
                      </dd>
                    </dl>
                  );
                })}

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    {getTotal()}
                  </dd>
                </dl>
              </div>

              <button
                onClick={handlePeminjaman}
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeranjangPage;
