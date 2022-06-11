/* eslint-disable camelcase */
const {
  readAll, readProduct, readStyle, readRelated,
} = require('../models/index');

module.exports = {
  getAll: (req, res) => {
    const { page, count } = req.query;
    readAll(page, count)
      .then((result) => { res.send(result).status(200); })
      .catch((err) => { res.sendStatus(500); throw (err); });
  },

  getProduct: (req, res) => {
    const { product_id } = req.params;
    readProduct(product_id)
      .then((result) => { res.send(result).status(200); })
      .catch((err) => { res.sendStatus(500); throw (err); });
  },

  getStyle: (req, res) => {
    const { product_id } = req.params;
    readStyle(product_id)
      .then((result) => { res.send(result).status(200); })
      .catch((err) => { res.sendStatus(500); throw (err); });
  },

  getRelated: (req, res) => {
    const { product_id } = req.params;
    readRelated(product_id)
      .then((result) => { res.send(result).status(200); })
      .catch((err) => { res.sendStatus(500); throw (err); });
  },
};
