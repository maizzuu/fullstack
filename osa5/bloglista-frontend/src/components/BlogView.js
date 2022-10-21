import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    blogService.getById(id).then((res) => {
      setBlog(res);
      setLikes(res.likes);
    });
  }, []);

  const likeBlog = (blog) => {
    const obj = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    blogService.like(obj);
  };

  if (!blog) return;

  return (
    <div>
      <h3>
        {blog.title} {blog.author}
      </h3>
      {blog.url}
      <br />
      likes {likes}{" "}
      <button
        id={`like${blog.title.replace(" ", "")}`}
        onClick={() => {
          likeBlog(blog);
          setLikes(likes + 1);
        }}
      >
        like
      </button>
      <br />
      added by {blog.user.name}
      <br />
    </div>
  );
};

export default BlogView;
