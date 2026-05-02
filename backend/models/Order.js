const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid'], default: 'paid' },
    shippingAddress: {
      fullName: String,
      email: String,
      city: String,
      address: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
