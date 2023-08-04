const globFilesMatches = require('./consumers/globFilesMatches');
const readFiles = require('./consumers/readFiles');
const getOnlyComments = require('./consumers/getOnlyComments');
const jsdocInfo = require('./consumers/jsdocInfo');

const {
  getBasicInfo, getSecuritySchemes, getPaths, getComponents, getTags,
} = require('./transforms');

const processSwagger = options => {
  let swaggerObject = {
    openapi: '3.0.0',
    info: options.info,
    servers: options.servers,
    security: options.security,
  };

  swaggerObject = getBasicInfo(swaggerObject);
  swaggerObject = getSecuritySchemes(swaggerObject);

  return globFilesMatches(options.baseDir, options.filesPattern)
    .then(readFiles)
    .then(getOnlyComments)
    .then(jsdocInfo())
    .then(async data => {
      swaggerObject = getPaths(swaggerObject, data);
      swaggerObject = await getComponents(swaggerObject, options);
      swaggerObject = await getTags(swaggerObject, options);

      return swaggerObject;
    });
};

module.exports = processSwagger;
