import LoginPage from '../pages/LoginPage';

describe('OrangeHRM Login Feature - Automation Testing with Page Object Model (POM)', () => {

    const loginPage = new LoginPage();
    
    beforeEach(() => {
        loginPage.visitPage();
        loginPage.verifyLoginTitleVisible();
    });

    // Positive Test Cases
    it('Test 01: Login Berhasil Menggunakan Email dan Password yang Valid', () => {
        loginPage.enterUsername('Admin');
        loginPage.enterPassword('admin123');
        loginPage.clickSubmit();

        cy.url().should('include', '/dashboard');
        loginPage.labelDashboardHeader().should('have.text', 'Dashboard');
    });

    it('Test 02: Memastikan Struktur Tipe Masking pada Kolom Password', () => {
        loginPage.inputPassword().should('have.attr', 'type', 'password');
    });

    it('Test 03: Navigasi ke Halaman "Forgot Your Password?"', () => {
        loginPage.clickForgotPassword();

        cy.url().should('include', '/requestPasswordResetCode');
        loginPage.labelForgotPasswordTitle().should('have.text', 'Reset Password');
    });

    // Negative Test Cases
    it('Test 04: Login Gagal dengan Mengosongkan Seluruh Field', () => {
        loginPage.clickSubmit();

        loginPage.inputGroupMessage().should('have.length', 2).and('include.text', 'Required');
    });

    it('Test 05: Login Gagal dengan Mengosongkan Kolom Username', () => {
        loginPage.enterPassword('admin123');
        loginPage.clickSubmit();

        loginPage.inputGroupContainer().eq(0).should('include.text', 'Required');
    });

    it('Test 06: Login Gagal dengan Mengosongkan Kolom Password', () => {
        loginPage.enterUsername('Admin');
        loginPage.clickSubmit();

        loginPage.inputGroupContainer().eq(1).should('include.text', 'Required');
    });

    it('Test 07: Login Gagal Menggunakan Username yang Salah', () => {
        loginPage.enterUsername('AdminSalah');
        loginPage.enterPassword('admin123');
        loginPage.clickSubmit();

        loginPage.alertErrorMessage().should('be.visible').and('include.text', 'Invalid credentials');
    });

    it('Test 08: Login Gagal Menggunakan Password yang Salah', () => {
        loginPage.enterUsername('Admin');
        loginPage.enterPassword('passwordSalah');
        loginPage.clickSubmit();

        loginPage.alertErrorMessage().should('be.visible').and('include.text', 'Invalid credentials');
    });

    it('Test 09: Login Gagal Menggunakan Username dan Password yang Salah', () => {
        loginPage.enterUsername('ADMIN');
        loginPage.enterPassword('admin12345');
        loginPage.clickSubmit();

        loginPage.alertErrorMessage().should('be.visible').and('include.text', 'Invalid credentials');
    });

    it('Test 10: Login Gagal Menggunakan Karakter Sensitif (Case Sensitive)', () => {
        loginPage.enterUsername('Admin'); 
        loginPage.enterPassword('Admin123');
        loginPage.clickSubmit();

        loginPage.alertErrorMessage().should('be.visible').and('include.text', 'Invalid credentials');
    });
});