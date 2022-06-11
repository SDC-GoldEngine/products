const router = require('express').Router();
const {
  getAll, getProduct, getStyle, getRelated,
} = require('./controllers/index');

router.get('/', getAll);
router.get('/:product_id', getProduct);
router.get('/:product_id', getStyle);
router.get('/:product_id', getRelated);

module.exports = router;
