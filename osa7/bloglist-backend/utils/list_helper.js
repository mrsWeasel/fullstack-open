const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length < 1) return 0

  const total = blogs.reduce((a, b) => ({ likes: a.likes + b.likes }), {
    likes: 0,
  })

  return total.likes
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length < 1) return null

  const favorite = blogs.reduce((a, b) => (a.likes >= b.likes ? a : b))

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
