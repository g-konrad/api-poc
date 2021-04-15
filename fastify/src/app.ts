import fastify, { FastifyLoggerInstance } from 'fastify'
import swagger from 'fastify-swagger'
import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

import swaggerConfig from './swagger'
import { ping } from './routes'

const createApp = async (): Promise<FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>> => {
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })

  await app.register(swagger, swaggerConfig)

  app.route(ping())

  return app
}

export default createApp
