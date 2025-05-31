import React from "react";
import ContentEditMataPelajaran from "./ContentEditMataPelajaran";

export async function generateStaticParams() {
  return [];
}

const EditMataPelajaranPage = ({ params }) => {
  const { id } = params;

  return <ContentEditMataPelajaran id={id} />;
};

export default EditMataPelajaranPage;
