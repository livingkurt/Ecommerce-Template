export default {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/ecommercedb',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}