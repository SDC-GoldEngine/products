
DROP DATABASE IF EXISTS productsdb;
CREATE DATABASE productsdb;

\c productsdb;

CREATE TABLE IF NOT EXISTS products (
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
  product_id INT NOT NULL REFERENCES products ON DELETE CASCADE,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS skus(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  style_id INT NOT NULL REFERENCES styles ON DELETE CASCADE,
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS photos(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  style_id INT NOT NULL REFERENCES styles ON DELETE CASCADE,
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS related(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  current_product_id INT NOT NULL REFERENCES products ON DELETE CASCADE,
  related_product_id INT NOT NULL
);

COPY products (id, name, slogan, description, category, default_price)
FROM '/Users/johnnywu/Documents/SDC/Data/product.csv'
WITH CSV HEADER;

COPY features (id, product_id, feature, value)
FROM '/Users/johnnywu/Documents/SDC/Data/features.csv'
WITH CSV HEADER;

COPY styles (id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/johnnywu/Documents/SDC/Data/styles.csv'
WITH CSV HEADER;

COPY skus (id, style_id, size, quantity)
FROM '/Users/johnnywu/Documents/SDC/Data/skus.csv'
WITH CSV HEADER;

COPY photos (id, style_id, url, thumbnail_url)
FROM '/Users/johnnywu/Documents/SDC/Data/photos.csv'
WITH CSV HEADER;

COPY related (id, current_product_id, related_product_id)
FROM '/Users/johnnywu/Documents/SDC/Data/related.csv'
WITH CSV HEADER;