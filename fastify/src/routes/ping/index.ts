import type { Route } from '../../types/route'

export default (): Route =>
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
