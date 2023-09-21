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
    setUniqueProducts(products);
    console.log(storage);
    const myQuantities : { [productId: string]: number } = {};
    storage.forEach((product: TypeProductInCart) => {
      if (!myQuantities[product.id]) {
        myQuantities[product.id] = 1;
      } else {
        myQuantities[product.id]++;
      }
    });
    setProductQuantities(myQuantities);
  }, [storage]);

  // quando o product for alterado para mais ou menos o productQuantities precisa recalcular

  // se clicar adicionar vou add o item no storage
  const increseItem = (item : TypeProductInCart) => {
    const increseItens = [...storage];
    increseItens.push(item);
    localStorage.setItem('cart', JSON.stringify(increseItens));
    setStorage(increseItens);
  };

  // se clicar em remover remove um item no storage
  const decreaseItem = (item: TypeProductInCart) => {
    const decreaseStorage = [...storage];
    const indexItem = decreaseStorage.indexOf(item);
    decreaseStorage.splice(indexItem, 1);
    setStorage(decreaseStorage);
  };

  // se clicar remove todo o item
  const removerItem = (item: TypeProductInCart) => {
    const itemRemove = storage.filter((element) => element.id !== item.id);
    setStorage(itemRemove);
    localStorage.setItem('cart', JSON.stringify(storage));
  };
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
          <button onClick={ () => removerItem(item) }>Remover</button>
          <div><img src={ item.thumbnail } alt={ item.title } /></div>
          <div data-testid="shopping-cart-product-name">
            {item.title}
          </div>
          <button onClick={ () => increseItem(item) }>+</button>
          <div data-testid="shopping-cart-product-quantity">
            {productQuantities[item.id]}
          </div>
          <button onClick={ () => decreaseItem(item) }>-</button>
        </ProductsWrapper>
      ))}
    </div>
  );
}
export default ShoppingCart;
