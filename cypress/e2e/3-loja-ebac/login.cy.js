///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', ()=> {
    
    beforeEach(() => {
        cy.visit('minha-conta/')
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

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('.woocommerce-form > :nth-child(1) > label').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)'). should('contain' , 'Olá, mauricio.teste (não é mauricio.teste? Sair)')
        
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('.woocommerce-form > :nth-child(1) > label').type(dados.usuario)
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)'). should('contain' , 'Olá, mauricio.teste (não é mauricio.teste? Sair)')
        })

    });

    it.only('Deve fazer login com sucesso - usando comandos customizados ', () => {
        cy.login('mauricio.teste@teste.com', 'teste123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)'). should('contain' , 'Olá, mauricio.teste (não é mauricio.teste? Sair)')
    });
    
})