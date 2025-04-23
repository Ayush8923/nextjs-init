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

export const addCigarValidationRules = {
  cigarName: {
    required: "Cigar Name is required",
    pattern: {
      value: /^[A-Za-z0-9\s.]+$/,
      message: "Cigar Name cannot contain special characters",
    },
  },
  brand: {
    required: "Brand is required",
    pattern: {
      value: /^[A-Za-z0-9\s.]+$/,
      message: "Brand cannot contain special characters",
    },
  },
  manufacturer: {
    required: "Manufacturer is required",
    pattern: {
      value: /^[A-Za-z0-9\s.]+$/,
      message: "Manufacturer cannot contain special characters",
    },
  },
  origin: {
    required: "Origin is required",
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Origin cannot contain special characters",
    },
  },
  vitola: {
    required: "Vitola is required",
    pattern: {
      value: /^[A-Za-z0-9\s]+$/,
      message: "Vitola cannot contain special characters",
    },
  },
  length: {
    required: "Length is required",
    valueAsNumber: true,
    min: 1,
    pattern: {
      value: /^\d+(\.\d+)?$/,
      message: "Length must be a valid number (e.g., 4, 5.5, 6.25)",
    },
  },
  ringGauge: {
    required: "Ring Gauge is required",
    valueAsNumber: true,
    pattern: {
      value: /^[0-9]+$/,
      message: "Ring Gauge must be a whole number.",
    },
  },
};
