import React from "react";
import ContentDetailJurnal from "./ContentDetailJurnal";

export async function generateStaticParams() {
  return [];
}

const DeatailJurnalPage = ({ params }) => {
  const { id } = params;

  return <ContentDetailJurnal id={id} />;
};

export default DeatailJurnalPage;
