'use client';
import dataMataPelajaran from '@/API/dataMataPelajaran';
import InputField from '@/components/Form/InputField';
import TableDefault from '@/components/Table/TableDefault';
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const columns = [
  { header: 'Judul', accessor: 'judul' },
  { header: 'Penulis', accessor: 'penulis' },
  { header: 'Penerbit', accessor: 'penerbit' },
  { header: 'Tahun', accessor: 'tahun' },
  { header: 'Stok', accessor: 'stok' },
];

const MajalahPage = () => {
  const [search, setSearch] = useState('');

  const handleEdit = (rowData) => {
    alert('Edit: ' + rowData.product);
  };

  return (
    <div div className="flex flex-col gap-8">
      <div className="">
        <h1 className="text-3xl font-bold">
          Selamat Datang di Digital Library!
        </h1>
        <p className="mt-4 max-w-[476px]">
          Silahkan melihat koleksi buku, majalah, dan jurnal milik kami dan
          kalian bisa pinjam{' '}
        </p>
      </div>
      <div className="max-w-80">
        <InputField
          id={'searchMataPelajaran'}
          name={'searchMataPelajaran'}
          type={'text'}
          value={search}
          iconLeft={<IoIosSearch className="text-gray-500" />}
          placeholder={'Cari Mata Pelajaran'}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TableDefault
        columns={columns}
        data={dataMataPelajaran}
        onActionClick={handleEdit}
      />
    </div>
  );
};

export default MajalahPage;
