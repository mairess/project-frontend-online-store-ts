import { useState } from 'react';
import { TypeProduct } from '../../types';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';

function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [productResult, setProductResult] = useState<TypeProduct[]>();
  const [searched, setSearched] = useState(false);

  async function searchProduct() {
    const result = await getProductsFromCategoryAndQuery(searchTerm);
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
      <button data-testid="query-button" onClick={ () => searchProduct() }>
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
