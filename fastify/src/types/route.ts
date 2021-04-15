import type { RouteOptions, FastifySchema } from 'fastify'
import type { RouteGenericInterface } from 'fastify/types/route'
import type { Server, ServerResponse, IncomingMessage } from 'http'

export type Route = RouteOptions<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown, FastifySchema>
