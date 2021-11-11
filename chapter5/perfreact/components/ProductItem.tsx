import { memo, useState } from "react";
// import { AddProductToWishList } from "./AddProductToWishList";
import dynamic from "next/dynamic";

import { AddProductToWishListProps } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  { loading: () => <span> Carregando...</span> }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

const ProductItemComponent = ({
  product,
  onAddToWishList,
}: ProductItemProps) => {
  const [isAddingToWishList, setAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setAddingToWishList(true)}>
        Add to Wish List
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setAddingToWishList(false)}
        />
      )}
    </div>
  );
};

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
