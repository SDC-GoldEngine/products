const router = require('express').Router();
const {
  getAll, getProduct, getStyle, getRelated,
} = require('./controllers/index');

router.get('/', getAll);
router.get('/:product_id', getProduct);
router.get('/:product_id/styles', getStyle);
router.get('/:product_id/related', getRelated);

module.exports = router;
