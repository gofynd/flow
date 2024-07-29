import React from "react";
import ProductDescriptionPdp from "../page-layouts/pdp/product-description/product-description";
import { useParams } from "react-router-dom";
import { FDKExtension } from "fdk-core/components";
import { getBindingFromPosition } from "../helper/utils";

function ProductDescription() {
  const { slug } = useParams();

  return (
    <>
      <ProductDescriptionPdp slug={slug} />;
      <FDKExtension
        binding={getBindingFromPosition(fpi, "below_price_component")}
      />
    </>
  );
}
export const settings = JSON.stringify({
  props: [
    {
      id: "code",
      label: "Your Code Here",
      type: "code",
      default: "",
      info: "Add Your custom HTML Code below. You can also use the full screen icon to open a code editor and add your code",
    },
    {
      type: "extension",
      id: "extension",
      label: "Extension Positions",
      info: "Handle extension in these positions",
      positions: [
        {
          value: "below_price_component",
          text: "Below Price Component",
        },
        {
          value: "above_price_breakup",
          text: "Above Price Breakup",
        },
        {
          value: "below_product_info",
          text: "Below Delivery location",
        },
        {
          value: "product_description_bottom",
          text: "Below Product Description",
        },
      ],
      default: {},
    },
  ],
  blocks: [],
});

ProductDescription.serverFetch = ({ fpi, router }) => {
  const slug = router?.params?.slug;
  const dataPromises = [];
  if (slug) {
    dataPromises.push(fpi.catalog.fetchProductBySlug({ slug }));
    dataPromises.push(fpi.catalog.getProductSizesBySlug({ slug: slug }));
  }

  return Promise.all(dataPromises);
};

export default ProductDescription;
