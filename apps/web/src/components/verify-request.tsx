import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { useEmailStore } from "@/components/user-auth-form";

export const VerifyRequestComponent: React.FC = () => {
  const emailState = useEmailStore((state) => state.email);

  return (
    <main className="font-default flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center justify-center rounded-md border border-transparent bg-transparent py-2 px-3 text-center text-sm font-medium text-slate-900 transition duration-100 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8"
      >
        <IoChevronBack className="h-4 w-4" />
        Go Back
      </Link>

      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="pb-4 text-2xl font-bold tracking-tight">Email sent</h1>
        <p className="pb-2 text-sm text-slate-600">
          We just sent an email to{" "}
          <span className="font-bold">{emailState}</span>.
        </p>
        <p className="text-sm text-slate-600">
          Click on the link provided in the email to sign into your account.
        </p>
      </div>
    </main>
  );
};
