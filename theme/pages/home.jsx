import React from "react";
import { SectionRenderer } from "fdk-core/components";
import { useGlobalStore, useFPI } from "fdk-core/utils";
import Loader from "../components/loader/loader";
import { getThemeGlobalConfig } from "../helper/theme";

function Home() {
  const fpi = useFPI();
  const page = useGlobalStore(fpi.getters.PAGE) || {};
  const THEME = fpi.getters.THEME(fpi.store.getState());

  const globalConfig = React.useMemo(
    () => getThemeGlobalConfig(THEME?.config),
    [],
  );

  const { sections = [], loading, error } = page || {};
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
      <SectionRenderer sections={sections} globalConfig={globalConfig} />
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

export default Home;
