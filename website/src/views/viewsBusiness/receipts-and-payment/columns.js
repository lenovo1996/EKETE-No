const columns = [
  {
    title: 'Mã phiếu',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Loại hình phiếu',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Hình thức thanh toán',
    key: 'payment',
  },
  {
    title: 'Trạng thái',
    key: 'status',
  },
  {
    title: 'Số tiền',
    key: 'money',
  },
  {
    title: 'Người nộp',
    key: 'payer',
  },
  {
    title: 'Người nhận',
    key: 'receiver',
  },
  {
    title: 'Người tạo phiếu',
    key: 'creator',
  },
  {
    title: 'Ngày ghi nhận',
    key: 'create_date',
  },
]

export default columns
