"use client";
import React from "react";

const TextAreaField = ({
  id,
  name,
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm"
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaField;
