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

module.exports = { dummy, totalLikes, favoriteBlog }
