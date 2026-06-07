describe('OrangeHRM Login and Dashboard Feature Test', () => {

  it('Automated Testing Login and Dashboard OrangeHRM', () => {

    // Halaman Login

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('img[alt="company-branding"]').should('exist');
    cy.get('.orangehrm-login-title').should('be.visible');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="username"]').should('have.value', 'Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('button[type="submit"]').should('be.enabled');
    cy.get('button[type="submit"]').click();

    // Halaman Dashboard

    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
    cy.get('.oxd-main-menu-item').should('have.length', 12);
    cy.get('input[placeholder="Search"]').type('Admin');
    cy.get('input[placeholder="Search"]').clear();
    cy.get('.orangehrm-dashboard-grid').scrollIntoView();
    cy.get('.orangehrm-copyright').should('include.text', 'OrangeHRM');
    cy.scrollTo('top');
    cy.get('.oxd-userdropdown-name').click();
    cy.get('.oxd-userdropdown-name').trigger('mouseover');
    cy.get('.oxd-userdropdown-link').should('be.visible');

  })

})
