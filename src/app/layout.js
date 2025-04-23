import { Public_Sans } from "next/font/google";
import "@/app/global.css";
import Script from "next/script";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AppInitializer from "@/components/AppInitializer";

const publicSansFont = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={publicSansFont.className}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="antialiased">
        <Theme>
          <AppInitializer>{children}</AppInitializer>
        </Theme>
      </body>
      <Script src="/sw-register.js" />
    </html>
  );
};

export const metadata = {
  title: "Unos y Otros",
};

export default RootLayout;
