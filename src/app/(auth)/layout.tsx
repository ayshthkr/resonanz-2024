import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid bg-[#160430] min-h-screen lg:grid-cols-2">
      <Image
        src="/auth-space.png"
        alt="Auth Space"
        width="1655"
        height="1856"
        className="h-full w-full lg:w-6/12 object-cover absolute inset-0"
      />
      <div className="relative hidden lg:block"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
