const yaml = require('js-yaml');

const processYaml = fileYaml => yaml.load(fileYaml);

const getJsonFromYaml = (files = []) => {
  if (!Array.isArray(files)) return [];
  const parseJson = files.map(file => processYaml(file));
  return parseJson;
};

module.exports = getJsonFromYaml;
