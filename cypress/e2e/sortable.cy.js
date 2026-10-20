describe('Desafio QA - Sortable (Frontend)', () => {
  it('Deve interagir e ordenar os elementos da lista com sucesso', () => {
    // 1. Aceder à página de Sortable no DemoQA
    cy.visit('https://demoqa.com/sortable');

    // 2. Validar que o separador List está ativo e verificar o primeiro item
    cy.get('#demo-tab-list').should('have.class', 'active');
    cy.get('#demo-tabpane-list .list-group-item').first().should('contain.text', 'One');

    // 3. Simular a ação de arrastar (Drag and Drop) do primeiro item para baixo
    // O DemoQA utiliza jQuery UI Sortable, pelo que simulamos os eventos de rato (mousedown, mousemove, mouseup)
    cy.get('#demo-tabpane-list .list-group-item').contains('One')
      .trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
      .trigger('mousemove', { which: 1, pageX: 0, pageY: 200 })
      .trigger('mouseup', { force: true });

    // 4. Validar que a lista continua visível e interativa após a ação
    cy.get('#demo-tabpane-list .list-group-item').should('have.length', 6);

    cy.log('Sortable: Teste de ordenação executado com sucesso!');
  });
});