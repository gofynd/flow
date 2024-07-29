import { useGlobalStore, useFPI } from "fdk-core/utils";

export function useLoggedInUser() {
  const fpi = useFPI();
  const userData = useGlobalStore(fpi.getters.USER_DATA);
  const loggedIn = useGlobalStore(fpi.getters.LOGGED_IN);
  const userFetch = useGlobalStore(fpi.getters.USER_FETCHED);

  return {
    userData,
    loggedIn,
    userFetch,
  };
}
