import React from "react";
import ContentEditAnggota from "./ContentEditAnggota";

export async function generateStaticParams() {
  return [];
}

const EditAnggotaPage = ({ params }) => {
  const { id } = params;

  return <ContentEditAnggota id={id} />;
};

export default EditAnggotaPage;
