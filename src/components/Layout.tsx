import { ReactNode } from "react";
import LeftNav from "./LeftNav";

interface LayoutProps {
  children: ReactNode;
  isAdmin: boolean;
}

const Layout = ({ children, isAdmin }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <LeftNav isAdmin={isAdmin} />
      <main className="ml-64 min-h-screen flex-1">{children}</main>
    </div>
  );
};

export default Layout;
