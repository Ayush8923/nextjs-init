import { Nunito } from "next/font/google";
import "@/app/global.css";
import Script from "next/script";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const nunitoFont = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={nunitoFont.className}>
      <body className="antialiased">
        <Theme>{children}</Theme>
      </body>
      <Script src="/sw-register.js" />
    </html>
  );
};

export const metadata = {
  title: "Unos y Otros",
};

export default RootLayout;
