import type { FastifyReply, FastifyRequest, RouteOptions, FastifySchema } from 'fastify'
import type { RouteGenericInterface } from 'fastify/types/route'
import type { Server, ServerResponse, IncomingMessage } from 'http'

export default (): RouteOptions<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown, FastifySchema> => ({
  method: 'GET',
  url: '/ping',
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: async (_: FastifyRequest, res: FastifyReply): Promise<void> => {
    await res.send('pong')
  }
})
