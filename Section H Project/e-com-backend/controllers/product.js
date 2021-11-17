const { Product, validate } = require("../models/product");
const { _pick } = require("../helper/lodash");
const formidable = require("formidable");
const fs = require("fs");
const create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, parseReq);

  function parseReq(err, fields, files) {
    if (err) return res.status(400).send("something went wrong");
    // const {name,description,price,category,quantity} = fields;
    const { error } = validate(fields);
    if (error) return res.status(400).send(error.details[0].message);
    if (!files.photo) return res.status(400).send("Must give an image");
    const product = new Product(fields);
    fs.readFile(files.photo.filepath, async (err, data) => {
      if (err) return res.status(400).send("Problem in file data");
      product.photo = { data, contentType: files.photo.type };
      const saveResult = await product.save();
      return res.status(201).send({
        message: "product created successfully",
        data: _pick(saveResult, [
          "_id",
          "name",
          "description",
          "price",
          "category",
          "quantity",
        ]),
      });
    });
  }
};
const index = async (req, res) => {
  const products = await Product.find().select({ photo: 0 });
  return res.status(200).send(products);
};
const item = async (req, res) => {};
const store = async (req, res) => {};
// const create = async (req, res) => {};
module.exports = {
  create,
  index,
  item,
  store,
};
