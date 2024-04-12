import db from "../config/db.js";

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products";

    db.execute(query)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products WHERE id = ?";

    db.execute(query, [id])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

export const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO products (price, description, image, name) VALUES (?, ?, ?, ?)";

    const { price, description, image, name } = product;

    db.execute(query, [price, description, image, name])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

export const updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE products SET price = ?, description = ?, image = ?, name = ? WHERE id = ?";

    const { price, description, image, name } = product;

    db.execute(query, [price, description, image, name, id])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "DELETE FROM products WHERE id = ?";

    db.execute(query, [id])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};
