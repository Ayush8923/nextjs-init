import ApplicationLogo from "@/components/custom-icons/ApplicationLogo";
import Link from "next/link";
import LoginLinks from "@/app/LoginLinks";

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
        <LoginLinks />
      </div>

      <section className="w-full bg-primary-100 text-white p-[24px]">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-medium mb-[4px]">Become Unos y Otros</h1>
          <p className="text-base font-extralight mb-[20px]">
            Take control of your hobby with a managed cigar & humidor
            collection.
          </p>
          <div className="flex items-center">
            <Link
              href="/register"
              className="bg-white text-primary-100 font-semibold text-sm py-[10px] px-[15px] rounded-full"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
