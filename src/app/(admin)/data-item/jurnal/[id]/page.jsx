import React from "react";
import ContentEditJurnal from "./ContentEditJurnal";

export async function generateStaticParams() {
  return [];
}

const EditMataPelajaranPage = ({ params }) => {
  const { id } = params;

  return <ContentEditJurnal id={id} />;
};

export default EditMataPelajaranPage;
