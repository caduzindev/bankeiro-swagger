const generateByProject = require('../../../generateByProject');
const { projectApp, projectBackoffice, expectedSwagger } = require('./sut') ;

test('should return error if app and backoffice will not found', () => {
  const options = {};
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  generateByProject('default', options);

  expect(console.warn).toHaveBeenCalled();
});

test('should return error if app not found', () => {
  const options = {
    backoffice: projectBackoffice,
  };
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  generateByProject('default', options);

  expect(console.warn).toHaveBeenCalled();
});

test('should return error if backoffice not found', () => {
  const options = {
    app: projectApp,
  };
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  generateByProject('default', options);

  expect(console.warn).toHaveBeenCalled();
});

test('should return error if backoffice not found', () => {
  const options = {
    app: projectApp,
    backoffice: projectBackoffice,
  };
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  generateByProject('default', options);

  expect(console.warn).toHaveBeenCalled();
});
