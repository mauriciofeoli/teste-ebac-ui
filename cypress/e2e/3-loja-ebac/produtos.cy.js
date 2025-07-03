///<reference types="cypress"/>
import produtosPage from "../../support/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
            produtosPage.visitarUrl()
        });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        //.first()
        //.last()
        //.eq(2)
        //.contains('Ariel Roll Sleeve Sweatshirt')
        //.click()
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')
        
    });

    it('Deve buscar um produto  com sucesso', () => {
        let produto = 'Abominable Hoodie'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain' , produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Aero Daily Fitness Tee')
        cy.get('.product_title').should('contain' , 'Aero Daily Fitness Tee')
        
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 3
        produtosPage.buscarProduto('Atomic Endurance Running Tee (Crew-Neck)') 
        produtosPage.addProdutoCarrinho('M', 'Blue', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Atomic Endurance Running Tee (Crew-Neck)” foram adicionados no seu carrinho.')
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            
            produtosPage.buscarProduto(dados[1].nomeProduto) 
            produtosPage.addProdutoCarrinho(
                dados[1].tamanho,
                dados[1].cor,
                dados[1].quantidade 
            )
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
        })
        
    });

});