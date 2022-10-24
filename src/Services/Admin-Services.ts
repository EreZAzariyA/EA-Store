import axios from "axios";
import ProductModel from "../Models/Product-Model";
import { addProductAction, removeProductAction } from "../Redux/Products-state";
import { productsStore } from "../Redux/Store";
import config from "../Utils/Config";

class AdminServices {

      public async addNewProduct(product: ProductModel): Promise<ProductModel> {
            const response = await axios.post<ProductModel>(config.urls.admin.products.addProductUrl, product);
            const productToAdd = response.data;
            productsStore.dispatch(addProductAction(product));
            return productToAdd;
      }

      public async deleteProductByProductId(productId: string): Promise<void> {
            await axios.delete(config.urls.admin.products.deleteProductUrl + productId);
            productsStore.dispatch(removeProductAction(productId));
      }

}

const adminServices = new AdminServices();
export default adminServices;