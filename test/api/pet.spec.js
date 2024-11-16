// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 906898801

// Em JavaScript, classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL

    // Funções ou Métodos: its
    it('POST Pet', async () => {

        // Atributos, Campos, Características, Configurações
        const pet = await require('../../vendors/json/pet.json')

        // Função de teste em si
        return await request
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
}) // // termina a describe



