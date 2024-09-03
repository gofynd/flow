import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import EmptyState from "../../page-layouts/marketing/EmptyState";
import { useGlobalStore, useFPI } from "fdk-core/utils";

function BlogPage() {
  const fpi = useFPI();
  const { slug } = useParams();

  const blog = useGlobalStore(fpi.getters.BLOG) || {};

  useEffect(() => {
    if (blog?.slug !== slug) {
      fpi.content.getBlog({ slug });
    }
  }, [slug]);

  const { seo = {}, content = [], loading, error } = blog;

  const { title, description } = seo;

  const pageNotFound =
    error?.name === "FDKServerResponseError" &&
    error?.message === "Sorry, document not found";

  const htmlContent =
    content.find((data) => data.type === "rawhtml" || data.type === "html")
      ?.value ?? "";

  const Content = pageNotFound ? (
    <EmptyState message="Blog not found!" />
  ) : (
    <div
      id="custom-page-container"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );

  if (loading) {
    return <h2>Loading Blog content</h2>;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {Content}
    </>
  );
}

BlogPage.serverFetch = ({ router, fpi }) => {
  const { slug } = router?.params ?? {};
  return fpi.content.getBlog({ slug });
};

export default BlogPage;
