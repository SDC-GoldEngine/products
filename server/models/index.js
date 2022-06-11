const pool = require('../db/setup');

module.exports = {
  readAll: (page = 1, count = 5) => (
    pool.query(
      'SELECT * FROM products ORDER BY id ASC LIMIT $2 OFFSET $1',
      [page * count - count, count],
    )
      .then((res) => res.rows)
      .catch((err) => console.log(err))
  ),

  // readProduct: (productId) => (
  //   pool.query()
  // )
};
