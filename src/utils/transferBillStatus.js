export default function TransferStatus(status) {
  let result;
  switch (status) {
    case "exported":
      result = "Đã xuất";
      break;
    case "shipping":
      result = "Đang vận chuyển";
      break;
    case "completed":
      result = "Thành công";
      break;
    default:
      result = "Thất bại";
      break;
  }
  return result;
}
