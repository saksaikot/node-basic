const { Schema, model } = require("mongoose");

const orderSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ingredients: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  customer: {
    deliveryAddress: String,
    phone: String,
    paymentType: String,
  },
  price: { type: Number, required: true },
  orderTime: {
    type: Date,
    default: Date.now(),
  },
});
const Order = model("Order", orderSchema);

module.exports = { Order };
