const allowedDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",") || [];

module.exports = {
  images: {
    remotePatterns: allowedDomains.map((domain) => ({
      protocol: "https",
      hostname: domain.trim(),
    })),
  },
};
