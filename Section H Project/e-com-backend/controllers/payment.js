const SSLCommerzPayment = require("sslcommerz-lts");
const { _pick } = require("../helper/lodash");
const { CartItem } = require("../models/cartItem");
const { Profile } = require("../models/profile");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;
const siteUrl = (path) => `http://localhost:${process.env.PORT}/${path}`;
const setCustomerInfo = (
  data,
  {
    name,
    email,
    address1: add1,
    address2: add2,
    city,
    state,
    postcode,
    country,
    phone,
    fax = phone,
  }
) => {
  const newData = { ...data };
  const info = {
    name,
    email,
    add1,
    add2,
    city,
    state,
    postcode,
    country,
    phone,
    fax,
  };

  for (const key in info) newData[`cus_${key}`] = info[key];
  return newData;
};
const setShippingInfo = (
  data,
  { name, address1: add1, address2: add2, city, state, postcode, country }
) => {
  const newData = { ...data };
  const info = {
    name,
    add1,
    add2,
    city,
    state,
    postcode,
    country,
  };
  for (const key in info) newData[`ship_${key}`] = info[key];
  return newData;
};
const setItemInfo = (
  data,
  {
    totalAmount: total_amount,
    numOfItem: num_of_item,
    currency = "BDT",
    tranId: tran_id,
    productName: product_name,
    productCategory: product_category,
    productProfile: product_profile,
  }
) => {
  return {
    ...data,
    total_amount,
    num_of_item,
    currency,
    tran_id,
    product_name,
    product_category,
    product_profile,
  };
};
const paymentInit = async (req, res) => {
  const userId = req.user._id;
  const cartItems = await CartItem.find({ user: userId });
  const profile = await Profile.findOne({ user: userId });
  // profile have address1,address2,city,state,postcode,country,phone
  console.log(profile);
  const [totalAmount, numOfItem] = cartItems.reduce(
    (pre, cur) => [pre[0] + cur.count * cur.price, pre[1] + cur.count],
    [0, 0]
  );

  let data = {
    success_url: siteUrl("success"),
    fail_url: siteUrl("fail"),
    cancel_url: siteUrl("cancel"),
    ipn_url: siteUrl("ipn"),
    shipping_method: "Courier",
  };
  data = setCustomerInfo(data, {
    ...profile,
    name: req.user.name,
    email: req.user.email,
  });
  data = setShippingInfo(data, profile);
  data = setItemInfo(data, {
    totalAmount,
    numOfItem,
    tranId: Date.now().toString(36) + Math.random().toString(36).substr(2),
    productName: "Multi",
    productCategory: "Multi",
    productProfile: "Multi",
  });
  return res.send(data);

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(data)
    .then((apiResponse) => {
      // Redirect the user to payment gateway
      if (apiResponse.status === "FAILED") return res.send(apiResponse);

      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.redirect(GatewayPageURL);
      console.log("Redirecting to: ", GatewayPageURL);
    })
    .catch((error) => {
      const errorMessage = error.response ? error.response : error.message;
      console.log(errorMessage);
    });
};

module.exports = { paymentInit };
