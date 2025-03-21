import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminLayoutProps } from "@/app/types/admin";

const AdminLayout = ({
  children,
  title,
  subtitle,
  backHref = "/admin",
}: AdminLayoutProps) => {
  return (
    <div className="min-h-screen dark:bg-gray-900 pb-12">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-purple-100">{subtitle}</p>
            </div>
            {backHref && (
              <Link
                href={backHref}
                className="flex items-center gap-1 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                <MdArrowBack />
                <span>Back to Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 mt-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
