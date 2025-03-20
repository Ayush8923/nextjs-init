import AuthCard from "@/app/(auth)/AuthCard";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="text-gray-900 antialiased">
        <AuthCard>{children}</AuthCard>
      </div>
    </div>
  );
};

export default Layout;
