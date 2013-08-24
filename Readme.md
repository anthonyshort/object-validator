# object-validator

[![Build Status](https://travis-ci.org/nib-components/object-validator.png?branch=master)](https://travis-ci.org/nib-components/object-validator)

  Validate plain objects against a set of rules. This component just takes an object
  and a set of rules like this:

```js
var schema = {
  "email": {
    "Email is required": function(val) {
      return val != null;
    },
    "Email is invalid": function(val) {
      return isEmail(val);
    }
  }
};
```

  and returns errors like this:

```js
{
  "email": "Email is required"
}
```

  **This component contains no validation methods itself. You need to bring your own.**
  This just runs an object through functions and returns the messages.

## Installation

    $ component install anthonyshort-components/object-validator

## API

```js
var validate = require('object-validator');
validate(schema, data);
```

  The function takes two parameters, a schema (the rules for validation)
  and the data to validate.

## Validation Rules

Schemas are just objects:

```js
var schema = {
  "phoneNumber": {
    "This field is required": function(val) {
      return val != null;
    },
    "Please enter a valid phone number": function(val){
      return /0-9{10}/.test(val);
    },
    "Confirmation doesn't match": function(val, data){
      return val === data['confirmPhoneNumber'];
    }
  }
};
```

  The keys of the schema match keys in the data object you are validating.
  The value is an object of messages with a corrosponding validation method.

## Validation Functions

  The validation method has the signature:

```js
function(value, data) {

}
```

  This function will be passed the value of the attribute and all of the data
  that was submitted for validation. This function should return false if the
  validation fails, anything else will be treated as successful and an error
  message won't be created.

## Interpolation

  Messages can access the value that was sent if they wish to be dynamic:

```js
"confirmEmail": {
  "{{value}} does not match email": function(){}
}
```

  {{value}} will be replace with whatever the value is for confirmEmail.

## Example Schema

```js
var schema = {
  "givenName": {
    "Given name is required": required,
    "Given name must only contain a-zA-Z": isString
  },
  "phoneNumber": {
    "Please enter a valid phone number e.g. 02 1234 5678": phoneNumber
  },
  "reason": {
    "Reason is required": required,
    "Must be less than 500 characters": maxLength(500)
  },
  "email": {
    "Email must be 10 characters long": length(10),
    "Email address is required": required,
    "Email must equal foo@bar.com": equals("foo@bar.com")
  },
  "confirmEmail": {
    "{{value}} does not match email": matches('email')
  },
  "partnerGender": {
    "Partner gender is required": function(partnerGender, data){
      if(data.hasPartner && !partnerGender) {
        return false;
      }
    }
  },
};
```

## Functions as Rules

  You can also use functions instead of objects for the attribute rules. If this function returns a message it will be treated as invalid the the message will be use.

```js
var schema = {
  "title": function(title) {
    if(!title) {
      return "Title is required";
    }
  },
  "givenName": function(val){
    if(!val) {
      return "Given name is required";
    }
    if(isString(val) === false) {
      return "Given name must only contain a-zA-Z";
    }
  },
};
```

  Use this syntax if you need advanced or unique validation requirements.

## License

  MIT
