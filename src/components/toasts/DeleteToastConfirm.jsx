import React from "react";
import { toast } from "react-hot-toast";

const DeleteToastConfirm = ({ t, itemName, onConfirm }) => {
  return (
    <div className=" text-center">
      <svg
        className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <p className="mb-4 text-gray-500">
        Are you sure you want to delete this item?{" "}
        <span className="font-semibold text-red-600">{itemName}</span>
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900"
        >
          No, cancel
        </button>
        <button
          onClick={() => {
            onConfirm?.(); // Callback untuk delete
            toast.dismiss(t.id);
          }}
          className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
        >
          Yes, I'm sure
        </button>
      </div>
    </div>
  );
};

export default DeleteToastConfirm;
