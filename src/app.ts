import fastify from 'fastify'
import swagger from 'fastify-swagger'

import swaggerConfig from './swagger'

const app = fastify({ logger: true })

export default app
  .register(swagger, swaggerConfig)
  .ready((err) => {
    if (err) throw err
    app.swagger()
  })
