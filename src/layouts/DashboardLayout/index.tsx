import type { DashboardLayoutType } from "../types";

export const DashboardLayout: DashboardLayoutType = ({
  children,
  contentClassName = "",
  withoutNavbar = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!withoutNavbar && <header>{/* <Navbar /> */}</header>}
      <main
        className={`flex-1 flex justify-center items-center min-h-fit p-5 ${contentClassName}`}
      >
        <div className={`flex flex-col-reverse xl:gap-16 md:flex-row w-full`}>
          {/* <SideMenu className="hidden md:block" /> */}
          <div className="w-full flex flex-col-reverse lg:flex-row gap-4 lg:gap-0 xl:gap-8 mt-4 md:mt-8 lg:mt-16 xl:mt-20 ">
            <div className="flex flex-col w-full xl:w-[70%] h-full px-4">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
