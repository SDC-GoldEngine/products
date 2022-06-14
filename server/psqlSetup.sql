
DROP DATABASE IF EXISTS productsdb;
CREATE DATABASE productsdb;

\c productsdb;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price INT NOT NULL
);

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id),
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  style_id INT NOT NULL REFERENCES styles(id),
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  style_id INT NOT NULL REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related(
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  current_product_id INT NOT NULL REFERENCES products(id),
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

CREATE INDEX products_id_index ON products (id);
CREATE INDEX features_product_id ON features (product_id);
CREATE INDEX styles_index ON styles (product_id);
CREATE INDEX photos_index ON photos (style_id);
CREATE INDEX skus_index ON skus (style_id);
CREATE INDEX related_index ON related (current_product_id);