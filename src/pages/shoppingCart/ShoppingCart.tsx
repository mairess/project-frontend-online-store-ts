import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { TypeProductInCart } from '../../types';
import { ProductsWrapper } from './styles';

function ShoppingCart() {
  const storage: TypeProductInCart[] = JSON.parse(localStorage.getItem('cart') || '[]');

  const productQuantity = (productId: string) => {
    return storage
      .filter((product: TypeProductInCart) => product.id === productId).length;
  };

  const productQuantities: { [productId: string]: number } = {};

  storage.forEach((product: TypeProductInCart) => {
    if (!productQuantities[product.id]) {
      productQuantities[product.id] = 1;
    } else {
      productQuantities[product.id]++;
    }
  });

  const uniqueProducts = storage
    .filter(
      (product: TypeProductInCart, index: number, self: TypeProductInCart[]) => {
        return index === self.findIndex((procutsFind) => procutsFind.id === product.id);
      },
    );

  return (
    <div>
      {/* link que retonar para a home */}
      <Link to="/">
        <BiArrowBack />
      </Link>
      {(uniqueProducts.length === 0) && (
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      )}
      {uniqueProducts.map((item) => (
        <ProductsWrapper key={ item.id }>
          <button>Remover</button>
          <div><img src={ item.thumbnail } alt={ item.title } /></div>
          <div data-testid="shopping-cart-product-name">
            {item.title}
          </div>
          <button>+</button>
          <div data-testid="shopping-cart-product-quantity">
            {productQuantity(item.id)}
          </div>
          <button>-</button>
        </ProductsWrapper>
      ))}
    </div>
  );
}
export default ShoppingCart;
