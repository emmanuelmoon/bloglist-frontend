describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is showing', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    beforeEach(function(){
      const user = {
        username: 'moon',
        name: 'Moon',
        password: 'aspirine'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('moon')
      cy.get('#password').type('aspirine')
      cy.get('#login-button').click()

      cy.contains('Moon logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('moon')
      cy.get('#password').type('Aspirine')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials')
      cy.get('.error').should('have.css', 'color','rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('moon')
        cy.get('#password').type('aspirine')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        const title = 'Get Rich'
        const author = 'Moon'
        const url = 'http://www.example.com'
        cy.get('#add-blog').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#url').type(url)

        cy.get('#submit-button').click()

        cy.contains(`a new blog ${title} by ${author} added`)
        cy.contains(`${title} ${author}`)
      })

      describe('when a blog is present', function() {
        beforeEach(function() {
          const title = 'Get Rich'
          const author = 'Moon'
          const url = 'http://www.example.com'
          cy.get('#add-blog').click()
          cy.get('#title').type(title)
          cy.get('#author').type(author)
          cy.get('#url').type(url)

          cy.get('#submit-button').click()
        })

        it('users can like a blog', function() {
          cy.get('#view').click()
          cy.get('#like').click()

          cy.contains('likes 1')
        })
        it('user who created the blog can delete it', function() {
          cy.get('#view').click()
          cy.get('#delete').click()
          cy.contains('Get Rich Moon').should('not.exist')
        })
        it.only('only creator can see delete button', function() {
          const user = {
            username: 'mona',
            name: 'Mona',
            password: 'aspirine'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.get('#logout').click()

          cy.get('#username').type('mona')
          cy.get('#password').type('aspirine')
          cy.get('#login-button').click()

          cy.get('#view').click()
          cy.contains('remove').should('not.exist')
        })
      })
    })
  })
})