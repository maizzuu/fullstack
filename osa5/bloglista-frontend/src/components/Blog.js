import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, showRemove, handleRemove, handleLike }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    showRemove: PropTypes.bool.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  return (
    <div style={blogStyle} data-testid="blog" className="blog">
      {blog.title} {blog.author}{" "}
      <button
        onClick={() => setOpen(!open)}
        id={`view${blog.title.replace(" ", "")}`}
      >
        {open ? "hide" : "view"}
      </button>
      {open && (
        <>
          <br />
          {blog.url}
          <br />
          likes {likes}{" "}
          <button
            id={`like${blog.title.replace(" ", "")}`}
            onClick={() => {
              handleLike(blog);
              setLikes(likes + 1);
            }}
          >
            like
          </button>
          <br />
          {blog.user?.name}
          <br />
          {showRemove && (
            <button
              onClick={() => handleRemove(blog)}
              id={`remove${blog.title.replace(" ", "")}`}
            >
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
