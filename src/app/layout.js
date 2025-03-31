import { Nunito } from "next/font/google";
import "@/app/global.css";
import Script from "next/script";

const nunitoFont = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={nunitoFont.className}>
      <body className="antialiased">{children}</body>
      <Script src="/sw-register.js" />
    </html>
  );
};

export const metadata = {
  title: "Unos y Otros",
};

export default RootLayout;
