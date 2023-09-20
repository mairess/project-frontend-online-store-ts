import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { TypeProduct2 } from '../../types';
import { getProductById } from '../../services/api';

function DetailsProduct() {
  const [showDetails, setShowDetails] = useState<TypeProduct2>();

  const { id } = useParams();
  const safeId = id ?? '';

  async function fetchApi() {
    const detailsProduct = await getProductById(safeId);
    setShowDetails(await detailsProduct);
  }

  useEffect(() => {
    fetchApi();
  }, []);

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
