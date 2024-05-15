import Image from "next/image";
import Chev2r from "@/app/assets/icons/chev-2r.svg";
import ChevRight from "@/app/assets/icons/chev-right.svg";

interface NextButtonProps {
  icon: "chev2r" | "chevr";
  onClick?: () => void;
  disabled?: boolean;
}

export default function NextButton({
  icon,
  disabled = false,
  onClick,
}: NextButtonProps) {
  const selectedIcon = icon === "chev2r" ? Chev2r : ChevRight;

  return (
    <button
      className={`flex space-x-3 px-2 py-2 items-center rounded-md bg-zinc-800 ${
        disabled ? "bg-opacity-50" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        src={selectedIcon}
        alt="icone de proximo"
        className={`${disabled ? "opacity-50" : ""}`}
      />
    </button>
  );
}
