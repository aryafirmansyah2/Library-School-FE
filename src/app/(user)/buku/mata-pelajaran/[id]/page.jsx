import React from "react";
import ContentDetailMataPelajaran from "./ContentDetailMataPelajaran";

export async function generateStaticParams() {
  return [];
}

const DeatailMataPelajaranPage = ({ params }) => {
  const { id } = params;

  return <ContentDetailMataPelajaran id={id} />;
};

export default DeatailMataPelajaranPage;
