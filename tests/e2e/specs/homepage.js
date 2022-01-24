describe('Home Page', () => {
  it('Should load the home page', () => {
    cy.visit('/')
  })
  it('Should render movie table', () => {
    cy.get('table').contains('td', 'Swordquest: Waterworld')
  })
  it('Should add third movie to favorites', () => {
    cy.get('.favouriteCheckbox').eq(2).click()
  })
  it('Should view favorites', () => {
    cy.get('#favourites-btn').click()
  })
  it('Should show all movies', () => {
    cy.get('#favourites-btn').click()
  })
  it('Should search for a movie', () => {
    const movie = 'Aquaman'
    cy.get('#search-text-field')
      .type('Aquaman')
      .should('have.value', movie)
    cy.get('table').contains('td', 'Aquaman')
  })
  it('Should clear search', () => {
    cy.get('#search-text-field').focus().clear()
  })
  it('Should go to next table page', () => {
    cy.get('[type=button][aria-label="Next page"]').click()
  })
})
