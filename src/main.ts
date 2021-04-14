import cluster from 'cluster'
import os from 'os'

import { range } from 'fp-ts/Array'

import app from './app'

const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Fork workers.
  range(1, numCPUs).map(cluster.fork)

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app()

  console.log(`Worker ${process.pid} started`)
}
