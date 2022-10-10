describe('Blog app', function () {
  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', { name: 'Manna Puuronen', username: 'manteli', password: 'iletnam' })
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
      cy.get('#username')
      cy.get('#password')
    })

    it('User can log in with valid credentials', function () {
      cy.get('#username').type('manteli')
      cy.get('#password').type('iletnam')
      cy.get('#submitLogin').click()
      cy.contains('Manna Puuronen')
    })

    it('User can not log in with invalid credentials', function () {
      cy.get('#username').type('manteli')
      cy.get('#password').type('blaa')
      cy.get('#submitLogin').click()
      cy.should('not.contain', 'Manna Puuronen')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {

        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { name: 'Manna Puuronen', username: 'manteli', password: 'iletnam' })
        cy.visit('http://localhost:3000')
        // TODO: make new cypress command 'login'
        cy.get('#username').type('manteli')
        cy.get('#password').type('iletnam')
        cy.get('#submitLogin').click()
        cy.contains('Manna Puuronen')

    })
    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Blog created by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell')
      cy.contains('Create blog').click()
      cy.contains('Blog created by Cypress')
    })
    it('A blog can be given a like', function () {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {title: 'Blog created by Cypress', author: 'Cypress', url: 'https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell'},
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInBlogUser')).token}`
          }
        })  
        cy.visit('http://localhost:3000')
        cy.contains('Blog created by Cypress').contains('View').click()
        cy.contains('Blog created by Cypress').parent().contains('Like').click()
        cy.contains('Blog created by Cypress').parent().contains('Likes: 1')
    })
    it('A blog can be deleted by creator', function () {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {title: 'Blog created by Cypress', author: 'Cypress', url: 'https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell'},
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInBlogUser')).token}`
        }
      })  
      cy.visit('http://localhost:3000')
      cy.contains('Blog created by Cypress').contains('View').click()
      cy.contains('Blog created by Cypress').parent().contains('Remove').click()
      cy.get('html').should('not.contain', 'Blog created by Cypress')
  })
  it('A blog cannot be deleted by random user', function() {
    cy.request('POST', 'http://localhost:3003/api/users', { name: 'Sanna Muuronen', username: 'santeli', password: 'iletnas' })
    // create blog with Manna Puuronen and logout
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: {title: 'Blog created by Cypress', author: 'Cypress', url: 'https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell'},
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInBlogUser')).token}`
      }
    })
    cy.visit('http://localhost:3000')
    cy.contains('Blog created by Cypress')
    cy.contains('Logout').click()
     // login as Sanna Muuronen and try to remove blog
    cy.get('#username').type('santeli')
    cy.get('#password').type('iletnas')
    cy.get('#submitLogin').click()
    cy.contains('Sanna Muuronen')
    cy.contains('Blog created by Cypress').contains('View').click()
    cy.contains('Blog created by Cypress').parent().contains('Remove').click()
    cy.contains('Blog created by Cypress')
  })
  })
})