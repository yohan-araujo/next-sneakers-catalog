import { IProduct } from "../types/product";
import { IBrand } from "../types/brand";
import { ICategory } from "../types/category";
import { ICollab } from "../types/collab";
import Button from "./Button";
import Image from "next/image";

interface ModalProps {
  product: IProduct | null;
  brand: IBrand | null;
  category: ICategory | null;
  collab: ICollab | null;
  onClose: () => void;
}

export default function ProductsModal({
  product,
  brand,
  category,
  collab,
  onClose,
}: ModalProps) {
  if (!product) return null;
  console.log(brand?.logo_img_url);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded-md shadow-lg border border-zinc-600">
        <div className="flex flex-col justify-center items-center">
          <strong className="text-xl text-zinc-50 font-bold ">
            {product.name}
          </strong>
          <span className="text-zinc-400">{product.subname}</span>
          <div className="bg-zinc-400 px-4 py-2 rounded-lg mt-2">
            {brand && brand.logo_img_url && (
              <Image
                src={brand.logo_img_url}
                mt-2
                alt={product.name}
                className="py-2 w-auto h-auto"
                width={100}
                height={100}
              />
            )}
          </div>

          <strong className="text-zinc-50 mt-2">Categoria:</strong>
          <span className="text-zinc-400 mt-2 italic">{category?.name}</span>

          <strong className="text-zinc-50 mt-2">Brand:</strong>
          <span className="text-zinc-400 mt-2 italic">{brand?.name}</span>

          {collab && (
            <>
              <strong className="text-zinc-50 mt-2">Collab:</strong>
              <span className="text-zinc-400 mt-2 italic">{collab?.name}</span>
            </>
          )}

          <div className="flex  space-x-3 mt-2">
            <Button text="Alterar" />
            <Button text="Deletar" />
            <Button text="Fechar" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
