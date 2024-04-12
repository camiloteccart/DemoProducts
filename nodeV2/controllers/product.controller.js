import * as productServices from "../services/product.service.js";

export const getProducts = (req, res) => {
    productServices
    .getProducts()
    .then((result) => {
      res.status(200).json({
        message: "Products retrieved successfully1",
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getProduct = (req, res) => {
  const { id } = req.params;
  productServices
    .getProduct(id)
    .then((result) => {
      res.status(200).json({
        message: "Product retrieved successfully2",
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const createProduct = (req, res) => {
  const product = req.body;
  productServices
    .createProduct(product)
    .then(() => {
      res.status(200).json({
        message: "Product created successfully",
        data: product,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const updateProduct = (req, res) => {
  const product = req.body;
  const { id } = req.params;
  productServices
    .updateProduct(id, product)
    .then(() => {
      res.status(200).json({
        message: "Product updated successfully",
        data: product,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  productServices
    .deleteProduct(id)
    .then(() => {
      res.status(200).json({
        message: "Product deleted successfully"
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
