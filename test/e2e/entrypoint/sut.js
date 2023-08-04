const app = {
  info: {
    version: '1.0.0',
    title: 'App',
    license: {
      name: 'MIT',
      url: 'http://example.com',
    },
    description: 'API desctiption',
    contact: {
      name: 'contact name',
      url: 'http://example.com',
      email: 'test@test.com',
    },
    termsOfService: 'http://example.com',
  },
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'APPPPP',
        },
        port: {
          enum: [
            '8443',
            '443',
          ],
          default: '8443',
        },
        basePath: {
          default: 'v2',
        },
      },
    },
  ],
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  filesPattern: './infos/routes/app/**/*.js',
  baseDir: '.',
  componentsPath: './infos/components/app/**/*.yaml',
  tagsPath: './infos/tags/app/**/*.yaml',
  outputFile: './data/app-swagger.json',
};

const backoffice = {
  info: {
    version: '1.0.0',
    title: 'Backoffice',
    license: {
      name: 'MIT',
      url: 'http://example.com',
    },
    description: 'API do backoffice',
    contact: {
      name: 'contact name',
      url: 'http://example.com',
      email: 'test@test.com',
    },
    termsOfService: 'http://example.com',
  },
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'Backofficeee`',
        },
        port: {
          enum: [
            '8443',
            '443',
          ],
          default: '8443',
        },
        basePath: {
          default: 'v2',
        },
      },
    },
  ],
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  filesPattern: './infos/routes/backoffice/**/*.js',
  baseDir: '.',
  componentsPath: './infos/components/backoffice/**/*.yaml',
  tagsPath: './infos/tags/**/*.yaml',
  outputFile: './data/backoffice-swagger.json',
};

const expectedSwaggerApp = {
  info: {
    version: '1.0.0',
    title: 'App',
    license: {
      name: 'MIT',
      url: 'http://example.com',
    },
    description: 'API desctiption',
    contact: {
      name: 'contact name',
      url: 'http://example.com',
      email: 'test@test.com',
    },
    termsOfService: 'http://example.com',
  },
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'APPPPP',
        },
        port: {
          enum: [
            '8443',
            '443',
          ],
          default: '8443',
        },
        basePath: {
          default: 'v2',
        },
      },
    },
  ],
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  components: {
    securitySchemes: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    schemas: {
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Dogs',
          },
        },
        xml: {
          name: 'category',
        },
      },
    },
  },
  paths: {
    '/api/v1': {
      get: {
        deprecated: false,
        summary: 'This is the summary or description of the endpoint',
        security: [],
        responses: {
          200: {
            description: 'success response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Cat',
                },
              },
            },
          },
          400: {
            description: 'Bad request response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
        parameters: [],
        tags: [
          'cat',
        ],
      },
    },
  },
  tags: [
    {
      name: 'cat',
      description: 'Everything about your cat',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io',
      },
    },
  ],
};

const expectedSwaggerBackoffice = {
  info: {
    version: '1.0.0',
    title: 'Backoffice',
    license: {
      name: 'MIT',
      url: 'http://example.com',
    },
    description: 'API do backoffice',
    contact: {
      name: 'contact name',
      url: 'http://example.com',
      email: 'test@test.com',
    },
    termsOfService: 'http://example.com',
  },
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'Backofficeee`',
        },
        port: {
          enum: [
            '8443',
            '443',
          ],
          default: '8443',
        },
        basePath: {
          default: 'v2',
        },
      },
    },
  ],
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  components: {
    securitySchemes: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 10,
          },
          username: {
            type: 'string',
            example: 'theUser',
          },
          firstName: {
            type: 'string',
            example: 'John',
          },
          lastName: {
            type: 'string',
            example: 'James',
          },
          email: {
            type: 'string',
            example: 'john@email.com',
          },
          password: {
            type: 'string',
            example: '12345',
          },
          phone: {
            type: 'string',
            example: '12345',
          },
          userStatus: {
            type: 'integer',
            description: 'User Status',
            format: 'int32',
            example: 1,
          },
        },
        xml: {
          name: 'user',
        },
      },
    },
  },
  paths: {
    '/api/v1': {
      get: {
        deprecated: false,
        summary: 'This is the summary or description of the endpoint',
        security: [],
        responses: {
          200: {
            description: 'success response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          400: {
            description: 'Bad request response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
        parameters: [],
        tags: [
          'pet',
        ],
      },
    },
  },
};

module.exports = {
  projectApp: {
    options: app,
    expectedSwagger: expectedSwaggerApp,
  },
  projectBackoffice: {
    options: backoffice,
    expectedSwagger: expectedSwaggerBackoffice,
  },
};
