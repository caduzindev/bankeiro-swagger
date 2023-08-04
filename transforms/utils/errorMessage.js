const chalk = require('chalk');

const errorMessage = message => {
  // eslint-disable-next-line no-console
  console.warn(chalk.yellow(`[bankeiro-swagger] ${message}`));
};

module.exports = errorMessage;
