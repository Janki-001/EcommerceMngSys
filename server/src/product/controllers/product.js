import Product from "../model/product.js";

export const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    var productData = {
      product_title: req.body.product_title,
      product_desc: req.body.product_desc,
      image: req.body.image,
      user_id: req.body.user_Id,
    };
    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const sortQuery = req.query.order;
    let sortObject = {};
    sortObject[req.query.name] = sortQuery;
    const count = await Product.count({ isDeleted: false });
    const products = await Product.find({ isDeleted: false })
      .sort(sortObject)
      .skip(req.query.skip)
      .limit(10);

    if (products) {
      return res.status(200).json({ products, count });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getSearchProduct = async (req, res) => {
  const input = req.query.input;
  try {
    const products = await Product.find({
      isDeleted: false,
      product_title: new RegExp(input),
    });

    if (products) {
      return res.status(200).json({ products });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getProduct = (req, res) => {
  try {
    Product.find({ _id: req.params.id }, (err, products) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ products });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteProduct = (req, res) => {
  try {
    Product.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      (err, products) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ products });
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const editProduct = (req, res) => {
  try {
    var productData = {
      product_title: req.body.title,
      product_desc: req.body.description,
      image: req.body.image,
    };
    Product.findByIdAndUpdate(req.params.id, productData, (err, products) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ products });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
