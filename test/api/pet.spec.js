// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 906898801

// Em JavaScript, classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    const massa1 = require('../../vendors/json/massaPet')


    // Funções ou Métodos: its
    it('POST Pet', async () => {

        // Atributos, Campos, Características, Configurações
        const pet = require('../../vendors/json/pet.json')

        // Função de teste em si
        return request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.name).toBe('Snoopy')
                expect(res.body.category.name).toBe('Dog')
                expect(res.body.tags[0].name).toBe('vaccinated')
            })

    }) // Final do método POST


    // Métodos POST que lê e cria 3 registros

    it.each(massa1.array.map(elemento => [
        elemento.nomePet,
        elemento.idPet,
        elemento.nomeCategoria,
        elemento.idCategoria
    ]))
        ('POST Pet Data Driven Simples: %s', async (nomePet, idPet, nomeCategoria, idCategoria) => {

            // Atributos, Campos, Características, Configurações
            const pet = await require('../../vendors/json/pet.json')

            // Substituímos os campos que queremos personalizar através da massa
            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            // Função de teste em si
            return await request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe('vaccinated')
                })

        }) // Final do método POST

    // Métodos Get, Put e Delete Simples

    it('GET Pet', async () => {
        return await request
            // .get('/pet/' + petId) // tradicional
            .get(`/pet/${petId}`) // moderno: template literals
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.status).toBe('available')
            })
    })

    it('PUT Pet', async () => {
        const pet = await require('../../vendors/json/petput.json')

        return await request
            .put('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.status).toEqual('sold')
            })
    })

    it('DELETE Pet', async () => {
        return await request
            .delete(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.message).toBe(petId.toString())
            })
    })

    // Testes Data Driven do CRUD (POST, GET, PUT e Delete)
    massa1.array.forEach(({ nomePet, idPet, nomeCategoria, idCategoria }) => {
        it(`POST Pet Data Driven ForEach - ${nomePet}`, () => {
            // Atributos, Campos, Características, Configurações
            const pet = require('../../vendors/json/pet.json')

            // Substituímos os campos que queremos personalizar através da massa
            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            // Função de teste em si
            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe('vaccinated')
                })
        }) // Termina o Post

        it(`GET Pet Data Driven ForEach - ${nomePet}`, () => {
            return request
                // .get('/pet/' + petId) // tradicional
                .get(`/pet/${idPet}`) // moderno: template literals
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.status).toBe('available')
                })
        })

        it(`PUT Pet Data Driven ForEach - ${nomePet}`, () => {
            const pet = require('../../vendors/json/petput.json')

            // Substituímos os campos que queremos personalizar através da massa
            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .put('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.status).toEqual('sold')
                })
        })

        it(`DELETE Pet Data Driven ForEach - ${nomePet}`, () => {
            return request
                .delete(`/pet/${idPet}`)
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.code).toEqual(200)
                    expect(res.body.message).toBe(idPet.toString())
                })
        })
    }) // termina o For Each da massa


}) // // termina a describe



