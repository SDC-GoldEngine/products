const pool = require('../db/setup');

module.exports = {
  readAll: (page = 1, count = 5) => (
    pool.query(
      'SELECT * FROM products ORDER BY id ASC LIMIT $2 OFFSET $1',
      [page * count - count, count],
    )
      .then((res) => res.rows)
      .catch((err) => { throw err; })
  ),

  readProduct: (productId) => (
    pool.query(`SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
      json_agg(
        json_build_object(
          'feature', f.feature,
          'value', f.value
        )
      ) AS features FROM products p JOIN features f ON p.id = f.product_id
      WHERE p.id = $1 GROUP BY p.id ORDER BY p.id ASC`, [productId])
      .then((res) => res.rows[0])
      .catch((err) => { throw err; })
  ),

  // readStyles: (productId) => (
  //   pool.query(
  //     `SELECT `
  //   )
  // ),
};
