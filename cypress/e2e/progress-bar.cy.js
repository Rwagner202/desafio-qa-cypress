
describe('Diagnóstico - Progress Bar (Frontend)', () => {
  it('Deve mostrar o comportamento dos botões Start, Stop e Reset', () => {
    cy.visit('https://demoqa.com/progress-bar');

    // Conferir o estado inicial
    cy.get('#progressBar').should('have.text', '0%');
    cy.get('#startStopButton').should('be.visible').click();

    // Esperar a barra começar a avançar
    cy.get('#progressBar', { timeout: 10000 }).should(($bar) => {
      const valor = parseInt($bar.text().replace('%', ''), 10);
      expect(valor).to.be.greaterThan(0);
    });

    // Parar o progresso e registrar o percentual
    cy.get('#startStopButton').click();

    cy.get('#progressBar').invoke('text').then((texto) => {
      cy.log(`Percentual após parar: ${texto}`);
    });

    // Verificar o texto do botão antes de continuar
    cy.get('#startStopButton').invoke('text').then((texto) => {
      cy.log(`Botão após parar: ${texto}`);
    });
  });
});
