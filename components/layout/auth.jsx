import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen relative top-0 flex flex-col items-center justify-center p-4 w-full ">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logo.svg"
            alt="Commerce Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl font-extrabold">Welcome to Commerce</h1>
        </div>
        <Card className="p-8 shadow-2xl">{children}</Card>
        <p className="mt-6 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Commerce. All rights reserved.
        </p>
      </div>
    </div>
  );
}
