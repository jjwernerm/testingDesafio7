const request = require('supertest')
const app = require('../index')

describe('Operaciones CRUD', () => {
  it('Obteniendo un 200', async () => {
    const resultado = await request(app).get('/cafes').send()
    expect(resultado.statusCode).toBe(200)
  })

  it('Obteniendo un 404', async () => {
    const resultado = await request(app).delete('/cafes/5').send().auth(true)
    expect(resultado.statusCode).toBe(404)
  })

  it('Obteniendo un 201', async () => {
    const agregandoCafe = {
      id: 5,
      nombre: 'Leche',
    }
    const resultado = await request(app).post('/cafes').send(agregandoCafe)
    expect(resultado.statusCode).toBe(201)
  })

  it('Obteniendo un 400', async () => {
    const agregandoCafe = {
        id: 4
      }

    const resultado = await request(app).put('/cafes/4').send(agregandoCafe)
    expect(resultado.statusCode).toBe(400)
  })
})
