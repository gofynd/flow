import { useEffect } from "react";
import { useGlobalStore, useFPI } from "fdk-core/utils";

const useFooter = () => {
  const fpi = useFPI();

  const CONTENT = useGlobalStore(fpi.getters.CONTENT);

  const THEME = useGlobalStore(fpi.getters.THEME);

  const CONTACT_INFO = useGlobalStore(fpi.getters.CONTACT_INFO);

  const configuration = useGlobalStore(fpi?.getters?.CONFIGURATION);

  useEffect(() => {
    if (
      !(CONTENT?.navigation?.items && CONTENT?.navigation?.items[0]?.navigation)
    ) {
      fpi.content.getNavigations();
    }
  }, []);

  return {
    navigation:
      CONTENT?.navigation?.items && CONTENT?.navigation?.items[0]?.navigation,
    appInfo: CONTACT_INFO,
    configuration,
    support: CONTENT?.support_information,
    footerProps: THEME?.config?.list?.[0]?.global_config?.custom?.props,
  };
};

export default useFooter;
