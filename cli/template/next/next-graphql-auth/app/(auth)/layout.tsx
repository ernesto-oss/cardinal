interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-auto flex-col justify-center">{children}</div>
    </div>
  );
}
