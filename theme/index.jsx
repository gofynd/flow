// import FPIClient from "../../../ADO/shadowfire";
import FPIClient from "fdk-store";
import { useFPI } from "fdk-core/utils";
import customTemplates from "./custom-templates";
import "./styles/base.less";
import React from 'react';
import sections from "./sections";

import Footer from "./page-layouts/footer/footer";
import Header from "./page-layouts/header/header";
import { globalDataResolver, pageDataResolver } from "./helper/lib";
import Loader from "./components/loader/loader";

function ThemeProvider({children}) {
  const fpi = useFPI();
  console.log('I am provider from theme', { fpi });

  return (
    <div className="provider">
      { children }
    </div>
  );
}


export default async ({
  applicationID,
  applicationToken,
  domain,
  storeInitialData,
}) => {
  const fpiOptions = {
    applicationID,
    applicationToken,
    domain,
    storeInitialData,
  };
  const { client } = new FPIClient(fpiOptions);

  return {
    globalDataResolver,
    pageDataResolver,
    fpi: client,
    sections,
    customTemplates,
    getGlobalProvider: () => ThemeProvider,
    getHeader: () => Header,
    getFooter: () => Footer,
    getComponentLoadingPage: () => Loader,
    getBlog: () => import(/* webpackChunkName:"getBlog" */ "./pages/blog"),
    getBlogPage: () => import(/* webpackChunkName:"getBlog" */ "./components/blog/BlogPage"),
    getMarketing: () => import(/* webpackChunkName:"getMarketing" */ "./page-layouts/marketing/markting-page"),
    getHome: () => import(/* webpackChunkName:"getHome" */ "./pages/home"),
    getLogin: () => import(/* webpackChunkName:"getLogin" */ "./pages/login"),
    getRegister: () =>
      import(/* webpackChunkName:"getRegister" */ "./pages/register"),
    getNotFound: () =>
      import(
        /* webpackChunkName:"getNotFound" */ "./components/page-not-found/page-not-found"
      ),
    getProductListing: () =>
      import(
        /* webpackChunkName:"getProductListing" */ "./pages/product-listing"
      ),
    getProductDescription: () =>
      import(
        /* webpackChunkName:"getProductDescription" */ "./pages/product-description"
      ),
    getCart: () => import(/* webpackChunkName:"getCart" */ "./pages/cart-landing"),
    getWishlist: () =>
      import(/* webpackChunkName:"getWishlist" */ "./pages/wishlist"),
    getSinglePageCheckout: () =>
      import(
        /* webpackChunkName:"getSinglePageCheckout" */ "./pages/locate-us"
      ),
    getOrderStatus: () =>
      import(/* webpackChunkName:"getOrderStatus" */ "./pages/order-status"),
    getForgotPassword: () =>
      import(/* webpackChunkName:"getForgotPassword" */ "./pages/forgot-password"),
  };
};
