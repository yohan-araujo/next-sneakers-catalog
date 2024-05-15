import NextButton from "./NextButton";
import PrevButton from "./PreviousButton";
import { IProduct } from "../types/product";
import { useEffect, useState } from "react";
import { IBrand } from "../types/brand";
import { ICategory } from "../types/category";
import { ICollab } from "../types/collab";
import ProductsModal from "./ProductsModal";
import CheckboxButton from "./CheckboxButton";

interface ProductsTableProps {
  products: IProduct[];
  brands: IBrand[];
  categories: ICategory[];
  collabs: ICollab[];
}

export default function ProductsTable({
  products,
  brands,
  categories,
  collabs,
}: ProductsTableProps) {
  useEffect(() => {
    setCurrentPage(1); // Defina currentPage como 1 sempre que filteredProducts mudar
  }, [products]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const productsPerPage = 5;
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const lastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const firstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const openModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsProductsModalOpen(true);
  };

  const closeModal = () => {
    setIsProductsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <table className="w-full text-sm text-left border border-zinc-800 ">
        <thead className="text-white">
          <tr>
            <th className="p-4">
              <CheckboxButton />
            </th>
            <th className="px-3 py-4">Código</th>
            <th className="px-3 py-4">Produto</th>
            <th className="px-3 py-4">Categoria</th>
            <th className="px-3 py-4">Brand</th>
            <th className="px-3 py-4">Collab</th>
            <th className="px-3 py-4"></th>
          </tr>
        </thead>
        <tbody className="text-white">
          {currentProducts.map((product) => (
            <tr key={product.id} className="border border-zinc-800">
              <td className="w-4 p-4">
                <CheckboxButton />
              </td>
              <td className="px-3 py-4">
                <span className="text-sm text-zinc-400 font-normal">
                  {product.code}
                </span>
              </td>
              <td className="px-3 py-4">
                <div className="flex flex-col">
                  <span className="text-zinc-50 text-sm">{product.name}</span>
                  <span className="text-zinc-400 text-xs">
                    {product.subname}
                  </span>
                </div>
              </td>
              <td className="px-3 py-4 text-[13px] text-zinc-400">
                {product.category_name}
              </td>
              <td className="px-3 py-4 text-[13px] text-zinc-400">
                {product.brand_name}
              </td>
              <td className="px-3 py-4 text-[13px] text-zinc-400">
                {product.collab_name}
              </td>
              <td className="flex px-3 py-4">
                <div
                  className="flex w-7 h-7 rounded-md justify-center items-center bg-zinc-800 hover:opacity-50 cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  <span className="text-zinc-50 font-bold text-sm">...</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full px-3 py-4 justify-between items-center text-sm text-zinc-400 border border-t-0 border-zinc-800">
        <div>
          <span>
            Exibindo {currentProducts.length} de {products.length} itens
          </span>
        </div>
        <div className="flex justify-center items-center space-x-8">
          <div>
            <span>
              Página {totalPages != 0 ? currentPage : "0"} de {totalPages}
            </span>
          </div>

          <div className="flex space-x-2">
            <PrevButton
              icon="chev2l"
              onClick={firstPage}
              disabled={currentPage === 1}
            />
            <PrevButton
              icon="chevl"
              onClick={prevPage}
              disabled={currentPage === 1}
            />
            <NextButton
              icon="chevr"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            />
            <NextButton
              icon="chev2r"
              onClick={lastPage}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
      {isProductsModalOpen && (
        <ProductsModal
          product={selectedProduct}
          brand={
            brands.find((brand) => brand.id === selectedProduct?.brand_id) ||
            null
          }
          category={
            categories.find(
              (category) => category.id === selectedProduct?.category_id
            ) || null
          }
          collab={
            collabs.find(
              (collab) => collab.id === selectedProduct?.collab_id
            ) || null
          }
          onClose={closeModal}
        />
      )}
    </>
  );
}
