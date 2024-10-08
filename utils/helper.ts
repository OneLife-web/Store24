export const generateOrderId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit number
};
