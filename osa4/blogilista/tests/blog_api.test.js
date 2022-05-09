const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
]

describe("when there are two blogs in db by default", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test("all blogs are returnes as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("id field name is correct", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0].id).toBeDefined()
  })

  test("blog can be added", async () => {
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    const titles = response.body.map((b) => b.title)
    expect(titles).toContain("First class tests")
  })

  test("new blog with no defined likes defaults to 0", async () => {
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      __v: 0,
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    expect(response.body[2].likes).toEqual(0)
  })

  test("blog with no title or url gives status 400", async () => {
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      author: "Robert C. Martin",
      __v: 0,
    }
    await api.post("/api/blogs").send(newBlog).expect(400)
  })

  test("blog gets deleted", async () => {
    await api.delete("/api/blogs/5a422a851b54a676234d17f7")

    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(1)
  })

  test("updating a blog works", async () => {
    const blog = {
      title: "Updated blog",
    }

    await api.put("/api/blogs/5a422a851b54a676234d17f7").send(blog)

    const response = await api.get("/api/blogs")

    expect(response.body[0].title).toContain("Updated blog")
  })
})

describe("when there is one default user", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("password1", 10)
    const user = new User({ username: "admin", passwordHash })

    await user.save()
  })

  test("creating works with unique username", async () => {
    const newUser = {
      username: "test",
      name: "Test Tester",
      password: "password2",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/users")
    expect(response.body).toHaveLength(2)
    const usernames = response.body.map((u) => u.username)
    expect(usernames).toContain("test")
  })

  test("invalid username is not accepted", async () => {
    const newUser = {
      username: "t",
      name: "Test",
      password: "password2",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "username must consist of at least 3 characters"
    )
    const response = await api.get("/api/users")
    expect(response.body).toHaveLength(1)
  })

  test("invalid password is not accepted", async () => {
    const newUser = {
      username: "test",
      name: "Test",
      password: "p",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "password must consist of at least 3 characters"
    )
    const response = await api.get("/api/users")
    expect(response.body).toHaveLength(1)
  })

  test("taken username is not accepted", async () => {
    const newUser = {
      username: "admin",
      name: "Not Unique",
      password: "unique",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username is already taken")
    const response = await api.get("/api/users")
    expect(response.body).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
