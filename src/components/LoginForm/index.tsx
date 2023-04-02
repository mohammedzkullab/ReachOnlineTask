import { Button, Card, Input } from "components";
import useAuth from "hooks/useAuth";
import useFetch from "hooks/useFetch";
import { ChangeEvent, useState } from "react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const dataFunction = (data: any) => {
    auth.login(data.data?.token, data?.data);
  };
  const { loading, error, fetchData } = useFetch(
    "/vendor/login",
    {
      method: "post",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    },
    dataFunction
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    // fetch("https://kayanpay.pro/api/v1/vendor/login", {
    //   method: "post",
    //   headers: {
    //     accept: "application/json",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(loginData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     auth.login(data.data?.token, data?.data);
    //   });
    fetchData();
  };
  return (
    <Card className="p-5 flex items-center flex-col gap-3">
      <form onSubmit={handleLogin}>
        <Input
          inputType="email"
          label="Email"
          id="email-input"
          inputClassName="w-full p-3 rounded"
          placeholder="Enter Your Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <Input
          inputType="password"
          label="Password"
          id="password-input"
          inputClassName="w-full p-3 rounded"
          placeholder="*********"
          name="password"
          onChange={handleChange}
          required
        />
        <Button className="w-full mt-4" type="submit" loading={loading}>
          Submit
        </Button>
        <p> {error && error}</p>
      </form>
    </Card>
  );
};

export default LoginForm;
