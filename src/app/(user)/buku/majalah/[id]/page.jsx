import React from "react";
import ContentDetailMajalah from "./ContentDetailMajalah";

export async function generateStaticParams() {
  return [];
}

const DeatailMajalahPage = ({ params }) => {
  const { id } = params;

  return <ContentDetailMajalah id={id} />;
};

export default DeatailMajalahPage;
