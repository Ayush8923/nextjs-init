import LoginLinks from "@/app/LoginLinks";

export const metadata = {
  title: "Unos y Otros",
};

const Home = () => {
  return (
    <>
      <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <LoginLinks />

        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-center pt-8 sm:justify-start sm:pt-0 font-bold text-2xl">
            Unos y Otros
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
