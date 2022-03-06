const validateProduct = (length, shippedLength) => {
  if (length <= 50) {
    if (length - shippedLength > 10) {
      return false;
    }
  }
  if (length > 100) {
    if (length - shippedLength > 0.08 * length) {
      return false;
    }
  }
  if (length > 500) {
    if (length - shippedLength > 0.1 * length) {
      return false;
    }
  }
  if (length > 1000) {
    if (length - shippedLength > 0.15 * length) {
      return false;
    }
  }
  return true;
};
export default validateProduct;
