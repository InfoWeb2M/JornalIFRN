import { LoginForm } from "@/components/loginForm/page";

export default function Signin() {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <div className="mb-8">
        <LoginForm />
      </div>
    </div>
  );
}
