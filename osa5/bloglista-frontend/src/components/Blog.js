import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, showRemove, handleRemove }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    showRemove: PropTypes.bool.isRequired,
    handleRemove: PropTypes.func.isRequired,
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

  const handleLike = () => {
    const obj = {
      ...blog,
      user: blog.user.id,
      likes: likes + 1,
    };
    blogService.like(obj);
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setOpen(!open)}>{open ? "hide" : "view"}</button>
      {open && (
        <>
          <br />
          {blog.url}
          <br />
          likes {likes} <button onClick={() => handleLike()}>like</button>
          <br />
          {blog.user?.name}
          <br />
          {showRemove && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
