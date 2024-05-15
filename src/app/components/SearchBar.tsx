import Search from "@/app/assets/icons/search.svg";
import Image from "next/image";

interface InputProps {
  placeholder: string;
  onSearch: (search: string) => void;
}

export default function SearchBar({ placeholder, onSearch }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div
      className="flex justify-start items-start gap-3 py-[6px] px-3  rounded-lg border border-zinc-600"
      onChange={handleChange}
    >
      <Image src={Search} alt="" />
      <input
        className="bg-transparent placeholder-zinc-200 text-sm text-zinc-200 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
