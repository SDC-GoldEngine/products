const router = require('express').Router();
const {
  getAll, getProduct, getStyle, getRelated,
} = require('./controllers/index');

router.get('/products', getAll);
router.get('/products/:product_id', getProduct);
router.get('/products/:product_id/styles', getStyle);
router.get('/products/:product_id/related', getRelated);

module.exports = router;
