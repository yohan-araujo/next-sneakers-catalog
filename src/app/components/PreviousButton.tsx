import Image from "next/image";
import Chev2l from "@/app/assets/icons/chev-2l.svg";
import ChevLeft from "@/app/assets/icons/chev-left.svg";

interface PrevButtonProps {
  icon: "chev2l" | "chevl";
  onClick?: () => void;
  disabled?: boolean;
}

export default function PrevButton({
  icon,
  disabled = false,
  onClick,
}: PrevButtonProps) {
  const selectedIcon = icon === "chev2l" ? Chev2l : ChevLeft;

  return (
    <button
      className={`flex space-x-3 px-2 py-2 items-center rounded-md bg-zinc-800  ${
        disabled ? "bg-opacity-50" : "hover:opacity-75 transition-colors"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        src={selectedIcon}
        alt="icone de anterior"
        className={`${disabled ? "opacity-50" : ""}`}
      />
    </button>
  );
}
