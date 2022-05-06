const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

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

afterAll(() => {
  mongoose.connection.close()
})
