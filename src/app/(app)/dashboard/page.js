import Header from "@/app/(app)/Header";

export const metadata = {
  title: "Unos y Otros - Dashboard",
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              You are logged in!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
