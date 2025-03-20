import LoginLinks from "@/app/LoginLinks";
import ApplicationLogo from "@/components/custom-icons/ApplicationLogo";
import Link from "next/link";

export const metadata = {
  title: "Unos y Otros",
};

const Home = () => {
  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <ApplicationLogo />
        </div>
        <LoginLinks />
      </div>

      <section className="w-full bg-[#373435] text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Become Unos y Otros
          </h1>
          <p className="text-xl mb-8">
            Take control of your hobby with a managed cigar & humidor
            collection.
          </p>
          <div className="flex items-center">
            <Link
              href="/login"
              className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full mr-4"
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
