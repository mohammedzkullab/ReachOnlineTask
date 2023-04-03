import { Link } from "components";

const SideMenu = () => {
  return (
    <aside className="bg-gray-400 w-full md:w-[30%] lg:w-[15%] p-5 pt-10 h-full text-white flex  justify-between gap-3 flex-col">
      <p className="text-3xl font-bold my-3">Test Links</p>
      <Link href="#" className="text-xl font-medium">
        test
      </Link>
      <Link href="#" className="text-xl font-medium">
        test 1
      </Link>
      <Link href="#" className="text-xl font-medium">
        test 2
      </Link>
      <Link href="#" className="text-xl font-medium">
        test 3
      </Link>
      <p className="text-3xl font-bold my-3">Test Links</p>
      <Link href="#" className="text-xl font-medium">
        test
      </Link>
      <Link href="#" className="text-xl font-medium">
        test 1
      </Link>
      <Link href="#" className="text-xl font-medium">
        test 2
      </Link>
      <Link href="#" className="text-xl font-medium">
        test 3
      </Link>
    </aside>
  );
};

export default SideMenu;
