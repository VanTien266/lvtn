const checkProductExist = (colorCode, products) => {
  for (let product of products) {
    console.log(product.colorCode.colorCode);
    if (product.colorCode.colorCode === colorCode) return true;
  }
  return false;
};
export default checkProductExist;
