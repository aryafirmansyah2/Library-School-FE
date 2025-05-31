import React from "react";
import ContentEditMajalah from "./ContentEditMajalah";

export async function generateStaticParams() {
  return [];
}

const EditMataPelajaranPage = ({ params }) => {
  const { id } = params;

  return <ContentEditMajalah id={id} />;
};

export default EditMataPelajaranPage;
