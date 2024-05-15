import { useState } from "react";

export default function CheckboxButton() {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleChecked}>
      <div
        className={`w-4 h-4 border rounded flex items-center justify-center transition-colors border-zinc-600
                    ${checked ? "bg-zinc-700" : "bg-transparent "}`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
        className="hidden"
      />
    </div>
  );
}
