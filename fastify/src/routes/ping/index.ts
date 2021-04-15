import type { Route } from '../../types/route'

const get = (): Route =>
  ({
    method: 'GET',
    url: '/ping',
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    },
    handler: async (): Promise<string> => 'pong'
  })

export default { get }
