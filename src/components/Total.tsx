export default function Total() {
  return (
    <span>
      Valor Total: R$
      {' '}
      {(!Number.isNaN(parseFloat(item.price)) && !Number.isNaN(item.quantity))
        ? (parseFloat(item.price) * item.quantity).toFixed(2)
        : '0.00'}
    </span>
  );
}
