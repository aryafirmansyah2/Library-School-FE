import React from "react";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";
import { GiCancel } from "react-icons/gi";
import { formatFileSize } from "@/utils/formatFileSize";

const InputField = ({
  id,
  name,
  type,
  value,
  multipleDatas = [],
  valueMultiple = [],
  onChange,
  placeholder,
  previewImage,
  multiple = false,
  required = false,
  iconRight = null,
  iconLeft = null,
  label = null,
  disabled = false,
  readOnly = false,
  validations,
  handleDeleteImage, // Fungsi untuk hapus di API
  handleDeleteLocalImage, // Fungsi untuk hapus di local
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between">
          <label
            htmlFor={id}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
          {previewImage && (
            <Link
              href={`${process.env.NEXT_PUBLIC_HOST}` + previewImage}
              target="_blank"
              className="block mb-2 mr-4 text-sm font-medium text-gray-900"
            >
              Preview Image
            </Link>
          )}
        </div>
      )}

      <div className="relative w-full mt-2">
        <div className="relative w-full">
          {/* iconLeft */}
          {iconLeft && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {iconLeft}
            </div>
          )}

          {/* special case +62 for tel */}
          {type === "tel" && !iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              +62
            </span>
          )}
          <input
            id={id}
            name={name}
            accept={type === "image" ? "image/*" : "*"}
            type={type === "image" ? "file" : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            multiple={multiple}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm ${
              (type == "tel" && "pl-12") || (iconLeft != null && "pl-12")
            }`}
          />
          {iconRight && (
            <div className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-black flex justify-center items-center">
              {iconRight}
            </div>
          )}
        </div>

        {/* Render valueMultiple and multipleDatas if multiple is true */}
        {multiple && (
          <div className="mt-2">
            <ul className="space-y-2">
              {/* Render data dari database (valueMultiple) */}
              {valueMultiple.map((file, index) => (
                <li key={index} className="text-gray-700">
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 flex justify-between">
                    <div className="flex items-center space-x-4">
                      <CiFileOn className="text-5xl" />
                      <div className="flex flex-col">
                        <p className="block text-sm font-medium text-gray-900">
                          {file.mediaFilename}
                        </p>
                        <p className="block text-sm font-medium text-gray-900">
                          {file.mediaFilesize} kb
                        </p>
                      </div>
                    </div>
                    <div>
                      <GiCancel
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteImage(file.id)} // Kirimkan file.id
                      />
                    </div>
                  </div>
                </li>
              ))}

              {/* Render data dari local (multipleDatas) */}
              {multipleDatas.map((file, index) => (
                <li key={index} className="text-gray-700">
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 flex justify-between">
                    <div className="flex items-center space-x-4">
                      <CiFileOn className="text-5xl" />
                      <div className="flex flex-col">
                        <p className="block text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="block text-sm font-medium text-gray-900">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <GiCancel
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteLocalImage(index)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {validations &&
          validations.map(
            (validation, index) =>
              (validation.name === name ||
                (validation.name === "media_uri" && type === "image")) && (
                <p key={index} className="mt-2 text-sm text-red-500">
                  {validation.message}
                </p>
              )
          )}
      </div>
    </div>
  );
};

export default InputField;
