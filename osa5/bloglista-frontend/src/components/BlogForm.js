import React, { useState } from "react";

const BlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const blogObj = {
          title: title,
          author: author,
          url: url,
        };
        console.log(blogObj);
        props.onSubmit(blogObj);
        setTitle("");
        setAuthor("");
        setUrl("");
      }}
    >
      <h3>create new</h3>
      <p>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(target) => setTitle(target.target.value)}
        />
        <br />
        author:{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={(target) => setAuthor(target.target.value)}
        />{" "}
        <br />
        url:{" "}
        <input
          type="text"
          name="url"
          value={url}
          onChange={(target) => setUrl(target.target.value)}
        />
        <button type="submit">create</button>
      </p>
    </form>
  );
};

export default BlogForm;
