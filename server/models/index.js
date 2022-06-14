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
    ) AS features
    FROM products p LEFT JOIN features f ON p.id = f.product_id
    WHERE p.id = $1 GROUP BY p.id`, [productId])
      .then((res) => res.rows[0])
      .catch((err) => { throw err; })
  ),

  readStyle: (productId) => (
    pool.query(`SELECT s.product_id AS product_id,
      json_agg(
        json_build_object(
          'style_id', s.id, 'name', s.name, 'original_price', s.original_price,
          'sale_price', s.sale_price, 'default?', s.default_style,
          'photos', (
            SELECT json_agg(
              json_build_object(
                'thumbnail_url', photos.thumbnail_url,
                'url', photos.url
              )
            ) AS photos_arr
            FROM photos WHERE photos.style_id = s.id
            GROUP BY style_id
          ),
          'skus', (
            SELECT json_object_agg(
              skus.id::TEXT, json_build_object(
                'quantity', skus.quantity,
                'size', skus.size
              )
            ) AS skus_obj
            FROM skus WHERE skus.style_id = s.id
            GROUP BY style_id
          )
        )
      ) AS results FROM styles s WHERE s.product_id = $1
      GROUP BY s.product_id`, [productId])
      .then((res) => res.rows[0])
      .catch((err) => { throw err; })
  ),

  readRelated: (productId) => (
    pool.query(`SELECT json_agg(related_product_id) FROM related
    WHERE related.current_product_id = $1`, [productId])
      .then((res) => res.rows[0].json_agg)
      .catch((err) => { throw err; })
  ),
};

// LOOK INTO INDEXING
// INDEX ON THE COLUMNS IM JOINING

// readProduct: (productId) => (
//   pool.query(`SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
//   f.feature, f.value
//   FROM products p LEFT JOIN features f ON p.id = f.product_id WHERE p.id = ${productId};`)
//     .then((res) => res.rows[0])
//     .catch((err) => { throw err; })
// ),
