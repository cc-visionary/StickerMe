const FEATURES = [
  'Skin Color',
  'Back Hair',
  'Front Hair',
  'Side Hair',
  'Extra Hair',
  'Eyes',
  'Eyebrows',
  'Nose',
  'Mouth',
  'Blush',
  'Accessories',
];

const LOGIN_FALLBACK = '/login';
const ADMIN_FALLBACK = '/admin';
const CUSTOMER_FALLBACK = '/create-sticker';

const FEATURE_IMAGE_URL = 'http://localhost:3000/uploads';
const USER_API_BASE_URL = 'http://localhost:3000/api/users';
const CHARACTER_API_BASE_URL = 'http://localhost:3000/api/carts';
const CONTACT_API_BASE_URL = 'http://localhost:3000/api/contacts';
const CART_API_BASE_URL = 'http://localhost:3000/api/carts';
const ORDER_API_BASE_URL = 'http://localhost:3000/api/orders';
const IMAGE_API_BASE_URL = 'http://localhost:3000/api/images';

export {
  FEATURES,
  LOGIN_FALLBACK,
  ADMIN_FALLBACK,
  CUSTOMER_FALLBACK,
  FEATURE_IMAGE_URL,
  USER_API_BASE_URL,
  CHARACTER_API_BASE_URL,
  CONTACT_API_BASE_URL,
  CART_API_BASE_URL,
  ORDER_API_BASE_URL,
  IMAGE_API_BASE_URL,
};
