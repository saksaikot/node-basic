const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const SSLCommerzPayment = require("sslcommerz-lts");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

const port = 3030;
const siteUrl = (path) => `http://localhost:${port}/${path}`;
//sslcommerz init
app.get("/init", (req, res) => {
  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: siteUrl("success"),
    fail_url: siteUrl("fail"),
    cancel_url: siteUrl("cancel"),
    ipn_url: siteUrl("ipn"),
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
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
});

app.post("/*", (req, res) => res.json(req.body));

app.listen(port, () => {
  console.log(`You can init the transaction http://localhost:${port}/init`);
});
