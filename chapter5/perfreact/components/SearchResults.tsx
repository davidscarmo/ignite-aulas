import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";
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
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };
  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={300}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/* {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })} */}
    </div>
  );
};
