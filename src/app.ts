import fastify from 'fastify'
import swagger from 'fastify-swagger'
import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

import swaggerConfig from './swagger'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })

export default () => {
  const opts = {
    schema: {
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }

  app.get('/', opts, (req, res) => {
    res.send({ hello: 'world' })
  })

  app.register(swagger, swaggerConfig)

  app.ready((err) => err != null ? err : app.swagger())

  app.listen(5555, '0.0.0.0', (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
