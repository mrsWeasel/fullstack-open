const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    if (!blogs || blogs.length < 1) return 0
    
    const total = blogs.reduce((a, b) => ({ likes : a.likes + b.likes }), {likes : 0})

    return total.likes
}

module.exports = {
    dummy,
    totalLikes,
}