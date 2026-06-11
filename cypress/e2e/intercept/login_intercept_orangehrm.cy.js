describe('OrangeHRM Login Feature - Automation Testing with Intercept', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('.orangehrm-login-title').should('be.visible');
    });

    // Positive Test Case
    it('Test 01: Login Berhasil Menggunakan Username dan Password yang Valid', () => {

        cy.intercept('POST', '**/auth/validate').as('loginSuccess');

        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginSuccess').then((interception) => {
            expect(interception.request.method).to.eq('POST');
        });

        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');
    });

    it('Test 02: Memastikan Struktur Tipe Masking pada Kolom Password', () => {

        cy.intercept('GET', '**/auth/login').as('loginPage');

        cy.reload();

        cy.wait('@loginPage').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get('input[name="password"]')
            .should('have.attr', 'type', 'password');
    });

    it('Test 03: Navigasi ke Halaman Forgot Your Password?', () => {

        cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPassword');

        cy.get('.orangehrm-login-forgot-header').click();

        cy.wait('@forgotPassword').then((interception) => {
            expect(interception.request.url)
                .to.include('/requestPasswordResetCode');
        });

        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('.orangehrm-forgot-password-title')
            .should('contain.text', 'Reset Password');
    });

    // Negative Test Case
    it('Test 04: Login Gagal dengan Mengosongkan Seluruh Field', () => {

        cy.intercept('POST', '**/auth/validate').as('emptyFields');

        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-group__message')
            .should('have.length', 2)
            .and('contain.text', 'Required');

        cy.get('@emptyFields.all').should('have.length', 0);
    });

    it('Test 05: Login Gagal dengan Mengosongkan Kolom Username', () => {

        cy.intercept('POST', '**/auth/validate').as('emptyUsername');

        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-group')
            .eq(0)
            .should('contain.text', 'Required');

        cy.get('@emptyUsername.all').should('have.length', 0);
    });

    it('Test 06: Login Gagal dengan Mengosongkan Kolom Password', () => {

        cy.intercept('POST', '**/auth/validate').as('emptyPassword');

        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-group')
            .eq(1)
            .should('contain.text', 'Required');

        cy.get('@emptyPassword.all').should('have.length', 0);
    });

    it('Test 07: Login Gagal Menggunakan Username yang Salah', () => {

        cy.intercept('POST', '**/auth/validate').as('wrongUsername');

        cy.get('input[name="username"]').type('AdminSalah');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.wait('@wrongUsername').then((interception) => {

            expect(interception.request.body)
                .to.contain('username=AdminSalah');

        });

        cy.get('.oxd-alert-content')
            .should('contain.text', 'Invalid credentials');
    });

    it('Test 08: Login Gagal Menggunakan Password yang Salah', () => {

        cy.intercept('POST', '**/auth/validate').as('wrongPassword');

        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('passwordSalah');
        cy.get('button[type="submit"]').click();

        cy.wait('@wrongPassword').then((interception) => {

            expect(interception.request.body)
                .to.contain('password=passwordSalah');

        });

        cy.get('.oxd-alert-content')
            .should('contain.text', 'Invalid credentials');
    });

    it('Test 09: Login Gagal Menggunakan Username dan Password yang Salah', () => {

        cy.intercept('POST', '**/auth/validate').as('invalidCredential');

        cy.get('input[name="username"]').type('ADMIN');
        cy.get('input[name="password"]').type('admin12345');
        cy.get('button[type="submit"]').click();

        cy.wait('@invalidCredential').then((interception) => {

            expect(interception.response.statusCode)
                .to.eq(302);

        });

        cy.get('.oxd-alert-content')
            .should('contain.text', 'Invalid credentials');
    });

    it('Test 10: Login Gagal Menggunakan Karakter Sensitif (Case Sensitive)', () => {

        cy.intercept('POST', '**/auth/validate').as('caseSensitive');

        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('Admin123');
        cy.get('button[type="submit"]').click();

        cy.wait('@caseSensitive').then((interception) => {

            expect(interception.request.body.password)
                .to.not.equal('admin123');

        });

        cy.get('.oxd-alert-content')
            .should('contain.text', 'Invalid credentials');
    });
    
});