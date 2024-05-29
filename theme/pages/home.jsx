import React, { useEffect } from "react";
import { SectionRenderer } from "fdk-core/components";
import { useGlobalStore } from "fdk-core/utils";
import Loader from "../components/loader/loader";
import { getThemeGlobalConfig } from "../helper/theme";

function Home({ numberOfSections, fpi }) {
  const page = useGlobalStore(fpi.getters.PAGE) || {};
  const THEME = useGlobalStore(fpi.getters.THEME);
  const globalConfig = getThemeGlobalConfig(THEME?.config);
  const { sections = [], loading, error } = page || {};
  useEffect(() => {
    fpi.collection.fetchCollection({}).then((e) => console.log(e));
  }, []);

  if (error) {
    return (
      <>
        <h1>Error Occured !</h1>
        <pre>{JSON.stringify(error, null, 4)}</pre>
      </>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <SectionRenderer
        sections={sections}
        fpi={fpi}
        globalConfig={globalConfig}
      />
    </div>
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

export const sections = JSON.stringify([
  {
    attributes: {
      page: "home",
    },
  },
]);

Home.serverFetch = ({ fpi }) => fpi.content.fetchNavigation();

export default Home;
