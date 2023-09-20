import { Link } from 'react-router-dom';
import { TypeProduct } from '../../types';

type ProductCardProps = {
  product: TypeProduct,
};

function ProductCard({ product } : ProductCardProps) {
  return (
    <Link to={ `/details/${product.id}` } data-testid="product-detail-link">
      <ul key={ product.id } data-testid="product">
        <li>
          {' '}
          <img src={ product.thumbnail } alt="imagem do produto" />
          <p>{ product.title }</p>
          <p>
            Preço R$:
            {' '}
            { product.price }
          </p>
        </li>
      </ul>
    </Link>
  );
}
export default ProductCard;
