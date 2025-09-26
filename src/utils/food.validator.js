const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
      format: "uri",
      pattern: "\\.(jpg|jpeg|png|gif|webp)$",
    },
    price: {
      type: "number",
    },
    restaurant: {
      type: "string",
      pattern: "^[a-fA-F0-9]{24}$",
    },
  },
  required: ["name", "image", "price", "restaurant"],
  additionalProperties: false,
};

export default schema;
