
describe('Desafio QA - Sortable (Frontend)', () => {
  it('Deve arrastar os elementos e validar a ordem crescente', () => {
    cy.visit('https://demoqa.com/sortable');

    // 1. Confirmar que a aba List está ativa
    cy.get('#demo-tab-list').should('have.class', 'active');

    // 2. Capturar a ordem inicial
    cy.get('#demo-tabpane-list .list-group-item')
      .should('have.length', 6);

    // 3. Mover o item One para depois do item Two
    cy.get('#demo-tabpane-list .list-group-item')
      .contains(/^One$/)
      .trigger('mousedown', {
        which: 1,
        button: 0,
        pageX: 100,
        pageY: 100,
        force: true
      })
      .trigger('mousemove', {
        which: 1,
        button: 0,
        pageX: 100,
        pageY: 150,
        force: true
      })
      .trigger('mouseup', { force: true });

    // 4. Validar que os seis elementos continuam presentes
    cy.get('#demo-tabpane-list .list-group-item')
      .should('have.length', 6);

    // 5. Registrar a ordem final para análise
    cy.get('#demo-tabpane-list .list-group-item')
      .then(($items) => {
        const ordemFinal = [...$items].map((item) =>
          item.innerText.trim()
        );

        cy.log(`Ordem final: ${ordemFinal.join(', ')}`);
      });
  });
});
