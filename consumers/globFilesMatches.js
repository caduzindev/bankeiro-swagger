const glob = require('glob');
const path = require('path');

const DEFAULT_EXCLUDED_FOLDER = 'node_modules';
const DEFAULT_GLOB_OPTIONS = {
  ignore: '**/node_modules/**',
};

const globFilesMatches = (baseDir, filesPattern, excludedFolder = DEFAULT_EXCLUDED_FOLDER) => (
  new Promise((resolve, reject) => {
    if (!baseDir || !filesPattern) {
      const error = new Error('baseDir and filePath are required');
      reject(error);
    }

    if (!Array.isArray(filesPattern) && typeof filesPattern !== 'string') {
      const error = new Error('files pattern has to be a type of string');
      reject(error);
    }

    if (Array.isArray(filesPattern)) {
      if (filesPattern.length === 0) {
        const error = new Error('if you submit an array of filesPattern it must contain at least one pattern');
        reject(error);
      }

      if (filesPattern.some(pattern => typeof pattern !== 'string')) {
        const error = new Error('all file patterns have to be strings');
        reject(error);
      }
    }
    try {
      let files;
      if (!Array.isArray(filesPattern)) {
        files = glob.sync(path.resolve(baseDir, filesPattern).replace(/\\/g, '/'), DEFAULT_GLOB_OPTIONS);
      } else {
        files = filesPattern
          .map(pattern => glob.sync(path.resolve(baseDir, pattern).replace(/\\/g, '/'), DEFAULT_EXCLUDED_FOLDER))
          .reduce((memo, it) => memo.concat(it), [])
          .filter((value, index, self) => self.indexOf(value) === index);
      }
      const filteredFiles = files.filter(file => !file.includes(excludedFolder));
      resolve(filteredFiles);
    } catch (error) {
      reject(error);
    }
  })
);

module.exports = globFilesMatches;
