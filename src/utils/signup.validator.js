import { checkEmail, checkPhoneNumber } from "../utils/regexExpressions.js";

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 25,
    },
    location: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: "array",
          items: { type: "number" },
          minItems: 2,
          maxItems: 2,
        },
        address: { type: "string" },
      },
    },
    email: {
      type: "string",
      pattern: `${checkEmail.source}`,
    },
    password: {
      type: "string",
      minLength: 8,
    },
    phone: {
      type: "string",
      pattern: `${checkPhoneNumber.source}`,
    },
  },
  required: ["name", "email", "password", "phone"],
  additionalProperties: false,
};

export default schema;
