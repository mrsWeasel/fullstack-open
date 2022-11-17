const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithFiveBlogs } = require('./test_data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('get total likes when bloglist empty', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('get total likes when bloglist has 1 blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('get total likes when bloglist has 6 blogs', () => {
    const result = listHelper.totalLikes(listWithFiveBlogs)
    expect(result).toBe(29)
  })
})

describe('favorite blog', () => {
  test('get blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithFiveBlogs)
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    })
  })
})
