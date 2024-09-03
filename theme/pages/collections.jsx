import React, { useEffect } from "react";

function collections({ fpi }) {
  const getCollectionsAPI = async ({
    fpi,
    pageNo = null,
    pageSize = 40,
    q = "",
    tag = "",
  }) => {
    const payload = {
      pageSize,
    };
    if (pageNo) payload.pageNo = pageNo;
    if (q) payload.q = q;
    if (tag) payload.tag = tag;
    try {
      return fpi.collection.getCollections(payload);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getCollectionsAPI({ fpi });
  }, []);

  return <div>collection</div>;
}

export const sections = JSON.stringify([]);
export default collections;
