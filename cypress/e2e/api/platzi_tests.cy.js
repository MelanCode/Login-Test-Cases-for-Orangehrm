describe('Platzi Fake API Categories - 15 Requests Matrix with New URL', () => {

    it('Test 01: GET All Categories - Validate 200 OK Response', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories').then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('Test 02: GET All Categories - Validate Response Is Array', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories').then((res) => {
            expect(res.body).to.be.an('array');
        });
    });

    it('Test 03: GET All Categories - Validate Array Content Length', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories').then((res) => {
            expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('Test 04: GET All Categories - Validate Obligatory Keys inside First Array Object', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories').then((res) => {
            const firstCategory = res.body[0];
            expect(firstCategory).to.have.all.keys('id', 'name', 'image', 'slug', 'creationAt', 'updatedAt');
        });
    });

    it('Test 05: GET Single Category - Validate Status & Specific ID Integrity', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1').then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.id).to.eq(1);
        });
    });

    it('Test 06: GET Single Category - Validate Structure of Image Type Property', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1').then((res) => {
            expect(res.body.image).to.match(/^http/);
        });
    });

    it('Test 07: POST Create Category - Validate Status 201 Created', () => {
        cy.request('POST', 'https://api.escuelajs.co/api/v1/categories/', {
            name: `New Category ${Date.now()}`,
            image: "https://placeimg.com/640/480/any"
        }).then((res) => {
            expect(res.status).to.eq(201);
        });
    });

    it('Test 08: POST Create Category - Validate Value Uniformity', () => {
        const customName = `Custom ${Date.now()}`;
        cy.request('POST', 'https://api.escuelajs.co/api/v1/categories/', {
            name: customName,
            image: "https://placeimg.com/640/480/any"
        }).then((res) => {
            expect(res.body.name).to.eq(customName);
        });
    });

    it('Test 09: POST Create Category - Validate System Timestamp Schema', () => {
        cy.request('POST', 'https://api.escuelajs.co/api/v1/categories/', {
            name: `Test ${Date.now()}`,
            image: "https://placeimg.com/640/480/any"
        }).then((res) => {
            expect(res.body).to.have.property('creationAt');
        });
    });

    it('Test 10: PUT Update Category - Validate Status 200 Success Execution', () => {
        cy.request('PUT', 'https://api.escuelajs.co/api/v1/categories/1', {
            name: "Modified Category Name"
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('Test 11: PUT Update Category - Validate Structural Property Value Change', () => {
        cy.request('PUT', 'https://api.escuelajs.co/api/v1/categories/1', {
            name: "Validation Checking Name"
        }).then((res) => {
            expect(res.body.name).to.eq("Validation Checking Name");
        });
    });

    it('Test 12: DELETE Category - Validate Status Code Integrity Option', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.escuelajs.co/api/v1/categories/999',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 400, 404]);
        });
    });

    it('Test 13: GET Invalid Category ID Structure - Validate Server Rejection', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/string_instead_of_integer',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.oneOf([400, 412, 500]);
        });
    });

    it('Test 14: GET Categories Limit Filter - Validate Query Param Behavior', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories?limit=5').then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array');
        });
    });

    it('Test 15: GET Single Category Metadata - Validate Headers Property Content-Type', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1').then((res) => {
            expect(res.headers['content-type']).to.include('application/json');
        });
    });

});