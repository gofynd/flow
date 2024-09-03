import React from "react";
import { loginGuard } from "../helper/auth-guard";
import RegisterWrap from "../page-layouts/register/register-wrap";

function RegisterPage({ fpi }) {
  return (
    <>
      <RegisterWrap fpi={fpi}></RegisterWrap>
    </>
  );
}

RegisterPage.authGuard = loginGuard;

export default RegisterPage;
