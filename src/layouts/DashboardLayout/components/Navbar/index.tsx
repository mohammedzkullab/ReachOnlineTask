import useAuth from "hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();
  const { userData } = auth;
  return (
    <nav className="w-full h-6 flex items-center justify-between p-8 bg-white ">
      <p className="text-3xl font-bold ">Brand</p>
      <p className="text-xl">welcome , {userData?.full_name}</p>
    </nav>
  );
};

export default Navbar;
