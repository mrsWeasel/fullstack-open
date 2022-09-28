const login = async (api) => {
    const login = await api.post('/api/login').send({username: 'test', password: 'pass'}).expect(200)
    const token = 'Bearer ' + login?.body?.token

    return token
}

module.exports = {
    login
}