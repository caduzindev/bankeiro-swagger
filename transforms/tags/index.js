const globFilesMatches = require('../../consumers/globFilesMatches');
const readFiles = require('../../consumers/readFiles');
const yamlsToJson = require('../../consumers/yamlsToJson');
const { getIndexBy } = require('../utils/arrays');

const FILTER_TAG_KEY = 'name';

const parseSchema = async options => globFilesMatches(options.baseDir, options.tagsPath)
  .then(readFiles)
  .then(yamlsToJson);

const filterDuplicateTags = tags => (
  tags.filter(({ name }, i) => getIndexBy(tags, FILTER_TAG_KEY, name) === i)
);

const parseCompoments = async (swaggerObject = {}, options = {}) => {
  if (!options.tagsPath) {
    return {
      ...swaggerObject,
      tags: [],
    };
  }

  const tagsJson = await parseSchema(options);
  const uniqTags = filterDuplicateTags(tagsJson);

  return {
    ...swaggerObject,
    tags: uniqTags,
  };
};

module.exports = parseCompoments;
