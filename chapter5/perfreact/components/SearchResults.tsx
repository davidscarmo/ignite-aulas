import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: number;
    title: string;
  }>;
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

export const SearchResult = ({
  results,
  totalPrice,
  onAddToWishList,
}: SearchResultProps) => {
  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })}
    </div>
  );
};
