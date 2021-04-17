import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

import fastify, { FastifyLoggerInstance } from 'fastify'
import multipart from 'fastify-multipart'
import swagger from 'fastify-swagger'
import { flow } from 'fp-ts/lib/function'
import * as T from 'fp-ts-contrib/lib/Task'

import { register, route } from './app-helpers'
import { swaggerCfg } from './config'
import { ping, fileUpload } from './routes'

type T = FastifyInstance

const createApp = (): T => {
  const app: T = fastify({ logger: true })

  return flow(
    register(swagger, swaggerCfg),
    register(multipart),
    route(ping.get),
    route(fileUpload.get({ url: '/upload-file' })),
    route(fileUpload.post({ url: '/upload-file' }))
  )(app)
}

export default createApp
