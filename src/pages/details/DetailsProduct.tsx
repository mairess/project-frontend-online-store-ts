import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { TypeProduct2, TypeProduct, TypeProductInCart } from '../../types';
import { getProductById } from '../../services/api';

function DetailsProduct() {
  const [showDetails, setShowDetails] = useState<TypeProduct2>();
  const [productDetails, setProductDetails] = useState<TypeProduct | null>(null);

  const { id } = useParams();
  const safeId = id ?? '';

  async function fetchApi() {
    const detailsProduct = await getProductById(safeId);
    setShowDetails(await detailsProduct);
    setProductDetails(detailsProduct);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  const handleAddToCart = (product: TypeProduct) => {
    let storageCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productInCart = storageCart
      .findIndex((intem: TypeProductInCart) => intem.id === product.id);
    if (productInCart >= 0) {
      storageCart[productInCart].quantity += 1;
    } else {
      storageCart = [...storageCart, { ...product, quantity: 1 }];
    }
    // currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(storageCart));
  };

  return (
    <div>
      <Link to="/shoppingCart" data-testid="shopping-cart-button">
        <button>
          <FiShoppingCart />
        </button>
      </Link>
      <div>
        <div>
          <h3 data-testid="product-detail-name">{ showDetails?.title }</h3>
          <p data-testid="product-detail-price">{`R$ ${showDetails?.price},00`}</p>
          <img
            src={ showDetails?.thumbnail }
            alt={ `Imagem do produto ${showDetails?.title}` }
            data-testid="product-detail-image"
          />
        </div>
        <div>
          <button
            onClick={ () => productDetails && handleAddToCart(productDetails) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <p>Especificações Técnicas</p>
          <ul>
            {showDetails?.attributes.map((attribute) => (
              <li
                key={ attribute.name }
              >
                {`${attribute.name}: ${attribute.value_name}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailsProduct;
