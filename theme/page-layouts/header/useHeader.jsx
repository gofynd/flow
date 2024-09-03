import { useEffect } from "react";
import { useGlobalStore, useFPI } from "fdk-core/utils";

const useHeader = () => {
  const fpi = useFPI();

  const CONTENT = useGlobalStore(fpi.getters.CONTENT);

  const CART_ITEMS_COUNT = useGlobalStore(fpi.getters.CART_ITEMS_COUNT);

  const userLoggedin = useGlobalStore(fpi.getters.LOGGED_IN);

  const configuration = useGlobalStore(fpi?.getters?.CONFIGURATION);

  const cartItemCount = CART_ITEMS_COUNT?.user_cart_items_count;

  useEffect(() => {
    if (
      !(CONTENT?.navigation?.items && CONTENT?.navigation?.items[0]?.navigation)
    ) {
      fpi.content.getNavigations();
    }
  }, []);

  useEffect(() => {
    fpi.cart.getItemCount();
  }, [userLoggedin]);

  return {
    navigation: CONTENT?.navigation?.items?.[0]?.navigation,
    cartItemCount,
    configuration,
  };
};

export default useHeader;
