export default {
  openapi: {
    info: {
      title: 'OpenAPI Docs',
      description: 'Automatically generated documentation, using the OpenAPI spec.',
      version: '0.1.0'
    },
    servers: [{ url: 'http://localhost:5555' }]
  },
  routePrefix: '/docs',
  exposeRoute: true
}
