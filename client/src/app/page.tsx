import RegisterPage from "./register/page";

export default function Home() {
  return (
    <div
      className="font-sans bg-gray-50
     items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <RegisterPage />
    </div>
  );
}
