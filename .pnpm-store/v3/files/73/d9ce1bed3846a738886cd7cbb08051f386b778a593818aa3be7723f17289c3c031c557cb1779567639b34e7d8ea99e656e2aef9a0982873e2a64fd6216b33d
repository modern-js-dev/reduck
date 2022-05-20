export var NODE_HANDLERS = {
  READ_ROOT: 'readRoot',
  // parent node
  READ_FORM: 'readForm',
  // form component
  READ_CHILD: 'readChild',
  READ_AS_VALUE: 'readAsValue',
  READ_AS_OBJECT: 'readAsObject',
  READ_COEXIT_RELATION: 'readCoexitRelation',
  READ_MUTUALEXCLUSION_RELATION: 'readMutualExclusion',
  READ_NONE_ITEM: 'readNoneItem'
};
export var TYPE = {
  NUMBER: 'number',
  STRING: 'string',
  MAP: 'map',
  ARRAY: 'array',
  DATE: 'date',
  FILE: 'file' // only suppport Electron

};
export var STATE = {
  DISABLED: 'disabled',
  DEFAULT: 'default',
  REPEAT: 'repeat'
};
export var MESSAGE = {
  PARAM_TYPE_IS_INVALID: function PARAM_TYPE_IS_INVALID(key, correctType) {
    return "".concat(key, ": The field value is invalid, it should be:").concat(correctType);
  },
  KEY_IS_NOT_DEFINED: 'The attribute "key" is not defined',
  SHOULD_NOT_BE_OBJECT_WITH_CONNECTION: function SHOULD_NOT_BE_OBJECT_WITH_CONNECTION(key) {
    return "".concat(key, " Defined that there is an association relationship between its own elements, it cannot be set to\uFF1AisObject");
  },
  SHOULD_HAS_ITEMS_WITH_OBJECT: function SHOULD_HAS_ITEMS_WITH_OBJECT(key) {
    return "".concat(key, ": There should be items in object, it can be: []");
  },
  SHOULD_HAS_ITEMS_WITH_CONNECTION: function SHOULD_HAS_ITEMS_WITH_CONNECTION(key) {
    return "".concat(key, ": Describe the relational data of the child element, the items field must exist, which can be: []");
  },
  SHOULD_HAS_TYPE_WITH_CONNECTION: function SHOULD_HAS_TYPE_WITH_CONNECTION(key) {
    return "".concat(key, ": Describe the relational data of the child element, the \"type\" field is required");
  },
  SHOULD_HAS_RELATION: function SHOULD_HAS_RELATION(key) {
    return "".concat(key, ":\n    If \"items\" is defined, the relationship field \"mutualExclusion, coexit\" must be defined and described");
  },
  SHOULD_NOT_HAS_TYPE: function SHOULD_NOT_HAS_TYPE(key) {
    return "".concat(key, ":\n    Its value is related to the selection of child elements, and its child elements should not have value types");
  },
  PARENT_SHOULD_HAS_CHILDREN: 'The parent element needs to have an "items" field',
  SCHEMA_SHOULD_NOT_BE_EMPTY: 'schema should not be empty'
};