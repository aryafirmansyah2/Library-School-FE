import React from "react";
import { toast } from "react-hot-toast";

const ToastConfirmReturnBook = ({ t, bookTitle, onConfirm }) => {
  return (
    <div className="text-center bg-white ">
      <svg
        className="text-yellow-400 w-11 h-11 mb-3.5 mx-auto"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.366-.773 1.42-.773 1.786 0l6.518 13.773A1 1 0 0115.618 18H4.382a1 1 0 01-.943-1.128L9.957 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 012 0v3a1 1 0 01-1 1z"
          clipRule="evenodd"
        />
      </svg>
      <p className="mb-4 text-gray-700">
        Apakah kamu yakin buku ini sudah dikembalikan?{" "}
        <span className="font-semibold text-yellow-600">{bookTitle}</span>
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 hover:text-gray-900"
        >
          Batal
        </button>
        <button
          onClick={() => {
            onConfirm?.(); // Callback untuk mengembalikan buku
            toast.dismiss(t.id);
          }}
          className="py-2 px-3 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
        >
          Ya, sudah dikembalikan
        </button>
      </div>
    </div>
  );
};

export default ToastConfirmReturnBook;
