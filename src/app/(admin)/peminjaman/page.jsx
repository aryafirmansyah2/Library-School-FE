'use client';

import dataRiwayatPeminjaman from '@/API/dataRiwayatPeminjaman';
import InputField from '@/components/Form/InputField';
import TableDefault from '@/components/Table/TableDefault';
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const columns = [
  { header: 'Nama', accessor: 'nama' },
  { header: 'Buku', accessor: 'buku' },
  { header: 'Tgl Peminjaman', accessor: 'tglPinjam' },
  { header: 'Tgl Pengembalian', accessor: 'tglKembali' },
  { header: 'status', accessor: 'status' },
];

const RiwayatPeminjamanPage = () => {
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
          id={'searchAnggota'}
          name={'searchAnggota'}
          type={'text'}
          value={search}
          iconLeft={<IoIosSearch className="text-gray-500" />}
          placeholder={'Cari Anggota'}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TableDefault
        columns={columns}
        data={dataRiwayatPeminjaman}
        onActionClick={handleEdit}
      />
    </div>
  );
};

export default RiwayatPeminjamanPage;
