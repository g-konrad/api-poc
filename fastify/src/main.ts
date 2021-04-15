import cluster from 'cluster'
import os from 'os'

import { range } from 'fp-ts/Array'
import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

import createApp from './app'

const NUM_CPUS = os.cpus().length

// This is the only file where impure code is allowed
/* eslint-disable-next-line functional/no-return-void */
const run = (app: FastifyInstance<Server, IncomingMessage, ServerResponse>): void => {
  app.listen(5555, '0.0.0.0', (err, address) => {
    if (err != null) {
      app.log.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

if (process.env.NODE_ENV === 'production') {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    // Fork workers.
    range(1, NUM_CPUS).map(cluster.fork)

    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`)
    })
  } else {
    console.log(`Worker ${process.pid} started`)
    createApp()
      .then(run, (err) => { console.error(err) })
  }
} else {
  createApp()
    .then(run, (err) => { console.error(err) })
}
