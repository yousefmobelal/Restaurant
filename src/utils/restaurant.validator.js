const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 40,
      minLength: 5,
    },
    description: {
      type: "string",
    },
    categories: {
      type: "array",
      items: { type: "string" },
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
        description: { type: "string" },
      },
    },
    foods: {
      type: "array",
      items: {
        type: "string",
        pattern: "^[a-fA-F0-9]{24}$",
      },
    },
  },
  required: ["name", "description", "categories", "location"],
  additionalProperties: false,
};

export default schema;
