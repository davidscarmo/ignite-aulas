import { ProductItem } from "./ProductItem"

interface SearchResultProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export const  SearchResult = ({ results } : SearchResultProps) => {

    return (
        <div>
            {results.map(product => {
                return (
                    <ProductItem  key={product.id} product={product} />
                )
            })
            }
        </div>
    )
}
