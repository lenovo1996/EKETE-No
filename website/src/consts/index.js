export const ACTION = {
  CHECK_SUBDOMAIN: 'CHECK_SUBDOMAIN',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOADING: 'LOADING',
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_STORE: 'GET_STORE',
  SELECT_VALUE: 'SELECT_VALUE',
  ERROR: 'ERROR',
  CHANGE_SIDER: 'CHANGE_SIDER',

  //admin

  LOGINADMIN: 'LOGINADMIN',
}

export const ROLE_DEFAULT = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  BUSINESS: 'BUSINESS',
}

//status product
export const STATUS_PRODUCT = {
  all: 'all',
  shipping_stock: 'shipping_stock',
  available_stock: 'available_stock',
  low_stock: 'low_stock',
  out_stock: 'out_stock',
}

export const SHIP_STATUS_ORDER = {
  DRAFT: 'DRAFT',
  WATTING_FOR_SHIPPING: 'WATTING_FOR_SHIPPING',
  SHIPPING: 'SHIPPING',
  COMPLETE: 'COMPLETE',
  CANCEL: 'CANCEL',
}

export const ROUTES_USER = {
  CHECK_SUBDOMAIN: '/business-login',
  INFOR: '/infor',
  SETTINGINFOR: '/setting-infor',
  LOGIN: '/login',
  REGISTER: '/register',
  OTP: '/otp',
  VERIFY_ACCOUNT: '/verify-account',
  PASSWORD_NEW: '/password-new',
  FORGET_PASSWORD: '/forget-password',
  OVERVIEW: '/overview',
  BUSINESS: '/business',
  NEWFEED: '/newfeed',
  DETAILBUSINESS:`/detail-business/:id`,
  REGISTERBUSINESS:'/register-business'
}

export const ROUTES_ADMIN = {
  OVERVIEWADMIN: '/overviewadmin',
  OTPADMIN: '/otpadmin',
  VERIFY_ACCOUNTADMIN: '/verify-accountadmin',
  PASSWORD_NEWADMIN: '/password-newadmin',
  FORGET_PASSWORDADMIN: '/forget-passwordadmin',
  CHECK_SUBDOMAINADMIN: '/business-loginadmin',
  LOGINADMIN: '/loginadmin',
  REGISTERADMIN: '/registeradmin',
  BUSINESSADMIN: '/businessadmin',
  MENU_USER: '/menu-user',
  MENU_ADMIN: '/menu-admin',
  MENU_BUSINESS: '/menu-business',
  USER_EKT: '/user-ekt',
  USER_ADMIN: '/user-admin',
}

