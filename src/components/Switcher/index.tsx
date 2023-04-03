import { useState } from "react";
import { Switch } from "@headlessui/react";
import useAuth from "hooks/useAuth";

export default function Switcher({
  id,
  status,
  action,
}: {
  id?: string | number;
  status?: number;
  action?: any;
}) {
  const auth = useAuth();
  const initState = status === 1 ? true : false;
  const [enabled, setEnabled] = useState(initState);

  const handleChange = (e: any) => {
    setEnabled((prev) => !prev);
    action();
  };

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={`${enabled ? "bg-red-600" : "bg-gray-400"}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
