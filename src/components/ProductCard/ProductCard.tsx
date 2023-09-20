import { Link } from 'react-router-dom';
import { TypeProduct } from '../../types';
import { ProductCardContanier } from './styles';

type ProductCardProps = {
  product: TypeProduct,
};

const handleAddToCart = (product: TypeProduct) => {
  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
  currentCart.push(product);
  localStorage.setItem('cart', JSON.stringify(currentCart));
};

function ProductCard({ product } : ProductCardProps) {
  return (
    <ul key={ product.id } data-testid="product">
      <ProductCardContanier>
        <Link to={ `/details/${product.id}` } data-testid="product-detail-link">
          {' '}
          <p>{ product.title }</p>
          <img src={ product.thumbnail } alt="imagem do produto" />
          <p>
            Preço R$:
            {' '}
            { product.price }
          </p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          onClick={ () => handleAddToCart(product) }
        >
          Adicionar ao Carrinho
        </button>
      </ProductCardContanier>
    </ul>
  );
}
export default ProductCard;
