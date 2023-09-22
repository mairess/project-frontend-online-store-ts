import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { TypeProductInCart } from '../../types';
import { ProductsWrapper } from './styles';

function ShoppingCart() {
  const [storage, setStorage] = useState<TypeProductInCart[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<TypeProductInCart[]>([]);
  const [productQuantities, setProductQuantities] = useState<
  { [productId: string]: number }>({});

  useEffect(() => {
    setStorage(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  useEffect(() => {
    const products = storage
      .filter(
        (product: TypeProductInCart, index: number, self: TypeProductInCart[]) => {
          return index === self.findIndex((procutsFind) => procutsFind.id === product.id);
        },
      );
    setUniqueProducts(products || []);
    const myQuantities : { [productId: string]: number } = {};
    storage.forEach((product: TypeProductInCart) => {
      if (!myQuantities[product.id]) {
        myQuantities[product.id] = 1;
      } else {
        myQuantities[product.id]++;
      }
    });

    setProductQuantities(myQuantities);
    localStorage.setItem('cart', JSON.stringify(storage));
  }, [storage]);

  const increseItem = (item : TypeProductInCart) => {
    const increseItens = [...storage];
    increseItens.push(item);
    setStorage(increseItens);
  };

  const decreaseItem = (item: TypeProductInCart) => {
    const decreaseStorage : any = [...storage];
    const resultItens = storage.filter((element) => element.id === item.id);
    if (resultItens.length > 1) {
      const indexItem = decreaseStorage.lastIndexOf(item);
      decreaseStorage.splice(indexItem, 1);
      setStorage(decreaseStorage);
    }
  };

  const removerItem = (item: TypeProductInCart) => {
    const itemRemove = storage.filter((element) => element.id !== item.id);
    setStorage(itemRemove);
  };
  return (
    <div>
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
          <button
            onClick={ () => removerItem(item) }
            data-testid="remove-product"
          >
            Remover
          </button>
          <div><img src={ item.thumbnail } alt={ item.title } /></div>
          <div data-testid="shopping-cart-product-name">
            {item.title}
          </div>
          <button
            onClick={ () => increseItem(item) }
            data-testid="product-increase-quantity"
          >
            +
          </button>
          <div data-testid="shopping-cart-product-quantity">
            {productQuantities[item.id]}
          </div>
          <button
            onClick={ () => decreaseItem(item) }
            data-testid="product-decrease-quantity"
          >
            -
          </button>
        </ProductsWrapper>
      ))}
      <Link to="/checkout">
        <button
          disabled={ uniqueProducts.length <= 0 }
          data-testid="checkout-products"
        >
          Finalizar Compra
        </button>

      </Link>
    </div>
  );
}
export default ShoppingCart;
