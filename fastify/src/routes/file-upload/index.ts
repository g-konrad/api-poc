import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Route, RouteArgs } from '../../types'

import path from 'path'

const TEMPLATE = `
  <html>
      <head><title>Upload Test</title></head>
      <body>
          <form target="/" method="post" enctype="multipart/form-data">
              <input type="file" multiple name="file"/>
              <button type="submit">Submit</button>
          </form>
      </body>
  </html>
`

const get = ({ url }: RouteArgs): Route =>
  ({
    method: 'GET',
    url,
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    },
    handler: async (_, res: FastifyReply): Promise<void> => {
      await res
        .header('Content-Type', 'text/html; charset=utf-8')
        .code(200)
        .send(TEMPLATE)
    }
  })

const post = ({ url }: RouteArgs): Route =>
  ({
    method: 'POST',
    url,
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    },
    handler: async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
      // Facilitar por enquanto, normalmente usaríamos FP-TS
      /* eslint-disable */
      const files = await req.saveRequestFiles({ tmpdir: path.resolve(process.env.NODE_PATH || '/home/knrd/yungas/api-poc/fastify', '/tmp') })
      res.send(files.map((f) => f.filename).join(', '))
    }
  })

export default { get, post }
