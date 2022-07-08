import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  getProduct,
  getSearchProduct,
} from "../controllers/product.js";
import { addOrUpdateTicket } from "../validator/index.js";

const productRouter = Router();

productRouter.post("/add", isAuthenticated, addOrUpdateTicket, addProduct);
productRouter.get("/all", getAllProduct);
productRouter.get("/search", isAuthenticated, getSearchProduct);
productRouter.get("/:id", isAuthenticated, getProduct);
productRouter.delete("/:id", isAuthenticated, deleteProduct);
productRouter.put("/:id", isAuthenticated, addOrUpdateTicket, editProduct);

export default productRouter;
