///<reference types="cypress"/>

describe('Funcionalidade: Login', ()=> {

    it('Deve fazer login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('.woocommerce-form > :nth-child(1) > label').type('mauricio.teste@teste.com')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)'). should('contain' , 'Olá, mauricio.teste (não é mauricio.teste? Sair)')
        
    })
})