export const PERMISSIONS_ADMIN = {
  tong_quan_admin: 'tong_quan_admin',
}
export const ROUTES = {
  CHECK_SUBDOMAIN: '/business-login',
  LOGIN: '/login',
  // REGISTER: '/register',
  IMPORT_REPORT_FILE: '/import-report-file',
  PRODUCT_CHECK: '/product-check',
  ORDER_LIST: '/order-list',
  REPORTS: '/reports',
  SALES_REPORT: '/sales-report',
  STOCK_ADJUSTMENTS: '/stock-adjustments',
  STOCK_ADJUSTMENTS_CREATE: '/stock-adjustments/create',
  STOCK_ADJUSTMENTS_UPDATE: '/stock-adjustments/update',
  REPORT_VARIANT: '/report-variant',
  REPORT_INVENTORY: '/report-inventory',
  REPORT_IMPORT_EXPORT_INVENTORY_PRODUCT: '/report-import-export-inventory-product',
  REPORT_IMPORT_EXPORT_INVENTORY_VARIANT: '/report-import-export-inventory-variant',
  SHIPPING_CONTROL: '/shipping-control',
  SHIPPING_CONTROL_ADD: '/shipping-control/add',
  DELIVERY_CONTROL: '/delivery-control',
  GUARANTEE: '/guarantee',
  GUARANTEE_ADD: '/guarantee-create',
  SHIPPING_PRODUCT: '/shipping-product',
  CLIENT_MANAGEMENT: '/client-management',
  BRANCH_MANAGEMENT: '/branch',
  CONFIGURATION_STORE: '/configuration-store',
  OTP: '/otp',
  VERIFY_ACCOUNT: '/verify-account',
  PASSWORD_NEW: '/password-new',
  FORGET_PASSWORD: '/forget-password',
  OVERVIEW: '/overview-business',
  SELL: '/sell',
  REFUND: '/refund',
  STORE: '/store',
  RECEIPTS_PAYMENT: '/receipts-payment',
  ACTIVITY_DIARY: '/activity-diary',
  SHIPPING_PRODUCT_ADD: '/shipping-product-add',
  ORDER_CREATE: '/order-create',
  INVENTORY: '/inventory',
  PRODUCT: '/product',
  PAYMENT: '/payment',
  TAX: '/tax',
  EMPLOYEE: '/employee',
  SHIPPING: '/shipping',
  SHIPPING_CREATE: '/shipping/create',
  CUSTOMER: '/customer',
  SUPPLIER: '/supplier',
  PROMOTION: '/promotion',
  ROLE: '/role',
  PRODUCT_ADD: '/product/add',
  PRODUCT_UPDATE: '/product/update',
  POINT: '/point',
  CATEGORY: '/category',
  CATEGORIES: '/categories',
  SETTING: '/setting',
  SETTING_BILL: '/setting-bill',
  OFFER_LIST: '/offer-list',
  OFFER_LIST_CREATE: '/offer-list/create',
  BLOG: '/blog',
  BLOG_CREATE: '/blog/create',
  BRAND: '/brand',
  BRAND_CREATE: '/brand/create',
  CHANNEL: '/channel',
  // CHANNEL_CREATE:'/channel/create',
  CONTACT: '/contact',
  IMPORT_INVENTORIES: '/import-inventories',
  IMPORT_INVENTORY: '/import-inventory',
  PRICE_ADJUSTMENTS: '/price-adjustments',
  PRICE_ADJUSTMENTS_CREATE: '/price-adjustments/create',
  PRICE_ADJUSTMENTS_UPDATE: '/price-adjustments/update',
}

export const PERMISSIONS = {
  //Permission menu
  tong_quan: 'tong_quan',
  ban_hang: 'ban_hang',
  danh_sach_don_hang: 'danh_sach_don_hang',
  quan_li_client: 'quan_li_client',
  san_pham: 'san_pham',
  quan_li_chi_nhanh: 'quan_li_chi_nhanh',
  quan_li_san_pham: 'quan_li_san_pham',
  quan_li_kho: 'quan_li_kho',
  quan_li_chuyen_hang: 'quan_li_chuyen_hang',
  quan_li_nha_cung_cap: 'quan_li_nha_cung_cap',
  quan_li_bao_hanh: 'quan_li_bao_hanh',
  khuyen_mai: 'khuyen_mai',
  nhap_hang: 'nhap_hang',
  kiem_hang_cuoi_ngay: 'kiem_hang_cuoi_ngay',
  quan_li_khach_hang: 'quan_li_khach_hang',
  bao_cao_don_hang: 'bao_cao_don_hang',
  bao_cao_nhap_hang: 'bao_cao_nhap_hang',
  bao_cao_ton_kho: 'bao_cao_ton_kho',
  bao_cao_tai_chinh: 'bao_cao_tai_chinh',
  van_chuyen: 'van_chuyen',
  doi_soat_van_chuyen: 'doi_soat_van_chuyen',
  quan_li_doi_tac_van_chuyen: 'quan_li_doi_tac_van_chuyen',
  cau_hinh_thong_tin: 'cau_hinh_thong_tin',
  quan_li_phan_quyen: 'quan_li_phan_quyen',
  tich_diem: 'tich_diem',
  quan_li_uu_dai: 'quan_li_uu_dai',
  chi_nhanh: 'chi_nhanh',
  kiem_hang: 'kiem_hang',
  phieu_chuyen_hang: 'phieu_chuyen_hang',
  tong_hop_bao_cao: 'tong_hop_bao_cao',

  //Permission function
  them_cua_hang: 'them_cua_hang',
  tao_don_hang: 'tao_don_hang',
  nhom_san_pham: 'nhom_san_pham',
  them_san_pham: 'them_san_pham',
  xoa_san_pham: 'xoa_san_pham',
  tao_nhom_san_pham: 'tao_nhom_san_pham',
  xoa_nhom_san_pham: 'xoa_nhom_san_pham',
  cap_nhat_nhom_san_pham: 'cap_nhat_nhom_san_pham',
  tao_phieu_chuyen_hang: 'tao_phieu_chuyen_hang',
  them_kho: 'them_kho',
  cap_nhat_kho: 'cap_nhat_kho',
  cap_nhat_trang_thai_phieu_chuyen_hang: 'cap_nhat_trang_thai_phieu_chuyen_hang',
  them_nha_cung_cap: 'them_nha_cung_cap',
  cap_nhat_nha_cung_cap: 'cap_nhat_nha_cung_cap',
  them_phieu_bao_hanh: 'them_phieu_bao_hanh',
  them_khuyen_mai: 'them_khuyen_mai',
  them_phieu_nhap_hang: 'them_phieu_nhap_hang',
  them_phieu_kiem_hang: 'them_phieu_kiem_hang',
  them_khach_hang: 'them_khach_hang',
  cap_nhat_khach_hang: 'cap_nhat_khach_hang',
  them_phieu_doi_soat_van_chuyen: 'them_phieu_doi_soat_van_chuyen',
  them_doi_tac_van_chuyen: 'them_doi_tac_van_chuyen',
  cap_nhat_doi_tac_van_chuyen: 'cap_nhat_doi_tac_van_chuyen',
  xoa_doi_tac_van_chuyen: 'xoa_doi_tac_van_chuyen',
  them_chi_nhanh: 'them_chi_nhanh',
  cap_nhat_chi_nhanh: 'cap_nhat_chi_nhanh',
  quan_li_cua_hang: 'quan_li_cua_hang',
  quan_li_nguoi_dung: 'quan_li_nguoi_dung',
  them_nguoi_dung: 'them_nguoi_dung',
  quan_li_nhan_su: 'quan_li_nhan_su',
  them_nhan_su: 'them_nhan_su',
  cap_nhat_nhan_su: 'cap_nhat_nhan_su',
  quan_li_thue: 'quan_li_thue',
  them_thue: 'them_thue',
  quan_li_thanh_toan: 'quan_li_thanh_toan',
  them_hinh_thuc_thanh_toan: 'them_hinh_thuc_thanh_toan',
  nhap_xuat_file: 'nhap_xuat_file',
  nhat_ki_hoat_dong: 'nhat_ki_hoat_dong',
  tao_quyen: 'tao_quyen',
  tao_uu_dai: 'tao_uu_dai',
  tao_bai_viet: 'tao_bai_viet',
  tao_thuong_hieu: 'tao_thuong_hieu',
  tao_kenh_ban_hang: 'tao_kenh_ban_hang',
}

