const globFilesMatches = require('../../consumers/globFilesMatches');
const readFiles = require('../../consumers/readFiles');
const yamlsToJson = require('../../consumers/yamlsToJson');

const parseSchema = async options => globFilesMatches(options.baseDir, options.componentsPath)
  .then(readFiles)
  .then(yamlsToJson);

const parseCompoments = async (swaggerObject = {}, options = {}) => {
  if (!options.componentsPath) {
    return {
      ...swaggerObject,
      components: {
        ...swaggerObject.components,
        schemas: {},
      },
    };
  }

  const componentsSchemaJson = await parseSchema(options);
  const componentSchema = componentsSchemaJson.reduce((acum, item) => ({ ...acum, ...item }), {});

  return {
    ...swaggerObject,
    components: {
      ...swaggerObject.components,
      schemas: componentSchema,
    },
  };
};

module.exports = parseCompoments;
