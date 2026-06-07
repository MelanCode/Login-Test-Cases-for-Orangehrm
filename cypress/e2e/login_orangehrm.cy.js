describe('OrangeHRM Login Feature - Automation Testing', () => {
    
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('.orangehrm-login-title').should('be.visible');
    });

    //Positive Test Case
    it('Test 01: Login Berhasil Menggunakan Email dan Password yang Valid', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
    });

    it('Test 02: Memastikan Struktur Tipe Masking pada Kolom Password', () => {
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });

    it('Test 03: Navigasi ke Halaman "Forgot Your Password?"', () => {
        cy.get('.orangehrm-login-forgot-header').click();

        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
    });

    // Negative Test Case
    it('Test 04: Login Gagal dengan Mengosongkan Seluruh Field', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-group__message').should('have.length', 2).and('include.text', 'Required');
    });

    it('Test 05: Login Gagal dengan Mengosongkan Kolom Username', () => {
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-group').eq(0).should('include.text', 'Required');
    });

    it('Test 06: Login Gagal dengan Mengosongkan Kolom Password', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-group').eq(1).should('include.text', 'Required');
    });

    it('Test 07: Login Gagal Menggunakan Username yang Salah', () => {
        cy.get('input[name="username"]').type('AdminSalah');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content').should('be.visible').and('include.text', 'Invalid credentials');
    });

    it('Test 08: Login Gagal Menggunakan Password yang Salah', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('passwordSalah');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content').should('be.visible').and('include.text', 'Invalid credentials');
    });

    it('Test 09: Login Gagal Menggunakan Username dan Password yang Salah', () => {
        cy.get('input[name="username"]').type('ADMIN');
        cy.get('input[name="password"]').type('admin12345');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content').should('be.visible').and('include.text', 'Invalid credentials');
    });

    it('Test 10: Login Gagal Menggunakan Karakter Sensitif (Case Sensitive)', () => {
        cy.get('input[name="username"]').type('Admin'); 
        cy.get('input[name="password"]').type('Admin123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content').should('be.visible').and('include.text', 'Invalid credentials');
    });
});