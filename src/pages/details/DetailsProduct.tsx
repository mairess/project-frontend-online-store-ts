import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { TypeProduct2 } from '../../types';
import { getProductById } from '../../services/api';

function DetailsProduct() {
  // Estado criado para armazenar os dados da API
  const [showDetails, setShowDetais] = useState<TypeProduct2[]>([]);

  const { id } = useParams();
  const safeId = id ?? '';

  useEffect(() => {
    const getDetails = async () => {
      const detailsProduct = await getProductById(safeId);
      setShowDetais(detailsProduct);
    };
    getDetails();
  });

  return (
    <div>
      <Link to="/shoppingCart">
        <button>
          <FiShoppingCart />
        </button>
      </Link>
      {showDetails.map((details) => (
        <div key={ details.id }>
          <div>
            <h3 data-testid="product-detail-name">{ details.title }</h3>
            <p data-testid="product-detail-price">{details.price}</p>
            <img
              src={ details.thumbnail }
              alt={ `Imagem do produto ${details.title}` }
              data-testid="product-detail-image"
            />
          </div>
          <div>
            <p>Especificações Técnicas</p>
            <ul>
              {details.attributes.map((attribute) => (
                <li
                  key={ attribute.name }
                >
                  {`${attribute.name}: ${attribute.value_name}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

    </div>
  );
}

export default DetailsProduct;
