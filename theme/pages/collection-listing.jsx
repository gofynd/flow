import React from "react";
const CollectionListing = ({ fpi }) => {
  return (
    <>
      <h1>This is collection listing</h1>
    </>
  );
};
export const sections = JSON.stringify([]);

CollectionListing.serverFetch = async ({ fpi, router }) => {
  const slug = router?.params?.slug;
  return fpi.catalog.getCollectionDetailBySlug({ slug });
};
export default CollectionListing;
