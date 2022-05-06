import moment from "moment";
const getPriceOfFabricRoll = (marketPrice, exportBillTime) => {
  const newArr = [...marketPrice].reverse();
  for (const i of newArr) {
    if (moment(exportBillTime).isAfter(i.dayApplied)) {
      return i.price;
    }
  }
  return 0;
};
export default getPriceOfFabricRoll;
