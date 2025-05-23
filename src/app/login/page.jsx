"use client";

import InputField from "@/components/Form/InputField";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validations, setValidations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke API register di sini
    router.push("/data-item/mata-pelajaran");
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="mr-2"
          />
          Flowbite
        </Link>

        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Masuk ke akun Anda
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                validations={validations}
              />

              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                validations={validations}
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Masuk
              </button>
              <p className="text-sm font-light text-gray-500 text-center">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Masuk sini
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
