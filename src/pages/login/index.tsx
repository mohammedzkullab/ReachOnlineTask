import { LoginForm } from "components";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-3xl mb-7 font-bold">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
