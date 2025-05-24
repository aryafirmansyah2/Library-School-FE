import React from 'react';

const TableDefault = ({
  columns = [],
  data = [],
  onActionClick = () => {},
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {col.header}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {row[col.accessor]}
                </td>
              ))}
              <td className="px-6 py-4 space-x-4">
                <button
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => onActionClick(row)}
                >
                  Edit
                </button>
                <button
                  className="font-medium text-red-600 hover:underline"
                  onClick={() => onActionClick(row)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDefault;
