import fastify from 'fastify'
import multipart from 'fastify-multipart'
import swagger from 'fastify-swagger'

import { swaggerCfg } from './config'
import { ping, fileUpload } from './routes'

const createApp = async (): Promise<any> => {
  const app = fastify({ logger: true })

  await app.register(swagger, swaggerCfg)
  await app.register(multipart)
  app.route(ping.get())
  app.route(fileUpload.get({ url: '/upload-file' }))
  app.route(fileUpload.post({ url: '/upload-file' }))
  return await app
}

export default createApp
