import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import CategoryList from '../../components/CategoryList/CategoryList';
import SearchProduct from '../../components/SearchProduct/SearchProduct';
import { CategoryType } from '../../types';

function Home() {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  const handleCategoryListChange = (updatedCategoriesList: CategoryType[]) => {
    setCategoryList(updatedCategoriesList);
  };

  return (
    <>
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <SearchProduct
          categoryList={ categoryList }
        />
      </div>
      <br />
      <div>
        {/* Botão para o carrinho de compras */}
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <FiShoppingCart />
        </Link>
      </div>
      <CategoryList
        categoryList={ categoryList }
        onCategoryListChange={ handleCategoryListChange }
      />
    </>
  );
}

export default Home;
