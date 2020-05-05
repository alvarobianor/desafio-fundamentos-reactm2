const formatValue = (value: number): string =>
  // Intl.NumberFormat().format(value); // TODO
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default formatValue;
