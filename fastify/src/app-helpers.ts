import type { FastifyInstance, FastifyRegister } from 'fastify'
import type { Task } from 'fp-ts/lib/Task'

// We can't control if fastify uses `this` internally
/* eslint-disable-next-line @typescript-eslint/unbound-method */
export const route = <T extends FastifyInstance>(app: T): T => app.route

// need to get this type right
export const register = async <T extends FastifyInstance>(app: T): Task<T> => app.register
