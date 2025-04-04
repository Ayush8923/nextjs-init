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
};
