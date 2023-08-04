const chalk = require('chalk');
const { writeFileSync } = require('fs');
const processSwagger = require('./proccessSwagger');

const generateSwaggerProject = {
  app: async option => {
    const swaggerObject = processSwagger(option);
    writeFileSync(option.outputFile, JSON.stringify(swaggerObject, null, 2));
  },
  backoffice: async option => {
    const swaggerObject = processSwagger(option);
    writeFileSync(option.outputFile, JSON.stringify(swaggerObject, null, 2));
  },
  default: async options => {
    await Promise.all(options.map(option => {
      const swaggerObject = processSwagger(option);
      writeFileSync(option.outputFile, JSON.stringify(swaggerObject, null, 2));

      return {};
    }));
  },
};

function generateByProject(project, options) {
  const { app, backoffice } = options;
  if (!app || !backoffice) {
    // eslint-disable-next-line no-console
    console.warn(chalk.red('[bankeiro-swagger] Projects app or backoffice without configuration'));
    return;
  }

  const optionsProject = project !== 'default' ? options[project] : [app, backoffice];

  generateSwaggerProject[project](optionsProject);
}

module.exports = generateByProject;
