import Button from "@/components/Button";
import { CigarIcon } from "@/components/icons";

export const metadata = {
  title: "Unos y Otros - Dashboard",
};

const Welcome = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <div className="flex-grow flex flex-col items-center justify-center px-9">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-8">
            <CigarIcon />
          </div>

          <h1 className="text-2xl font-medium mb-4 text-primary-100">
            Welcome to Unos y Otros!!
          </h1>
        </div>
      </div>

      <div className="fixed bottom-10 left-0 right-0 pb-5 px-9">
        <div className="max-w-md mx-auto space-y-4">
          <Button title="Set Your Cigar Preferences" className="w-full mt-0" />
          <Button title="Skip for now" className="w-full" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
