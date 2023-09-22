import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../types';

export default function Checkout() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [addres, setAddres] = useState('');
  const [cep, setCep] = useState('');
  const [cart, setCart] = useState<ProductType[]>([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart.map((product: any) => ({ ...product, quantity: 1 })));
  }, []);
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  const handleClick = () => {
    if (selectedOption !== ''
    && name !== ''
    && email !== ''
    && cpf !== ''
    && phone !== ''
    && addres !== ''
    && cep !== ''
    ) {
      localStorage.clear();
      navigate('/Carrinho');
    }
    setErrorMsg(true);
  };
  return (
    <div>
      <section>
        {cart.map((product) => (
          <ul
            key={ product.id }
          >
            <p>{product.title}</p>
          </ul>
        ))}
      </section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          <input
            required
            type="text"
            data-testid="checkout-fullname"
            name=""
            id="name"
            onChange={ (e) => setName(e.target.value) }
          />
          Nome
        </label>
        <input
          required
          type="email"
          data-testid="checkout-email"
          name=""
          id=""
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          required
          type="text"
          data-testid="checkout-cpf"
          name=""
          id=""
          onChange={ (e) => { setCpf(e.target.value); } }
        />
        <input
          required
          type="tel"
          data-testid="checkout-phone"
          name=""
          id=""
          onChange={ (e) => setPhone(e.target.value) }
        />
        <input
          required
          type="text"
          data-testid="checkout-cep"
          name=""
          id=""
          onChange={ (e) => setCep(e.target.value) }
        />
        <input
          required
          type="text"
          data-testid="checkout-address"
          name=""
          id=""
          onChange={ (e) => setAddres(e.target.value) }
        />

        <label htmlFor="Boleto">
          <input
            value="Boleto"
            data-testid="ticket-payment"
            type="radio"
            name="Payment"
            id="Boleto"
            checked={ selectedOption === 'Boleto' }
            onChange={ (e) => setSelectedOption(e.target.value) }
          />
          Boleto
        </label>

        <label htmlFor="Visa">
          <input
            value="Visa"
            data-testid="visa-payment"
            type="radio"
            name="Payment"
            id="Visa"
            checked={ selectedOption === 'Visa' }
            onChange={ (e) => setSelectedOption(e.target.value) }
          />
          Visa
        </label>

        <label htmlFor="Master">
          <input
            value="MasterCard"
            data-testid="master-payment"
            type="radio"
            name="Payment"
            id="Master"
            checked={ selectedOption === 'MasterCard' }
            onChange={ (e) => setSelectedOption(e.target.value) }
          />
          MasterCard
        </label>

        <label htmlFor="Elo">
          <input
            value="Elo"
            data-testid="elo-payment"
            type="radio"
            name="Payment"
            id="Elo"
            checked={ selectedOption === 'Elo' }
            onChange={ (e) => setSelectedOption(e.target.value) }
          />
          Elo
        </label>

        <button
          type="submit"
          data-testid="checkout-btn"
          onClick={ handleClick }
        >
          Confirmar
        </button>
      </form>
      {errorMsg && <p data-testid="error-msg">Campos inválidos</p>}
    </div>
  );
}
