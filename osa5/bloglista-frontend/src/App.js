import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObj = {
      title: title,
      author: author,
      url: url,
    };
    const data = await blogService.create(blogObj);
    setBlogs(blogs.concat(data));
    setTitle("");
    setAuthor("");
    setUrl("");

    setMessage(`a new blog ${blogObj.title} by ${blogObj.author} added!`);
    setType("notification");
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h3>log in:</h3>
      <div>
        Username:
        <input
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
          type="password"
          value={password}
          name="Password"
          onChange={(target) => setPassword(target.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <div>
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
      <h3>create new</h3>
      <form>
        <p>
          <button
            type="button"
            onClick={() => console.group(title, author, url)}
          />
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
          <button type="submit" onClick={addBlog}>
            create
          </button>
        </p>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <div>{user ? blogList() : loginForm()}</div>;
};

export default App;
