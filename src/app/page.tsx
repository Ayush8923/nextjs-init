import { ApplicationLogo } from "@/components/icons";
import Link from "next/link";
import JoinSection from "@/components/JoinSection";

export const metadata = {
  title: "Unos y Otros",
};

const Home = () => {
  return (
    <>
      <div className="container mx-auto max-w-6xl px-[24px] py-[16px] flex justify-between items-center">
        <div className="flex items-center">
          <ApplicationLogo />
        </div>
        <Link
          href="/login"
          className="border border-primary-100 rounded-full px-[26px] py-[10px] text-primary-100 font-semibold text-sm"
        >
          Login
        </Link>
      </div>

      <JoinSection />
    </>
  );
};

export default Home;
