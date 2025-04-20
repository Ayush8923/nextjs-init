export const collectionValidationRules = {
  humidorType: {
    required: "Type of Humidor * is required",
  },
  customHumidificationMethod: {
    required: {
      value: true,
      message: "Please specify the humidification method.",
    },
  },
  cigarHoldingCapacity: {
    min: {
      value: 1,
      message: "Cigar holding capacity must be at least 1",
    },
  },
  cigarQuantity: {
    min: {
      value: 1,
      message: "Cigar quantity must be at least 1",
    },
  },
  cigarPrice: {
    min: {
      value: 1,
      message: "Cigar price must be at least 1",
    },
  },
};
