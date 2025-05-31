"use client";
import React from "react";

const InputFileField = ({ id, name, label, accept, onChange, file = null }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      {/* Drop area */}
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500"
            >
              <span>Upload file</span>
              <input
                id={id}
                name={name}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={onChange}
              />
            </label>
            <p className="pl-1">atau seret ke sini</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF maksimal 10MB
          </p>
        </div>
      </div>

      {/* File Preview */}
      {file && (
        <div className="mt-4 rounded-lg border border-gray-200 p-4 shadow-sm bg-white flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-10 w-10 object-cover rounded-md"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InputFileField;
