describe('Object Validator', function(){

  var validate = require('object-validator');
  var chai = require('chai');

  chai.should();


  it('should validate using objects as the rules', function(){
    var errors = validate({
      "foo": {
        "missing": function(val){ return val != null },
        "invalid": function(val){ return val === "bar" }
      },
      "bar": {
        "missing": function(val){ return val != null },
        "equal": function(val){ return val === "bar" }
      }
    }, {
      "foo": "baz"
    });
    errors.length.should.equal(2);
    errors.messages.should.deep.equal({
      "foo": "invalid",
      "bar": "missing"
    });
  });

  it('should validate using functions as the attribute rule', function(){
    var errors = validate({
      'foo': function(val, data) {
        if(val !== "bar") {
          return "invalid"
        }
      },
      'bar': function(val, data) {
        if(!val) {
          return 'missing';
        }
      }
    }, {
      "foo": "baz"
    });
    errors.length.should.equal(2);
    errors.messages.should.deep.equal({
      "foo": "invalid",
      "bar": "missing"
    });
  });

  it('should return an empty errors object if there are no errors', function(){
    var errors = validate({}, {});
    errors.length.should.equal(0);
    errors.messages.should.deep.equal({});
  });

});