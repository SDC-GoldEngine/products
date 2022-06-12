require('dotenv').config();
const { Pool, Client } = require('pg');

module.exports = async () => {
  const client = new Client({
    database: 'template1',
    user: process.env.USER,
  });

  try {
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS ${process.env.DB};`);
    await client.query(`CREATE DATABASE ${process.env.DB};`);
    await client.end();
    console.log('Database root created.');
  } catch (err) {
    console.log(err);
  }

  const pool = new Pool({
    user: process.env.USER,
    database: process.env.DB,
  });

  // sql SERIAL = postgres GENERATED ALWAYS AS IDENTITY
  // FOREIGN KEY
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        slogan TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        default_price INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS features(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products ON DELETE CASCADE,
        feature TEXT NOT NULL,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS styles(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        productId INT NOT NULL REFERENCES products ON DELETE CASCADE,
        name TEXT NOT NULL,
        sale_price INT NOT NULL,
        original_price INT NOT NULL,
        default_style BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS skus(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        styleId INT NOT NULL REFERENCES styles ON DELETE CASCADE,
        size TEXT NOT NULL,
        quantity INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS photos(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        styleId INT NOT NULL REFERENCES styles ON DELETE CASCADE,
        url TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS related(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        current_product_id INT NOT NULL REFERENCES products ON DELETE CASCADE,
        related_product_id INT NOT NULL
      );
    `);
    console.log('TABLES CREATED SUCCESSFULLY');

    // import csv file into table using COPY statement
    // if column name specified, order must be the same
    // or just table name if csv contains all column names
    await Promise.all([
      await pool.query(`
        COPY products (id, name, slogan, description, category, default_price)
        FROM '/Users/johnnywu/Documents/SDC/Data/product.csv'
        WITH CSV HEADER;
      `),
      await pool.query(`
        COPY features (id, product_id, feature, value)
        FROM '/Users/johnnywu/Documents/SDC/Data/features.csv'
        WITH CSV HEADER;
      `),
      await pool.query(`
        COPY styles (id, productId, name, sale_price, original_price, default_style)
        FROM '/Users/johnnywu/Documents/SDC/Data/styles.csv'
        WITH CSV HEADER;
      `),
      await pool.query(`
        COPY skus (id, styleId, size, quantity)
        FROM '/Users/johnnywu/Documents/SDC/Data/skus.csv'
        WITH CSV HEADER;
      `),
      await pool.query(`
        COPY photos (id, styleId, url, thumbnail_url)
        FROM '/Users/johnnywu/Documents/SDC/Data/photos.csv'
        WITH CSV HEADER;
      `),
      await pool.query(`
        COPY related (id, current_product_id, related_product_id)
        FROM '/Users/johnnywu/Documents/SDC/Data/related.csv'
        WITH CSV HEADER;
    `),
    ]);
    console.log('DATA IMPORTED INTO TABLES');
  } catch (err) {
    console.log(err);
  }
};
