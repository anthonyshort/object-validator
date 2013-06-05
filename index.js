var each = require('each');
var type = require('type');

module.exports = function(schema, obj) {
  var errors = {
    length: 0,
    messages: {}
  };
  each(schema, function(attribute, rules){
    if(typeof rules === 'function') {
      var message = rules.call(obj, obj[attribute], obj);
      if(message) {
        errors.length += 1;
        errors.messages[attribute] = message;
      }
    }
    else {
      Object.keys(rules).some(function(message){
        if( rules[message].call(obj, obj[attribute], obj) === false) {
          errors.length += 1;
          errors.messages[attribute] = message.replace('{{value}}', obj[attribute]);
          return true;
        }
      });
    }
  });
  return errors;
};