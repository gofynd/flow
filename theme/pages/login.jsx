import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useGlobalStore } from "fdk-core/utils";
import { loginGuard } from "../helper/auth-guard";
import { isRunningOnClient } from "../helper/utils";
import LoginWrap from "../page-layouts/Login/login-wrap";

function LoginPage({ fpi }) {
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl") || "/";

  const loggedIn = useGlobalStore(fpi.getters.LOGGED_IN);

  if (loggedIn) {
    if (isRunningOnClient()) {
      return (window.location.href = redirectUrl);
    }
    return null;
  }

  return (
    <>
      <LoginWrap></LoginWrap>
    </>
  );
}

LoginPage.serverFetch = () => {};

LoginPage.authGuard = loginGuard;

export default LoginPage;
