describe('Desafio QA - Progress Bar (Frontend)', () => {
  it('Deve iniciar a barra de progresso e validar que atinge 100%', () => {
    // 1. Aceder à página da Progress Bar no DemoQA
    cy.visit('https://demoqa.com/progress-bar');

    // 2. Clicar no botão Start para iniciar o carregamento da barra
    cy.get('#startStopButton').click();

    // 3. Aguardar até que o texto interno da barra de progresso atinja 100% 
    // (com um timeout alargado de 15 segundos para dar tempo à animação)
    cy.get('#progressBar', { timeout: 15000 }).should('have.text', '100%');

    // 4. Validar que o botão de Reset fica visível após a conclusão
    cy.get('#resetButton').should('be.visible');

    cy.log('Progress Bar: Concluída e validada com sucesso!');
  });
});