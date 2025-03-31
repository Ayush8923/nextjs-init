import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unos Y Otros",
    short_name: "Unos Y Otros",
    description: "A Unos y Otros Web App.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/uyo-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/uyo-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
