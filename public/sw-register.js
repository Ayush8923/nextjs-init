function registerServiceWorker() {
  if (typeof window !== "undefined") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw-cache.js")
        // eslint-disable-next-line no-console
        .then((reg) => console.log("SW registered:", reg))
        // eslint-disable-next-line no-console
        .catch((err) => console.error("SW registration failed:", err));
    }
  }
}

registerServiceWorker();
