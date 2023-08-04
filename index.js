const generateByProject = require('./generateByProject');

const BankeiroSwagger = (userOptions = {}) => (project = 'default') => {
  generateByProject(project, userOptions);
};

module.exports = BankeiroSwagger;
