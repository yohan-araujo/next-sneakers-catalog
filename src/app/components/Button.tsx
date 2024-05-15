import Image from "next/image";
import Filter from "@/app/assets/icons/filter.svg";
import Order from "@/app/assets/icons/order.svg";

interface ButtonProps {
  text: string;
  icon?: "filter" | "order";
  onClick?: () => void;
}

export default function Button({ text, icon, onClick }: ButtonProps) {
  const selectedIcon = icon === "order" ? Order : Filter;

  return (
    <button
      className="flex space-x-3 px-4 py-2 items-center rounded-md bg-zinc-600"
      onClick={onClick}
    >
      {icon && <Image src={selectedIcon} alt="icone de ordenar ou filtro" />}
      <span className="text-sm text-white font">{text}</span>
    </button>
  );
}
