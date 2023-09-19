import { TypeProduct } from '../../types';

type ProductCardProps = {
  product: TypeProduct,
};

function ProductCard({ product } : ProductCardProps) {
  return (
    <ul key={ product.id } data-testid="product">
      <li>
        {' '}
        <img src={ product.thumbnail } alt="imagem do produto" />
        <p>
          Preço R$:
          {' '}
          { product.price }
        </p>
      </li>
    </ul>
  );
}
export default ProductCard;
