function transferOrderStatus(status) {
  let result;
  switch (status) {
    case "pending":
      result = {
        name: "Đợi xử lý",
        style: { color: "#D19431", fontWeight: "bold" },
      };
      break;
    case "processing":
      result = {
        name: "Đang xử lý",
        style: { color: "#F0622F", fontWeight: "bold" },
      };
      break;
    case "completed":
      result = {
        name: "Hoàn tất",
        style: { color: "#5A9E4B", fontWeight: "bold" },
      };
      break;
    default:
      result = {
        name: "Đã hủy",
        style: { color: "#FF0000", fontWeight: "bold" },
      };
      break;
  }

  return result;
}
export default transferOrderStatus;
