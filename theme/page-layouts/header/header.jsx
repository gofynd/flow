/* eslint-disable react/no-array-index-key */
import React from "react";
import { FDKLink } from "fdk-core/components";
import styles from "../../styles/header.less";
import useHeader from "./useHeader";
import SvgWrapper from "../../components/svgWrapper/SvgWrapper";
import { useLoggedInUser } from "../../helper/hooks";

function Header() {
  const { navigation, cartItemCount, configuration } = useHeader();
  const { loggedIn: isloggedIn, userFetch } = useLoggedInUser();
  const userNavigations = [
    {
      link: "/wishlist",
      IconName: "wishlist",
    },
    {
      link: "/cart",
      IconName: "cart",
    },
    isloggedIn &&
      userFetch && {
        link: "/profile",
        IconName: "account",
      },
  ].filter(Boolean);

  return (
    <header className={`${styles.headerContainer}`}>
      <>
        <div className={styles.headerLogoNavigationContainer}>
          <div className={styles.logoContainer}>
            <FDKLink to="/">
              <img
                src={configuration?.application?.logo?.secure_url || ""}
                alt="logo"
                className={styles.logo}
              />
            </FDKLink>
          </div>
          <div className={styles.navigationContainer}>
            {navigation?.map((navData, index) => (
              <ul className={styles.navigationLink} key={index}>
                <>
                  <FDKLink to={navData?.action?.page?.url}>
                    <span className={styles.navigationHeading}>
                      {navData.display}
                    </span>
                  </FDKLink>
                  {navData?.sub_navigation?.length > 0 && (
                    <div className={styles.svgContainer}>
                      <SvgWrapper
                        svgSrc="arrow-down"
                        className={styles.svgIcon}
                      />
                    </div>
                  )}
                  {navData?.sub_navigation?.length > 0 && (
                    <div className={styles.navigationWrapper}>
                      <div className={styles.l2NavigationContainer}>
                        {navData.sub_navigation.map((l2nav) => {
                          return (
                            <ul
                              className={styles.l2NavigationList}
                              key={l2nav.display}
                            >
                              <FDKLink to={l2nav?.action?.page?.url}>
                                <span className={styles.l2NavigationHeading}>
                                  {l2nav.display}
                                </span>
                              </FDKLink>
                              {l2nav?.sub_navigation?.length > 0 && (
                                <SvgWrapper
                                  svgSrc="arrow-right"
                                  className={styles.svgIcon}
                                  style={{ transform: "scale(0.8)" }}
                                />
                              )}
                              {l2nav?.sub_navigation?.length > 0 && (
                                <div className={styles.l2NavigationWrapper}>
                                  {l2nav.sub_navigation.map((l3nav) => {
                                    return (
                                      <ul
                                        className={styles.l2NavigationList}
                                        key={l3nav.display}
                                      >
                                        <FDKLink to={l3nav?.action?.page?.url}>
                                          <span
                                            className={
                                              styles.l2NavigationHeading
                                            }
                                          >
                                            {l3nav.display}
                                          </span>
                                        </FDKLink>
                                      </ul>
                                    );
                                  })}
                                </div>
                              )}
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              </ul>
            ))}
          </div>
        </div>
        <div className={styles.headerUserNavigationContainer}>
          {userNavigations?.map((svgData) => (
            <div
              className={styles.userNavigationSvgContainer}
              key={svgData.IconName}
            >
              <FDKLink to={svgData.link}>
                <SvgWrapper svgSrc={svgData.IconName} />
                {svgData?.IconName === "cart" && cartItemCount > 0 && (
                  <p className={styles.cartItemCount}>{cartItemCount}</p>
                )}
              </FDKLink>
            </div>
          ))}
          {!isloggedIn && userFetch && (
            <FDKLink to={"/auth/login"} className={styles.signIn}>
              Sign In
            </FDKLink>
          )}
        </div>
      </>
    </header>
  );
}

export default Header;
