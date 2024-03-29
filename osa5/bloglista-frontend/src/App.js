import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sorted = blogs.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(sorted);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userObj = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("blogUser", JSON.stringify(userObj));
      blogService.setToken(userObj.token);
      setUser(userObj);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("wrong credentials");
      setType("error");
      setTimeout(() => {
        setMessage(null);
        setType(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObj) => {
    const data = await blogService.create(blogObj);
    setBlogs(blogs.concat(data));

    setMessage(`a new blog ${blogObj.title} by ${blogObj.author} added!`);
    setType("notification");
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 5000);
  };

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id).then(() => {
        const now = blogs.filter((b) => b.id !== blog.id);
        setBlogs(now);
      });
    }
  };

  const likeBlog = (blog) => {
    const obj = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    blogService.like(obj);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <Notification type={type} message={message} />
      <h3>log in:</h3>
      <div>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={(target) => {
            setUsername(target.target.value);
          }}
        />
      </div>
      <div>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={(target) => setPassword(target.target.value)}
        />
      </div>
      <button type="submit" id="loginButton">
        login
      </button>
    </form>
  );

  const top = () => (
    <>
      <h1>blogsite</h1>
      <Notification type={type} message={message} />
      <p>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem("blogUser");
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
    </>
  );

  const blogList = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm onSubmit={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          showRemove={blog.user.name === user.name}
          handleRemove={removeBlog}
          handleLike={likeBlog}
        />
      ))}
    </div>
  );
  return (
    <Router>
      <div>{user && top()}</div>

      <Routes>
        <Route
          path="/"
          element={<div>{user ? blogList() : loginForm()}</div>}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Router>
  );
};

export default App;
