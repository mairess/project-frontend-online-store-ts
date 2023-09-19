import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function ShoppingCart() {
  return (
    <div>
      {/* link que retonar para a home */}
      <Link to="/">
        <BiArrowBack />
      </Link>
      <h2 data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </h2>
    </div>
  );
}
export default ShoppingCart;
