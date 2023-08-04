const yamlsToJson = require('../../../consumers/yamlsToJson');

describe('yamls to json consumer method', () => {
  it('should return empty array with not params', () => {
    const input = undefined;
    const expected = [];
    const result = yamlsToJson(input);
    expect(result).toEqual(expected);
  });

  it('should return empty array with not an array as parameter', () => {
    const input = 2;
    const expected = [];
    const result = yamlsToJson(input);
    expect(result).toEqual(expected);
  });

  it('should return object complete with only single file', () => {
    const input = ['User:\r\n'
        + '  type: object\r\n'
        + '  properties:\r\n'
        + '    id:\r\n'
        + '      type: integer\r\n'
        + '      format: int64\r\n'
        + '      example: 10\r\n'
        + '    username:\r\n'
        + '      type: string\r\n'
        + '      example: theUser\r\n'
        + '  xml:\r\n'
        + '    name: user\r\n',
    ];
    const expected = [{
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
        },
        xml: {
          name: 'user',
        },
      },
    }];
    const result = yamlsToJson(input);
    expect(result).toEqual(expected);
  });

  it('should return object complete with N files', () => {
    const input = [
      'User:\r\n'
        + '  type: object\r\n'
        + '  properties:\r\n'
        + '    id:\r\n'
        + '      type: integer\r\n'
        + '      format: int64\r\n'
        + '      example: 10\r\n'
        + '    username:\r\n'
        + '      type: string\r\n'
        + '      example: theUser\r\n'
        + '  xml:\r\n'
        + '    name: user\r\n',
      'Category:\r\n'
        + '  type: object\r\n'
        + '  properties:\r\n'
        + '    id:\r\n'
        + '      type: integer\r\n'
        + '      format: int64\r\n'
        + '      example: 1\r\n'
        + '    name:\r\n'
        + '      type: string\r\n'
        + '      example: Dogs\r\n'
        + '  xml:\r\n'
        + '    name: category\r\n',
    ];
    const expected = [
      {
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
          },
          xml: {
            name: 'user',
          },
        },
      },
      {
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
    ];
    const result = yamlsToJson(input);
    expect(result).toEqual(expected);
  });
});
