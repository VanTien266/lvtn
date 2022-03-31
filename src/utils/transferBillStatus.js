function transferBillStatus(status) {
  let result;
  switch (status) {
    case "exported":
      result = {
        name: "Đã xuất",
        style: { color: "#D19431", fontWeight: "bold" },
      };
      break;
    case "shipping":
      result = {
        name: "Đang vận chuyển",
        style: { color: "#F0622F", fontWeight: "bold" },
      };
      break;
    case "completed":
      result = {
        name: "Thành công",
        style: { color: "#5A9E4B", fontWeight: "bold" },
      };
      break;
    default:
      result = {
        name: "Thất bại",
        style: { color: "#FF0000", fontWeight: "bold" },
      };
      break;
  }
  return result;
}
export default transferBillStatus;
