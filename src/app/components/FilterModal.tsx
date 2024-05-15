import { useState } from "react";
import { IBrand } from "../types/brand";
import { ICollab } from "../types/collab";
import Button from "./Button";

interface FilterModalProps {
  brands: IBrand[];
  collabs: ICollab[];
  onClose: () => void;
  onSelect: (
    selectedBrand: IBrand | null,
    selectedCollab: ICollab | null
  ) => void;
}

export default function FilterModal({
  brands,
  collabs,
  onClose,
  onSelect,
}: FilterModalProps) {
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [selectedCollab, setSelectedCollab] = useState<ICollab | null>(null);

  const handleBrandSelect = (brand: IBrand) => {
    if (selectedBrand?.id === brand.id) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brand);
    }
  };

  const handleCollabSelect = (collab: ICollab) => {
    if (selectedCollab?.id === collab.id) {
      setSelectedCollab(null);
    } else {
      setSelectedCollab(collab);
    }
  };

  const handleSelectFilters = () => {
    onSelect(selectedBrand, selectedCollab);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded-md shadow-lg border border-zinc-600">
        <div className="flex justify-between">
          <div>
            <span className="text-zinc-50 font-bold text-xl ">Brands</span>
            {brands.map((brand) => (
              <div className="flex space-x-2 mt-1" key={brand.id}>
                <input
                  id={`checkbox-${brand.id}`}
                  type="checkbox"
                  onChange={() => handleBrandSelect(brand)}
                />
                <span className="text-sm text-zinc-400 italic">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
          <div>
            <span className="text-zinc-50 font-bold text-xl">Collabs</span>
            {collabs.map((collab) => (
              <div className="flex space-x-2 mt-1" key={collab.id}>
                <input
                  id={`checkbox-${collab.id}`}
                  type="checkbox"
                  onChange={() => handleCollabSelect(collab)}
                />
                <span className="text-sm text-zinc-400 italic">
                  {collab.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2 mt-3">
          <Button text="Aplicar Filtro" onClick={handleSelectFilters} />
          <Button text="Cancelar" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
