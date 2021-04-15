import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

import fastify, { FastifyLoggerInstance } from 'fastify'
import multipart from 'fastify-multipart'
import swagger from 'fastify-swagger'
import { swaggerCfg } from './config'
import { ping, fileUpload } from './routes'

const createApp = async (): Promise<FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>> => {
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })

  await app.register(swagger, swaggerCfg)
  await app.register(multipart)

  app.route(ping.get())
  app.route(fileUpload.get({ url: '/upload-file' }))
  app.route(fileUpload.post({ url: '/upload-file' }))

  return app
}

export default createApp
