import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import CategoryList from '../../components/CategoryList/CategoryList';
import SearchProduct from '../../components/SearchProduct/SearchProduct';

function Home() {
  return (
    <>
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <SearchProduct />
      </div>
      <br />
      <div>
        {/* Botão para o carrinho de compras */}
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <FiShoppingCart />
        </Link>
      </div>
      <CategoryList />
    </>
  );
}

export default Home;
