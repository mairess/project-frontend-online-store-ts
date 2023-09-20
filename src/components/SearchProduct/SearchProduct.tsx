import { useEffect, useState } from 'react';
import { CategoryType, TypeProduct } from '../../types';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';

type SearchProductProps = {
  categoryList: CategoryType[],
};

function SearchProduct({ categoryList }: SearchProductProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [productResult, setProductResult] = useState<TypeProduct[]>();
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const selectedCategory = categoryList
      .find((category) => category.selected === true);
    if (selectedCategory?.selected === true) {
      searchProduct(selectedCategory.id);
    }
  }, [categoryList]);

  async function searchProduct(searchIntent: string) {
    const result = await getProductsFromCategoryAndQuery(searchIntent);
    setProductResult(result.results);
    setSearched(true);
  }
  return (
    <>
      <input
        type="text"
        name=""
        id=""
        data-testid="query-input"
        value={ searchTerm }
        onChange={ ({ target }) => setSearchTerm(target.value) }
      />
      <button data-testid="query-button" onClick={ () => searchProduct(searchTerm) }>
        Pesquisar
      </button>
      { searched && productResult?.length === 0 ? (
        <p>Nenhum produto foi encontrado</p>
      ) : (
        <div>
          {productResult?.map((product) => (
            <ProductCard key={ product.id } product={ product } />
          ))}
        </div>)}
    </>
  );
}
export default SearchProduct;
