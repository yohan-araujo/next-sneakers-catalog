"use client";
import Image from "next/image";
import Next from "./assets/icons/next.svg";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";
import ProductsTable from "./components/ProductsTable";
import { useEffect, useState } from "react";
import { IProduct } from "./types/product";
import { ICategory } from "./types/category";
import { IBrand } from "./types/brand";
import { ICollab } from "./types/collab";
import FilterModal from "./components/FilterModal";
import Loading from "./components/Loading";

export default function Catalog() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [collabs, setCollabs] = useState<ICollab[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const response = await fetch("http://localhost:3001/products");
        const productsData = await response.json();
        setProducts(productsData[0].data.data);
        setFilteredProducts(productsData[0].data.data);

        const categoriesResponse = await fetch(
          "http://localhost:3001/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData[0].data.data);

        const brandsResponse = await fetch("http://localhost:3001/brands");
        const brandsData = await brandsResponse.json();
        setBrands(brandsData[0].data.data);

        const collabsResponse = await fetch("http://localhost:3001/collabs");
        const collabsData = await collabsResponse.json();
        setCollabs(collabsData[0].data.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const sortProducts = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.code.localeCompare(b.code);
      } else {
        return b.code.localeCompare(a.code);
      }
    });

    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const searchProducts = (search: string) => {
    setSearchTerm(search);
    const searched = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(searched);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const applyFilters = (
    selectedBrand: IBrand | null,
    selectedCollab: ICollab | null
  ) => {
    const filteredByBrand = selectedBrand
      ? products.filter((product) => product.brand_id === selectedBrand.id)
      : products;

    const filteredByBrandAndCollab = selectedCollab
      ? filteredByBrand.filter(
          (product) => product.collab_id === selectedCollab.id
        )
      : filteredByBrand;

    setFilteredProducts(filteredByBrandAndCollab);

    closeFilterModal();
  };

  return (
    <div className="bg-zinc-900 px-8 py-5">
      <div className="flex space-x-5">
        <div className="flex w-8 h-8 rounded-lg bg-blue-500 justify-center items-center">
          <Image src={Next} alt="NextJS Logo" />
        </div>
        <div className="flex justify-center items-center">
          <strong className="text-white text-sm font-medium">Produtos</strong>
        </div>
      </div>

      <div className="flex justify-between mt-4 items-center">
        <div className="flex space-x-3">
          <strong className="font-bold text-2xl text-white">Produtos</strong>
          <SearchBar
            placeholder="Buscar Produtos..."
            onSearch={searchProducts}
          />
        </div>
        <div className="flex space-x-3">
          <Button text="Filtrar" icon="filter" onClick={openFilterModal} />
          <Button text="Ordenar" icon="order" onClick={sortProducts} />
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <ProductsTable
            products={filteredProducts.map((product) => ({
              ...product,
              category_name: categories.find(
                (category) => category.id === product.category_id
              )?.name,
              brand_name: brands.find((brand) => brand.id === product.brand_id)
                ?.name,
              collab_name: collabs.find(
                (collab) => collab.id === product.collab_id
              )?.name,
            }))}
            brands={brands}
            categories={categories}
            collabs={collabs}
          />
        )}
      </div>
      {isFilterModalOpen && (
        <FilterModal
          brands={brands}
          collabs={collabs}
          onClose={closeFilterModal}
          onSelect={applyFilters}
        />
      )}
    </div>
  );
}
