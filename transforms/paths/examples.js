const STATUS_CODES = require('./validStatusCodes');

const errorMessage = require('../utils/errorMessage');
const mapDescription = require('../utils/mapDescription');
const generator = require('../utils/generator');

const REQUEST_BODY = 'request';
const RESPONSE_BODY = 'response';

const parseRequestPayloadExample = (description, content) => {
  const [summary] = description;
  return {
    type: REQUEST_BODY,
    summary,
    value: content,
  };
};

const showError = message => {
  errorMessage(message);
  return {};
};

const parseResponsePayloadExample = (description, content) => {
  const [status, summary] = description;
  if (!STATUS_CODES[status]) {
    return showError(`${status} is not a valid status for a response`);
  }
  return {
    type: RESPONSE_BODY,
    status,
    summary,
    value: content,
  };
};

const getParsedExample = ({ type, metadata, content }) => {
  const types = {
    [REQUEST_BODY]: () => parseRequestPayloadExample(metadata, content),
    [RESPONSE_BODY]: () => parseResponsePayloadExample(metadata, content),
    default: () => showError(`Cannot determine where to use example of type ${type}`),
  };
  return (types[type] || types.default)();
};

const parseExample = ({ description: exampleTagDescription }) => {
  const formattedTagDescription = exampleTagDescription.replace(/\r\n/gi, '\n');

  const contentStartIndex = formattedTagDescription.indexOf('\n');
  const content = formattedTagDescription.substring(contentStartIndex + 1);
  const description = formattedTagDescription.substring(0, contentStartIndex);

  const [type, ...metadata] = mapDescription(description);

  return getParsedExample({ type, metadata, content });
};

const exampleGenerator = generator(parseExample, 'type');

module.exports = exampleGenerator;
