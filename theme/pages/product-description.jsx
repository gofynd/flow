import React from "react";
import ProductDescriptionPdp from "../page-layouts/pdp/product-description/product-description";
import { useParams } from "react-router-dom";
import { FDKExtension } from "fdk-core/components";
import { getBindingFromPosition } from "../helper/utils";

function ProductDescription({ fpi }) {
  const { slug } = useParams();

  return (
    <>
      <ProductDescriptionPdp fpi={fpi} slug={slug} />;
      <FDKExtension
        binding={getBindingFromPosition(fpi, "below_price_component")}
      />
      {/* <FDKExtension
        binding={getBindingFromPosition(fpi, "above_price_breakup")}
      /> */}
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
  const dataPromises = [
    // fpi.pageConfig.fetchPageConfig('PDP'),
  ];
  if (slug) {
    dataPromises.push(fpi.product.fetchProductBySlug({ slug }));
    dataPromises.push(fpi.product.fetchProductMeta({ slug: slug }));
  }

  return Promise.all(dataPromises);
};

// ProductDescription.authGuard = isLoggedIn;

export default ProductDescription;
