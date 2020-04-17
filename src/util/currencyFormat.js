const currencyFormat = (price) => {
  let fixedVal = Number(price).toFixed(2);
  return `$${fixedVal}`;
};

export default currencyFormat;