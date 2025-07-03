///<reference types="cypress"/>

describe('Funcionalidade: Detalhes da conta', () => {
    
    beforeEach(() => {
        cy.visit('minha-conta/edit-account/')
        cy.fixture('perfil').then(login =>{
            cy.login('mauricio.teste@teste.com', 'teste123')
        })
       
    });

    it('Deve completar detalhes da conta com sucesso', () => {
        cy.detalhesConta('Mauricio', 'Oliveira', 'mauricio.qa')
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
        
    });
});