export const VERSION_APP = '1.4.5.13'

export const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

export const IMAGE_DEFAULT =
  'https://s3.ap-northeast-1.wasabisys.com/admin-order/2022/04/06/28053404-5779-4c1f-905c-d7a0d62a5513/noimage.png'
export const LOGO_DEFAULT =
  'https://s3.ap-northeast-1.wasabisys.com/ecom-fulfill/2021/09/02/95131dfc-bf13-4c49-82f3-6c7c43a7354d_logo_quantribanhang 1.png'

export const FILTER_SIZE = ''
export const FILTER_COL_HEIGHT = ''
export const PAGE_SIZE = ``
export const PAGE_SIZE_OPTIONS = [20, 40, 50, 60, 80, 100]
export const POSITION_TABLE = ['bottomLeft']

export const CONDITION_NAME = {
  name: 'Tên sản phẩm',
  description: 'Mô tả',
  sku: 'SKU',
  weight: 'Cân nặng',
  height: 'Chiều cao',
  width: 'Chiều rộng',
  quantity: 'Số lượng',
  price_import: 'Giá nhập',
  price_sale: 'Giá bán',
}

export const CONDITION_OPERATOR = {
  is_equal_to: 'giống',
  is_not_equal_to: 'không giống',
  is_greater_than: 'nhiều hơn',
  is_less_than: 'ít hơn',
  contains: 'chứa',
  does_not_contains: 'không chứa',
  is_not_empty: 'trống',
  is_empty: 'không trống',
}
export const BILL_STATUS_ORDER = {
  DRAFT: 'Lưu nháp',
  PROGRESSING: 'Đang xử lý',
  COMPLETE: 'Hoàn thành',
  CANCEL: 'Huỷ bỏ',
  SHIPPING: 'Đang vận chuyển',
  IN_PRODUCTION: 'Đang bàn giao vận chuyển',
  REFUND: 'Hoàn Tiền',
}
