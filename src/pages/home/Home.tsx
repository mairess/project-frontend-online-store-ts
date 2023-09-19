import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import CategoryList from '../../components/CategoryList/CategoryList';

function Home() {
  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id=""
        />
      </div>
      <div>
        <CategoryList />
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        {/* Botão para o carrinho de compras */}
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <FiShoppingCart />
        </Link>
      </div>
    </>
  );
}

export default Home;
