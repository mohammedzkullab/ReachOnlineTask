import { Tab } from "@headlessui/react";
import { Input } from "components";
import { LebanonFlag, UKFlag } from "./svg";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Tabs({ formData, setFormData, handleChange }: any) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 justify-end ml-auto w-1/2 my-4">
        <Tab
          className={({ selected }) =>
            classNames(
              "flex  items-center justify-center gap-3 w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          <UKFlag />
          English
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "flex items-center justify-center gap-3 w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          <LebanonFlag />
          Arabic
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Input
            label="Name *"
            inputType="text"
            id="prod-name"
            name="name[en]"
            inputClassName="w-full p-2"
            labelClassName="text-black font-medium"
            value={formData["name[en]"]}
            placeholder="name in English"
            onChange={handleChange}
            required
          />
          <Input
            label="Sort Order *"
            inputType="number"
            id="prod-sort-Order"
            name="sort"
            inputClassName="w-full p-2"
            labelClassName="text-black font-medium"
            value={formData.sort}
            onChange={handleChange}
            required
          />
        </Tab.Panel>
        <Tab.Panel>
          <Input
            label="Name *"
            inputType="text"
            id="prod-name"
            name="name[ar]"
            inputClassName="w-full p-2 text-right"
            labelClassName="text-black font-medium"
            value={formData["name[ar]"]}
            placeholder="الاسم باللغة العربية"
            onChange={handleChange}
            required
          />
          <Input
            label="Sort Order *"
            inputType="number"
            id="prod-sort-Order"
            name="sort"
            inputClassName="w-full p-2"
            labelClassName="text-black font-medium"
            value={formData.sort}
            onChange={handleChange}
            required
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
