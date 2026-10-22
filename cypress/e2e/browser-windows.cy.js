Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros internos do DemoQA para não falhar o teste indevidamente
  return false;
});

describe('Desafio QA - Browser Windows (Frontend)', () => {
  it('Deve abrir uma nova janela e validar a mensagem "This is a sample page"', () => {
    // 1. Aceder à página de Browser Windows
    cy.visit('https://demoqa.com/browser-windows');

    //Preparar um stub para monitorizar a abertura da nova janela (window.open)
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

  
    cy.get('#windowButton').click();

    //Validar que a função de abrir janela foi chamada com sucesso
    cy.get('@windowOpen').should('have.been.calledOnce');

    
    cy.visit('https://demoqa.com/sample');

    //Validar que a mensagem "This is a sample page" está visível e correta
    cy.get('#sampleHeading').should('have.text', 'This is a sample page');
    
    cy.log('Nova janela validada com sucesso!');
  });
});