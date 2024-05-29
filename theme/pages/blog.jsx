import React, { useEffect } from "react";
import { useGlobalStore } from "fdk-core/utils";
import { FDKLink } from "fdk-core/components";
import { useFPI } from "fdk-core/utils";
import { BlogCard } from "../components/blog/BlogCard";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  cardWrapper: {
    maxWidth: "400px",
    border: "1px solid",
    borderRadius: "9px",
    margin: "25px",
  },
};

function BlogsListPage() {
  const fpi = useFPI();
  const { loading, items } = useGlobalStore(fpi.getters.BLOGS) || {};

  console.log("items", items);
  useEffect(() => {
    if (!items?.length) {
      fpi.content.fetchBlogs();
    }
  }, []);

  if (loading) {
    return <h2>Loading Blogs... </h2>;
  }

  return (
    <div className="blog-container" style={styles.container}>
      {items?.map?.((blog) => (
        /* eslint-disable-next-line no-underscore-dangle */
        <div className="card-wrapper" key={blog._id} style={styles.cardWrapper}>
          <FDKLink to={`/blog/${blog.slug}`}>
            <BlogCard blog={blog} />
          </FDKLink>
        </div>
      )) ?? null}
    </div>
  );
}

BlogsListPage.serverFetch = ({ fpi }) => fpi.content.fetchBlogs();

export default BlogsListPage;
