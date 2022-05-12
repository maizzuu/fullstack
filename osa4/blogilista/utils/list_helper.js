const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((item) => (sum = sum + item.likes))

  return sum
}

const favoriteBlog = (blogs) => {
  let result = blogs.sort(function (a, b) {
    return b.likes - a.likes
  })[0]
  return result
}

const mostBlogs = (blogs) => {
  let grouped = _.groupBy(blogs, "author")
  let amounts = _.map(grouped, (bloglist, a) => ({
    author: a,
    blogs: bloglist.length,
  }))
  let most = _.maxBy(amounts, (a) => a.blogs)
  return most
}

const mostLikes = (blogs) => {
  let onlyLikes = _.map(blogs, (b) => ({ author: b.author, likes: b.likes }))
  let grouped = _.groupBy(onlyLikes, "author")
  let something = _.map(grouped, (blogs, author) => ({
    author,
    likes: totalLikes(blogs),
  }))
  let result = _.maxBy(something, (a) => a.likes)
  return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
