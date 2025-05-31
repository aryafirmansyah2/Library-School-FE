import React from "react";
import { toast } from "react-hot-toast";

const DeleteToastConfirm = ({ t, itemName, onConfirm }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-3">
        <p className="text-gray-700 text-sm">
          Apakah kamu yakin ingin menghapus buku{" "}
          <span className="font-semibold text-red-600">{itemName}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Batal
          </button>
          <button
            className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            onClick={async () => {
              try {
                await onConfirm();
                toast.dismiss(t.id);
                toast.success("Buku berhasil dihapus");
              } catch (error) {
                toast.dismiss(t.id);
                console.error("Gagal menghapus data:", error);
                toast.error("Terjadi kesalahan saat menghapus data.");
              }
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteToastConfirm;
