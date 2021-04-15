import fastify, { FastifyLoggerInstance } from 'fastify'
import swagger from 'fastify-swagger'
import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

import swaggerConfig from './swagger'
import { ping } from './routes'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })

export default async (): Promise<FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>> => {
  await app.register(swagger, swaggerConfig)

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

  app.get('/', opts, async (_, res) => {
    await res.send({ hello: 'world' })
  })

  app.route(ping())

  return app
}
