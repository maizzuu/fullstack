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

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
