import AuthCard from "@/app/(auth)/AuthCard";

const Layout = ({ children }) => {
  return (
    <div className="text-gray-900 antialiased">
      <AuthCard>{children}</AuthCard>
    </div>
  );
};

export default Layout;
