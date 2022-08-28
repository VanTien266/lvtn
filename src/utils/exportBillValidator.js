const checkProductExist = (colorCode, products) => {
  for (let product of products) {
    if (product.colorCode.colorCode === colorCode) return true;
  }
  return false;
};
export default checkProductExist;
