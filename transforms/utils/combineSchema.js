const { refSchema } = require('./refSchema');

const VALID_TYPES = ['oneOf', 'anyOf', 'allOf'];

const getUnionType = elements => {
  const unionType = elements[0].name;

  if (!VALID_TYPES.includes(unionType)) {
    return null;
  }

  return unionType;
};

const combineSchema = elements => {
  let schema = {};
  if (!elements || elements.length === 0) return schema;

  const nullIndex = elements.findIndex(el => el.type === 'NullLiteral');
  if (nullIndex > 0) {
    elements.splice(nullIndex, 1);
    schema = { nullable: true };
  }

  const unionType = getUnionType(elements);
  const types = !unionType ? elements : elements.slice(1);

  if (types.length > 1 || unionType === 'allOf') {
    schema = {
      ...schema,
      [unionType || 'oneOf']: types.map(type => refSchema(type)),
    };
  } else {
    schema = {
      ...schema,
      ...refSchema(types[0]),
    };
  }

  return schema;
};

module.exports = combineSchema;
