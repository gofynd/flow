import { isRunningOnClient } from "./utils";

export async function isLoggedIn({ fpi, store }) {
  const userFetched = store?.auth?.user_fetched ?? false;
  if (userFetched) {
    const loggedIn = store?.auth?.logged_in;
    return loggedIn;
  }

  const { payload } = await fpi.auth.fetchUserData();

  return !!(payload?.user ?? false);
}

export async function loginGuard({ fpi, store, redirectUrl }) {
  try {
    const loggedIn = await isLoggedIn({ fpi, store });
    if (loggedIn) {
      if (isRunningOnClient()) {
        window.location.navigate(redirectUrl ?? "/");
      }
      return;
    }
  } catch (error) {
    return true;
  }
}
