export const profileValidationRules = {
  profileHandle: {
    pattern: {
      value: /^(?![_\-.])[a-zA-Z0-9_.-]{1,15}(?<![_\-.])$/,
      message:
        "Invalid format: Use only letters, numbers, and _ . -. No spaces or special characters at the beginning or end.",
    },
    maxLength: {
      value: 15,
      message: "Profile Handle cannot exceed 15 characters.",
    },
  },
  phoneNumber: {
    pattern: {
      value: /^(\+?\d{1,4}[\s\-]?)?(\(?\d{2,5}\)?[\s\-]?)?\d{3,5}[\s\-]?\d{4}$/,
      message:
        "Enter a valid mobile number (e.g., +1 201-515-1633 or 9876543210).",
    },
  },
};
