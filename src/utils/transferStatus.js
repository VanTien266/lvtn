export function TransferStatus(status) {
  switch (status) {
    case "exported":
      return "Đã xuất";
    case "success":
      return "Thành công";
    case "failed":
      return "Thất bại";
  }
}
