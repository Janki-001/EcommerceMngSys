import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true,
    },
    product_desc: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/products-icon-png/products-icon-png-25.jpg",
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
