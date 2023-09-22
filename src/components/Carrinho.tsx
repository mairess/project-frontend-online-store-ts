import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../types';

export default function ShoppingCart() {
  const [cart, setCart] = useState<ProductType[]>([]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart.map((product: any) => ({ ...product, quantity: 1 })));
  }, []);
  const savedCart = (carts: ProductType[]) => {
    setCart(carts);
    localStorage.setItem('cart', JSON.stringify(carts));
  };
  const increase = (id: string) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    savedCart(newCart);
  };
  const decrement = (id: string) => {
    const decrementProduct = cart.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    savedCart(decrementProduct);
  };
  const remove = (id: string) => {
    const newCarts = cart.filter((product) => product.id !== id);
    savedCart(newCarts);
  };
  return (
    <div>
      <Link to="/">Voltar</Link>
      <ul>
        <h1>Carrinho de Compras</h1>
        {cart.length > 0 ? (
          cart && cart.map((product) => (
            <li key={ product.id }>
              <p data-testid="shopping-cart-product-name">
                { product.title }
              </p>
              <p>
                <img src={ product.thumbnail } alt={ product.title } />
              </p>
              <p>
                Preço: $
                { product.price }
              </p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                {' '}
                {product.quantity}
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => increase(product.id) }
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => decrement(product.id) }
              >
                -
              </button>
              <button
                data-testid="remove-product"
                onClick={ () => remove(product.id) }
              >
                Remover
              </button>
            </li>
          ))
        ) : (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )}
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          Finalizar compra
        </Link>
      </ul>
    </div>
  );
}
