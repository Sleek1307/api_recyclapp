const { Product, Category } = require('../database/db.js')

const createCategory = async (req, res) => {

  const { data } = req.body;

  try {
    const category = await Category.create(data);

    if (category) {
      res.status(201).json({ status: 'OK', success: true, data: category })
    }
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }

}

const getCategories = async (req, res) => {

  try {
    const categories = await Category.findAll();
    res.status(200).json({ status: 'OK', success: true, data: categories })
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
}

const getCategory = async (req, res) => {

  const { id } = req.header;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ status: 'NOT FOUND', success: false, error: 'La categoria que solicitaste no existe' })
    }

    return res.status(201).json({ status: 'OK', success: true, data: category })
  } catch (err) {
    return res.status(400).json({ status: 'FAILED', success: false, error: err })
  }

}

const updateCategory = async (req, res) => {

  const { id } = req.headers;
  const data = req.body;

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ status: 'NOT FOUND', success: false, error: 'La categoria que solicitaste no existe' })
  }

  try {
    const updatedCategory = await Category.update(data, {
      where: {
        id: id
      }
    })

    return res.status(200).json({ status: 'OK', success: true, data: updatedCtaegory })
  } catch (error) {
    return res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
}

const createProduct = async (req, res) => {

  const { data } = req.body;

  try {
    const product = await Product.create(data);

    if (product) {
      res.status(201).json({ status: 'OK', success: true, data: product })
    }
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }

}

const getProducts = async (req, res) => {

  try {
    const products = await Product.findAll();
    res.status(200).json({ status: 'OK', success: true, data: products })
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
}

const getProduct = async (req, res) => {

  const { id } = req.header;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ status: 'NOT FOUND', success: false, error: 'La categoria que solicitaste no existe' })
    }

    return res.status(201).json({ status: 'OK', success: true, data: product })
  } catch (err) {
    return res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
}

const updateProduct = async (req, res) => {

  const { id } = req.headers;
  const data = req.body;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ status: 'NOT FOUND', success: false, error: 'El producto que solicitaste no existe' })
  }

  try {
    const updatedProduct = await Product.update(data, {
      where: {
        id: id
      }
    })

    return res.status(200).json({ status: 'OK', success: true, data: updatedProduct })
  } catch (error) {
    return res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
}

module.exports = { createCategory, getCategories, getCategory, updateCategory, createProduct, getProduct, getProducts, updateProduct };