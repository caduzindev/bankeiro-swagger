const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

test('should parse jsdoc path response with oneOf keyword', () => {
  const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary of the endpoint
       * @return {oneOf|Song|Album} 200 - success response - application/json
       */
    `];
  const expected = {
    paths: {
      '/api/v1': {
        get: {
          deprecated: false,
          description: undefined,
          summary: 'This is the summary of the endpoint',
          parameters: [],
          tags: [],
          security: [],
          responses: {
            200: {
              description: 'success response',
              content: {
                'application/json': {
                  schema: {
                    oneOf: [
                      {
                        $ref: '#/components/schemas/Song',
                      },
                      {
                        $ref: '#/components/schemas/Album',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  const parsedJSDocs = jsdocInfo()(jsodInput);
  const result = setPaths({}, parsedJSDocs);
  expect(result).toEqual(expected);
});

test('should parse jsdoc path reference params with allOf keyword', () => {
  const jsodInput = [`
    /**
     * GET /api/v1
     * @param {allOf|Song|Album} name.query.required - name param description
     */
  `];
  const expected = {
    paths: {
      '/api/v1': {
        get: {
          deprecated: false,
          description: undefined,
          summary: '',
          responses: {},
          security: [],
          tags: [],
          parameters: [{
            deprecated: false,
            description: 'name param description',
            in: 'query',
            name: 'name',
            required: true,
            schema: {
              allOf: [
                {
                  $ref: '#/components/schemas/Song',
                },
                {
                  $ref: '#/components/schemas/Album',
                },
              ],
            },
          }],
        },
      },
    },
  };
  const parsedJSDocs = jsdocInfo()(jsodInput);
  const result = setPaths({}, parsedJSDocs);
  expect(result).toEqual(expected);
});
