///<reference types="cypress"/>

describe('Funcionalidade: Login', ()=> {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach('', () => {
        cy.screenshot()
        
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('.woocommerce-form > :nth-child(1) > label').type('mauricio.teste@teste.com')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)'). should('contain' , 'Olá, mauricio.teste (não é mauricio.teste? Sair)')

    })

    it('Deve exibir uma mensagem de erro ao inserir usuário invalido', () => {
        cy.get('.woocommerce-form > :nth-child(1) > label').type('mauricio@teste.com')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('exist')
        
    });

    it('Deve exibir uma mensagem de erro ao inserir uma senha inválida', () => {
        cy.get('.woocommerce-form > :nth-child(1) > label').type('mauricio.teste@teste.com')
        cy.get('#password').type('teste123@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain' , 'Erro: A senha fornecida para o e-mail mauricio.teste@teste.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error > li').should('exist')
    });
})