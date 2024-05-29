import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useGlobalStore } from "fdk-core/utils";
import { useParams } from "react-router-dom";
import EmptyState from "./EmptyState";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { HTMLContent } from "./HTMLContent";
import { useFPI } from "fdk-core/utils";

function MarketingPage() {
  const fpi = useFPI();
  const { slug } = useParams();
  const containerRef = useRef(null);
  const customPage = useGlobalStore(fpi.getters.CUSTOM_PAGE) || {};

  useEffect(() => {
    if (customPage?.slug !== slug) {
      fpi.content.fetchCustomPageData({ slug });
    }
  }, [slug]);

  const {
    seo = {},
    sanitized_content: sanitizedContent = [],
    error,
  } = customPage || {};

  const pageNotFound =
    error?.name === "FDKServerResponseError" &&
    error?.message === "Sorry, document not found";

  if (pageNotFound) {
    return <EmptyState message="Page not found!" />;
  }
  const { title, description } = seo;

  const renderContent = sanitizedContent.map((content) => {
    const { type, value } = content;
    if (["html", "rawhtml"].includes(type)) {
      return <HTMLContent ref={containerRef} key={type} content={value} />;
    }

    if (type === "markdown") {
      return <MarkdownRenderer key={type} content={value} />;
    }

    if (type === "css") {
      return (
        <style data-testid="cssStyle" key={type}>
          {value}
        </style>
      );
    }
    return null;
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div id="custom-page-container">{renderContent}</div>
    </>
  );
}

MarketingPage.serverFetch = ({ router, fpi }) => {
  const { slug } = router?.params ?? {};
  return fpi.content.fetchCustomPageData({ slug });
};

export default MarketingPage;
