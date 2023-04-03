import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type itemsType = {
  icon: React.ReactNode;
  title: string;
  action: any;
};
interface DropdownType {
  title: string;
  items: itemsType[];
  id?: string | number;
}
export default function Dropdown({ id, title, items }: DropdownType) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-400 bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-dark hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {title}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-gray-dark hover:text-gray-dark"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1 ">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-600 text-white" : "text-gray-900"
                    } group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => item.action(id)}
                  >
                    {item.icon} {item.title}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
